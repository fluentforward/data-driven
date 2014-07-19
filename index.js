/*!
 * data-driven
 * Copyright(c) 2013 Fluent Software Solutions Ltd <info@fluentsoftware.co.uk>
 * MIT Licensed
 */

 module.exports = function(data, fn) {
    var mochaIt = it
    var mochaBefore = before

    data.forEach(function(testData) {
        try {
            it = function(title, f) {
                for (var key in testData) {
                    title = title.replace('{'+key+'}',testData[key])
                }

                if (f !== undefined) {
                    var testFn = f.length < 2 ?
                        function() {
                            f.call(this,testData)
                        } :
                        function(done) {
                            f.call(this,testData,done)
                        }
		}

                mochaIt(title, testFn)
            }

            before = function(f) {
                var testFn = f.length < 2 ?
                    function() {
                        f(testData)
                    } :
                    function(done) {
                        f(testData,done)
                    }

                mochaBefore(testFn)
            }

            fn()
        } finally {
            it = mochaIt
	    before = mochaBefore
        }
    })
}
