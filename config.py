import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key')
    DEBUG = os.getenv('DEBUG', False)
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    API_KEY = os.getenv('API_KEY', '')

if __name__ == '__main__':
    print(f'Debug mode: {Config.DEBUG}')
