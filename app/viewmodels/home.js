define(["jquery","knockout", "durandal/app", "durandal/system", "plugins/router","modules/geoloc","koutils/underscore","modules/ui/map"], function ($,ko, app, system, router,geoloc) {
    var
        // Public Properties

        isLoading = ko.observable(false),
        sites = ko.observableArray(),
        gViewVisibility = ko.observable(false),
        currentSpot = null,
        markers = sites._map(function (site) {
            return {
                spotId: site.spotId,
                title: site.name,
                latitude: site.latitude,
                longitude: site.longitude,
                ville: site.ville,
                icon: 'http://climbtouch.com/sites/' + site.spotId + '.jpg',
                click: onMarkerClick
            };
        }),
        markersVisible = ko.observableArray(),

        markersStep = ko.observableArray(),
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

        // Event Handlers
        clearStep = function () {

            if (currentSpot != null) {
                
                gViewVisibility(false);
                markersStep([]);
            } else {

                throw "Error: currentSpot is not defined";
            }
        },

        onMarkerClick = function (marker) {
            gViewVisibility(true);
            $.get("http://climbtouch.com/api/step/filter/" + marker.spotId).then(function (response) {

                markersStep(response);
                currentSpot = marker.spotId;
            });
            
            app.showDialog("viewmodels/dialogs/spot",marker);
        },

        addSpotClick = function addSpotClick() {
            router.navigate("create");
        },

        // Lifecycle Methods
        activate = function activate() {
            isLoading(true);

            $.get("http://climbtouch.com/api/spot/").then(function (response) {
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
        gViewVisibility: gViewVisibility,
        sites: sites,
        center: center,
        markers: markers,
        markersVisible: markersVisible,
        markersStep: markersStep,

        clearStep: clearStep,
        addSpotClick: addSpotClick,

        activate: activate,
        deactivate: deactivate
    };

});
