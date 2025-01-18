// DepartmentService.js

angular.module('myApp').service('DepartmentService', ['ModalService', function (ModalService) {

    // Function to open the Department editor modal for adding a new Department


    this.addDepartment = function (DepartmentCount, onDepartmentAdded) {
        ModalService.openModal('https://localhost:44322/MyViews/Department/DepartmentEditorTemplate.html', {
            DepartmentCount: DepartmentCount
        }, function () { onDepartmentAdded(); });
    };

    //Function to open the Department editor modal for editing an existing Department
    this.editDepartment = function (DepartmentDetails, onDepartmentUpdated) {
        ModalService.openModal('https://localhost:44322/MyViews/Department/DepartmentEditorTemplate.html', {
            DepartmentId: DepartmentDetails.Id,
            DepartmentName: DepartmentDetails.Name,
            UniversityName: DepartmentDetails.UniversityName
        }, function () { onDepartmentUpdated(); });
    };
}]);
