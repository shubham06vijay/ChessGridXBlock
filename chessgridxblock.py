
import datetime
import hashlib
import json
import logging
import mimetypes
import os
import pkg_resources
import pytz
import grades

from functools import partial

from courseware.models import StudentModule

from django.core.exceptions import PermissionDenied
from django.core.files import File
from django.core.files.storage import default_storage
from django.conf import settings
from django.template import Context, Template

from student.models import user_by_anonymous_id
from submissions import api as submissions_api
from submissions.models import StudentItem as SubmissionsStudent

from webob.response import Response

from xblock.core import XBlock
from xblock.exceptions import JsonHandlerError
from xblock.fields import DateTime,Dict, Scope, String, Float, Integer
from xblock.fragment import Fragment


from xmodule.util.duedate import get_extended_due_date

log = logging.getLogger(__name__)
BLOCK_SIZE = 8 * 1024




class ChessgridXBlock(XBlock):
    """
        It creates and stores the chess grid along with providing assessment for the students.
    """

    count = Integer(
        default=0, scope=Scope.settings,
        help="A simple counter, to show something happening",
    )
    grid_data = String(
        default="", scope=Scope.settings,
        help="grid data",
    )
    grid_data_ans = String(
        default="", scope=Scope.settings,
        help="grid data answer",
    )
    row = Integer(
        default=0, scope=Scope.settings,
        help="rows",
    )
    col = Integer(
        default=0, scope=Scope.settings,
        help="columns",
    )
    question = String(
        display_name="Question",
        default="", scope=Scope.settings,
        help="",
    )
    answer = String(
        default="", scope=Scope.user_state,
        help="ANSWER",
    )
    stud_ans = String(
        default="", scope=Scope.user_state,
        help="STUDENT ANSWER",
    )
    points = Integer(
        display_name="Maximum Score",
        help=(""),
        default=100,
        scope=Scope.settings
    )
    weight = Float(
        display_name="Problem Weight",
        help=(""),
        values={"min": 1.0, "step": .1},
        scope=Scope.settings
    )
    display_name = String(
        display_name="Display Name",
        default='CHESS GRID', scope=Scope.settings,
        help=""
    )
    stud_score = Integer(
        default=-5, scope=Scope.user_state,
        help="STUDENT SCORE",
    )
    icon_class = 'problem'
    has_score = True

    def resource_string(self, path):
        """Handy helper for getting resources from the kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
		The primary view shown to students when viewing courses.
        """
        
        context = {

            "student_state": json.dumps(self.student_state()),
            "id": self.location.name.replace('.', '_'),
           
        }
        fragment = Fragment()
        fragment.add_content(
            render_template(
                'templates/assignment/chessgridxblock.html',
                context
            )
        )



        fragment.add_css(_resource("static/css/chessgridxblock.css"))
        fragment.add_javascript(_resource("static/js/src/chessgridxblock.js"))
        fragment.initialize_js('ChessgridXBlock')
        js_str = pkg_resources.resource_string(__name__, "static/js/src/grid_library.js")
        fragment.add_javascript(unicode(js_str))
        return fragment




    def student_state(self):
     
       return {
            "display_name": self.display_name,
            "score": self.stud_score,
            "weight":self.weight,
            "question": self.question,
        }




    def studio_state(self):
        
        return {
            "display_name": self.display_name,
            "weight":self.weight,
            "question":self.question,
        }


		
    def studio_view(self, context=None):
        """
        The view shown to teachers when viewing courses.
        """
   
        cls = type(self)

        def none_to_empty(data):
            return data if data is not None else ''
        edit_fields = (
            (field, none_to_empty(getattr(self, field.name)), validator)
            for field, validator in (
                (cls.display_name, 'string'),
                (cls.points, 'number'),
                (cls.weight, 'number'),
                (cls.question, 'string'),
            )
        )

        context = {
            "studio_state": json.dumps(self.studio_state()),

            "id": self.location.name.replace('.', '_'),

            'fields': edit_fields           
        }

        fragment=Fragment()
        fragment.add_content(
            render_template(
                'templates/assignment/chessgridxblock_edit.html',
                context
            )
        )
        fragment.add_css(_resource("static/css/chessgridxblock.css"))
        fragment.add_javascript(_resource("static/js/src/chessgridxblock_edit.js"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/grid_library.js")
        fragment.add_javascript(unicode(js_str))
        fragment.initialize_js('ChessgridXBlock')
  
        return fragment
		
		
    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def save_grid(self, data, suffix=''):
        """
	A Handler used to Save the dictionary as a string inside.
        (used for saving both the question grid and solution grid).
        """


        if(data.has_key("QG")):
         self.grid_data=str(data["QG"])
  
        if(data.has_key("AG")):
         self.grid_data_ans=str(data["AG"])
         

        return {"count": self.count}



    @XBlock.json_handler
    def save_chess(self, data, suffix=''):
        """
	A handler, which does the following:
        1)Saves Display Name
        2)Saves the question given by teacher.
        3)Saves the points set by the teacher.
        4)Saves the weight given to the question by the teacher.
        """
      

        self.display_name = data.get('display_name', self.display_name)
        self.question = data.get('question', self.question)
     
        # Validate points before saving
        points = data.get('points', self.points)

        # Check that we are an int
        try:
            points = int(points)
        except ValueError:
            raise JsonHandlerError(400, 'Points must be an integer')
        # Check that points are positive
        if points <= 0:
            raise JsonHandlerError(400, 'Points must be a positive integer')
        self.points = points

        
        self.answer=data.get('answer',self.answer)


        weight = data.get('weight', self.weight)

        #if weight:
        try:
             weight = float(weight)
        except ValueError:
             raise JsonHandlerError(400, 'Weight must be a decimal number')
            # Check that weight is positive
        if weight <= 0:
             raise JsonHandlerError(
                    400, 'Weight must be a positive decimal number'
             )
        if self.question=="":
             raise JsonHandlerError(
                    400, 'Question cannot be empty'
             )
 
        if self.grid_data=="":
             raise JsonHandlerError(
                    400, 'Please create the question'
             )

        if self.grid_data_ans=="":
             raise JsonHandlerError(
                    400, 'Please enter the solution'
             )

  
        self.weight = weight      
        self.save()
        log.info(self)



    @XBlock.json_handler
    def get_dict(self, data, suffix=''):
        """
	 A handler which converts string into dictionary and returns the dictionary back to the js.
        """
	temp={"hello":"world"}
        if(self.grid_data==""): 
            pass
        else:
            temp=eval(self.grid_data)
        
        temp1={"hello":"world"}
        if(self.grid_data_ans==""):
            pass
        else:
            temp1=eval(self.grid_data_ans)

        if(self.stud_ans==""):
         pass
        else:
         return eval(self.stud_ans)
        
        if(data["grid"]=="QG"):
         return temp
        else:
         return temp1


    @XBlock.json_handler
    def ques_fetch(self, data, suffix=''):
        """
	Handler used to fetch the question in the student view.
        """
        return {"ques": self.question,"flag":self.answer,"score": self.stud_score,"points":self.points}
        

    @XBlock.json_handler
    def chk_ans(self, data, suffix=''):
        """
		Handler used to fetch the answer given by the student and compare it with the teacher's solution and give the score to the student.
        """
        if self.stud_score!=-5:
            return {"score":"false"}

        self.stud_ans=str(data)
        temp1=eval(self.grid_data_ans)
        temp2=eval(self.stud_ans)
        key1=temp1.keys()
        for i in key1:
         if(temp1[i]==temp2[i]):
          pass
         else:
          log.info("%")
          log.info(i)
          log.info("%")

       
        if cmp(temp1,temp2)==0:
            self.stud_score=self.points
        else:
            self.stud_score=0
                

	self.runtime.publish(self, 'grade',{ 'value': self.stud_score, 'max_value':self.points,})
        self.save() 

     
	log.info(self)
        self.answer="done"        
        return {"score": self.stud_score,"points":self.points}


def _resource(path):  # pragma: NO COVER
    """
    Handy helper for getting resources from our kit.
    """
    data = pkg_resources.resource_string(__name__, path)
    return data.decode("utf8")

def _now():
    """
    Get current date and time.
    """
    return datetime.datetime.utcnow().replace(tzinfo=pytz.utc)


def load_resource(resource_path):  # pragma: NO COVER
    """
    Gets the content of a resource
    """
    resource_content = pkg_resources.resource_string(__name__, resource_path)
    return unicode(resource_content)


def render_template(template_path, context=None):  # pragma: NO COVER
    """
    Evaluate a template by resource path, applying the provided context.
    """
    if context is None:
        context = {}

    template_str = load_resource(template_path)
    template = Template(template_str)
    return template.render(Context(context))


def require(assertion):
    """
    Raises PermissionDenied if assertion is not true.
    """
    if not assertion:
        raise PermissionDenied
