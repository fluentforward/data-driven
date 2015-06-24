'use strict';

/**
 * Module dependencies.
 */
var Mocha = require('mocha');
var should = require('should');

describe('data driven extension', function() {

	it('should run data driven tests for each data item in the list', function(done) {
		var mocha = new Mocha
	  , passed = []
	  , failed = []

		function reporter(runner) {

			runner.on('pass', function(test) {
				passed.push(test.title)
			})

			runner.on('fail', function(test) {
				failed.push(test.title)
			})
		}

		mocha.addFile('test/mocha/tests.js')
		mocha.reporter(reporter)
		mocha.timeout(100)

		mocha.run(function() {
			passed.should.eql([
				'should not affect tests outside of the dataDriven function',
				'should run the data driven function with key1',
				'should allow async data driven testing with key1 value value1',
				'should allow async data driven testing with key2 value value2',
				'should pass appropriate this object to sync test function',
				'should pass appropriate this object to async test function'
				])

			failed.should.eql([
				'should allow timeouts for async data driven testing with key1',
  				'should run the data driven function with key2',
  				'should allow timeouts for async data driven testing with key2'
				])

			done()
		})
	})

})

