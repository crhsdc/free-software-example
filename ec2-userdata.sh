#!/bin/bash

# Update system
dnf update -y

# Install Python 3 and pip
dnf install -y python3 python3-pip git

# Install Node.js 18
dnf install -y nodejs npm

# Clone repository (replace with your repo URL)
cd /home/ec2-user
sudo -u ec2-user git clone https://github.com/crhsdc/free-software-example.git

# Setup Django backend
cd free-software-example/backend
sudo -u ec2-user python3 -m venv venv
sudo -u ec2-user bash -c 'source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate'

# Setup React frontend
cd ../frontend
sudo -u ec2-user npm install

# Create systemd services
cat > /etc/systemd/system/django-api.service << EOF
[Unit]
Description=Django API
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/free-software-example/backend
Environment=PATH=/home/ec2-user/free-software-example/backend/venv/bin
ExecStart=/home/ec2-user/free-software-example/backend/venv/bin/python manage.py runserver 0.0.0.0:8000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

cat > /etc/systemd/system/react-app.service << EOF
[Unit]
Description=React App
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/free-software-example/frontend
ExecStart=/usr/bin/npm start
Environment=HOST=0.0.0.0
Environment=PORT=3000
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start services
systemctl daemon-reload
systemctl enable django-api react-app
systemctl start django-api react-app

# Open ports in security group (configure manually)
echo "Configure Security Group to allow:"
echo "- Port 8000 (Django API)"
echo "- Port 3000 (React Frontend)"
echo "- Port 22 (SSH)"