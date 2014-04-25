/**
 * Created by Dimitri on 24/04/2014.
 */
var app = angular.module('app', ['ui.bootstrap']);

app.controller('OtherAddressesController', function($scope) {
});

app.controller('TabsDemoCtrl',function ($scope) {
    $scope.tabs = [
        { title:"Office", content:'office.html' },
        { title:"Clinic", content:'clinic.html', disabled: true }
    ];
})

app.directive('otheraddresses',function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'tabs.html'
    };
})

app.directive('map',function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'maps.html',
        link: function(scope, element, attrs) {

        }
    };
})




