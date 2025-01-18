// DepartmentEditorController.js
"use strict";
DepartmentEditorController.$inject = ['$scope', 'DepartmentWebApiService', '$q','UniversityWebApiService'];
function DepartmentEditorController($scope, DepartmentWebApiService, $q, UniversityWebApiService) {

    $scope.isEditMode = Boolean($scope.parameters && $scope.parameters.DepartmentId);
    var itemID;
    var itemAPI;
    var itemReadyDeffered = $q.defer();
    var Department;
    var UniID;
    defineScope();
    loadParameters();
    load();
    // Set initial values for input fields
    $scope.parameters.DepartmentName = $scope.isEditMode ? $scope.parameters.DepartmentName : '';
    $scope.parameters.UniversityName = $scope.isEditMode ? $scope.parameters.UniversityName : '';
    function loadParameters() {
        // Get parameters from $scope
        if ($scope.isEditMode) {
            itemID = $scope.parameters.DepartmentId; // Assuming DepartmentId is the correct property name

        }

    }


    function defineScope() {
        //define all needed data/function on scope

        $scope.scopeModel = {};
        $scope.onItemDirectiveReady = function (api) {
            itemAPI = api;
            itemReadyDeffered.resolve();
        };
        $scope.scopeModel.save = function () {
         UniID = itemAPI.getData();
                if ($scope.isEditMode) {
                    //console.log(itemID);
                    var updatedDepartment = {
                        id: itemID, name: $scope.parameters.DepartmentName, UniID: UniID
                    }
                    console.log(updatedDepartment);
                    DepartmentWebApiService.updateDepartments(itemID, $scope.parameters.DepartmentName, UniID).then(function () {
                        $scope.close();
                    })
                } else {

                    DepartmentWebApiService.addDepartments(itemID,$scope.parameters.DepartmentName, UniID).then(function () {
                        $scope.close();
                    })
                }
            
            // Close the modal when done
            $scope.close();
        };

    }
    function load() {
        //load all directives and make all web calls
        // synchronize all dependent calls using promises
        function loadAllControls() {
            if ($scope.isEditMode) {
                Department = getEntireItem();
            }
            else {
                // Create a deferred object and immediately resolve it
                var deferred = $q.defer();
                deferred.resolve({});
                Department = deferred.promise;
            }
            console.log("Department", Department);
             loadItemDirective();
        }

        function getEntireItem() {
            return DepartmentWebApiService.getEntireItem(itemID);
        }

        function loadItemDirective() {
            // console.log("loadItemDirective");
            var loadDeffered = $q.defer();
            var yourArray;

            itemReadyDeffered.promise.then(function () {

                Department.then(function (result) {
                    var UniID = $scope.isEditMode ? result.UniversityId : undefined
                    console.log(result);
                    var dataToLoad = {
                        UniversityValue: UniID,
                        editMode: $scope.isEditMode? true : false
                    };

                    itemAPI.load(dataToLoad).then(function () {
                        loadDeffered.resolve();
                    });
                });


            });
            return loadDeffered.promise;
        }
        loadAllControls();
    }
}

angular.module('myApp').controller('DepartmentEditorController', DepartmentEditorController);

