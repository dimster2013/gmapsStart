//This is worth to read for async processing
//http://docs.angularjs.org/api/ng.$q

//You need to use $q, and $rootScope.$apply
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

app.controller('MapCtrl', function ($scope) {

//    $scope.center =
//    {lat: 44, lng: 3};
 $scope.zoom = 10;

    if (1 == 0) {
        $scope.center =
        {lat: 44, lng: 3};
        $scope.zoom = 10;
    }
    else
    {
        $scope.streetNumber = "12";
        //$scope.streetName = "paris street";
        $scope.city = "paris";
        $scope.country = "france";

        $scope.address = $scope.streetNumber + "," + $scope.streetName + "," + $scope.city + "," + $scope.country;

//        GeoCoder.getLocations($scope.address).then(function (results) {
//            var latLng = results[0].geometry.location;
//            $scope.center =
//            {lat: latLng.k, lng: latLng.A};
//            $scope.zoom = 10;
//        });





    }

});


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
app.directive('gmaps', function factory($timeout,$q,GeoCoder) {
    return {
        restrict: 'EA',
        template: '<div class="gmaps"></div>',
        replace: true,

        link: function postLink(scope, iElement, iAttrs) {

            var centerPromise = GeoCoder.getLocations(scope.address).then(function(results) {
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



