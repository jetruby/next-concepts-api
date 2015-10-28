API_KEY := $(shell cat ~/.ftapi 2>/dev/null)
GIT_HASH := $(shell git rev-parse --short HEAD)
TEST_HOST := "ft-concepts-api-branch-${GIT_HASH}"

# export PORT=3005

.PHONY: test

install:
	origami-build-tools install --verbose

test:
	build-production
	export ELASTIC_SEARCH_URL='http://123.foundcluster.com:9200/v1_api/item'; export HOSTEDGRAPHITE_APIKEY=123; export ENVIRONMENT=production; mocha --reporter spec -i tests/server/
	verify

test-debug:
	mocha --debug-brk --reporter spec -i tests/server/

run:
	nbt run --local

build:
	nbt build --dev

build-production:
	nbt build

verify:
	nbt verify --skip-layout-checks

clean:
	git clean -fxd

deploy:
	nbt configure
	nbt deploy

provision:
	nbt provision ${TEST_HOST}
	nbt configure ft-next-concepts-api ${TEST_HOST} --overrides "NODE_ENV=branch,DEBUG=*"
	nbt deploy ${TEST_HOST} --skip-enable-preboot

tidy:
	nbt destroy ${TEST_HOST}

