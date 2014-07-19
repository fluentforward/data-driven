var dataDriven = require('../../')
  , should = require('should')

describe('data-driven', function() {
	it('should not affect tests outside of the dataDriven function', function() {

	})

	dataDriven([{key: 'key1',prop: 'value1'},{key: 'key2', prop: 'value2'}], function() {
		it('should run the data driven function with {key}', function(ctx) {
			(ctx.key == 'key1' || ctx.key == 'key2').should.be.true
			ctx.prop.should.equal('value1') // fail one test
		})

		it('should allow async data driven testing with {key} value {prop}', function(ctx, done) {
			done()
		})

		it('should allow timeouts for async data driven testing with {key}', function(ctx, done) {			
		})
	})

	describe('this object:', function() {
		var sharedData = 'dummy data'

		beforeEach(function() {
			this.sharedData = sharedData
		})

		dataDriven([{}], function() {
			it('should pass appropriate this object to sync test function', function(ctx) {
				this.sharedData.should.equal(sharedData)
			})

			it('should pass appropriate this object to async test function', function(ctx, done) {
				this.sharedData.should.equal(sharedData)
				done()
			})
		})
	})
})