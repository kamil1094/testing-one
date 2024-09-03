'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );


controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartSrv', '$timeout' , function( $scope , $http , cartSrv, $timeout ){
	
	$http.get( 'api/site/products/get' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});
	$scope.qty = 0;

//funkcja dodaje przedmiot do koszyka uzywajac serwisu cartSrv
//oraz pokazuje ile przedmiotow dodalismy w jednym ciagu klikania nie dluzszym niz 3 sek
	$scope.addToCart = function ( product ) {
		$timeout.cancel($scope.timer);
		cartSrv.add( product );
		$scope.added = true;
		$scope.qty ++;
		$scope.timer = $timeout(function(){
			$scope.qty = 0;
			$scope.added = false;
		}, 3000);	
	};


	//funkcja przypisuje do produktu nową wlasciwosc qty i wyswietla ja na stronie
	$scope.checkingCart = function(product){
		angular.forEach(cartSrv.show(), function(item){
			if(product.id == item.id)
			{
				product.qty = item.qty;
			}
		});
	}


}]);


controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartSrv' , function( $scope , $http , $routeParams , cartSrv ){

	var id = $routeParams.id;
	$scope.id = id;

	$http.post( 'api/site/products/get/' + id ).
	success( function( data ){
		$scope.product = data;
		$scope.checkingCart($scope.product);
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};

	function getImages() {
		$http.get( 'api/site/products/getImages/' + id ).
		success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}

	$scope.checkingCart = function(product){
		angular.forEach(cartSrv.show(), function(item){
			if(product.id == item.id)
			{
				product.qty = item.qty;
			}
		});
	}


	getImages();


}]);


controllersSite.controller( 'siteOrders' , [ '$scope' , '$http', 'checkToken' , function( $scope , $http, checkToken){

	$http.post( 'api/site/orders/get/',{
			
			token: checkToken.raw(),
			payload: checkToken.payload()
		}).success( function( data ){

			$scope.orders = data;

			angular.forEach($scope.orders, function(order, key){
				var parsed = JSON.parse(order.items);
				$scope.orders[key].items = parsed;
			});

		}).error( function(){

			console.log( 'Błąd łączenia z API' );
		});

}]);


controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter' , 'cartSrv', 'checkToken', function( $scope , $http , $filter , cartSrv, checkToken ){

	$scope.cart = cartSrv.show();

	$scope.emptyCart = function () {
		cartSrv.empty();
	};

	$scope.total = function () {
		var total = 0;
		angular.forEach( $scope.cart , function ( item ) {
			total += item.qty * item.price;
		});
		total = $filter( 'number' )( total , 2 );
		return total;
	};

	$scope.removeItem = function ( $index ) {
		$scope.cart.splice( $index , 1 );
		cartSrv.update( $scope.cart );
	};
	console.log(checkToken.raw());
	$scope.setOrder = function ( $event ) {

		// TODO: sprawdź czy użytkownik jest zalogowany
		
		$event.preventDefault();
		
		if ( !checkToken.loggedIn() )
		{
			$scope.alert = { type : 'warning' , msg : 'Musisz być zalogowany, żeby złożyć zamówienie.' };
			return false;
		}

		$http.post( 'api/site/orders/create/',{

			token: checkToken.raw(),
			payload: checkToken.payload(),
			items: $scope.cart,
			total: $scope.total()
		}).success( function( data ){

			cartSrv.empty();
			$('#paypalForm').submit();
			$scope.alert = { type : 'success' , msg : 'Zamówienie złożone. Nie odświeżaj strony. Trwa przekierowywanie do płatności...' };

		}).error( function(){

			console.log( 'Błąd pobrania pliku json' );
		});

		
	};

	$scope.$watch( function (){
		cartSrv.update( $scope.cart );
	});

}]);

controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store', 'checkToken', '$location', function( $scope , $http, store, checkToken, $location ){

	if(checkToken.loggedIn())
	{
		$location.path('/products');
	}
	$scope.user = {};

	$scope.formSubmit = function (user) {
		$http.post('api/site/user/login/', {
				email : user.email,
				password : user.password
			}).success(function(data){

				$scope.error = data.error;
				if(!data.error)
				{
					store.set('token', data.token);
					location.reload();
				}
				
			}).error(function(){
				console.log('Błąd połączenia z bazą(API).');
			});
	};

}]);


controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.user = {};
	$scope.success = false;

	$scope.formSubmit = function (user) {
			
			
			$http.post('api/site/user/create/', {
				user : user,
				name : user.name,
				email : user.email,
				password : user.password,
				passconf : user.passconf
			}).success(function(errors){

				$scope.user = {};
				if(errors)
				{
					$scope.errors = errors;
				}
				else
				{	
					$scope.errors = {};
					$scope.success = true;
				}
				
			}).error(function(){
				console.log('Błąd pobrania pliku.')
			});
	};

}]);