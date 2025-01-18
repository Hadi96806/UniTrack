'use strict';
// Inject the necessary services
DepartmentController.$inject = ['$scope', 'DepartmentWebApiService', 'DepartmentService', 'PaginationService','$q'];


// Define the controller function
function DepartmentController($scope, DepartmentWebApiService, DepartmentService, PaginationService,$q) {
    var DepartmentList;
    var updateDisplayedDepartments;
    var buildPagesArray;
    var DepGridAPI;
    var itemReadyDeffered = $q.defer();
    // Define the scope model
    defineScope();
    load();
    function defineScope() {
        $scope.scopeModel = {};
        $scope.scopeModel.onDepartmentGridReady = function (api) {

            DepGridAPI= api;
            itemReadyDeffered.resolve();

        };
        $scope.scopeModel.getFilteredDepartments = function (filter) {
            console.log('Filter:', filter);
            // Return the promise from the DepartmentWebApiService
            return DepartmentWebApiService.getFilteredDepartments(filter)
                .then(function (Departments) {
                    // Update the scope with the retrieved Departments
                    DepartmentList = Departments;
                    $scope.count = DepartmentList.length;
                    buildPagesArray();
                    updateDisplayedDepartments();
                    // Resolve the promise with the Departments
                    return Departments;
                })
                .catch(function (error) {
                    // Handle error, e.g., log to console
                    console.error('Error fetching data:', error);
                    // Reject the promise with the error
                    throw error;
                });
        };
        $scope.scopeModel.setPage = function (page) {
            // Use PaginationService to set the page
            PaginationService.setPage(page, $scope.scopeModel.currentPage, function (currentPage) {
                $scope.scopeModel.currentPage = currentPage;
                updateDisplayedDepartments();
            });
            console.log(page);
            console.log($scope.scopeModel.currentPage);
        };
        $scope.scopeModel.editDepartment = function (Department) {
            // Pass the Department and callback function to refresh the grid after updating a Department
           // console.log(Department);
            DepartmentService.editDepartment(Department, function () {
                load();

            });
        };
        $scope.scopeModel.addDepartment = function () {
            // Pass the callback function to refresh the grid after adding a Department
            DepartmentService.addDepartment(DepartmentList.length, function () {
                load();

            });
        };
        $scope.scopeModel.currentPage;
        $scope.scopeModel.itemsPerPage = 5; // Adjust as needed
        $scope.scopeModel.pages = [];
        $scope.scopeModel.displayedDepartments;
    }
    function load() {
        loadItemDirective();
            $scope.scopeModel.currentPage = 1;
        // Function to get filtered Departments from the API
        $scope.scopeModel.getFilteredDepartments('').then(function (Departments) {
            // Function to open the Department editor modal for adding a new Department

            DepartmentList = Departments;

            // Function to update the displayed Departments based on the current page

            buildPagesArray();
            updateDisplayedDepartments();
        });
        function loadItemDirective() {
        itemReadyDeffered.promise.then(function () {
            DepGridAPI.load();


        });
        }

    }
    updateDisplayedDepartments = function () {
        PaginationService.updateDisplayedItems(DepartmentList, $scope.scopeModel.currentPage, $scope.scopeModel.itemsPerPage, function (displayedDepartments) {
            $scope.scopeModel.displayedDepartments = displayedDepartments;
        });
    }

    // Function to build the array of pages using PaginationService
    buildPagesArray = function () {
        $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.itemsPerPage, DepartmentList);
    }
}
// Register the controller with your app module
angular.module('myApp').controller('DepartmentController', DepartmentController);






