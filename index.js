/*!
 * data-driven
 * Copyright(c) 2013 Fluent Software Solutions Ltd <info@fluentsoftware.co.uk>
 * MIT Licensed
 */

 module.exports = function(data, fn) {
    var mochaIt = it
    
    data.forEach(function(testData) {
        try {
            it = function(title, f) {
                
                for (var key in testData) {
                    title = title.replace('{'+key+'}',testData[key])
                }

                var testFn = f.length < 2 ? 
                    function() {
                        f(testData)
                    } : 
                    function(done) {
                        f(testData,done)
                    }
                    
                mochaIt(title, testFn)
            }

            fn()
        } finally {
            it = mochaIt
        }
    })
}