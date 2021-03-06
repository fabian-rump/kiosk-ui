var common = angular.module('kiosk-ui.common');

common.service('IdentifierService', ['$http', 'AppConfig', 'Product', 'Customer',
  function($http, AppConfig, Product, Customer) {

  var base_url = AppConfig.backend;

  this.getItemFromIdentifier = function(identifier) {
    return $http.get(base_url + 'identifiers/' + identifier + '.json', {
      transformResponse: function (data, headers) {

        // Deserialize to access type field
        result = angular.fromJson(data);

        // Check if the type field exists
        if(result.type === 'undefined'){
          return null;
        }

        // If this is a product, return a product item
        if(result.type == 'product'){
          return Product.fromJsonSingle(data);
        }

        // If this is a customer, return a customer item
        // Current API returns type 'user', will probably change.
        if(result.type == 'user'){
          return Customer.fromJsonSingle(data);
        }

        return null;

      }
    });
  }
}]);
