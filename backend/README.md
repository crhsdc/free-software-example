# Simple Django API

## Setup and Run Instructions

1. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Start the server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

- `GET /api/hello/` - Returns a hello world message
- `GET /api/status/` - Returns API status

## Test the API

```bash
curl http://127.0.0.1:8000/api/hello/
curl http://127.0.0.1:8000/api/status/
```