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
})