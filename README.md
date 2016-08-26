# mangular
A Factory for Angular 1 to consume the magento 2 rest api


## Cart
    getCartId: getCartId,
    getTotals: getTotals,
    getItems: getItems,
    addItem: addItem,
    removeItem: removeItem,
    createNewCart: createNewCart


## Category
      getCategories: getCategories,
      getCategory: getCategory

## Products
      getProducts: getProducts,
      getProduct: getProduct



#### Developing locally (bower)
-fork the project
-cd into the dir
-run "bower link"
-go to you project
-run "bower link mangular"

now the changes you do on the services should be reflected directly in you project, just dont forget to run "npm run bulid" or "npm run watch" in the mangular folder
