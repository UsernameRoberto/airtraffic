✨🛫 Live Air Traffic Control – Installation & Configuration Guide 🛬✨

A real-time Cesium-based Air Traffic Visualization System integrating aircraft telemetry, weather layers, and secure Apache authentication.

🔧 Requirements Feature Status
Feature	Status
🔒 SSL	✔️
🖥️ Apache Server	✔️
🌐 OpenSky API	✔️
☁️ OpenWeatherMap API	✔️
🗺️ Cesium Ion API	✔️
🌐 I. Required APIs

1️⃣ OpenSky API

Instruction image: opensky_token.png
(Google Drive link here, if applicable)

Create/manage your token:
OpenSky Account

2️⃣ OpenWeatherMap API

Instruction image: openweathermap_token.png
(Google Drive link here, if applicable)

Generate your API key:
OpenWeatherMap API

3️⃣ Cesium Ion API

Instruction image: cesium_ion_token.png
(Google Drive link here, if applicable)

Create/manage Ion access tokens:
Cesium Ion Tokens

📝 II. Required File Edits
📄 1. index.html

Update lines 8 and 10 with your HTTPS domain:

<!-- ADD YOUR WEB DOMAIN NAME -->
<script src="https://www.yourdomainname.com/Build/Cesium/Cesium.js"></script>

<!-- ADD YOUR WEB DOMAIN NAME -->
<link href="https://www.yourdomainname.com/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />


Please download Build Cesium Ion engine from here
https://drive.google.com/file/d/1PkPH5TfLXRWlhZwbmWnNS7HUc9KPa2zU/view?usp=sharing


⚠️ Important Notes:

Download Cesium: Cesium Download

Cesium Setup: Ensure you have only ONE Build subDirectory in your main air traffic directory for Cesium Engine.

Cesium Requires HTTPS.

📄 2. index.js

Edit lines 1, 2, 4, and 1742:

const defaultLat = 46.2237014771;
const defaultLng = 14.4575996399;

Cesium.Ion.defaultAccessToken = 'add_your_token';

// At line 1742: Add Openweathermap api key
const apiKey = "add_your_api_key";

📄 3. skyopen.php & opensky.php

Update lines 7 & 8:

// === CONFIG ===
$clientId = 'your_client_id_json_credentials';
$clientSecret = 'your_client_secret_json_credentials';

🔐 III. Apache Security Setup
1. Create .htpasswd

📁 Location (not in web root):

C:/xampp/.htpasswd


Generate user + password hash: htpasswd Generator

⚠️ Choose: Apache-specific salted MD5

After saving, restart Apache.

2. Protect PHP Files with .htaccess

Add the following to your .htaccess file to secure PHP endpoints:

<FilesMatch "^(index|opensky)\.php$">
     AuthType Basic
     AuthName "Restricted Access"
     AuthUserFile C:/xampp/.htpasswd
     Require valid-user
</FilesMatch>


To protect more files, update the pattern to match additional PHP files:

(index|opensky|admin|weather)\.php$

📦 Gzipped JSON Support
RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{REQUEST_FILENAME}.gz -f
RewriteRule ^(.*)\.json$ $1.json.gz [L]

<FilesMatch "\.json\.gz$">
    RemoveType .gz
    AddType application/json .gz
    Header set Content-Encoding gzip
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>


Ensure the following files exist in your directory:

basic-ac-db.json: Google Drive Link

basic-ac-db.json.gz: Google Drive Link

After saving the changes, restart Apache.

🚀 Project Summary

This system integrates:

🌍 Cesium Ion — 3D globe visualization

✈️ OpenSky — Live aircraft telemetry

☁️ OpenWeatherMap — Atmospheric/weather layers

🔐 Apache Auth — Secure restricted access

📜 License

(Choose one or more licenses: MIT, Apache-2.0, GPL3, etc.)

Status Check:

To verify if OpenSky API is functioning correctly, run the following in your command line (CMD):

curl -I https://opensky-network.org/api/


Expected Response: If you get a 503 error, it means the servers are down, and OpenSky is temporarily unavailable.

✨ Live Demo

You can explore the project live on CodePen:
Live Demo on CodePen

https://codepen.io/roberto-puhan-gmail-com/pen/gbrdeaY
