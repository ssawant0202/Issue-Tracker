import configparser
from pathlib import Path

def get_config():
    config = configparser.ConfigParser()
    config_path = Path(__file__).resolve().parent / "properties.ini"  # api_tests/config/properties.ini
    read_files = config.read(config_path)

    if not read_files:
        raise FileNotFoundError(f"Could not read config file at: {config_path}")

    return config