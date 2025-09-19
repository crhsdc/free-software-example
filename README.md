# API Health Monitoring Dashboard

A professional monitoring dashboard for API health with Django backend and React frontend.

## Architecture Diagram

```
┌─────────────────┐    HTTP Requests     ┌─────────────────┐
│                 │    (every 2 sec)     │                 │
│  React Frontend │◄────────────────────►│  Django Backend │
│  (Port 3000)    │                      │  (Port 8000)    │
│                 │                      │                 │
└─────────────────┘                      └─────────────────┘
         │                                         │
         │                                         │
    ┌────▼────┐                              ┌────▼────┐
    │ ngrok   │                              │ ngrok   │
    │ Tunnel  │                              │ Tunnel  │
    │ (HTTPS) │                              │ (HTTPS) │
    └────┬────┘                              └────┬────┘
         │                                         │
         ▼                                         ▼
┌─────────────────┐                      ┌─────────────────┐
│   Public URL    │                      │   Public URL    │
│ def456.ngrok.io │                      │ abc123.ngrok.io │
└─────────────────┘                      └─────────────────┘

API Endpoints:
├── /api/hello/        (Hello Service)
├── /api/status/       (System Status)
├── /api/database/     (DB Health)
├── /api/third-party/  (External APIs)
├── /api/auth/         (Authentication)
└── /api/monitoring/   (System Resources)
```

## Features

- **Real-time Monitoring**: Auto-refresh every 2 seconds
- **6 Service Endpoints**: Hello, Status, Database, Third-party, Auth, System Monitor
- **Professional UI**: Dark theme with status indicators and metrics
- **Health Tracking**: Success rates, response times, uptime monitoring

## Project Structure

```
├── backend/          # Django API
│   ├── api/         # Django app
│   ├── manage.py    # Django management
│   └── requirements.txt
├── frontend/        # React dashboard
│   ├── src/App.js   # Main component
│   ├── index.html   # HTML template
│   └── package.json
└── README.md
```

## Quick Start

### Backend (Django API)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React Dashboard)

```bash
cd frontend
npm install
npm start
```

Access dashboard at `http://localhost:3000`

## API Endpoints

- `GET /api/hello/` - Hello service with random messages
- `GET /api/status/` - System status monitoring
- `GET /api/database/` - Database health and connections
- `GET /api/third-party/` - External service integrations
- `GET /api/auth/` - Authentication service status
- `GET /api/monitoring/` - System resource monitoring

## Simple Hosting with ngrok

### 1. Install ngrok

```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

### 2. Expose Backend API

```bash
# Start Django server
cd backend
python manage.py runserver

# In new terminal, expose port 8000
ngrok http 8000
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

### 3. Update Frontend API URLs

Edit `frontend/src/App.js` and replace all `http://127.0.0.1:8000` with your ngrok URL:

```javascript
// Replace these lines in App.js:
const response = await fetch('http://127.0.0.1:8000/api/hello/');
const response = await fetch('http://127.0.0.1:8000/api/status/');
const response = await fetch('http://127.0.0.1:8000/api/database/');
const response = await fetch('http://127.0.0.1:8000/api/third-party/');
const response = await fetch('http://127.0.0.1:8000/api/auth/');
const response = await fetch('http://127.0.0.1:8000/api/monitoring/');

// With your ngrok URL:
const response = await fetch('https://abc123.ngrok.io/api/hello/');
const response = await fetch('https://abc123.ngrok.io/api/status/');
const response = await fetch('https://abc123.ngrok.io/api/database/');
const response = await fetch('https://abc123.ngrok.io/api/third-party/');
const response = await fetch('https://abc123.ngrok.io/api/auth/');
const response = await fetch('https://abc123.ngrok.io/api/monitoring/');
```

### 4. Expose Frontend Dashboard

```bash
# Start React app (if not already running)
cd frontend
npm start

# In new terminal, expose port 3000
ngrok http 3000
```

**Example ngrok output:**
```
Session Status                online
Account                       your-account (Plan: Free)
Version                       3.1.0
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://def456.ngrok.io -> http://localhost:3000
```

### 5. Share Your Dashboard

**Public URLs:**
- **Backend API**: `https://abc123.ngrok.io`
- **Frontend Dashboard**: `https://def456.ngrok.io`

**Test the setup:**
```bash
# Test backend API
curl https://abc123.ngrok.io/api/hello/

# Access dashboard in browser
open https://def456.ngrok.io
```

### 6. Complete Example Workflow

```bash
# Terminal 1: Start Django
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2: Expose Django API
ngrok http 8000
# Copy URL: https://abc123.ngrok.io

# Terminal 3: Update frontend and start
cd frontend
# Edit src/App.js with ngrok URL
npm start

# Terminal 4: Expose React app
ngrok http 3000
# Copy URL: https://def456.ngrok.io
```

**Result**: Share `https://def456.ngrok.io` for public access to your monitoring dashboard!

## ngrok Benefits

- **Instant Public Access**: No deployment or server setup
- **HTTPS Tunneling**: Secure connections out of the box
- **Perfect for Demos**: Share your work immediately
- **Development Testing**: Test webhooks and external integrations
- **Cross-platform**: Works on any device with internet access

## Technologies

- **Backend**: Django, Django REST Framework
- **Frontend**: React (CDN), Vanilla JavaScript
- **Styling**: CSS-in-JS with professional dark theme
- **Hosting**: ngrok for simple public access

## Development

The dashboard simulates realistic monitoring scenarios:
- Database connection issues (10% chance)
- Third-party service timeouts (15% chance)
- Dynamic metrics and health indicators
- Professional monitoring interface