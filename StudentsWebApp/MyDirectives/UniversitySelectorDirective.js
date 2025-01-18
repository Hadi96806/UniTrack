'use strict';
angular.module('myApp').directive('universitySelector', ['$q', '$location', 'UniversityWebApiService',
    function ($q, $location, UniversityWebApiService) {
        var directiveDefinitionObject = {
            scope: {
                onReady: '=',
                selectedUniversity: '=',
                onSelectionChanged: '&' // Callback function
            },
            controller: function ($scope, $element, $attrs, $location) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: $location.protocol() + '://' + $location.host() + ':' + '44322' + '/MyDirectives/UniversitySelectorTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };
        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var itemAPI;
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};
                // Watch for changes in selectedUniversity and invoke the callback
                $scope.$watch('selectedUniversity', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        // Invoke the callback function with the new value
                        $scope.onSelectionChanged({ selectedUniversity: newValue });
                    }
                });

                defineApi();
            }
            function defineApi() {
                var api = {};
                api.load = function (paylaod) {
                    var promises = [];
                    //add all laod promises to this array
                    var editMode = paylaod.editMode

                    //extract from paylaod
                    loadItemDirective();

                    var laodDeffered = $q.defer();
                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();

                        var Universities = UniversityWebApiService.getUniversitiesInfo('');
                        Universities.then(function (result) {
                            // Access the array inside the result object
                            $scope.universities = result;
                        })


                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {
                            var selectedValue = paylaod.UniversityValue;
                            $scope.selectedUniversity = selectedValue;
                            $scope.editMode = editMode;
                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return laodDeffered.promise;
                };
                api.getData = function () {
                    // return data
                    return $scope.selectedUniversity;
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

