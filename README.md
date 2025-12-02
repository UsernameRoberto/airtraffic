<<<<<<< HEAD
✨🛫 Live Air Traffic Control – Installation & Configuration Guide 🛬✨

A real-time Cesium-based Air Traffic Visualization System integrating aircraft telemetry, weather layers, and secure Apache authentication.

🔧 Requirements
Feature	Status
🔒 SSL Implemented	✔️
🖥️ Apache Server	✔️
🌐 OpenSky API	✔️
☁️ OpenWeatherMap API	✔️
🗺️ Cesium Ion API	✔️
🌐 I. Required APIs
1️⃣ OpenSky API

Instruction image: opensky_token.png
Google Drive:
(you may remove these if they are private)

Create/manage your token:
https://opensky-network.org/my-opensky/account

2️⃣ OpenWeatherMap API

Instruction image: openweathermap_token.png

Generate your API key:
https://openweathermap.org/api

3️⃣ Cesium Ion API

Instruction image: cesium_ion_token.png

Create/manage Ion access tokens:
https://ion.cesium.com/tokens?page=1

📝 II. Required File Edits
📄 1. index.html

Update lines 8 and 10 with your HTTPS domain:

<!-- ADD YOUR WEB DOMAIN NAME -->
<script src="https://www.yourdomainname.com/Build/Cesium/Cesium.js"></script>

<!-- ADD YOUR WEB DOMAIN NAME -->
<link href="https://www.yourdomainname.com/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />


⚠️ Cesium requires HTTPS.

📄 2. index.js

Edit lines 1, 2, 4, and 1742:

const defaultLat = 46.2237014771;
const defaultLng = 14.4575996399;

Cesium.Ion.defaultAccessToken = 'add_your_token';

// At line 1742:
const apiKey = "add_your_api_key";

📄 3. skyopen.php & opensky.php

Update lines 7 & 8:

// === CONFIG ===
$clientId = 'your_client_id_json_credentials';
$clientSecret = 'your_client_Secret_json_credentials';

🔐 III. Apache Security Setup
1. Create .htpasswd

📁 Location (not in web root):

C:/xampp/.htpasswd


Generate user + password hash:
https://hostingcanada.org/htpasswd-generator/

⚠️ Choose: Apache-specific salted MD5

Restart Apache after saving.

🔐 IV. Protect PHP Files with .htaccess

Add:

<FilesMatch "^(index|opensky)\.php$">
     AuthType Basic
     AuthName "Restricted Access"
     AuthUserFile C:/xampp/.htpasswd
     Require valid-user
</FilesMatch>


To protect more files:

(index|opensky|admin|weather)\.php$

📦 Gzipped JSON support
RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{REQUEST_FILENAME}.gz -f
RewriteRule ^(.*)\.json$ $1.json.gz [L]

<FilesMatch "\.json\.gz$">
    RemoveType .gz
    AddType application/json .gz
    Header set Content-Encoding gzip
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>


Ensure both files exist:

yourdirectory/basic-ac-db.json
yourdirectory/basic-ac-db.json.gz


Restart Apache.

🚀 Project Summary

This system integrates:

🌍 Cesium Ion — 3D globe visualization

✈️ OpenSky — Live aircraft telemetry

☁️ OpenWeatherMap — Atmospheric/weather layers

🔐 Apache Auth — Secure restricted access

📜 License

(Choose one: MIT, Apache-2.0, GPL3, etc.)
=======
# airtraffic
Live Air Traffic Radar
>>>>>>> b8743b49372f6eef24ee13a4efe1e7d498e978c6
