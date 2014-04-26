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
                    "streetName": "keizersgracht",
                    "city": "amsterdam",
                    "country":"the netherlands",
                    "position": {"A": 15, "k": -33}
                }
            }
        };


        return factory;
    };


    angular.module('app').factory('mockdataService', mockdataFactory);

}());