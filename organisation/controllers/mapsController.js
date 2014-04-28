
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


app.directive('gmaps', function factory($timeout, $q, GeoCoder,mockdataService) {
    return {
        restrict: 'EA',
        template: '<div class="gmaps"></div>',
        replace: true,

        link: function postLink(scope, iElement, iAttrs) {

            //call  to return map details and setcenter to this location

            var centerPromise = mockdataService.getOrganisation(scope.request).then(function (results) {
                console.log('hoerb', results);

                var lng = results.OrganisationBom.Contact["0"].Address.lng;
                var lat = results.OrganisationBom.Contact["0"].Address.lat;


                //todo insert another promise for geocoding here
                var mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng(lng, lat),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(iElement[0], mapOptions);

                map.setCenter(new google.maps.LatLng(parseFloat(lng), parseFloat(lat)));

                return new $q.defer().promise;

            });


        }
    };
});



