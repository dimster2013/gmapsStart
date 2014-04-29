/**
 * Created by Dimitri on 25/04/2014.
 */


app.controller('tabsController', function ($scope, mockdataService) {


    mockdataService.getOrganisation(mockdataService.request).then(function (results) {
        console.log('org details:', results);
        var arLen = results.OrganisationBom.Contact.length;

        var tabs = [];


        for (var i = 0; i < arLen; i++) {
            var tab = {
                    title: results.OrganisationBom.Contact[i].contact_Purpose.text,
                    content: 'organisation/views/' + results.OrganisationBom.Contact[i].contact_Purpose.text + '.html',
                    streetNumber: results.OrganisationBom.Contact[i].Address.number_First,
                    streetName: results.OrganisationBom.Contact[i].Address.street_Name,
                    suburb: results.OrganisationBom.Contact[i].Address.suburb.text

                }
                ;

//
//            $scope.suburb=results.OrganisationBom.Contact[i].Address.suburb.text;

            tabs[i] = tab;
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

