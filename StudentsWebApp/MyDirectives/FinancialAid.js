'use strict';
angular.module('myApp').directive('financialAid', ['$q',
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
            templateUrl: 'MyDirectives/FinancialAidTemplate.html'
            //read About: restrict,controllerAs, bindToController, compile, templateUlrl. Then make needed changes on this object  
        };

        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController;
            var PercentageAPI;
            var FixedAmountAPI;
            var sharedContext
            var itemReadyDeffered = $q.defer();

            function initializeController() {
                $scope.scopeModel = {};
                $scope.onPercentageDirectiveReady = function (api) {
                    PercentageAPI = api;
                    itemReadyDeffered.resolve();
                };
                
                $scope.onFixedAmountDirectiveReady = function (api) {
                    FixedAmountAPI = api;
                    itemReadyDeffered.resolve();
                };
           
              
                $scope.$watch('selectedAid', function (newValue, oldValue) {
                    if (newValue !== oldValue && oldValue !== undefined) {
                        console.log("newValue: ",newValue)
                        $scope.selectedAid = newValue;            
                            itemReadyDeffered.promise.then(function () {
                                //console.log("sharedContext: ",sharedContext);
                                if ($scope.selectedAid === 'FixedAmount') {

                                    var dataToLoad = {
                                        sharedContext: sharedContext
                                    };
                                    //console.log("Financial $watch:", count);
                                    FixedAmountAPI.load(dataToLoad).then(function () {
                                        loadDeffered.resolve();
                                    });

                                }
                                else {
                                    console.log("enabled: ")
                                    sharedContext.EnableCurrencySelector();

                                }
                            });

                    }
                });
                
                defineApi();
            }
            function defineApi() {
                var api = {};
                api.load = function (paylaod) {
                    var promises = [];
                    //add all laod promises to this array

                    var datal = paylaod.datal;
                    sharedContext = paylaod.sharedContext;
                    //extract from paylaod
                    loadItemDirective();

                    function loadItemDirective() {
                        if (datal != undefined) {
                           // console.log(datal);
                            var selectedValue = datal["$type"];
                            let parts = selectedValue.split(', ');
                           // console.log("parts:", parts);

                            let FirstPart = parts[0];
                           // console.log("FirstPart:", FirstPart);

                            let typeSubstring = FirstPart.split('.')[2];
                            //console.log("typeSubstring:", typeSubstring);
                            $scope.selectedAid = typeSubstring;
                        }
                       
                        var loadDeffered = $q.defer();
                        var FinancierName = paylaod.FinancierName;
                        $scope.financierName = FinancierName;
                      
                        itemReadyDeffered.promise.then(function () {
                            
                            if ($scope.selectedAid === 'FixedAmount') {
                                var amount = datal !== undefined ? datal["AidValue"] : null
                                var dataToLoad = {
                                    CashValue: paylaod.sharedContext.currencyObj,//datal["CurrencyId"] + 1,                                   
                                    Amount: amount,
                                    sharedContext: paylaod.sharedContext
                                };
                                //console.log(dataToLoad);
                                FixedAmountAPI.load(dataToLoad).then(function () {
                                    loadDeffered.resolve();
                                });
                            }
                            else if ($scope.selectedAid === 'Percentage') {
                                var percentageValue = datal !== undefined ? datal["PercentageValue"] : null
                                var dataToLoad = {
                                    PercentageValue: percentageValue
                                };
                                //console.log(dataToLoad);
                                PercentageAPI.load(dataToLoad).then(function () {
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
                    var PaymentDescription = $scope.selectedAid === 'Percentage' ? PercentageAPI.getData() : FixedAmountAPI.getData();
                    //console.log(PaymentDescription);
                    return {
                        $type: 'StudentsWebApp.Financial.FinancialAid, StudentsWebApp',
                        FinancierName: $scope.financierName,
                        AidType: PaymentDescription
                    };
                };
             

                // Modify the onReady function to pass the event listeners
                if ($scope.onReady != null && typeof ($scope.onReady) == 'function') {
                    $scope.onReady(api);
                } else {
                    console.log("notDirective");
                    console.log("Value of ctrl.onReady:", $scope.onReady);
                    console.log("Type of ctrl.onReady:", typeof $scope.onReady);
                }

            }
        }
        return directiveDefinitionObject;
    }]);

