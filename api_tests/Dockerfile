FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/api_tests

ENV PYTHONPATH=/app
CMD ["pytest", "api_tests/tests", "-v"]