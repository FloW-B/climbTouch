define(['knockout','promise'],function(ko,Promise){
    var
        //#region attributes

        geolocation = navigator.geolocation,
        currentLocation = ko.observable(),
        watchId,
        

        //#endregion

        getCurrentPosition = function (options) {

            return new Promise(function (resolve, reject) {
         
                geolocation.getCurrentPosition(resolve, reject, options);
            });
        },

        start = function (options) {
            watchId = geolocation.watchPosition(
                function (position) { currentLocation(position); },
                function (error) { alert(error); },
                options
            );
        },

        stop = function () {
            if (watchId) {
                geolocation.clearWatch(watchId);
                watchId = null;
            }
        };

    return {
        currentLocation: currentLocation,
        getCurrentPosition: getCurrentPosition,
        start: start,
        stop: stop
    };

});