// UniversityEditorController.js
"use strict";
UniversityEditorController.$inject = ['$scope', 'UniversityWebApiService'];
function UniversityEditorController($scope, UniversityWebApiService) {

    $scope.isEditMode = Boolean($scope.parameters && $scope.parameters.UniversityId);
    var itemID;
    var itemAPI;
    //var itemReadyDeffered = $q.defer();
    var University;
    defineScope();
    loadParameters();
    load();
    // Set initial values for input fields
    $scope.parameters.UniversityName = $scope.isEditMode ? $scope.parameters.UniversityName : '';
    function loadParameters() {
        // Get parameters from $scope
        if ($scope.isEditMode) {
            itemID = $scope.parameters.UniversityId; // Assuming UniversityId is the correct property name

        }

    }


    function defineScope() {
        //define all needed data/function on scope

        $scope.scopeModel = {};
        $scope.scopeModel.onItemDirectiveReady = function (api) {
            itemAPI = api;
            itemReadyDeffered.resolve();
        };
        $scope.scopeModel.save = function () {
            if ($scope.isEditMode) {
                console.log(itemID);
                var updatedUniversity = {
                    id: itemID, name: $scope.parameters.UniversityName  }
                UniversityWebApiService.updateUniversitys(updatedUniversity).then(function () {
                    $scope.close();
                })
            } else {

                UniversityWebApiService.addUniversitys($scope.parameters.UniversityName).then(function () {
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

            University = getEntireItem();
            // loadItemDirective();
        }

        function getEntireItem() {
            if ($scope.isEditMode)
            return UniversityWebApiService.getEntireItem(itemID);
        }

        function loadItemDirective() {
            var loadDeffered = $q.defer();

            itemReadyDeffered.promise.then(function () {
                //load directive and resole loadDefferd
            });
            return loadDefferd.promise;
        }
        loadAllControls();
    }
}

angular.module('myApp').controller('UniversityEditorController', UniversityEditorController);

