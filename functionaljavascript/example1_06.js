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

function filter( list, predicate ) {
	var new_list = [];
	for (var i = 0, len = list.length; i < len; i += 1) {
		if (predicate(list[i])) new_list.push(list[i]);
	}
	return new_list;
}
function map( list, iteratee ) {
	var new_list = [];
	for( var i = 0, len = list.length; i < len; i += 1 ){
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

console.log( filter( users, function( user ) { return user.id == 3; } )[0] ) ;

console.log( "---------------------------------------" );
var user;
for( var i = 0, len = users.length; i < len; i++ ){
	if( users[ i ].id == 3 ){
		user = users[ i ];
		break;
	}
}
console.log( user ); //{id: 3, name: "BJ", age: 32}

function findById( list, id ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( list[ i ].id == id ) { return list[ i ]; }
	}
}
console.log( findById( users, 3 ) ); //{id: 3, name: "BJ", age: 32}
console.log( findById( users, 5 ) ); //{id: 5, name: "JE", age: 27}

console.log( "---------------------------------------" );
function findByName( list, name ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( list[ i ].name == name ) { return list[ i ]; }
	}
}
console.log( findByName( users, 'BJ' ) ); //{id: 3, name: "BJ", age: 32}
console.log( findByName( users, "JE" ) ); //{id: 5, name: "JE", age: 27}

console.log( "---------------------------------------" );
function findByAge( list, age ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( list[ i ]. age == age ) { return list[ i ]; }
	}
}
console.log( findByAge( users, 32 ) ); //{id: 1, name: "ID", age: 32}
console.log( findByAge( users, 27 ) ); //{id: 5, name: "JE", age: 27}

console.log( "---------------------------------------" );
function findBy( key, list, val ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( list[ i ][ key ] === val ) { return list[ i ]; }
	}
}
console.log( findBy( 'name', users, 'ID' ) ); //{id: 1, name: "ID", age: 32}
console.log( findBy( 'age', users, 27 ) ); //{id: 5, name: "JE", age: 27}
console.log( findBy( 'id', users, 3 ) ); //{id: 3, name: "BJ", age: 32}

console.log( "---------------------------------------" );
function User(id, name, age) {
	this.getId = function() {
		return id;
	};
	this.getName = function() {
		return name;
	};
	this.getAge = function() {
		return age;
	};
}
var users2 = [
	new User(1, "ID", 32),
	new User(2, "HA", 25),
	new User(3, "BJ", 32),
	new User(4, "PJ", 28),
	new User(5, "JE", 27),
	new User(6, "JM", 32),
	new User(7, "HI", 24)
	];
function findBy2(key, list, val) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i][key] === val) return list[i];
	}
}
console.log( findBy2('age', users2, 25) ); //undefined

console.log( "---------------------------------------" );

function find( list, predicate ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( predicate( list[ i ] ) ) { return list[ i ]; }
	}
}
console.log( find( users2, u => u.getAge() == 25  ).getName() ); 
//HA
console.log( find( users, u => u.name.indexOf( 'P' ) != -1  ) ); 
//{id: 4, name: "PJ", age: 28}
console.log( find( users, u => u.age == 32 && u.name == 'JM' ) ); 
//{id: 6, name: "JM", age: 32}
console.log( find( users2, u => u.getAge() < 30 ).getName() ); 
//HA

console.log( "---------------------------------------" );
console.log( map( filter( users, u => u.age >= 30 ), 
					u => u.name ) );
//(3) ["ID", "BJ", "JM"]
console.log( map( filter( users2, u => u.getAge() > 30 ),
					u => u.getName() ) );
//(3) ["ID", "BJ", "JM"]

console.log( "---------------------------------------" );

function bmatch1( key, val ){
	return function( obj ){
		return obj[ key ] === val;
	}
}
console.log( find( users, bmatch1( 'id', 1) ) );
//{id: 1, name: "ID", age: 32}
console.log( find( users, bmatch1( 'name', 'HI' ) ) );
//{id: 7, name: "HI", age: 24}
console.log( find( users, bmatch1( 'age', 27 ) ) );
//{id: 5, name: "JE", age: 27}

console.log( "---------------------------------------" );

console.log( filter( users, bmatch1( 'age', 32) ) );
//[{id: 1, name: "ID", age: 32},
//{id: 3, name: "BJ", age: 32},
//{id: 6, name: "JM", age: 32}]

console.log( map( users, bmatch1( 'age', 32) ) );
//[true, false, true, false, false, true, false]

console.log( "---------------------------------------" );
function object( key, val ){
	var obj = {};
	obj[key] = val;
	return obj;
}
function match( obj, obj2 ){
	for( var key in obj2 ){
		if( obj[key] !== obj2[key] ) return false;
	}
	return true;
}

function bmatch2( obj2, val ) {
	if( arguments.length == 2 ){
		obj2 = object( obj2, val );
	}
	return function( obj ){
		return match( obj, obj2 );
	}
}
/*function ( obj ){
	match( obj, { id : 3} );
}*/
console.log( match( find( users, bmatch2( 'id', 3) ), 
					find( users, bmatch2( 'name', 'BJ' ) ) ) );
//true
console.log( find( users, u => u.age == 32 && u.name == 'JM' ) );
//{id: 6, name: "JM", age: 32}
console.log( find( users, bmatch2( { name: 'JM', age: 32} ) ) );
//{id: 6, name: "JM", age: 32}

console.log( "---------------------------------------" );

function findIndex( list, predicate ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( predicate( list[ i ] ) ) { return i; }
	}
	return -1;
}

console.log( findIndex( users, bmatch2( { name: 'JM', age: 32 } ) ) ); //5
console.log( findIndex( users, bmatch2( { name: 'PJ' } ) ) ); //3. key는 name
console.log( findIndex( users, bmatch2( { age: 24 } ) ) ); //6. key는 age
console.log( findIndex( users, bmatch2( { age: 36 } ) ) ); //-1. key는 age


console.log( "---------------------------------------" );
var _ = {};
_.map = function( list, iteratee ){
	var new_list = [];
	for( var i = 0, len = list.length; i < len; i++ ){
		new_list.push( iteratee( list[ i ], i, list) );
	}
	return new_list;
};

_.filter = function( list, predicate ){
	var new_list = [];
	for( var i = 0, len = list.length; i < len; i++ ){
		if( predicate( list[ i ], i, list) ) new_list.push( list[ i ] );
	}
	return new_list;
};

_.find = function( list, predicate ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( predicate( list[ i ], i, list) ) return list[ i ];
	}
};

_.findIndex = function( list, predicate ){
	for( var i = 0, len = list.length; i < len; i++ ){
		if( predicate( list[ i ], i, list ) ) return i;
	}
	return -1;
};


console.log( _.filter( [ 1, 2, 3, 4], 
						function( val, idx) { return idx > 1} ) );
//[3, 4]


console.log( "---------------------------------------" );


_.identity = function( v ) { return v; }
var a = 10;
console.log( _.identity( a ) ); //10
console.log( _.identity( 0 ) ); //0
console.log( _.identity( false ) ); //false
console.log( _.identity( NaN ) ); //NaN
console.log( _.identity( undefined ) ); //undefined
console.log( _.identity( {} ) ); //{}
console.log( _.identity( [] ) ); //[]
if( _.identity( 0 ) ) console.log( "A" ); //출력 안됨
if( _.identity( {} ) ) console.log( "A" ); //A
if( _.identity( -1 ) ) console.log( "음수" ); //음수 출력

console.log( _.filter( [ true, 0, 10, 'a', false, null, "" ], 
			_.identity ) ); //[true, 10, "a"]


_.falsy = function( v ) { return !v; }
_.truthy = function( v ) { return !!v; }
console.log( _.falsy( true ) ); //fasle
console.log( _.truthy( true ) ); //true

console.log( "---------------------------------------" );
_.some0 = function( list ){
	return !!_.find( list, _.identity );
}
_.every0 = function ( list ){
	return _.filter( list, _.identity ).length == list.length;
}

console.log( _.some0( [ 0, null, 2 ] ) ); //true
console.log( _.some0( [ 0, null, false ] ) ); //false

console.log( _.every0( [ 0, null, 2 ] ) ); //false
console.log( _.every0( [ {}, true, 2 ] ) ); //true


console.log( "---------------------------------------" );

function not( v ) { return !v; }

function beq( a ) {
	return function( b ){
		return a === b;
	}
}

function positive( list ){
	return _.find( list, _.identity );
}

function negativeIndex( list ){
	return _.findIndex( list, not );
}

_.some = function( list ){
	return not( not( positive( list ) ) );
}
/*_.every = function( list ){
	return beq( -1 )( _.findIndex( list , not ) );
}*/
_.every = function( list ){
	return beq( -1 )( negativeIndex( list ) );
}

console.log( _.findIndex( users , not ) );

console.log( _.some( [ 0, null, 2 ] ) ); //true
console.log( _.some( [ 0, null, false ] ) ); //false

console.log( _.every( [ 0, null, 2 ] ) ); //false
console.log( _.every( [ {}, true, 2 ] ) ); //true












