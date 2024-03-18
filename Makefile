.PHONY: dev build build-docker-image push-docker-image lint list
dev:
	@echo "Starting development server..."
	@docker-compose run builder "/bin/bash" "-c" "yarn install && yarn dev"
build:
	@echo "Building..."
	@docker-compose run builder "/bin/bash" "-c" "yarn build"
build-docker-image: build
	@docker buildx build --platform linux/amd64 ./ -f ./dev/runner.Dockerfile --squash -t bertuz/gmadrid-natacion-bot
	@echo "Docker image built successfully"
push-docker-image: build-docker-image
	@docker push bertuz/gmadrid-natacion-bot
	@echo "Docker image pushed successfully"
lint:
	@echo "Linting..."
	docker-compose run builder "/bin/bash" "-c" "yarn lint"
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'