.PHONY: dev lint list
dev:
	@echo "Starting development server..."
	@docker-compose run builder "/bin/bash" "-c" "yarn install && yarn dev"
lint:
	@echo "Linting..."
	docker-compose run builder "/bin/bash" "-c" "yarn lint"
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'