/*!
 * data-driven
 * Copyright(c) 2013 Fluent Software Solutions Ltd <info@fluentsoftware.co.uk>
 * MIT Licensed
 */

 module.exports = function(data, fn) {
    var mochaIt = it
    var mochaDescribe = describe
    
    data.forEach(function(testData) {
        function replaceVariables(title) {
            for (var key in testData) {
                title = title.replace('{'+key+'}',testData[key])
            }
            return title;
        }

        try {
            it = function(title, f) {
                
                var testFn = f.length < 2 ? 
                    function() {
                        f(testData)
                    } : 
                    function(done) {
                        f(testData,done)
                    }
                    
                mochaIt(replaceVariables(title), testFn)
            }

            describe = function(title, f) {

                mochaDescribe(replaceVariables(title), f)
            }

            fn()
        } finally {
            it = mochaIt
            describe = mochaDescribe
        }
    })
}
