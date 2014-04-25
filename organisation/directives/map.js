/**
 * Created by Dimitri on 25/04/2014.
 */
app.directive('otheraddresses',function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'organisation/views/tabs.html'
    };
})

app.directive('map',function(){
    return {
        restrict: 'A',
        replace: false,
        templateUrl: 'organisation/views/maps.html',
        link: function(scope, element, attrs) {

        }
    };
})

