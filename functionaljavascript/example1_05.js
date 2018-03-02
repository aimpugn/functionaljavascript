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
var ages = list => map( list, v => v.age );
var names = list => map( list, v => v.name );

console.log( log_length( ages( filter( users, under_30 ) ) ) );
console.log( log_length( names( filter( users, over_30 ) ) ) );


