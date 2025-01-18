// DepartmentWebApiService.js

'use strict';
DepartmentWebApiService.$inject = ['WebApiService', '$rootScope'];
function DepartmentWebApiService(WebApiService, $rootScope) {
    function getFilteredDepartments(filter) {
        // Define the endpoint for your Department API
        var endpoint = 'Department/GetFilteredDepartments'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Departments
        return WebApiService.get(endpoint, { filter: filter });
    }
    function getDepartments(filter) {
        // Define the endpoint for your Department API
        var endpoint = 'Department/GetDepartments'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Departments
        return WebApiService.get(endpoint, { filter: filter });
    }
    function addDepartments( id,name, UniversityID) {
        // Define the endpoint for your Department API
        var endpoint = 'Department/AddDepartment'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Departments
        return WebApiService.post(endpoint, { id: id, name: name, UniversityID: UniversityID });

    }
    function updateDepartments(id, name, UniversityID) {
        // Define the endpoint for your Department API
        var endpoint = 'Department/UpdateDepartment'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered Departments
        return WebApiService.post(endpoint, { id: id, name: name, UniversityID: UniversityID });
    }
    function getEntireItem(id) {
        var endpoint = 'Department/GetIntireDepartment';
        return WebApiService.get(endpoint, { id: id });
    }
    return {
        getFilteredDepartments: getFilteredDepartments,
        getDepartments: getDepartments,
        addDepartments: addDepartments,
        updateDepartments: updateDepartments,
        getEntireItem: getEntireItem
    };
}
app.service("DepartmentWebApiService", DepartmentWebApiService);