'use strict';
angular.module('myApp').directive('paymentMethod', ['$q',
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
            templateUrl: 'MyDirectives/PaymentMethodTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };

        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var cashAPI;
            var bankAPI;
            var sharedContext
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};
                $scope.onCashDirectiveReady = function (api) {
                    cashAPI = api;
                    itemReadyDeffered.resolve();
                };
                
                $scope.onBankDirectiveReady = function (api) {
                    bankAPI = api;
                    itemReadyDeffered.resolve();
                };
              
                $scope.$watch('selectedPayment', function (newVal, oldVal) {
                    if (newVal !== oldVal && oldVal !== undefined) {
                        $scope.selectedPayment = newVal;
                        itemReadyDeffered.promise.then(function () {

                            if ($scope.selectedPayment === 'CashMethod') {

                                var dataToLoad = {
                                    sharedContext: sharedContext
                                };
                                cashAPI.load(dataToLoad).then(function () {
                                    loadDeffered.resolve();
                                });
                                
                            }
                        });
                    }
                });
                
                defineApi();
            }
            function defineApi() {
                var api = {};
                api.load = function (payload) {

                    var datal = payload.datal;
                    sharedContext = payload.sharedContext;
                    //extract from payload
                    loadItemDirective();

                    function loadItemDirective() {
                        if (datal != undefined) {
                           // console.log(datal);
                            var selectedVal = datal["$type"];
                            let parts = selectedVal.split(', ');
                            //console.log("parts:", parts);

                            let FirstPart = parts[0];
                            //console.log("FirstPart:", FirstPart);

                            let typeSubstring = FirstPart.split('.')[2];
                            //console.log("typeSubstring:", typeSubstring);
                            $scope.selectedPayment = typeSubstring;
                        }
                       
                        var loadDeffered = $q.defer();
                      
                        itemReadyDeffered.promise.then(function () {
                           
                                var amount = datal !== undefined ? datal["Amount"] : null
                            if ($scope.selectedPayment === 'CashMethod') {
                                var dataToLoad = {

                                    CashValue: { currencyObj: payload.sharedContext.currencyObj },
                                    Amount: amount,
                                    sharedContext: payload.sharedContext
                                };
                                //console.log(dataToLoad);
                                cashAPI.load(dataToLoad).then(function () {
                                    loadDeffered.resolve();
                                });
                            } else if ($scope.selectedPayment === 'BankMethod') {
                                var bankName = datal !== undefined ? datal["BankName"] : null
                                var dataToLoad = {
                                    BankName: bankName,
                                    Amount: amount
                                };
                                //console.log(dataToLoad);
                                bankAPI.load(dataToLoad).then(function () {
                                    loadDeffered.resolve();
                                });
                            }
                        });
                                    
                          
                        return loadDeffered.promise;
                    }
                    // return wait all promises
                    return itemReadyDeffered.promise;
                };
                api.getData = function () {
                    // return data
                    var PaymentDescription = $scope.selectedPayment === 'CashMethod' ? cashAPI.getData() : bankAPI.getData();
                    //console.log(PaymentDescription);
                    return PaymentDescription;
                };
             

                // Modify the onReady function to pass the event listeners
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);
                } else {
                    console.log("notDirective");
                    console.log("Val of ctrl.onReady:", $scope.onReady);
                    console.log("Type of ctrl.onReady:", typeof $scope.onReady);
                }

            }
        }
        return directiveDefinitionObject;
    }]);

