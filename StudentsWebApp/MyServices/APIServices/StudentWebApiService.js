// StudentWebApiService.js

'use strict';
StudentWebApiService.$inject = ['WebApiService', '$rootScope'];
function StudentWebApiService(WebApiService,$rootScope) {
    function getFilteredStudents(filter) {
        // Define the endpoint for your student API
        var endpoint = 'Student/GetFilteredStudents'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered students
        return WebApiService.get(endpoint, { filter: filter });
    }
    function addStudents(student) {
        // Define the endpoint for your student API
        var endpoint = 'Student/AddStudent'; // Replace with your API endpoint

        // Use the WebApiService to make a GET request to retrieve filtered students
        return WebApiService.post(endpoint, student );

    }
    function updateStudents(student) {
        // Define the endpoint for your student API
        var endpoint = 'Student/UpdateStudent'; // Replace with your API endpoint
       /* var paymentMethodJson = JSON.stringify(student.PaymentMethod);*/
       
        // Use the WebApiService to make a GET request to retrieve filtered students
        return WebApiService.post(endpoint, student);
    }
    function getEntireItem(id) {
        var endpoint = 'Student/GetIntireStudent';
        return WebApiService.get(endpoint, { id: id });
    }
    return {
        getFilteredStudents: getFilteredStudents,
        addStudents: addStudents,
        updateStudents: updateStudents,
        getEntireItem: getEntireItem
    };
}
app.service("StudentWebApiService", StudentWebApiService);