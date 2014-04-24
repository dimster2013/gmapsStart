/**
 * Created by Dimitri on 24/04/2014.
 */
var app = angular.module('app', ['ui.bootstrap']);

app.controller('OtherAddressesController', function($scope) {
});

app.controller('TabsDemoCtrl',function ($scope) {
    $scope.tabs = [
        { title:"Dynamic Title 1", content:"Dynamic content 1" },
        { title:"Dynamic Title 2", content:"Dynamic content 2", disabled: true }
    ];
})

app.directive('otheraddresses',function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'maps.html'
    };
})


