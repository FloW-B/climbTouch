define(["knockout","plugins/dialog","plugins/router"], function (ko,dialog,router) {
    var
        spot = ko.observable(),

        activate = function (marker) {
            spot(marker);
        },

        close = function () {
            var self = this;
            dialog.close(self);
        },
        addStepClick = function () {

            router.navigate("createStep/"+spot().spotId);
        };

    return {
        spot: spot,
        activate: activate,
        close: close,
        addStepClick: addStepClick
    };
});