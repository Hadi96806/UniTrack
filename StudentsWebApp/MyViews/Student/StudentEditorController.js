// StudentEditorController.js
"use strict";
StudentEditorController.$inject = ['$scope', 'StudentWebApiService', '$q'];
function StudentEditorController($scope, StudentWebApiService, $q) {


    $scope.isEditMode = Boolean($scope.parameters && $scope.parameters.studentId);
    var itemID;
    var UniID;
    var DepID;
    var student;
    var studentPromise;
    var UniAPI;
    var DepAPI;
    var PaymentAPI;
    var GenderAPI;
    var FinancialAidAPI;
    var GenderReadyDeffered = $q.defer();
    var UniReadyDeffered = $q.defer();
    var DepReadyDeffered = $q.defer();
    var PaymentReadyDeffered = $q.defer();
    var FinancialAidReadyDeffered = $q.defer();
    var count = 0;
    defineScope();
    loadParameters();
    load();
    // Set initial values for input fields
    $scope.parameters.studentName = $scope.isEditMode ? $scope.parameters.studentName : '';

    function loadParameters() {
        // Get parameters from $scope
        if ($scope.isEditMode) {
            itemID = $scope.parameters.studentId; // Assuming studentId is the correct property name

        }

    }


    function defineScope() {
        //define all needed data/function on scope

        $scope.scopeModel = {};
        $scope.scopeModel.onUniversitySelectorReady = function (api) {
            //  console.log("onItemDirectiveReady");
            UniAPI = api;
            UniReadyDeffered.resolve();
        };
        $scope.scopeModel.onGenderSelectorReady = function (api) {
            //  console.log("onItemDirectiveReady");
            GenderAPI = api;
            GenderReadyDeffered.resolve();
        };
        $scope.scopeModel.onDepartmentSelectorReady = function (api) {
            //  console.log("onItemDirectiveReady");
            DepAPI = api;
            DepReadyDeffered.resolve();
        };
        $scope.scopeModel.onPaymentMethodSelectorReady = function (api) {
            //  console.log("onItemDirectiveReady");
            PaymentAPI = api;
            PaymentReadyDeffered.resolve();
        };
        $scope.scopeModel.onFinancialAidSelectorReady = function (api) {
            //  console.log("onItemDirectiveReady");
            FinancialAidAPI = api;
            FinancialAidReadyDeffered.resolve();
        };
        $scope.scopeModel.save = function () {
            var Gender = GenderAPI.getData() /*== 1 ? "Male" : "Female"*/;
            UniID = UniAPI.getData();
            DepID = DepAPI.getData();
            //console.log(DepID);
            var paymentDESC = PaymentAPI.getData();
            var FinancialAidDESC = FinancialAidAPI.getData();
            // console.log("Payment desc: ", paymentDESC);
            // console.log("FinancialAid desc: ", FinancialAidDESC);
            var updatedstudent = {
                $type: "StudentsWebApp.Entity.Student, StudentsWebApp",
                id: itemID, name: $scope.parameters.studentName, gender: Gender, DepartmentID: DepID, UniID: UniID, PaymentMethod: paymentDESC, FinancialAid: FinancialAidDESC
            }
            console.log(updatedstudent);
            if ($scope.isEditMode) {
                //console.log(itemID);
                StudentWebApiService.updateStudents(updatedstudent).then(function () {
                    $scope.close();
                })
            } else {

                StudentWebApiService.addStudents(updatedstudent).then(function () {
                    $scope.close();
                })
            }
            // Close the modal when done
            $scope.close();
        };
        $scope.onSelectionChanged = function (selectedUniversity) {
            //console.log("Selected University Changed: ", selectedUniversity);
            var dataToLoad_2 = {
                DepartmentValue: undefined
            };
            if (count > 0 || !$scope.isEditMode)
                DepAPI.load(dataToLoad_2, selectedUniversity).then(function () {
                    loadDeffered.resolve();
                });
            count += 1;
        };
        $scope.waitMultiplePromises = function (Promises) {
            var loadDeffered = $q.defer();
            var resolved = 0;
            var rejected = 0;

            Promises.forEach((promise) => {
                promise
                    .then(() => {
                        resolved++
                        if (resolved === Promises.length) {
                            loadDeffered.resolve("All Promises resolved")
                        }
                    })
                    .catch(() => {
                        rejected++
                        if (rejected > 0) {
                            loadDeffered.reject("One promise is rejected")
                        }
                    })

            })
            return loadDeffered.promise
        }


    }
    function load() {
        //load all directives and make all web calls
        // synchronize all dependent calls using promises
        function loadAllControls() {
            if ($scope.isEditMode) {
                studentPromise = getEntireItem();
            } else {
                // Create a deferred object and immediately resolve it
                var deferred = $q.defer();
                deferred.resolve({});
                studentPromise = deferred.promise;
            }
            studentPromise.then(function (result) {
                student = result;
                console.log(student);
                loadItemDirective();
            });

        }

        function getEntireItem() {

            return StudentWebApiService.getEntireItem(itemID);

        }

        function loadItemDirective() {

            // console.log("loadItemDirective");

            var genderDeffered = GenderSelector();
            var uniDeffered = UniSelector();
            var paymentDeffered = paymentSelector();
            var financialAidDeffered = paymentDeffered.then(financialAidSelector());
            var promises = [genderDeffered, uniDeffered, paymentDeffered, financialAidDeffered];
            if ($scope.isEditMode) {
                var depDeffered = DepSelector();
                promises.push(depDeffered);
            }
            var sharedContext = {
                currencyObj: {
                    selectedCurrency: null
                },
                disableCurrencySelector: false,
                setCurrency: function (currency) {
                    setCurrency(currency)
                   // paymentSelector()
                },
                //DisableCurrencySelector: function () {
                //    disableCurrencySelector()
                //   // paymentSelector()
                //},
                //EnableCurrencySelector: function () {
                //    enableCurrencySelector()
                //    //paymentSelector()
                //}

            };
            function setCurrency(currency) {
                sharedContext.currencyObj.selectedCurrency = currency
            }
            if ($scope.isEditMode) {
                if (student.PaymentMethod["Currency"] !== undefined || student.FinancialAid["AidType"].CurrencyId !== undefined) {
                    console.log("CurrencyId; ", student.FinancialAid["AidType"].CurrencyId)
                    sharedContext.currencyObj.selectedCurrency = student.PaymentMethod["Currency"] ? student.PaymentMethod["Currency"] + 1 : student.FinancialAid["AidType"].CurrencyId + 1
                }
            }

            //function disableCurrencySelector() {
            //    sharedContext.disableCurrencySelector = true
            //}
            //function enableCurrencySelector() {
            //    sharedContext.disableCurrencySelector = false
            //}
            //GenderSelector:
            function GenderSelector() {
                var p = $q.defer()
                GenderReadyDeffered.promise.then(function () {
                    var Gender = Object.keys(student).length !== 0 ? student.Gender.toString() : undefined;

                    var dataToLoad = {
                        GenderValue: Gender
                    }
                    GenderAPI.load(dataToLoad).then(function () {
                        p.resolve();
                    });
                });
                return p.promise;
            }
            //UniversitySelector:
            function UniSelector() {
                var p = $q.defer()
                UniReadyDeffered.promise.then(function () {

                    var dataToLoad_1 = {
                        UniversityValue: Object.keys(student).length !== 0 ? student.UniID : undefined
                    };
                    UniAPI.load(dataToLoad_1).then(function () {
                        p.resolve();
                    });
                });
                return p.promise;
            }
            //DepartmentSelector:
            function DepSelector() {
                var p = $q.defer()
                DepReadyDeffered.promise.then(function () {

                    var dataToLoad_2 = {
                        DepartmentValue: Object.keys(student).length !== 0 ? student.DepartmentID : undefined
                    };

                    DepAPI.load(dataToLoad_2, student.UniID).then(function () {
                        p.resolve();
                    });
                });
                return p.promise;
            }
            //PaymentSelector
            function paymentSelector() {

                var p = $q.defer()
                PaymentReadyDeffered.promise.then(function () {

                    var dataToLoad_3 = {
                        datal: Object.keys(student).length !== 0 ? student.PaymentMethod : undefined,
                        sharedContext: sharedContext
                    };

                    PaymentAPI.load(dataToLoad_3).then(function () {
                        p.resolve();
                    });
                });
                return p.promise;
            }
            //FinancialAidSelector
            function financialAidSelector() {
                var p = $q.defer()
                FinancialAidReadyDeffered.promise.then(function () {

                    var dataToLoad_3 = {
                        datal: Object.keys(student).length !== 0 ? student.FinancialAid["AidType"] : undefined,
                        FinancierName: Object.keys(student).length !== 0 ? student.FinancialAid["FinancierName"] : undefined,
                        sharedContext: sharedContext

                    };

                    FinancialAidAPI.load(dataToLoad_3).then(function () {
                        p.resolve();
                    });
                });
                return p.promise;
            }


            $scope.waitMultiplePromises(promises);


        }
        loadAllControls();


    }
}
angular.module('myApp').controller('StudentEditorController', StudentEditorController);
