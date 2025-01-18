'use strict';
// Inject the necessary services
UniversityController.$inject = ['$scope', 'UniversityWebApiService', 'UniversityService', 'PaginationService','$q'];


// Define the controller function
function UniversityController($scope, UniversityWebApiService, UniversityService, PaginationService,$q) {
    var UniversityList;
    var updateDisplayedUniversitys;
    var buildPagesArray;
    var DepGridAPI = [];
    var itemReadyDeffered = [];
    var universityId;
    // Define the scope model
    defineScope();
    load();
    function defineScope() {
        $scope.scopeModel = {};
        $scope.scopeModel.showDepartmentGrid = [];
       

        $scope.scopeModel.onUniversityRowClick = function ( university) {

            $scope.scopeModel.showDepartmentGrid[university.Id] = $scope.scopeModel.showDepartmentGrid[university.Id]===undefined? true:!$scope.scopeModel.showDepartmentGrid[university.Id];

            universityId = university.Id;
            if ($scope.scopeModel.showDepartmentGrid[university.Id]===true)
            itemReadyDeffered[university.Id].promise.then(function () {
                console.log(university.Id);
                DepGridAPI[university.Id].load(university.Id);
                    console.log("itemReadyDeffered Refreshed");
                    itemReadyDeffered[university.Id] = $q.defer();
              
            });
        };
        $scope.scopeModel.onDepartmentGridReady = function (api) {
            universityId = universityId === undefined ? 1 : universityId;
            console.log("universityId: ", universityId) 
            DepGridAPI[universityId] = api;
            itemReadyDeffered[universityId].resolve();

        };


        $scope.scopeModel.getFilteredUniversitys = function (filter) {
            console.log('Filter:', filter);
            // Return the promise from the UniversityWebApiService
            return UniversityWebApiService.getFilteredUniversitys(filter)
                .then(function (Universitys) {
                    // Update the scope with the retrieved Universitys
                    UniversityList = Universitys;
                    $scope.count = UniversityList.length;
                    buildPagesArray();
                    updateDisplayedUniversitys();
                    // Resolve the promise with the Universitys
                    return Universitys;
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
                updateDisplayedUniversitys();
            });
            console.log(page);
            console.log($scope.scopeModel.currentPage);
        };
        $scope.scopeModel.editUniversity = function (University) {
            // Pass the University and callback function to refresh the grid after updating a University
            console.log(University);
            UniversityService.editUniversity(University, function () {
                load();
                console.log("updated");
            });
        };
        $scope.scopeModel.addUniversity = function () {
            // Pass the callback function to refresh the grid after adding a University
            UniversityService.addUniversity(UniversityList.length, function () {
                load();
                console.log("added");
            });
        };
        $scope.scopeModel.currentPage;
        $scope.scopeModel.itemsPerPage = 5; // Adjust as needed
        $scope.scopeModel.pages = [];
        $scope.scopeModel.displayedUniversitys;
    }
    function load() {
        $scope.scopeModel.currentPage = 1;
        // Function to get filtered Universitys from the API
        $scope.scopeModel.getFilteredUniversitys('').then(function (Universitys) {
            // Function to open the University editor modal for adding a new University

            UniversityList = Universitys;
            angular.forEach(UniversityList, function (uni) {
                itemReadyDeffered[uni.Id] = $q.defer();
            });

            buildPagesArray();
            updateDisplayedUniversitys();
        });


    }
            updateDisplayedUniversitys = function () {
                PaginationService.updateDisplayedItems(UniversityList, $scope.scopeModel.currentPage, $scope.scopeModel.itemsPerPage, function (displayedUniversitys) {
                    $scope.scopeModel.displayedUniversitys = displayedUniversitys;
                });
            }

            // Function to build the array of pages using PaginationService
            buildPagesArray = function () {
                $scope.scopeModel.pages = PaginationService.getPages($scope.scopeModel.itemsPerPage, UniversityList);
            }
}
// Register the controller with your app module
angular.module('myApp').controller('UniversityController', UniversityController);






