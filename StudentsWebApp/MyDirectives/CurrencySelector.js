'use strict';
angular.module('myApp').directive('currencySelector', ['$q',
    function ($q) {
        var directiveDefinitionObject = {

            scope: {
                onReady: '=',
                selectedCash: '=',
                onSelectionChanged: '&' // Callback function

            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this;
                var ctor = new Ctor(ctrl, $scope, $attrs);
                ctor.initializeController();
            },
            templateUrl: 'MyDirectives/CurrencySelectorTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };



        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var context;
            
            //console.log("cashSelector: ", $scope.scopeModel.disabled);
            function initializeController() {
                $scope.scopeModel = {};
                $scope.$watch('scopeModel.selectedCash', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                    //console.log("newValue: ", newValue)
                    //console.log("oldValue: ", oldValue)
                        // Invoke the callback function with the new value
                        $scope.onSelectionChanged({ selectedCash: newValue.selectedCurrency });
                    }
                });
                // Watch for changes in the selected currency and update the shared context
               
                defineApi();
            }

            function defineApi() {
                var api = {};

                api.load = function (paylaod)
                {

                    loadItemDirective();

                    function loadItemDirective() {
                        var directiveLoadDeferred = $q.defer();
                        //console.log("cashSelector: ", $scope.scopeModel.disabled);

                        $scope.CashOptions = [];
                        var CashEnum = window.CurrencyEnum;


                        // Populate the options based on the CashEnum
                        for (var Cash in CashEnum) {
                            if (CashEnum.hasOwnProperty(Cash)) {
                                $scope.CashOptions.push({
                                    value: CashEnum[Cash].value,
                                    description: CashEnum[Cash].description
                                });
                            }
                        }
                        if (paylaod.CashValue !== null)
                            $scope.scopeModel.selectedCash = paylaod.CashValue;
                        console.log("Currency: ", $scope.scopeModel.selectedCash);

                        return directiveLoadDeferred.promise;
                    }
                    // return wait all promises
                    return loadDeferred.promise;
                }
                api.getData = function () {
                    var currency = parseInt($scope.scopeModel.selectedCash.selectedCurrency, 10) - 1;
                    console.log("Currency", currency);
                    // Return data
                    return currency;
                };

                api.disabled = function (disabled) {
                    $scope.scopeModel.disabled = disabled;
                };

                // Inside CashSelector directive
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);
                    //console.log("Directive");
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

