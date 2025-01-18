// UniversityService.js

angular.module('myApp').service('UniversityService', ['ModalService', function (ModalService) {

    // Function to open the University editor modal for adding a new University


    this.addUniversity = function (UniversityCount, onUniversityAdded) {
        ModalService.openModal('https://localhost:44322/MyViews/University/UniversityEditorTemplate.html', {
            UniversityCount: UniversityCount
        }, function () { onUniversityAdded(); });
    };

    //Function to open the University editor modal for editing an existing University
    this.editUniversity = function (University, onUniversityUpdated) {
        ModalService.openModal('https://localhost:44322/MyViews/University/UniversityEditorTemplate.html', {
            UniversityId: University.Id,
            UniversityName: University.Name,

        }, function () { onUniversityUpdated(); });
    };
}]);
