.PHONY: install test run-dev docker-build docker-up

install:
	pip install -r backend/requirements.txt
	cd frontend && npm install

test:
	python -m pytest backend/
	python -m ruff check backend/
	cd frontend && npm test

run-dev:
	@echo "This requires two terminals or a process manager."
	@echo "Backend: cd backend && python main.py"
	@echo "Frontend: cd frontend && npm run dev"

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

clean:
	rm -rf backend/__pycache__
	rm -rf backend/.pytest_cache
	rm -rf backend/tests/__pycache__
