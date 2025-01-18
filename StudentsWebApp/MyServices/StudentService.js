// StudentService.js

angular.module('myApp').service('StudentService', ['ModalService', function (ModalService) {

    // Function to open the student editor modal for adding a new student
 
   
    this.addStudent = function (studentCount, onStudentAdded) {
            ModalService.openModal('MyViews/Student/StudentEditorTemplate.html', {
                studentCount: studentCount
            }, function () { onStudentAdded(); });
        };

     //Function to open the student editor modal for editing an existing student
    this.editStudent = function (student, onStudentUpdated) {
           ModalService.openModal('MyViews/Student/StudentEditorTemplate.html', {
                studentId: student.Id,
                studentName: student.Name,
               studentGender: student.gender

           }, function () { onStudentUpdated(); });
    };
}]);
