define(['knockout', 'underscore'], function (ko, _) {

    ko.bindingHandlers.map = {

        init: function (element, valueAccessor, AllBindings, viewModel, bindingContext) {

            var
                gmap = google.maps,

                value = ko.unwrap(valueAccessor()),
                zoom = ko.unwrap(value.zoom),
                center = ko.unwrap(value.center),
                options = {
                    center: new gmap.LatLng(center.latitude, center.longitude),
                    zoom: zoom,
                },
                map = new gmap.Map(element, options);

            element.map = map;
        },
        update: function (element, valueAccessor, AllBindings, viewModel, bindingContext) {
            var
                gmap = google.maps,

                value = ko.unwrap(valueAccessor()),
                zoom = ko.unwrap(value.zoom),
                center = ko.unwrap(value.center),
                markers = ko.unwrap(value.markers),
                markersStep = ko.unwrap(value.markersStep),
                map = element.map;

            markersStep = _.map(markersStep, function (marker) {

                var googleMarker = new gmap.Marker({

                    map: map,
                    title: marker.title,
                    position: new gmap.LatLng(marker.latitude, marker.longitude),
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                        size: new gmap.Size(32, 32),
                        scaledSize: new gmap.Size(32, 32)
                    }
                });

                return googleMarker;
            });

            markers = _.map(markers, function (marker) {

                var googleMarker = new gmap.Marker({

                    map: map,
                    title: marker.title,
                    position: new gmap.LatLng(marker.latitude, marker.longitude),
                    /*icon: {
                        url: marker.icon,
                        size: new gmap.Size(32, 32),
                        scaledSize: new gmap.Size(32, 32)
                    }*/
                });

                gmap.event.addListener(googleMarker, 'click', function (e) {
                    map.setZoom(8);
                    map.setCenter(googleMarker.getPosition());
                    marker.click && marker.click.call(googleMarker, marker, e);
                });

                return googleMarker;
            });

            map.setCenter(new gmap.LatLng(center.latitude, center.longitude));
            map.setZoom(zoom);

        }
    };
});