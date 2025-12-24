import requests
from api_tests.core.endpoints import BASE_URL, TIMEOUT

class APIClient:
    def __init__(self, token: str | None = None ):
        self.se = requests.Session()
        self.se.headers.update({"Accept": "application/json"})
        if token: 
            self.se.headers.update({"Authorization": f"Bearer {token}"})

    def _url(self, path: str) -> str:
        return BASE_URL.rstrip("/") + "/" + path.lstrip("/")

    def get(self, path: str):
        return self.se.get(self._url(path), timeout=TIMEOUT)

    def post(self, path: str, json: dict):
        return self.se.post(self._url(path), json=json, timeout=TIMEOUT)

    def patch(self, path: str, json: dict):
        return self.se.patch(self._url(path), json=json, timeout=TIMEOUT)

    def delete(self, path: str):
        return self.se.delete(self._url(path), timeout=TIMEOUT)