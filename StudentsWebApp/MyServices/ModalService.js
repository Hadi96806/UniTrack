// ModalService.js
angular.module('myApp').service('ModalService', ['$modal', '$rootScope', '$q', function ($modal, $rootScope,$q) {
    this.openModal = function (htmlUrl, parameters,callback) {
        var deferred = $q.defer();
        var newScope = $rootScope.$new();
        newScope.parameters = parameters
        
        newScope.close = function (result) {
            // Close the modal when done
            modalInstance.close();
            newScope.$destroy();
            callback();
        }
        modalInstance = $modal.open({
            templateUrl: htmlUrl ,
            scope: newScope,
        });
        modalInstance.result.then(
            function (result) {
                // Resolve the promise with the result
                deferred.resolve(result);
            },
            function () {
                // Modal dismissed
                // Reject the promise
                deferred.reject();
            }
        );

        // Return the promise
        return deferred.promise;
    };
}]);

