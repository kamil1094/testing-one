'use strict';

var app = angular.module( 'app' , [ 'ngRoute' , 'angular-storage', 'angular-jwt', 'controllersNavigation' , 'controllersAdmin' , 'controllersSite' , 'myServices' ] );

app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {


	// ================== Admin Products ====================

	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'partials/admin/products.html'
	});

	$routeProvider.when( '/admin/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'partials/admin/product-edit.html'
	});

	$routeProvider.when( '/admin/product/create' , {
		controller: 'productCreate',
		templateUrl : 'partials/admin/product-create.html'
	});

	// ================== Admin Users ====================

	$routeProvider.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'partials/admin/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'partials/admin/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'partials/admin/user-create.html'
	});

	// ================== Admin Orders ====================

	$routeProvider.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'partials/admin/orders.html'
	});

	// ================== Site Products ====================

	$routeProvider.when( '/products' , {
		controller : 'siteProducts',
		templateUrl : 'partials/site/products.html'
	});

	$routeProvider.when( '/product/:id' , {
		controller: 'siteProduct',
		templateUrl : 'partials/site/product.html'
	});

	$routeProvider.when( '/cart' , {
		controller : 'cartCtrl',
		templateUrl : 'partials/site/cart.html'
	});

	$routeProvider.when( '/orders' , {
		controller : 'siteOrders',
		templateUrl : 'partials/site/orders.html'
	});

	// ================ Login & Register ==================

	$routeProvider.when( '/login' , {
		controller : 'login',
		templateUrl : 'partials/site/login.html'
	});

	$routeProvider.when( '/register' , {
		controller : 'register',
		templateUrl : 'partials/site/register.html'
	});

	// ================== Default ====================

	$routeProvider.otherwise({
		redirectTo: '/products'
	});

}]);


