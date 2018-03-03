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
//나이와 이름 추출에서 for문이 중복
//목록과 반복자를 받아서 for문 처리를 해주는 함수 작성
//new_list에 무엇을 push할지 iteratee에 위임
function map( list, iteratee ) {
	var new_list = [];
	for( var i = 0, len = list.length; i < len; i++ ){
		new_list.push( iteratee( list[ i ] ) );
	}
	return new_list;
}

/*var ages = map( 
		filter(users, function(user) { return user.age < 30 }), 
		function( user ) { return user.age; } );
console.log( ages.length );
console.log( ages );

//predicate
var names = map( 
filter(users, function(user) { return user.age >= 30 }), 
function( user ) { return user.name; } );
console.log( names.length ); //3
console.log( names );*/

//변수 할당 없애기 
function log_length ( value ){
	console.log( value.length );
	return value;
}
console.log( log_length( map( 
				filter(users, function(user) { return user.age < 30 }), 
				function( user ) { return user.age; } ) ) );
console.log( log_length( map( 
				filter(users, function(user) { return user.age >= 30 }), 
				function( user ) { return user.name; } ) ) );
