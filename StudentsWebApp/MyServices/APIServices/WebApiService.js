'use strict'
WebApiService.$inject = ['$http'];
function WebApiService($http) {
    var baseUrl = 'https://localhost:44322/api/';
    this.get = function (endpoint, parameters) {
        // Build the full URL by concatenating the base URL and endpoint
        var url = baseUrl + endpoint;
        //console.log('API URL:', url);
        // Send an HTTP GET request
        return $http({
            method: 'GET',
            url: url,
            params: parameters
        })

            .then(function (response) {
                //console.log('API Response:', response.data);
                //console.log('parameters: ', parameters);
                return response.data;
            })
            .catch(function (error) {
               console.error('API Error:', error);
                throw error; // Rethrow the error to be caught in the controller
            });
    };

    this.post = function (endpoint, parameters) {
        // Build the full URL by concatenating the base URL and endpoint
        var url = baseUrl + endpoint;
       // console.log('API URL:', url);
        // Send an HTTP POST request with parameters
        return $http({
            method: 'POST',
            url: url,
            data: parameters
        })
            .then(function (response) {
                console.log('parameters: ', parameters);
                console.log('API Response:', response.data);
                return response.data;
            })
            .catch(function (error) {
                console.error('API Error:', error);
                throw error.data || error.statusText;
            });
    };
 
}
app.service("WebApiService", WebApiService);



