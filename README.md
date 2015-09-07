data-driven
===========

data-driven is an extension to the [mocha](http://visionmedia.github.io/mocha/) JavaScript testing framework that (as the name implies) data driven testing.

data-driven allows tests to be wrapped in a block that will run each test within that block for every item in the given data set. 

###Specifying test data

Test data is simply specified as an array of objects. The objects can contain any data you like that is relevant to your particular tests.

The test functions within that block work exactly as they do with regular mocha, with the exception that they get passed an additional first  parameter with the particular test data to execute the test with.

###Describing tests

Test descriptions can have placeholders wrapped in ```{}```. Any placeholders that match items in the test object will be replaced with the value for that test run e.g. if your test data looked like ```[{name: 'bob'},{name: 'alice'}]```, and you had a description like ```it('should work with a person called {name}', ...```, then you would end up with a test named *should work with a person called bob*, and another test named *should work with a person called alice* when the tests are actually executed.

## Example

```javascript
var data_driven = require('data-driven')

describe('Array', function() {
  describe('#indexOf()', function(){
		data_driven([{value: 0},{value: 5},{value: -2}], function() {
	    	it('should return -1 when the value is not present when searching for {value}', function(ctx){
	      		assert.equal(-1, [1,2,3].indexOf(ctx.value));
	    	})
	    })
  	})
})

```

You aren't limited to single tests within the data\_driven block. You can have as many as you like, and can also have a mixture of tests inside and outside of the data\_driven block within a single test case, and can also have multiple data\_driven blocks within your code too.

###Asynchronous tests

Asynchronous testing can also be performed as with regular mocha

```javascript

describe('some async function', function() {
	data_driven([{name: 'negative', data: -1, expected: -10},{name: 'positive', data: 1, expected: 10}], function() {
		it('should do something ascynchronous with {name} numbers', function(ctx,done) {
			some_async_call(ctx.data, function(result) {
				assert.equal(ctx.expected, result)
				done()
			})
		})
	}) 
})

```

## Installation

To start using data-driven, simply add a dependency to ```data-driven``` ```1.2.1``` to your package.json, and run ```npm install```.

From the creators of [uncademy.io](http://uncademy.io). Interactive courses for software developers.
