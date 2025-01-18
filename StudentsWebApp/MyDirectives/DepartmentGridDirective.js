'use strict';
angular.module('myApp').directive('departmentGrid', ['$q', '$location', 'DepartmentWebApiService','DepartmentService',
    function ($q, $location, DepartmentWebApiService, DepartmentService) {
        var directiveDefinitionObject = {
            scope: {
                onReady: '=',
            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: $location.protocol() + '://' + $location.host() + ':' + '44322' + '/MyDirectives/DepartmentGridTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };
        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var itemAPI;
            var itemReadyDeffered = $q.defer();
            var loadItemDirective;
            function initializeController() {
                $scope.scopeModel = {};
                $scope.scopeModel.onItemDirectiveReady = function (api) {
                    itemAPI = api;
                    itemReadyDeffered.resolve();
                };
                $scope.scopeModel.editDepartment = function (Department) {
                    // Pass the Department and callback function to refresh the grid after updating a Department
                     //console.log(Department);
                    DepartmentService.editDepartment(Department, function () {

                    });
                };
                defineApi();
            }
            function defineApi() {
                var api = {};
                api.load = function (UniID) {
                    var promises = [];
                    //add all laod promises to this array

                    //extract from paylaod
                    loadItemDirective();

                    var laodDeffered = $q.defer();
                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();

                        //var departments = paylaod.datal;
                      //  console.log("UNiID: ", UniID);
                        //DepartmentSelector:

                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {
                            var Departments = DepartmentWebApiService.getDepartments('');
                            Departments.then(function (result) {
                       
                                // Filter departments based on UniversityId
                                //console.log(result);
                                $scope.departments = UniID == undefined ? result: result.filter(function (department) {
                                    return department.UniversityId === UniID;
                                });
                             //   console.log($scope.departments);
                                // console.log("SelectedDepartments: ", $scope.departments);
                            });
                        
                        
                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return laodDeffered.promise;
                };
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);
                   // console.log("Directive");
                }
                else {
                    console.log("notDirective");
                    console.log("Value of $scope.onReady:", $scope.onReady);
                    console.log("Type of $scope.onReady:", typeof $scope.onReady);

                }
            }
        }
        return directiveDefinitionObject;
    }]);

