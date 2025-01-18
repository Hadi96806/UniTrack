'use strict';
angular.module('myApp').directive('bankSelector', ['$q',
    function ($q) {
        var directiveDefinitionObject = {

            scope: {
                onReady: '='

            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: 'MyDirectives/BankMethodTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };



        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var itemAPI;
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};
                $scope.onItemDirectiveReady = function (api) {
                    console.log(api);
                    itemAPI = api;
                    itemReadyDeffered.resolve();
                };
                defineApi();
            }
            function defineApi() {
                var api = {};

                api.load = function (paylaod) {
                    var promises = [];
                    //add all laod promises to this array
                    var loadDeferred = $q.defer();
                    loadItemDirective();

                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();

                        // Resolve the promise after setting the selected value
                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {
                            var selectedBank = paylaod.BankName;
                            var Amount = paylaod.Amount;
                            if (selectedBank!= undefined)
                                $scope.bankName = selectedBank;
                            if (Amount != undefined)
                                $scope.amount = Amount;
                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return loadDeferred.promise;
                };

                api.getData = function () {

                    // Return data
                    return {
                        $type: 'StudentsWebApp.Payment.BankMethod, StudentsWebApp',
                        BankName:$scope.bankName,
                        Amount:$scope.amount
                    };
                };
                // Inside genderSelector directive
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);
                    console.log("Directive");
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

