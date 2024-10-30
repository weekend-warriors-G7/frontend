.PHONY: clean, build, up_local, down_local

clean:
	rm -rf build || rd /S .\build

build: clean
	npm run build

docker_build: build
	docker build -t gabjea/weekend-warriors-frontend:latest .

up_local: down_local docker_build
	docker run --name frontend -d -p 3000:3000 gabjea/weekend-warriors-frontend:latest

docker_stop:
	-docker stop frontend || true

down_local: docker_stop
	-docker rm frontend || true