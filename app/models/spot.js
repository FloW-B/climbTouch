define(["knockout"], function (ko) {

    function Spot() {

        this.spotId = ko.observable();
        this.name = ko.observable();
        this.latitude = ko.observable();
        this.longitude = ko.observable();
        this.ville = ko.observable();

        this.image = ko.computed(function () {
            return 'http://climbtouch.com/sites/' + this.spotId() + '.jpg';
        }, this);
    }

    return Spot;
});