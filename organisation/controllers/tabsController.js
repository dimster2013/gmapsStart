/**
 * Created by Dimitri on 25/04/2014.
 */
app.controller('tabsController', function ($scope, mockdataService) {
    $scope.tabs = [
        { title: "Correspondance", content: 'organisation/views/correspondence.html' },
        { title: "Office", content: 'organisation/views/office.html' },
        { title: "Clinic", content: 'organisation/views/clinic.html' }
    ];


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

    var response = mockdataService.getOrganisation(request);

    $scope.streetNumber=response.Address.streetNumber;
    $scope.streetName= response.Address.streetName;
    $scope.city= response.Address.city;
    $scope.position=response.Address.position;


})

