'use strict';
angular.module('myApp').directive('genderSelector', ['$q',
    function ($q) {
        var directiveDefinitionObject = {

            scope: {
                onReady: '=',
            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: 'MyDirectives/GenderSelectorTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };



        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var itemAPI;
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};
                $scope.onGenderSelectorReady = function (api) {
                   // console.log(api);
                    itemAPI = api;
                    itemReadyDeffered.resolve();
                };
                defineApi();
            }
            function defineApi() {
                var api = {};

                api.load = function (paylaod) {

                    var loadDeferred = $q.defer();
                    loadItemDirective();

                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();
                        // load directive and resolve laodDeffered
                        // Access the GenderEnum constant
                        $scope.genderOptions = [];
                        var GenderEnum = window.GenderEnum;
                       // console.log(GenderEnum);
                        var selectedValue = paylaod.GenderValue;
                        //console.log(GenderEnum);

                        // Populate the options based on the GenderEnum
                        for (var gender in GenderEnum) {
                            if (GenderEnum.hasOwnProperty(gender)) {
                                $scope.genderOptions.push({
                                    value: GenderEnum[gender].value,
                                    description: GenderEnum[gender].description
                                });
                            }
                        }

                        // Resolve the promise after setting the selected value
                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {
                            //$scope.selectedGender = '1'; 
                            $scope.selectedGender = selectedValue;
                            // console.log($scope.selectedGender);
                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return loadDeferred.promise;
                };
                api.getData = function () {
                    // return data
                    return $scope.selectedGender;
                };
                // Inside genderSelector directive
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

