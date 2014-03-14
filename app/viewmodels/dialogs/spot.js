define(["knockout"], function (ko) {
    var
        spot = ko.observable(),

        activate = function (marker) {
            spot(marker);
        };

    return {
        spot: spot,
        activate: activate
    };
});