define(["knockout","durandal/app","plugins/dialog","plugins/router"], function (ko,app,dialog,router) {
    var
        spot = ko.observable(),

        activate = function (marker) {
            spot(marker);
        },

        close = function () {

            var self = this;
            dialog.close(self, 1);
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