'use strict';

var myServices = angular.module( 'myServices' , [] );


myServices.factory( 'cartSrv' , [ 'store' , function( store ) {
// zanim zostanie przedmiot dodany do korzyka sprwadzane jest
// czy wczesniej juz cos nie zostało zapisane w koszyku i jesli tak to jest to 'cos' 
// pobierane z ciasteczek
	if ( store.get( 'cart' ) )
		var cart = store.get( 'cart' );
	else
		var cart = [];

	cart.show = function () {
		return cart;
	};

	cart.add = function ( product ) { //funckja dodajaca przedmioty do koszyka

		var newInCart = true;
		angular.forEach( cart , function ( value , key ) {

			// zmienić name na id gdy będzie kontakt z bazą

			if ( value.id == product.id)
			{
				newInCart = false;
				cart[key].qty++;
			}
		});

		if ( newInCart )
		{
			product.qty = 1;
			cart.push( product );
		}

		store.set( 'cart' , cart.show() );

	}

	cart.empty = function () { 
		store.remove( 'cart' );
		cart.length = 0;
	};

	cart.qty = function(){ // funkcja zliczająca iosc totalną przedmiotów w koszyku
		var qty = 0;
		angular.forEach(cart, function(value){
			if(value.qty > 1)
			{
				qty += value.qty;
			}
			else
			{
				qty++;
			}
		});

		return qty;
	};

	cart.update = function ( newCart ) {
		store.set( 'cart' , newCart );
	};

	return cart;
	
}]);

myServices.service('checkToken', ['store', 'jwtHelper', function(store, jwtHelper){


	var token = store.get('token');
	if(token)
		token = jwtHelper.decodeToken(token);
	else
		token = false;

	this.payload = function(){
		return token;
	};

	this.loggedIn = function(){
		if(token)
		{
			return true;
		}
		else
		{
			return false;
		}
	};

	this.isAdmin = function(){
		if(token.role == 'admin')
		{
			return true;
		}
		else
		{
			return false;
		}
	};

	this.raw = function(){
		return store.get('token');
	};

	this.del = function(){
		store.remove('token');
	};
	

}]);