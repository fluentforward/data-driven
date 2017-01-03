/*!
 * data-driven
 * Copyright(c) 2013 Fluent Software Solutions Ltd <info@fluentsoftware.co.uk>
 * MIT Licensed
 */

/**
 * Replaces all tokens in a given test title. This only supports Object lookups using dot notation.
 *
 * @param {Array} result Results from the RegExp.prototype.exec invocation
 * @param {Object} testData The test data set from which we can extract values
 * @param {String} title The original test title
 * @return {String} The test title with all tokens replaced with their respective values
 */
function replaceTitleTokens(result, testData, title) {
    var root = testData;

    // Extract the value
    result[1].split('.').forEach(function (key) {
        root = root[key];
    });

    return title.replace(result[0], root);
}

module.exports = function(data, fn) {
    var mochaIt = it;
    var mochaBefore = before;
    // Regex used to find tokens, e.g. {foo.bar}, {foo}
    var re = /{([0-9a-zA-Z_$\._]+)}/g;

    data.forEach(function(testData) {
        try {
            it = function(title, f) {
                var result;

                for (var key in testData) {
                    if (testData.hasOwnProperty(key)) {
                        while (result = re.exec(title)) {
                            title = replaceTitleTokens(result, testData, title);
                        }
                    }
                }

                if (f !== undefined) {
                    var testFn = f.length < 2 ?
                        function() {
                            return f.call(this,testData)
                        } :
                        function(done) {
                            return f.call(this,testData,done)
                        }
                }

                mochaIt(title, testFn);
            };

            before = function(f) {
                var testFn = f.length < 2 ?
                    function() {
                        return f.call(this,testData)
                    } :
                    function(done) {
                        return f.call(this,testData,done)
                    }

                mochaBefore(testFn);
            };

            fn();
        } finally {
            it = mochaIt;
            before = mochaBefore;
        }
    })
};
