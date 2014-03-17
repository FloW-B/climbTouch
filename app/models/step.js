define(["knockout"], function (ko) {

    function Step() {

        this.stepId = ko.observable();
        this.spotId = ko.observable();
        this.name = ko.observable();
        this.arrangement = ko.observable();
        this.latitude = ko.observable();
        this.longitude = ko.observable();
        
        this.image = ko.computed(function () {
            return 'http://climbtouch.com/sites/steps' + this.stepId() + '.jpg';
        }, this);
    }

    return Step;
});