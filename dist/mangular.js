(function() {
  'use strict';
  angular.module('mangular', []);
})();

(function() {
  'use strict';
  angular.module('mangular').factory('Cart', Factory);
  Factory.$inject = [ 'Restangular', '$log' ];
  function Factory(Restangular, $log) {
    $log.info('--- Cart service start ---');
    var service = {
      getCart: getCart,
      getItems: getItems,
      addItem: addItem,
      createNewCart: createNewCart
    };
    var cart = {};
    return service;
    function getCart(cartId) {
      $log.info('--- Featching cart ---');
      return Restangular.all('guest-carts').one(cartId).customGET();
    }
    function getItems(cartId) {
      $log.info('--- Featching cart items ---');
      var cartItems = cartId.then(function(id) {
        cart = Restangular.all('guest-carts').one(id).one('items').customGET();
        return cart;
      });
      return cartItems;
    }
    function addItem(product, cartId) {
      $log.info('--- Add to cart ---');
      cartId.then(function(cartId) {
        $log.info('Adding item to cart:');
        var data = {
          cartItem: {
            sku: product.sku,
            qty: 1,
            quote_id: cartId
          }
        };
        Restangular.one('guest-carts').one(cartId).one('items').customPOST(data).then(function(response) {
          $log.info('Added item to cart:');
          cart = Restangular.all('guest-carts').one(cartId).customGET();
        });
      });
    }
    function createNewCart() {
      var createNewCart = Restangular.all('guest-carts');
      var cartId = createNewCart.post();
      return cartId;
    }
    $log.info('--- Cart service end ---');
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Categories', Service);
  Service.$inject = [ 'Restangular', '$log' ];
  function Service(Restangular, $log) {
    $log.info('--- Categories service start ---');
    var service = {
      getCategories: getCategories,
      getCategory: getCategory
    };
    return service;
    function getCategories() {
      $log.info('--- Featching categories start ---');
      $log.info('--- Featching categories: ---');
      $log.info('--- Featching categories end ---');
      return Restangular.all('categories').customGET();
    }
    function getCategory(id) {
      $log.info('--- Featching category start ---');
      $log.info('--- Featching category ' + id + ' ---');
      $log.info('--- Featching category end ---');
      return Restangular.one('category/' + id).customGET();
    }
    $log.info('--- Categories service end ---');
  }
})();

(function() {
  'use strict';
  angular.module('mangular').service('Products', Service);
  Service.$inject = [ 'Restangular', '$stateParams', '$log' ];
  function Service(Restangular, $stateParams, $log) {
    $log.info('--- Products service start ---');
    var service = {
      getProducts: getProducts,
      getProduct: getProduct
    };
    return service;
    function getProducts(paramsData) {
      var params = paramsData;
      var query = 'products';
      var category = '';
      var defaultNumberOfProducts = '50';
      var catId = '';
      var noOfProducts = '';
      if (params.category) {
        catId = '&searchCriteria[filter_groups][0][filters][0][field]=' + 'category_id&searchCriteria[filter_groups][0][filters][0][value]=' + params.category;
      }
      if (params.limit) {
        noOfProducts = '[page_size]=' + params.limit;
      } else {
        noOfProducts = '[page_size]=' + defaultNumberOfProducts;
      }
      $log.info('--- Featching products start ---');
      $log.info('Featching ' + params.limit + ' products from category ' + $stateParams);
      $log.info('--- Featching products end ---');
      query += '?searchCriteria' + noOfProducts + catId;
      return Restangular.all(query).customGET();
    }
    function getProduct(sku) {
      $log.info('--- Featching product start ---');
      $log.info('Featching product ' + sku);
      $log.info('--- Featching product end ---');
      return Restangular.one('products/' + sku).customGET();
    }
    $log.info('--- Products service end ---');
  }
})();