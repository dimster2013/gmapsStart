/**
 * Created by Dimitri on 25/04/2014.
 */

(function () {
    var mockdataFactory = function () {
        factory = {};
        factory.getOrganisation = function (request) {
            return $http.get("/mockdata/GetSmallOrgOtherAddresses.json");
        };
        return factory;
    };

    angular.module('app').factory('mockdataService', mockdataFactory);

}());
