//This is worth to read for async processing
//http://docs.angularjs.org/api/ng.$q


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

//get orgdetails organisation (lat/long) amongst them
//if latlong is available use this
//otherwise geocode address if available
app.service('Organisation', function ($q, $rootScope,mockdataService) {
    return {
        getOrgdetails: function (request) {
            var deferred = $q.defer();

            mockdataService.getOrganisation(request, function (results) {
                $rootScope.$apply(function () {
                    console.log(results);

                    $scope.streetNumber=results[0].Address.streetNumber;
                    $scope.streetName= results[0].Address.streetName;
                    $scope.city= results[0].Address.city;
                    $scope.position=results[0].Address.position;

                    deferred.resolve(results);
                });
            });

            return deferred.promise;
        }
    }
});


app.controller('MapCtrl', function ($scope,Organisation) {

//    $scope.center =
//    {lat: 44, lng: 3};
    $scope.zoom = 10;


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

    var results;
    //call orgservice to retreive org details
    Organisation.getOrgdetails(request);


});

//    var response = mockdataService.getOrganisation(request);
//





//
//    if (mockdataService.position != null) {
//
//    }
//    else {
//
//    }
//
//    var servicePromise = GeoCoder.getLocations(scope.address).then(function (results) {
//
//
//        var latLng = results[0].geometry.location;

//            console.log(latLng.A);
//            console.log(latLng.k);
//
//            var mapOptions = {
//                zoom: 10,
//                center: new google.maps.LatLng(latLng.A, latLng.k),
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//
//            var map = new google.maps.Map(iElement[0], mapOptions);
//
//            map.setCenter(new google.maps.LatLng(parseFloat(latLng.k), parseFloat(latLng.A)));

    //return new $q.defer().promise;


//if (1 == 0) {
//    $scope.center =
//    {lat: 44, lng: 3};
//    $scope.zoom = 10;
//}
//else {
//    $scope.streetNumber = "12";
//    //$scope.streetName = "paris street";
//    $scope.city = "paris";
//    $scope.country = "france";
//
//    $scope.address = $scope.streetNumber + "," + $scope.streetName + "," + $scope.city + "," + $scope.country;
//}
//        GeoCoder.getLocations($scope.address).then(function (results) {
//            var latLng = results[0].geometry.location;
//            $scope.center =
//            {lat: latLng.k, lng: latLng.A};
//            $scope.zoom = 10;
//        });







//    $scope.addMarkerFromAddress = function () {
//
//        if ($scope.position!=null) {
//
//        }
//        else {
//
//            GeoCoder.getLocations($scope.address).then(function (results) {
//                var latLng = results[0].geometry.location;
//                var marker = new google.maps.Marker({
//                    map: $scope.map,
//                    position: latLng
//                });
//                $scope.map.setCenter(latLng);
//            });
//        }
//    };

//


app.directive('gmaps', function factory($timeout, $q, GeoCoder,Mapper) {
    return {
        restrict: 'EA',
        template: '<div class="gmaps"></div>',
        replace: true,

        link: function postLink(scope, iElement, iAttrs) {

//call Mapper.GetMapLocation to return map details and setcenter to this location
            var centerPromise = Mapper.GetMapLocation(scope.address).then(function (results) {
                var latLng = results[0].geometry.location;

                console.log(latLng.A);
                console.log(latLng.k);

                var mapOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng(latLng.A, latLng.k),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(iElement[0], mapOptions);

                map.setCenter(new google.maps.LatLng(parseFloat(latLng.k), parseFloat(latLng.A)));

                return new $q.defer().promise;
            });
//            var mapOptions = {
//                zoom: scope.zoom,
//                center: new google.maps.LatLng(scope.center.lat, scope.center.lng),
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//            var map = new google.maps.Map(iElement[0], mapOptions);

//            scope.$watch('center', function () {
//
//
//                map.setCenter(new google.maps.LatLng(parseFloat(scope.center.lat)
//                    , parseFloat(scope.center.lng)));
//
//
//            }, true);

//            google.maps.event.addListener(map, 'center_changed', function () {
//                $timeout(function () {
//                    var center = map.getCenter();
//                    scope.center.lat = center.lat();
//                    scope.center.lng = center.lng();
//                });
//            });
//
//            scope.$watch('zoom', function () {
//                map.setZoom(parseInt(scope.zoom));
//            });
//
//            google.maps.event.addListener(map, 'zoom_changed', function () {
//                $timeout(function () {
//                    scope.zoom = map.getZoom();
//                });
//            });

        }
    };
});



