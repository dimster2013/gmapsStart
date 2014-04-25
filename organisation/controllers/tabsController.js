/**
 * Created by Dimitri on 25/04/2014.
 */
app.controller('tabsController',function ($scope) {
    $scope.tabs = [
        { title:"Correspondance", content:'organisation/views/correspondence.html' },
        { title:"Office", content:'organisation/views/office.html' },
        { title:"Clinic", content:'organisation/views/clinic.html' }
    ];
})

