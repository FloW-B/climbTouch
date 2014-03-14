define(["jquery","knockout", "durandal/app", "durandal/system", "plugins/router","modules/geoloc","koutils/underscore","modules/ui/map"], function ($,ko, app, system, router,geoloc) {
    var
        // Public Properties

        isLoading = ko.observable(false),
        sites = ko.observableArray(),
        markers = sites._map(function (site) {
            return {
                spotId: site.spotId,
                title: site.name,
                latitude: site.latitude,
                longitude: site.longitude,
                icon: 'http://climbtouch.com/sites/' + site.spotId + '.jpg',
                click: onMarkerClick
            };
        }),
        center = ko.computed(function () {
            var location = geoloc.currentLocation();
            if (location) {
                return { latitude: location.coords.latitude, longitude: location.coords.longitude };
            }
            return { latitude: 0, longitude: 0 };
        }),

        // Private Properties
        messageTitle = "Application Message",
        message = "Hello from your application",
        url = "http://climbtouch.com/api/spot/",

        // Event Handlers

        onMarkerClick = function (marker) {
            app.showDialog("viewmodels/dialogs/spot",marker);
        },

        addSpotClick = function addSpotClick() {
            router.navigate("create");
        },

        // Lifecycle Methods
        activate = function activate() {
            isLoading(true);

            $.get(url).then(function (response) {
                sites(response);
                geoloc.start();
                isLoading(false);
            });
        },

        deactivate = function deactivate() {

            geoloc.stop();
        };

    

    return {
        
        isLoading: isLoading,
        sites: sites,
        center: center,
        markers: markers,

        addSpotClick: addSpotClick,

        activate: activate,
        deactivate: deactivate
    };

});
