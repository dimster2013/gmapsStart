/**
 * Created by Dimitri on 25/04/2014.
 */


app.controller('tabsController', function ($scope, mockdataService) {

//    $scope.tabs = [
//        { title: "Correspondance", content: 'organisation/views/correspondence.html' },
//        { title: "Office", content: 'organisation/views/office.html' },
//        { title: "Clinic", content: 'organisation/views/clinic.html' }
//    ];


    mockdataService.getOrganisation(mockdataService.request).then(function (results) {
        console.log('org details:', results);
        var tabs
        [];


        for (var i = 0;
             i < contacts.length;
             i++
            ) {
            var tab = {title: contacts[i].ContactPurpose, content: 'organisation/views/office.html' };
            tabs[i] += tab;
        }
        $scope.tabs = tabs;
    })


//load data for each of the tabs
//correspondence tab data

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


})

