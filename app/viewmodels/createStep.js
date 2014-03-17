define(["knockout","plugins/router","models/step","modules/geoloc"],function (ko,router,Step,geolocation) {
    var
        //#region Attributes

        selectedStep = ko.observable(),

        //#endregion

        //#region lifecycle

        activate = function (spotId) {
           
            var step = new Step();
            step.spotId = spotId;

            return geolocation.getCurrentPosition().then(function (position) {

                step.latitude(position.coords.latitude);
                step.longitude(position.coords.longitude);

                selectedStep(step);
            });
        },

        deactivate = function () {

            selectedStep(null);
        },

        //#endregion

        //#region handler

           save = function save(response) {

               var stepJS = ko.toJS(selectedStep);
               delete stepJS.image;
               delete stepJS.__moduleId__;
               stepJson = JSON.stringify(stepJS)

               remoteSave(stepJson)
                   .then(function (savedStep) {
                       alert("Step Saved");
                       //get the fileObject
                       //var file = document.getElementById('upload_file').files[0];
                       //return uploader.uploadFile(file,savedSpot.spotId);
                   })
                   .then(function () { router.navigateBack(); });
                
           },

        //#endregion

        //#region functions
            remoteSave = function (data) {
                return Promise.cast($.ajax({
                    url: "http://climbtouch.com/api/step/",
                    type: "POST",
                    contentType: "application/json",
                    dataType: "text json",
                    data: data,
                }));
            };
        //#endregion

    return {

        selectedStep: selectedStep,
        save: save,
        activate: activate,
        deactivate: deactivate,
    }

});