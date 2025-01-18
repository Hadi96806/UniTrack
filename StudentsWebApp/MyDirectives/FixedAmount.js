'use strict';
angular.module('myApp').directive('fixedAmount', ['$q',
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
            templateUrl: 'MyDirectives/FixedAmountTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };



        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var currencyAPI;
            var itemReadyDeffered = $q.defer();
            //  var parentSharedContext = $scope.$parent.sharedContext;
            // $scope.sharedContext = parentSharedContext;
            var sharedContext;
            function initializeController() {
                $scope.scopeModel = {};
                $scope.onSelectionChanged = function (selectedCash) {
                    console.log("selectedCash: ", selectedCash)
                    sharedContext.DisableCurrencySelector();
                    sharedContext.setCurrency(selectedCash);
                }
                $scope.onCurrencyDirectiveReady = function (api) {
                    //console.log(api);
                    currencyAPI = api;
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
                    sharedContext = paylaod.sharedContext;
                    console.log("SharedContext: ", sharedContext)
                    
                    
                    loadItemDirective();
                    
                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();
                        //if (paylaod.CashValue !== undefined)
                        //    var selectedValue = paylaod.CashValue;
                        if (paylaod.Amount !== undefined)
                            var Amount = paylaod.Amount;
                        //console.log("CurrencyID",selectedValue);
                        //console.log("Amount: ", Amount);


                        itemReadyDeffered.promise.then(function () {
                            //var selectedCurrency = sharedContext.selectedCurrency;
                            //var selectedValue = selectedCurrency === null ? paylaod.CashValue : selectedCurrency;
                            var dataToLoad = {
                                CashValue: paylaod.sharedContext.currencyObj,
                                disabled: false

                            };
                            //console.log(dataToLoad);
                            currencyAPI.load(dataToLoad).then(function () {
                                loadDeffered.resolve();
                            });
                        });
                        // Resolve the promise after setting the selected value
                        directiveLoadDeferred.resolve();
                        directiveLoadDeferred.promise.then(function () {

                            if (Amount !== undefined)
                                $scope.aidValue = Amount;

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
                        $type: 'StudentsWebApp.Financial.FixedAmount, StudentsWebApp',
                        CurrencyId: currency,
                        AidValue: $scope.aidValue

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

