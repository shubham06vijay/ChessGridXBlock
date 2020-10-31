# Grid Component

We have created a reusable grid component which makes the Grid creation and it's integration with XBlock simpler.
It can be used in applications where Grid is required e.g. Board games like Chess , Sudoku, crosswords etc.

We have created a ChessgridXBlock in which we have used our library grid_library.js.

To use grid_library.js, one needs to include the library in their XBlock.
After that one can access its functions(APIs).

# Functionality

  - CreateGrid
  - SetImage
  - SetColor
  - SetSuperScript
  - Enable/Disable Block
  - Set/Get Data     (data is stored in form of JSON Dictionary)
  - Remove/Reset
  - ChangeDimensions


# ChessgridXBlock
In this we have used the grid component(The JS library).Then we have created our XBlock.It consists of 2 views.
In studio view teacher sets the problem.
In student view student submits the solution.
We compare their answer submitted by the student the Grid Solution by the teacher and show the result in progress bar by storing the result in the EDX database itself.

To learn more about XBlocks:
refer to https://open.edx.org/xblocks

To install you can copy our files in your XBlock or to install in your edX platform just follow the steps on how to install XBlock on openedX platform.

This XBlock and Grid component has been created as a Summer Intern Project for the enhancement of IITBombayX Platform.

Thank You!!

