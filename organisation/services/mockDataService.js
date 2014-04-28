/**
 * Created by Dimitri on 25/04/2014.
 */

(function () {
    var mockdataFactory = function ($http) {
        var factory = {};
        factory.getOrganisation = function (request) {
            return  $http.get("/gmapsstart/mockdata/GetSmallOrgOtherAddresses.json").then(function (result) {
                //console.log(result.data);
                return result.data;
            });

        };
        return factory;
    };

    angular.module('app').factory('mockdataService', mockdataFactory);

}
()
    )
;
