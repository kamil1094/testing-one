'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload' , 'myDirectives' ] );


controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'api/admin/products/get' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( product , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.products.splice( $index , 1 );

		$http.post('api/admin/products/delete', {
			product : product
		}).success(function(){
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});
		console.log('just trying gihhub remote')
	};

}]);

//changes for git testing
controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader', '$timeout', function( $scope , $http , $routeParams , FileUploader, $timeout ){

	var productId = $routeParams.id;
	$scope.id = productId;
	$scope.change = true;

	$scope.change = function(){
		$scope.change = false;
	}

	$http.get( 'api/admin/products/get/' + productId ).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.saveChanges = function ( product ) {
 		$scope.success = false;
		$http.post('api/admin/products/update', {
			product : product
		}).success(function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
			}, 3000); 
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});
		console.log(product);
		
	};

	function getImages() {
		$http.get( 'api/admin/images/get/' + productId ).
		success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	getImages();

    var uploader = $scope.uploader = new FileUploader({
        url : 'api/admin/images/upload/' + productId
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };

    $scope.delImage = function ( imageName , $index ) {

    	$scope.images.splice( $index , 1 );

		$http.post( 'api/admin/images/delete/' , {

			id : productId,
			image : imageName

		}).success( function(  ){

		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});

    };


}]);


controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http', '$timeout', function( $scope , $http, $timeout ){

	$scope.change = true;

	$scope.change = function(){
		$scope.change = false;
	}

	$scope.createProduct = function (product) {

		$http.post('api/admin/products/create/', {
			product : product
		}).success(function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
				$scope.product = {};
			}, 3000);
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});
	};

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http', '$timeout','checkToken', function( $scope , $http, $timeout, checkToken ){


	$http.get( 'api/admin/users/get' ).
	success( function( data ){
		$scope.users = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.users.splice( $index , 1 );

		$http.post('api/admin/users/delete', {
			user : user
		}).success(function(){
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});

		$scope.success = true;
		$timeout(function(){
			$scope.success = false;
		}, 2000);

	};

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams, $timeout ){

	var userId = $routeParams.id;

	$scope.change = true;

	$scope.change = function(){
		$scope.change = false;
	}

	$http.get( 'api/admin/users/get/' + userId ).
	success( function( data ){
		$scope.user = data;
		$scope.user.password = '';
		$scope.user.passconf = '';
	}).error( function(){
		console.log( 'Błąd połączenia z API' );
	});

	$scope.saveChanges = function ( user ) {

		$scope.success = false;
		$http.post('api/admin/users/update', {
			id : userId,
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success(function(errors){

			if(errors)
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.success = true;
				$timeout(function(){
				$scope.success = false;
				$scope.user.password = '';
				$scope.user.passconf = '';
					}, 3000);
			}
		
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});

	};

}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout' , function( $scope , $http, $timeout ){

	$scope.user = {};
	$scope.user.role = 'user';

	$scope.createUser = function (user) {

		$http.post('api/admin/users/create/', {
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success(function(errors){

			if(errors)
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.success = true;
				$timeout(function(){
				$scope.success = false;
				$scope.user = {};
					}, 3000);
			}
			
		}).error(function(){
			console.log('Błąd pobrania pliku.')
		});
	};
}]);


controllersAdmin.controller( 'orders' , [ '$scope' , '$http', 'checkToken' , function( $scope , $http, checkToken){

	$http.post( 'api/admin/orders/get/',{

			token: checkToken.raw()
		}).success( function( data ){

			$scope.orders = data;

			angular.forEach($scope.orders, function(order, key){
				var parsed = JSON.parse(order.items);
				$scope.orders[key].items = parsed;
			});

		}).error( function(){

			console.log( 'Błąd pobrania pliku json' );
		});

	$scope.delete = function (order, index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć to zdjęcie' ) )
			return false;

		$scope.orders.splice( index , 1 );

		$http.post( 'api/admin/orders/delete/',{

			id: order.id,
			token: checkToken.raw()
		}).success( function(){

		}).error( function(){

			console.log( 'Błąd pobrania pliku json' );
		});

	};

	$scope.changeStatus = function ( order ) {

		console.log( 'test' );

		if ( order.status == 0 )
			order.status = 1;
		else
			order.status = 0;

		$http.post( 'api/admin/orders/update/',{

			status: order.status,
			token: checkToken.raw(),
			id: order.id
		}).success( function( data ){

		}).error( function(){

			console.log( 'Błąd pobrania pliku json' );
		});

	};

}]);