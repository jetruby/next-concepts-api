API_KEY := $(shell cat ~/.ftapi 2>/dev/null)
GIT_HASH := $(shell git rev-parse --short HEAD)
TEST_HOST := "ft-next-concepts-api-branch-${GIT_HASH}"
TEST_URL := "http://ft-next-concepts-api-branch-${GIT_HASH}.herokuapp.com/__conepts/top-stories/uk"
ELASTIC_SEARCH_URL := $(shell cat ~/.nextElasticSearchUrl 2>/dev/null)

# export PORT=3005

.PHONY: test

install:
	origami-build-tools install --verbose

test:
	nbt verify --skip-layout-checks
	export ELASTIC_SEARCH_URL='http://123.foundcluster.com:9200/v1_api/item'; export HOSTEDGRAPHITE_APIKEY=123; export ENVIRONMENT=production; mocha --reporter spec -i tests/server/

test-debug:
	mocha --debug-brk --reporter spec -i tests/server/

run:
ifeq ($(ELASTIC_SEARCH_URL),)
	@echo "You need an elasticSearch url!  Speak to one of the next team to get one"
	exit 1
endif
ifeq ($(API_KEY),)
	@echo "You need a Content API v1 production key!  Speak to someone from Next or email contentapisupport@ft.com to get one"
	exit 1
endif
	export ELASTIC_SEARCH_URL=${ELASTIC_SEARCH_URL}; export HOSTEDGRAPHITE_APIKEY=123; export apikey=${API_KEY}; export ENVIRONMENT=development; nbt run --local

build-production:
	nbt build --skip-layout-checks

watch:
	nbt build --dev --watch

clean:
	git clean -fxd

deploy:
	nbt configure
	nbt deploy-hashed-assets
	nbt deploy

provision:
	nbt provision ${TEST_HOST}
	nbt configure ft-next-engels-v002 ${TEST_HOST} --overrides "NODE_ENV=branch,DEBUG=*"
	nbt deploy-hashed-assets
	nbt deploy ${TEST_HOST}

tidy:
	nbt destroy ${TEST_HOST}

