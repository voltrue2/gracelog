init:

	@echo 'create git pre-commit hook'
	ln -s ../../lint.sh .git/hooks/pre-commit
	@echo 'adjust pre-commit hook file permission'
	chmod +x .git/hooks/pre-commit
	@echo 'install dependencies'
	npm install
	@echo 'done'

.PHONY: test
test:
	@echo 'test gracelog:'
	./node_modules/mocha/bin/mocha test/index.js --exit -s 10 -R spec -b

