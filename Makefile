
all: test

test: test-unit

test-unit:
	@./node_modules/mocha/bin/mocha test/*.js		

.PHONY: test