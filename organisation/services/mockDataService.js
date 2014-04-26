/**
 * Created by Dimitri on 25/04/2014.
 */


(function () {

    var mockdataFactory = function () {

        factory = {};


        factory.getOrganisation = function (request) {
            return        {
                "Address": {
                    "streetNumber": 23,
                    "streetName": "Sussex street",
                    "city": "Sydney",
                    "position": {"A": 150, "k": -33}
                }
            }
        };


        return factory;
    };


    angular.module('app').factory('mockdataService', mockdataFactory);

}());