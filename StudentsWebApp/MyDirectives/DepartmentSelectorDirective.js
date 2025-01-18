'use strict';
angular.module('myApp').directive('departmentSelector', ['$q', '$location', 'DepartmentWebApiService',
    function ($q, $location, DepartmentWebApiService) {
        var directiveDefinitionObject = {
            scope: {
                onReady: '=',
            },
            controller: function ($scope, $element, $attrs, $location) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: $location.protocol() + '://' + $location.host() + ':' + '44322' + '/MyDirectives/DepartmentSelectorTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object
        };
        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var itemAPI;
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};

                defineApi();
            }
            function defineApi() {
                var api = {};
                api.load = function (paylaod, UniID) {
                    loadItemDirective();

                    var laodDeffered = $q.defer();
                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();

                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {
                            var Departments = DepartmentWebApiService.getDepartments('');
                            Departments.then(function (result) {
                                // Filter departments based on UniversityId
                                $scope.departments = result.filter(function (department) {
                                    return department.UniversityId === UniID;
                                });
                                // console.log("SelectedDepartments: ", $scope.departments);
                            });
                            var selectedValue = paylaod.DepartmentValue;
                            //console.log("departmentValue: ", selectedValue);
                            if (selectedValue != undefined)
                                $scope.selectedDepartment = selectedValue;
                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return laodDeffered.promise;
                };
                api.getData = function () {
                    // return data
                    return $scope.selectedDepartment;
                };
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);

                }
                else {
                    console.log("notDirective");
                    console.log("Value of ctrl.onReady:", $scope.onReady);
                    console.log("Type of ctrl.onReady:", typeof $scope.onReady);

                }
            }
        }
        return directiveDefinitionObject;
    }]);

