"use strict";
//javascript
var users = [
	{ id: 1, name: "ID", age: 32 },
	{ id: 2, name: "HA", age: 25 },
	{ id: 3, name: "BJ", age: 32 },
	{ id: 4, name: "PJ", age: 28 },
	{ id: 5, name: "JE", age: 27 },
	{ id: 6, name: "JM", age: 32 },
	{ id: 7, name: "HI", age: 24 }
];

function filter(list, predicate) {
	var new_list = [];
	for (var i = 0, len = list.length; i < len; i++) {
		if (predicate(list[i])) new_list.push(list[i]);
	}
	return new_list;
}
function map( list, iteratee ) {
	var new_list = [];
	for( var i = 0, len = list.length; i < len; i++ ){
		new_list.push( iteratee( list[ i ] ) );
	}
	return new_list;
}

//변수 할당 없애기 
function log_length ( value ){
	console.log( value.length );
	return value;
}

function bvalue ( key ){
	return function ( obj ){
		return obj[ key ];
	}
}

console.log( log_length( map( 
				filter(users, function(user) { return user.age < 30 }), 
				bvalue( 'age' ) ) ) );
console.log( log_length( map( 
				filter(users, function(user) { return user.age >= 30 }), 
				bvalue( 'name' ) ) ) );

console.log( "-----------------------------------------" ); 
//"u => u.age < 30" == "function( u ) { return u.age < 30; }
//"u => u.age" == "function( u ) { return u.age; }
console.log( log_length( map( 
		filter( users, u => u.age < 30 ), 
		u => u.age ) ) );
console.log( log_length( map( 
		filter( users, u => u.age >= 30 ), 
		u => u.name ) ) );

console.log( "-----------------------------------------" ); 
var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;
console.log( log_length( map( 
		filter( users, under_30 ), 
		u => u.age ) ) );
console.log( log_length( map( 
		filter( users, over_30 ), 
		u => u.name ) ) );

console.log( "-----------------------------------------" ); 
var ages1 = list => map( list, v => v.age );
var names1 = list => map( list, v => v.name );

console.log( log_length( ages1( filter( users, under_30 ) ) ) );
console.log( log_length( names1( filter( users, over_30 ) ) ) );

console.log( "-----------------------------------------" ); 
var bvalues = key => list => map( list, v => v[ key ] );
var ages2 = bvalues( 'age' );
var names2 = bvalues( 'name' );
console.log( log_length( ages2( filter( users, u => u.age < 30 ) ) ) );
console.log( log_length( names2( filter( users, u => u.age >= 30 ) ) ) );

console.log( "-----------------------------------------" ); 
//bvalues가 있으면 화살표 함수가 아니어도 충분히 간결해진다.
function bvalues2 ( key ){
	return function ( list ){
		return map ( list, function ( v ) { return v[ key ] } );
	}
}

var ages3 = bvalues2( 'age' );
var names3 = bvalues2( 'name' );
var under_30 = function( u ) { return u.age < 30 };
var over_30 = function( u ) { return u.age >= 30 };
console.log( log_length( ages3 ( filter( users, under_30 ) ) ) );
console.log( log_length( names3 ( filter( users, over_30 ) ) ) );

console.log( "-----------------------------------------" ); 
function bvalues3( key ){
	var value = bvalue( key );
	return function( list ) { return map( list, value ) };
}
var ages4 = bvalues3( 'age' );
var names4 = bvalues3( 'name' );
console.log( log_length( ages4( filter( users, u => u.age < 30 ) ) ) );
console.log( log_length( names4( filter( users, u => u.age >= 30 ) ) ) );

