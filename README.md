TypeAssert
==========

Simple run-time type checker for JS. Ensures that function arguments match a specified type signature.

## How can I use it?
Include the **typeassert.js** file into your project via HTML `<script>` tag or AMD/CommonJS `require()`. Specify the allowed argument types on the the first line of any function:

```javascript
function congrats(name, age){
	typeAssert(arguments, [String, Number]);
	return "Congratulations, " + name + "! You are " + age + " years old."; 
}
congrats("John", 27);
```
The agruments will be checked any time the function is invoked. A `TypeError` will be thrown, if any of the arguments does not match the specified type.

```javascript
congrats("John", "Nineteen");
// Uncaught TypeError: TypeAssert failed for argument 2
```

## How are types defined?
Constructor functions form the basic building blocks of type definitions. Under the hood TypeAssert makes an `instanceof` check against the constructor. Primitive types *number*, *boolean* and *string* are represented with the corresponding constructors `Number`, `Boolean` and `String`.

```javascript
function Car(make){
	this.make = make;
}

function congrats(name, car){
	typeAssert(arguments, [String, Car]);
	return "Congratulations, " + name + " on your new " + car.make; 
}
congrats("John", new Car("Toyota") );
```

## How can I define the type of array elements?
Use the array literal `[` `]` with a constructor function inside to define an array of certain type.

```javascript
function congrats(name, cars){
	typeAssert(arguments, [String, [Car]]);
	return "Congratulations, " + name + ". You have " + cars.length + " cars"; 
}
congrats("John", new Car("Toyota") );
```

## How about more complex types?
Object interfaces can be defined with JS object literals describing the required properties & methods.

```javascript
function congrats(data){
	typeAssert(arguments, [{toString: Function, location: {latitude: Number, longitude: Number}}]);
	return "Your location is " + data.toString(); 
}
congrats({
    toString: function(){
        return "(lat: " + this.location.latitude + ", lng: " + this.location.longitude + ")";
    }, 
    location: {latitude: 60.34, longitude: 24.45}
});
```

## Why should I use TypeAssert?
You probably shouldn't. The code was written as a learning exercise to understand the JS type system better, and to construct a idiomatic type checker based on Constructor functions. If you need a production ready type checker, see http://flowtype.org/