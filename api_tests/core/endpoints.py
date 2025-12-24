from api_tests.config.configurations import get_config

cfg = get_config()

BASE_URL = cfg["API"]["base_url"]
TIMEOUT = int(cfg["API"].get("timeout_seconds", "10"))
ISSUE_CREATE = cfg["ENDPOINTS"]["issue_create"]
ISSUE_BY_ID = cfg["ENDPOINTS"]["issue_by_id"]
REGISTER = cfg["ENDPOINTS"]["register_user"]


