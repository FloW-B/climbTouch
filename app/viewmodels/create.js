define(["jquery", "knockout", "promise", "durandal/app", "plugins/router", "models/spot", "modules/uploader","modules/geoloc"], function ($, ko, Promise, app, router, Spot, uploader, geolocation) {
    var
        // Properties
        selectedSpot = ko.observable(),

        // Handlers

        save = function save(response) {

            var spotJS = ko.toJS(selectedSpot);
            delete spotJS.image;
            delete spotJS.__moduleId__;
            spotJson = JSON.stringify(spotJS)

            remoteSave(spotJson)
                .then(function (savedSpot) {

                    //get the fileObject
                    var file = document.getElementById('upload_file').files[0];
                    return uploader.uploadFile(file,savedSpot.spotId,"spot");
                })
                .then(function () { router.navigateBack(); });
        },

        // Lifecycle

        activate = function () {

            var spot = new Spot();

            return geolocation.getCurrentPosition().then(function (position) {

                spot.latitude(position.coords.latitude);
                spot.longitude(position.coords.longitude);
                
                selectedSpot(spot);
            });
        },

        deactivate = function () {

            selectedSpot(null);
        },

        //Method

        remoteSave = function (data) {
            return Promise.cast($.ajax({
                url: "http://climbtouch.com/api/spot/",
                type: "POST",
                contentType: "application/json",
                dataType: "text json",
                data: data,
            }));
        };

    return {

        selectedSpot: selectedSpot,
        save: save,
        activate: activate,
        deactivate: deactivate,
    };
});
