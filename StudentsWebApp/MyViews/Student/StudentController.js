//var app = angular.module('myApp', ['ui.bootstrap']);
'use strict';
// Inject the necessary services
StudentController.$inject = ['$scope', 'StudentWebApiService', 'StudentService', 'PaginationService'];


// Define the controller function
function StudentController($scope, StudentWebApiService, StudentService, PaginationService) {
    var studentList;
    var updateDisplayedStudents;
    var buildPagesArray;

    // Define the scope model
    defineScope();
    load();
    function defineScope() {
        $scope.scopeModel = {};

        $scope.scopeModel.getFilteredStudents = function (filter) {
            // Return the promise from the StudentWebApiService
            return StudentWebApiService.getFilteredStudents(filter)
                .then(function (students) {
                    // Update the scope with the retrieved students
                    studentList = students;
                    $scope.count = studentList.length;

                    // Iterate over the students array and update gender values
                    angular.forEach(studentList, function (student) {
                        student.gender = (student.Gender == 1) ? 'Male' : 'Female';
                    });

                     buildPagesArray();
                     updateDisplayedStudents();
                     //console.log('Filter:', filter);
                    // Resolve the promise with the students
                    return students;
                })
                .catch(function (error) {
                    // Handle error, e.g., log to console
                   // console.error('Error fetching data:', error);
                    // Reject the promise with the error
                    throw error;
                });
        };
        $scope.scopeModel.setPage = function (page) {
            // Use PaginationService to set the page
            PaginationService.setPage(page, $scope.scopeModel.currentPage, function (currentPage) {
                $scope.scopeModel.currentPage = currentPage;
                updateDisplayedStudents();
            });
            //console.log(page);
           // console.log($scope.scopeModel.currentPage);
        };
        $scope.scopeModel.editStudent = function (student) {
            // Pass the student and callback function to refresh the grid after updating a student
         //   console.log(student);
            StudentService.editStudent(student, function () {
                load();
              //  console.log("updated");
            });
        };
        $scope.scopeModel.addStudent = function () {
            // Pass the callback function to refresh the grid after adding a student
            StudentService.addStudent(studentList.length, function () {
                load();
              //  console.log("added");
            });
        };
        $scope.scopeModel.currentPage;
        $scope.scopeModel.itemsPerPage = 5; // Adjust as needed
        $scope.scopeModel.pages = [];
        $scope.scopeModel.displayedStudents;
    }
    function load() {
        $scope.scopeModel.currentPage = 1;
        // Function to get filtered students from the API
        $scope.scopeModel.getFilteredStudents('').then(function (students) {
            // Function to open the student editor modal for adding a new student

            studentList = students;

            // Function to update the displayed students based on the current page
            buildPagesArray();
            updateDisplayedStudents();
        });

    }
            updateDisplayedStudents = function () {
                PaginationService.updateDisplayedItems(studentList, $scope.scopeModel.currentPage, $scope.scopeModel.itemsPerPage, function (displayedStudents) {
                    $scope.scopeModel.displayedStudents = displayedStudents;
                });
            }

            // Function to build the array of pages using PaginationService
            buildPagesArray = function () {
                $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.itemsPerPage, studentList);
            }

}
// Register the controller with your app module
angular.module('myApp').controller('StudentController', StudentController);






