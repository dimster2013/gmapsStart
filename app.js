/**
 * Created by Dimitri on 24/04/2014.
 */
var app = angular.module('app', []);

app.controller('MapsController', function($scope) {

});

app.directive('maps',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'maps.html'
    };
})