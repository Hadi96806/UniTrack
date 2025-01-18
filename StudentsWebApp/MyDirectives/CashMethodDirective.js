'use strict';
angular.module('myApp').directive('cashSelector', ['$q',
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
            templateUrl: 'MyDirectives/CashMethodTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };



        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var currencyAPI;
            var itemReadyDeffered = $q.defer();
            var sharedContext;
            function initializeController() {
                $scope.scopeModel = {};
                //$scope.onSelectionChanged = function (selectedCash) {
                //    var dataToLoad = {
                //        CashValue: selectedCash,
                //        disabled: sharedContext.disableCurrencySelector
                //    };
                //    currencyAPI.load(dataToLoad).then(function () {
                //        loadDeffered.resolve();
                //    });
                //}

                $scope.onCurrencyDirectiveReady = function (api) {
                    currencyAPI = api;
                    itemReadyDeffered.resolve();
                };
                defineApi();
            }

            function getContext(originalContext) {
                var newContext;
                if (originalContext != undefined)
                    newContext = originalContext;
                else
                    newContext = {};
                newContext.DisableCurrencySelector = function () {
                    currencyAPI.disabled(true);
                }
                newContext.EnableCurrencySelector = function () {
                    currencyAPI.disabled(false);
                }
            }
            function defineApi() {
                var api = {};

                api.load = function (paylaod) {

                    var loadDeferred = $q.defer();
                 
                    sharedContext = getContext(paylaod.sharedContext);
                   // console.log("sharedContext: ", sharedContext);
                    
                    loadItemDirective();

                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();
                            var Amount = paylaod.Amount;
                        itemReadyDeffered.promise.then(function () {
                            
                                //console.log("sharedContext: ", sharedContext);
                                //var selectedCurrency = sharedContext.selectedCurrency;
                                //var selectedValue = selectedCurrency === null ? paylaod.CashValue : selectedCurrency;
                              //  console.log("Cash selectedCurrency:", selectedCurrency);
                                //console.log(dataToLoad);
                             //   console.log("Cash Method: ", selectedValue);
                                var dataToLoad = {
                                    CashValue: paylaod.sharedContext.currencyObj,//selectedValue,
                                    context: paylaod.sharedContext
                                };
                                currencyAPI.load(dataToLoad).then(function () {
                                    loadDeffered.resolve();
                                });
                         

                        });
                        // Resolve the promise after setting the selected value
                        directiveLoadDeferred.resolve();
                       // $scope.disabled = parentSharedContext.disableCurrencySelector;
                       // console.log("disableCurrencySelector:",disabled);
                        directiveLoadDeferred.promise.then(function () {

                            if (Amount !== undefined)
                                $scope.amount = Amount;

                        });
                        // Return the promise
                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return loadDeferred.promise;
                };

                api.getData = function () {
                    var currency = currencyAPI.getData();
                    //console.log("Currency", currency);
                    
                    // Return data
                    return {
                        $type: 'StudentsWebApp.Payment.CashMethod, StudentsWebApp',
                        Currency: currency,
                        Amount: $scope.amount   
                       
                    };
                };

                // Inside CashSelector directive
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

