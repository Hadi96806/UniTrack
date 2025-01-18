// UniversityWebApiService.js

'use strict';
UniversityWebApiService.$inject = ['WebApiService', '$rootScope'];
function UniversityWebApiService(WebApiService, $rootScope) {
    function getFilteredUniversitys(filter) {
        // Define the endpoint for your University API
        var endpoint = 'University/GetFilteredUniversitys'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Universitys
        return WebApiService.get(endpoint, { filter: filter });
    }
    function getUniversitiesInfo(filter) {
        // Define the endpoint for your University API
        var endpoint = 'University/GetUniversitiesInfo'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Universitys
        return WebApiService.get(endpoint, { filter: filter });
    }
    function addUniversitys(name) {
        // Define the endpoint for your University API
        var endpoint = 'University/AddUniversity'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Universitys
        return WebApiService.post(endpoint, {name: name })


    }
    function updateUniversitys(university) {
        // Define the endpoint for your University API
        var endpoint = 'University/UpdateUniversity'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Universitys
        return WebApiService.post(endpoint, { id: university.id, name: university.name })
 
    }
    function getEntireItem(id) {
        var endpoint = 'University/GetIntireUni';
        return WebApiService.get(endpoint, { id: id });
    }

    return {
        getFilteredUniversitys: getFilteredUniversitys,
        getUniversitiesInfo: getUniversitiesInfo,
        addUniversitys: addUniversitys,
        updateUniversitys: updateUniversitys,
        getEntireItem: getEntireItem
    };
}
app.service("UniversityWebApiService", UniversityWebApiService);