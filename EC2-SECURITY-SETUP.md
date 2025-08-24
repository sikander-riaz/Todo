# EC2 Security Group Configuration

## Required Ports for Todo App Deployment

Configure your EC2 Security Group with these inbound rules:

### Essential Ports

| Port | Protocol | Source | Purpose | Priority |
|------|----------|---------|---------|----------|
| **3000** | TCP | 0.0.0.0/0 | Main application access | ⭐ REQUIRED |
| **22** | TCP | Your IP/0.0.0.0/0 | SSH access for management | ⭐ REQUIRED |

### Optional Ports (Recommended)

| Port | Protocol | Source | Purpose | When to Use |
|------|----------|---------|---------|-------------|
| **80** | TCP | 0.0.0.0/0 | HTTP redirect to 3000 | If adding reverse proxy |
| **443** | TCP | 0.0.0.0/0 | HTTPS with SSL certificate | If adding SSL/TLS |

## AWS Console Setup Steps

### 1. Navigate to EC2 Security Groups
```
AWS Console → EC2 → Network & Security → Security Groups
```

### 2. Select Your Instance's Security Group
- Find your EC2 instance
- Note the Security Group name/ID
- Click on the Security Group

### 3. Configure Inbound Rules
Click **"Edit inbound rules"** and add:

#### Rule 1: Application Access
- **Type**: Custom TCP
- **Port**: 3000
- **Source**: 0.0.0.0/0 (Anywhere IPv4)
- **Description**: Todo App - Main Application Port

#### Rule 2: SSH Access
- **Type**: SSH
- **Port**: 22  
- **Source**: Your IP (recommended) or 0.0.0.0/0 (less secure)
- **Description**: SSH Management Access

#### Rule 3: HTTP (Optional)
- **Type**: HTTP
- **Port**: 80
- **Source**: 0.0.0.0/0
- **Description**: HTTP Redirect to App

#### Rule 4: HTTPS (Optional)
- **Type**: HTTPS  
- **Port**: 443
- **Source**: 0.0.0.0/0
- **Description**: HTTPS with SSL

### 4. Save Rules
Click **"Save rules"** to apply changes.

## Security Best Practices

### ✅ Recommended
- Restrict SSH (Port 22) to your IP address only
- Use HTTPS (443) instead of HTTP (80) in production
- Regularly review and update security group rules
- Use descriptive names for rules

### ❌ Avoid
- Opening unnecessary ports
- Using 0.0.0.0/0 for SSH unless absolutely necessary
- Leaving default ports exposed
- Forgetting to remove temporary rules

## Testing Port Configuration

After configuring security groups, test your setup:

```bash
# Test SSH access
ssh -i your-key.pem ubuntu@your-ec2-ip

# Test application port (after deployment)
curl http://your-ec2-ip:3000/api/health

# Test web access
curl http://your-ec2-ip:3000
```

## Firewall Configuration (Ubuntu/EC2)

If using Ubuntu, ensure the OS firewall allows the ports:

```bash
# Allow application port
sudo ufw allow 3000/tcp

# Allow SSH  
sudo ufw allow 22/tcp

# Enable firewall (if not already enabled)
sudo ufw --force enable

# Check status
sudo ufw status
```

## Common Issues

### Port 3000 Not Accessible
1. ✅ Check Security Group has port 3000 open
2. ✅ Verify application is running: `ps aux | grep node`
3. ✅ Check if port is bound: `netstat -tulpn | grep :3000`
4. ✅ Test from EC2 instance: `curl localhost:3000`

### SSH Connection Refused
1. ✅ Verify port 22 is open in Security Group
2. ✅ Check your IP address matches the allowed source
3. ✅ Verify SSH key permissions: `chmod 400 your-key.pem`
4. ✅ Use correct username (ubuntu, ec2-user, etc.)

### Application Timeout
1. ✅ Check if process is running
2. ✅ Review application logs: `tail -f ~/vite-todo/app.log`
3. ✅ Verify port binding in app configuration
4. ✅ Check system resources: `htop` or `top`

---

**Need help?** Check the main README.md troubleshooting section or open an issue.
