app.controller('MapCtrl', function ($scope, mockdataService) {
    var request = {
        "@schemaLocation": "http://nhsd.com.au/v1/OrganisationFinder/GetOrganisationRequest GetOrganisationRequest.xsd",
        "Identifier": {
            "identifier_value": "String",
            "identifier_schema": "http://www.altova.com/"
        },
        "Scope": {
            "include_MutexMetadata": "true",
            "include_RefMetadata": "true",
            "mode": "EXCLUDE",
            "Scope_Exception": [
                "FACILITY",
                [
                    "KNOWN_AS"
                ]
            ]
        }
    }

    $scope.request = request;

});

app.directive('gmaps', function factory($timeout, $q, GeoCoder, mockdataService) {
    return {
        restrict: 'EA',
        template: '<div class="gmaps"></div>',
        replace: true,

        link: function postLink(scope, iElement, iAttrs) {

            var lat, lng;
            var centerPromise = mockdataService.getOrganisation(scope.request).then(function (results) {
                        console.log('org details:', results);
                        lat = results.OrganisationBom.Contact["0"].Address.lat;
                        lng = results.OrganisationBom.Contact["0"].Address.lng;

                        if (!lat | !lng) {
                            var country = results.OrganisationBom.Contact["0"].Address.country["#text"];
                            var suburb = results.OrganisationBom.Contact["0"].Address.suburb["#text"];
                            scope.address = suburb + "," + country;
                            if (suburb != null) {
                                var servicePromise = GeoCoder.getLocations(scope.address).then(function (results) {
                                    var latLng = results[0].geometry.location;
                                    lat = latLng.k;
                                    lng = latLng.A;

                                    var mapOptions = {
                                        zoom: 10,
                                        center: new google.maps.LatLng(lat, lng),
                                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                    };

                                    var map = new google.maps.Map(iElement[0], mapOptions);
                                    scope.map = map;
                                    console.log('lat', lat);
                                    console.log('lng', lng);

                                    //map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(lng)));

                                    var map_options = {
                                        center: new google.maps.LatLng(lat, lng),
                                        zoom: 8
                                    };
                                    var map = new google.maps.Map(iElement[0], map_options);

                                    var marker = new google.maps.Marker({
                                        map: map,
                                        position: latLng
                                    });

                                    map.setCenter(latLng);
                                });

                                return new $q.defer().promise;
                            }
                        }
                        else {
                            var latLng=new google.maps.LatLng(lat, lng);
                            var map_options = {
                                center: new google.maps.LatLng(lat, lng),
                                zoom: 8
                            };
                            var map = new google.maps.Map(iElement[0], map_options);

                            var marker = new google.maps.Marker({
                                map: map,
                                position: latLng
                            });

                            map.setCenter(latLng);
//                            var mapOptions = {
//                                zoom: 10,
//                                center: new google.maps.LatLng(lat, lng),
//                                mapTypeId: google.maps.MapTypeId.ROADMAP
//                            };
//
//                            var map = new google.maps.Map(iElement[0], mapOptions);
//                            scope.map = map;
//                            console.log('lat', lat);
//                            console.log('lng', lng);
//                            map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(lng)));

                            return new $q.defer().promise;
                        }
                    }
                )
                ;
        }
    }
        ;
})
;

//get address geocoded
app.service('GeoCoder', function ($q, $rootScope) {
    return {
        getLocations: function (address) {
            var deferred = $q.defer();

            var geocoder = new google.maps.Geocoder();
            console.log('address', address);
            geocoder.geocode({'address': address }, function (results, status) {
                $rootScope.$apply(function () {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results);
                        deferred.resolve(results);
                    }
                });
            });
            return deferred.promise;
        }
    }
});


