.PHONY: run back front

run :
	docker-compose up -d

clean:
	docker-compose down -v
	
back:
	docker-compose logs -f --tail 20 back

update-back:
	docker-compose exec back npm i

test-back:
	docker-compose exec back npm test $(dir)

front:
	docker-compose logs -f --tail 20 front

update-front:
	docker-compose exec front npm i