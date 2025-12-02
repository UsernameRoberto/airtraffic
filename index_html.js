const defaultLat = 46.2237014771;
const defaultLng = 14.4575996399;

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOWZmN2Q5MC1iMjBmLTQ0YTAtOTExMS02Mjg5NjQ4YThmM2EiLCJpZCI6MTEyNzQwLCJpYXQiOjE3NjQ2OTE0MTF9.QfGtKXTZqOe9K-RItvu2vFnM_6hTWOhPFl9XBMmPuag';
const viewer = new Cesium.Viewer('cesiumContainer', {
  shouldAnimate: true,
  timeline: false,
  animation: false,
  infoBox: false,
  selectionIndicator: false
});

//console.log(Cesium.VERSION);
let allowRainOverride = true;




	const fullscreenButton = document.createElement('button');
    fullscreenButton.type = 'button';
    fullscreenButton.className = 'cesium-button cesium-toolbar-button cesium-fullscreen-button';
    fullscreenButton.textContent = 'Fullscreen';
	fullscreenButton.setAttribute('id', 'fullscreen-button');
    fullscreenButton.addEventListener("click", toggle_fullscreen);
	
    fullscreenButton.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 
            7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
        <svg viewBox="0 0 24 24">
            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 
            11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>
    `;
    document.body.appendChild(fullscreenButton);

    // Listen for the 'Escape' key to exit fullscreen
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && document.fullscreenElement) {
            toggle_fullscreen();
        }
    });

    // Listen for fullscreenchange to update the button icon
    document.addEventListener("fullscreenchange", updateFullscreenIcon);

    // Initial icon update based on the current fullscreen state
    updateFullscreenIcon();


function toggle_fullscreen() {
    if (!document.fullscreenElement) {
        document.body.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Function to update the fullscreen button icon
function updateFullscreenIcon() {
    const isFullscreen = document.fullscreenElement;
    const fullscreenButton = document.getElementById('fullscreen-button');
    if (isFullscreen) {
        document.body.setAttribute("fullscreen", "");
    } else {
        document.body.removeAttribute("fullscreen");
    }
}




    // Find toolbar and append button
    const toolbarDiv = document.querySelector('.cesium-viewer-toolbar');
    if (toolbarDiv) {
        toolbarDiv.appendChild(fullscreenButton);
    }

    // Add custom CSS (can be in a separate CSS file)
    const style = document.createElement('style');
    style.innerHTML = `
        .cesium-fullscreen-button {
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
viewer.clock.shouldAnimate = true;
viewer.scene.backgroundColor = new Cesium.Color(0.53, 0.81, 0.92, 1.0);
//viewer.scene.globe.enableLighting = true;
viewer.scene.globe.baseColor = Cesium.Color.BLACK;
viewer.scene.light = new Cesium.SunLight();
viewer.scene.globe.enableLighting = true;
viewer.scene.skyAtmosphere.show = true; // Enables visual atmosphere
viewer.scene.sun.show = true; // Shows sun disk
viewer.scene.requestRender();

let stepDegreesAlt = 30;  // for altitude ticks major intervals
let stepDegrees = 30;     // for speed ticks major intervals
let lastSpeedDeg = 0;
let lastAltitudeDeg = 0;
let maxAltitude = 12000;
let altitude;
const planes = new Map();
const airport = { lat: 46.2237014771, lon: 14.4575996399 };
let selectedCountry;
const lastPositions = new Map();

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(airport.lon, airport.lat, 5000),
  duration: 3
});

const countryBounds = {
  "Afghanistan": { south: 29.38, north: 38.49, west: 60.53, east: 74.89 },
  "Åland Islands": { south: 59.7, north: 60.5, west: 19.8, east: 21.2 },
  "Albania": { south: 39.6, north: 42.7, west: 19.2, east: 21.1 },
  "Algeria": { south: 18.96, north: 37.11, west: -8.67, east: 11.98 },
  "American Samoa": { south: -14.35, north: -11.04, west: -172.53, east: -168.03 },
  "Andorra": { south: 42.4, north: 42.7, west: 1.4, east: 1.8 },
  "Angola": { south: -18.04, north: -4.39, west: 11.67, east: 24.08 },
  "Anguilla": { south: 17.05, north: 18.4, west: -63.17, east: -62.94 },
  "Antarctica": { south: -90, north: -60, west: -180, east: 180 },
  "Antigua and Barbuda": { south: 16.99, north: 17.85, west: -62.54, east: -61.69 },
  "Argentina": { south: -55.05, north: -21.78, west: -73.58, east: -53.64 },
  "Armenia": { south: 38.8, north: 41.3, west: 43.4, east: 46.6 },
  "Aruba": { south: 12.3, north: 12.6, west: -70.1, east: -69.8 },
  "Australia": { south: -44.04, north: -10.68, west: 112.91, east: 153.63 },
  "New South Wales": { south: -37.5, north: -28.0, west: 141.0, east: 154.0 },
  "Victoria": { south: -39.2, north: -34.0, west: 141.0, east: 150.5 },
  "Queensland": { south: -29.0, north: -10.5, west: 138.0, east: 154.0 },
  "South Australia": { south: -38.0, north: -26.0, west: 129.0, east: 141.0 },
  "Western Australia": { south: -35.0, north: -13.0, west: 112.9, east: 129.0 },
  "Northern Territory": { south: -25.0, north: -10.7, west: 129.0, east: 138.0 },
  "Tasmania": { south: -43.7, north: -40.5, west: 144.0, east: 148.5 },
  "Australian Capital Territory": { south: -35.9, north: -35.1, west: 148.7, east: 149.5 },  
  "Austria": { south: 46.2, north: 49.0, west: 9.5, east: 17.5 },
  "Azerbaijan": { south: 38.4, north: 42.1, west: 44.8, east: 50.4 },
  "Bahamas": { south: 20.7, north: 27.05, west: -79.5, east: -74.2 },
  "Bahrain": { south: 25.79, north: 26.32, west: 50.45, east: 50.68 },
  "Bangladesh": { south: 20.74, north: 26.63, west: 88.01, east: 92.67 },
  "Barbados": { south: 13.03, north: 13.33, west: -59.65, east: -59.43 },
  "Belarus": { south: 51.2, north: 56.2, west: 23.1, east: 32.8 },
  "Belgium": { south: 49.5, north: 51.5, west: 2.5, east: 6.4 },
  "Belize": { south: 15.88, north: 18.5, west: -89.23, east: -87.5 },
  "Benin": { south: 6.14, north: 12.41, west: 0.77, east: 3.84 },
  "Bermuda": { south: 32.24, north: 32.47, west: -64.9, east: -64.6 },
  "Bhutan": { south: 26.7, north: 28.3, west: 88.7, east: 92.1 },
  "Bolivia": { south: -22.9, north: -9.68, west: -69.64, east: -57.45 },
  "Bosnia and Herzegovina": { south: 42.6, north: 45.3, west: 15.7, east: 19.6 },
  "Botswana": { south: -26.89, north: -17.79, west: 20.0, east: 29.38 },
  "Brazil": { south: -33.75, north: 5.27, west: -73.99, east: -34.79 },
  "Brunei": { south: 4.0, north: 5.0, west: 114.0, east: 115.0 },
  "Bulgaria": { south: 41.2, north: 44.2, west: 22.4, east: 28.6 },
  "Burkina Faso": { south: 9.4, north: 15.1, west: -5.5, east: 2.4 },
  "Burundi": { south: -4.46, north: -2.3, west: 29.0, east: 30.85 },
  "Cabo Verde": { south: 14.8, north: 17.2, west: -25.4, east: -22.6 },
  "Cambodia": { south: 10.4, north: 14.7, west: 102.3, east: 107.6 },
  "Cameroon": { south: 1.6, north: 13.1, west: 8.5, east: 16.2 },
  "Canada": { south: 41.7, north: 83.1, west: -141.0, east: -52.6 },
  "Alberta": { south: 49.0, north: 60.0, west: -120.0, east: -110.0 },
  "British Columbia": { south: 48.3, north: 60.0, west: -139.1, east: -114.0 },
  "Manitoba": { south: 49.0, north: 60.0, west: -102.0, east: -95.0 },
  "New Brunswick": { south: 45.0, north: 48.3, west: -69.1, east: -64.8 },
  "Newfoundland and Labrador": { south: 46.7, north: 60.0, west: -61.3, east: -52.6 },
  "Northwest Territories": { south: 60.0, north: 70.0, west: -136.0, east: -110.0 },
  "Nova Scotia": { south: 43.3, north: 47.1, west: -65.0, east: -60.9 },
  "Nunavut": { south: 56.0, north: 83.1, west: -115.0, east: -60.0 },
  "Ontario": { south: 41.7, north: 56.9, west: -95.2, east: -74.3 },
  "Prince Edward Island": { south: 45.9, north: 47.3, west: -64.5, east: -62.6 },
  "Quebec": { south: 45.0, north: 62.0, west: -79.8, east: -57.1 },
  "Saskatchewan": { south: 49.0, north: 60.0, west: -110.0, east: -101.5 },
  "Yukon": { south: 60.0, north: 69.6, west: -141.0, east: -130.0 },
  "Central African Republic": { south: 2.2, north: 11.0, west: 14.4, east: 27.5 },
  "Chad": { south: 7.45, north: 23.45, west: 13.5, east: 24.0 },
  "Chile": { south: -56.0, north: -17.5, west: -75.6, east: -66.0 },
  "China": { south: 18.1, north: 53.6, west: 73.5, east: 135.0 },
  "Colombia": { south: -4.23, north: 13.4, west: -79.0, east: -66.9 },
  "Comoros": { south: -12.4, north: -11.4, west: 43.2, east: 44.5 },
  "Costa Rica": { south: 8.0, north: 11.22, west: -85.97, east: -82.54 },
  "Côte d'Ivoire": { south: 4.3, north: 10.7, west: -8.6, east: -2.48 },
  "Croatia": { south: 42.3, north: 46.6, west: 13.5, east: 19.4 },
  "Cuba": { south: 19.8, north: 23.2, west: -85.4, east: -74.1 },
  "Cyprus": { south: 34.5, north: 35.8, west: 32.2, east: 34.6 },
  "Czech Republic": { south: 48.5, north: 51.1, west: 12.1, east: 18.9 },
  "Democratic Republic of the Congo": { south: -13.46, north: 5.39, west: 12.18, east: 31.3 },
  "Denmark": { south: 54.6, north: 57.8, west: 8.0, east: 12.7 },
  "Djibouti": { south: 10.9, north: 12.7, west: 41.7, east: 43.3 },
  "Dominica": { south: 15.17, north: 15.63, west: -61.45, east: -61.15 },
  "Dominican Republic": { south: 17.53, north: 19.93, west: -72.0, east: -68.3 },
  "Ecuador": { south: -5.0, north: 1.43, west: -81.0, east: -75.19 },
  "Egypt": { south: 22.0, north: 31.67, west: 24.7, east: 35.9 },
  "El Salvador": { south: 13.13, north: 14.45, west: -90.1, east: -87.6 },
  "Equatorial Guinea": { south: -1.5, north: 3.79, west: 5.62, east: 11.3 },
  "Eritrea": { south: 12.3, north: 18.0, west: 36.44, east: 43.12 },
  "Estonia": { south: 57.5, north: 59.6, west: 21.8, east: 28.2 },
  "Eswatini": { south: -27.3, north: -25.7, west: 30.8, east: 32.1 },
  "Ethiopia": { south: 3.39, north: 14.9, west: 33.0, east: 48.0 },
  "Fiji": { south: -20.02, north: -12.02, west: 175.2, east: 179.9 },
  "Finland": { south: 59.5, north: 70.1, west: 20.5, east: 31.6 },
  "France": { south: 41.3, north: 51.1, west: -5.1, east: 9.6 },
  "Gabon": { south: -3.98, north: 2.3, west: 8.7, east: 14.53 },
  "Gambia": { south: 13.07, north: 13.82, west: -16.8, east: -13.79 },
  "Georgia": { south: 41.0, north: 43.6, west: 40.0, east: 47.5 },
  "Germany": { south: 47.2, north: 55.1, west: 5.9, east: 15.0 },
  "Ghana": { south: 4.55, north: 11.17, west: -3.25, east: 1.2 },
  "Greece": { south: 34.8, north: 41.8, west: 19.4, east: 28.3 },
  "Greenland": { south: 59.7, north: 83.6, west: -73.3, east: -11.3 },
  "Grenada": { south: 11.96, north: 12.36, west: -61.85, east: -61.45 },
  "Guatemala": { south: 13.72, north: 17.82, west: -92.23, east: -88.22 },
  "Guinea": { south: 7.19, north: 12.67, west: -15.06, east: -7.64 },
  "Guinea-Bissau": { south: 10.89, north: 12.68, west: -16.68, east: -13.7 },
  "Guyana": { south: 1.17, north: 8.56, west: -61.36, east: -56.5 },
  "Haiti": { south: 18.0, north: 20.1, west: -74.5, east: -71.6 },
  "Honduras": { south: 12.98, north: 16.51, west: -89.35, east: -83.13 },
  "Hungary": { south: 45.7, north: 48.6, west: 16.1, east: 22.9 },
  "Iceland": { south: 63.1, north: 66.6, west: -24.5, east: -13.5 },
  "India": { south: 6.55, north: 35.67, west: 68.11, east: 97.4 },
  "Indonesia": { south: -11.0, north: 6.0, west: 95.0, east: 141.0 },
  "Iran": { south: 24.0, north: 40.0, west: 44.0, east: 63.3 },
  "Iraq": { south: 29.0, north: 37.4, west: 38.79, east: 48.62 },
  "Ireland": { south: 51.4, north: 55.4, west: -10.6, east: -5.4 },
  "Israel": { south: 29.5, north: 33.3, west: 34.3, east: 35.9 },
  "Italy": { south: 36.6, north: 47.1, west: 6.6, east: 18.5 },
  "Jamaica": { south: 17.7, north: 18.5, west: -78.4, east: -76.1 },
  "Japan": { south: 24.3, north: 45.5, west: 122.9, east: 153.9 },
  "Jordan": { south: 29.2, north: 33.4, west: 34.9, east: 39.3 },
  "Kazakhstan": { south: 40.6, north: 55.4, west: 46.5, east: 87.3 },
  "Kenya": { south: -4.68, north: 4.62, west: 33.9, east: 41.9 },
  "Kiribati": { south: -3.2, north: 4.7, west: 169.5, east: -150.3 },
  "Kuwait": { south: 28.52, north: 30.1, west: 46.4, east: 48.3 },
  "Kyrgyzstan": { south: 39.2, north: 43.3, west: 69.3, east: 80.3 },
  "Laos": { south: 13.9, north: 22.5, west: 100.1, east: 107.6 },
  "Latvia": { south: 55.7, north: 58.1, west: 20.9, east: 28.2 },
  "Lebanon": { south: 33.05, north: 34.7, west: 35.1, east: 36.6 },
  "Lesotho": { south: -30.68, north: -28.67, west: 27.0, east: 29.33 },
  "Liberia": { south: 4.21, north: 8.5, west: -11.5, east: -7.4 },
  "Libya": { south: 19.5, north: 33.17, west: 9.3, east: 25.0 },
  "Liechtenstein": { south: 47.0, north: 47.3, west: 9.5, east: 9.8 },
  "Lithuania": { south: 53.9, north: 56.4, west: 20.9, east: 26.8 },
  "Luxembourg": { south: 49.4, north: 50.2, west: 5.7, east: 6.5 },
  "Madagascar": { south: -25.6, north: -11.9, west: 43.2, east: 50.5 },
  "Malawi": { south: -17.1, north: -9.38, west: 32.67, east: 35.92 },
  "Malaysia": { south: 0.85, north: 7.5, west: 99.6, east: 119.3 },
  "Maldives": { south: -0.7, north: 7.1, west: 72.6, east: 73.7 },
  "Mali": { south: 10.1, north: 25.0, west: -12.3, east: 4.3 },
  "Malta": { south: 35.7, north: 36.1, west: 14.2, east: 14.6 },
  "Marshall Islands": { south: 4.5, north: 14.6, west: 165.5, east: 172.1 },
  "Mauritania": { south: 14.7, north: 27.3, west: -17.1, east: -4.8 },
  "Mauritius": { south: -20.6, north: -10.5, west: 56.0, east: 63.5 },
  "Mexico": { south: 14.5, north: 32.7, west: -117.1, east: -86.7 },
  "Micronesia": { south: 1.0, north: 10.0, west: 137.0, east: 163.0 },
  "Moldova": { south: 45.2, north: 48.5, west: 26.6, east: 30.2 },
  "Monaco": { south: 43.7, north: 43.8, west: 7.4, east: 7.5 },
  "Mongolia": { south: 41.5, north: 52.1, west: 87.7, east: 119.9 },
  "Montenegro": { south: 41.8, north: 43.6, west: 18.4, east: 20.3 },
  "Morocco": { south: 27.6, north: 36.0, west: -13.2, east: -1.4 },
  "Mozambique": { south: -26.9, north: -10.5, west: 30.2, east: 40.9 },
  "Myanmar": { south: 9.9, north: 28.54, west: 92.2, east: 101.17 },
  "Namibia": { south: -29.0, north: -16.9, west: 11.7, east: 25.3 },
  "Nauru": { south: -0.56, north: -0.52, west: 166.9, east: 166.95 },
  "Nepal": { south: 26.36, north: 30.45, west: 80.0, east: 88.2 },
  "Netherlands": { south: 50.7, north: 53.6, west: 3.3, east: 7.2 },
  "New Zealand": { south: -47.3, north: -34.4, west: 166.3, east: 178.6 },
  "Nicaragua": { south: 10.7, north: 15.0, west: -87.7, east: -82.7 },
  "Niger": { south: 11.7, north: 23.5, west: 0.15, east: 15.99 },
  "Nigeria": { south: 4.2, north: 13.9, west: 2.7, east: 14.6 },
  "North Korea": { south: 37.7, north: 43.0, west: 124.0, east: 131.0 },
  "North Macedonia": { south: 40.9, north: 42.4, west: 20.4, east: 23.0 },
  "Norway": { south: 58.0, north: 71.2, west: 4.5, east: 31.1 },
  "Oman": { south: 16.64, north: 26.39, west: 52.0, east: 59.8 },
  "Pakistan": { south: 23.7, north: 37.1, west: 60.8, east: 77.9 },
  "Palau": { south: 2.9, north: 7.4, west: 131.0, east: 134.7 },
  "Palestine": { south: 31.2, north: 32.6, west: 34.2, east: 35.6 },
  "Panama": { south: 7.2, north: 9.6, west: -83.1, east: -77.2 },
  "Papua New Guinea": { south: -11.5, north: -1.3, west: 140.9, east: 156.0 },
  "Paraguay": { south: -27.6, north: -19.3, west: -62.7, east: -54.3 },
  "Peru": { south: -18.35, north: 0.02, west: -81.3, east: -68.7 },
  "Philippines": { south: 4.6, north: 21.0, west: 116.9, east: 126.6 },
  "Poland": { south: 49.0, north: 54.9, west: 14.1, east: 24.1 },
  "Portugal": { south: 36.9, north: 42.2, west: -9.6, east: -6.2 },
  "Qatar": { south: 24.4, north: 26.2, west: 50.6, east: 51.7 },
  "Republic of the Congo": { south: -5.0, north: 3.7, west: 11.0, east: 18.6 },
  "Romania": { south: 43.6, north: 48.3, west: 20.3, east: 29.7 },
  "Russia": { south: 41.2, north: 81.9, west: 19.6, east: 180.0 },
  "Rwanda": { south: -2.85, north: -1.0, west: 28.9, east: 30.9 },
  "Saint Kitts and Nevis": { south: 17.1, north: 17.5, west: -62.85, east: -62.5 },
  "Saint Lucia": { south: 13.7, north: 14.1, west: -61.1, east: -60.8 },
  "Saint Vincent and the Grenadines": { south: 12.6, north: 13.4, west: -61.5, east: -61.0 },
  "Samoa": { south: -14.1, north: -13.4, west: -172.1, east: -171.3 },
  "San Marino": { south: 43.9, north: 44.1, west: 12.4, east: 12.6 },
  "Sao Tome and Principe": { south: 0.0, north: 1.7, west: 6.4, east: 7.5 },
  "Saudi Arabia": { south: 16.0, north: 32.2, west: 34.5, east: 55.7 },
  "Senegal": { south: 12.3, north: 16.7, west: -17.7, east: -11.3 },
  "Serbia": { south: 42.2, north: 46.2, west: 18.8, east: 23.0 },
  "Seychelles": { south: -10.3, north: -3.0, west: 46.1, east: 56.3 },
  "Sierra Leone": { south: 6.9, north: 10.0, west: -13.3, east: -10.3 },
  "Singapore": { south: 1.20, north: 1.47, west: 103.6, east: 104.0 },
  "Slovakia": { south: 47.7, north: 49.6, west: 16.8, east: 22.6 },
  "Slovenia": { south: 45.0, north: 47.0, west: 13.3, east: 16.6 },
  "Solomon Islands": { south: -12.3, north: -6.5, west: 155.0, east: 170.0 },
  "Somalia": { south: -1.66, north: 11.98, west: 40.98, east: 51.42 },
  "South Africa": { south: -34.8, north: -22.1, west: 16.4, east: 32.9 },
  "South Korea": { south: 33.1, north: 38.6, west: 126.1, east: 129.5 },
  "South Sudan": { south: 3.49, north: 12.23, west: 24.4, east: 35.9 },
  "Spain": { south: 36.0, north: 43.8, west: -9.3, east: 3.3 },
  "Sri Lanka": { south: 5.9, north: 9.83, west: 79.7, east: 81.88 },
  "Sudan": { south: 9.5, north: 22.27, west: 21.8, east: 38.6 },
  "Suriname": { south: 1.8, north: 6.0, west: -58.0, east: -53.98 },
  "Sweden": { south: 55.3, north: 69.1, west: 11.1, east: 23.2 },
  "Switzerland": { south: 45.8, north: 47.8, west: 5.9, east: 10.5 },
  "Syria": { south: 32.3, north: 37.3, west: 35.5, east: 42.4 },
  "Taiwan": { south: 21.8, north: 25.3, west: 119.3, east: 122.0 },
  "Tajikistan": { south: 36.7, north: 41.0, west: 67.4, east: 75.2 },
  "Tanzania": { south: -11.8, north: -0.9, west: 29.3, east: 40.5 },
  "Thailand": { south: 5.6, north: 20.5, west: 97.35, east: 105.6 },
  "Timor-Leste": { south: -9.5, north: -8.1, west: 124.0, east: 127.3 },
  "Togo": { south: 6.1, north: 11.14, west: -0.14, east: 1.8 },
  "Tonga": { south: -22.3, north: -15.5, west: -175.2, east: -173.0 },
  "Trinidad and Tobago": { south: 10.0, north: 11.5, west: -61.9, east: -60.4 },
  "Tunisia": { south: 30.2, north: 37.55, west: 7.5, east: 11.6 },
  "Turkey": { south: 36.0, north: 42.1, west: 26.0, east: 44.8 },
  "Turkmenistan": { south: 35.1, north: 42.8, west: 52.4, east: 66.7 },
  "Tuvalu": { south: -10.0, north: -5.6, west: 176.0, east: 179.9 },
  "Uganda": { south: -1.5, north: 4.2, west: 29.5, east: 35.0 },
  "Ukraine": { south: 44.4, north: 52.4, west: 22.1, east: 40.2 },
  "United Arab Emirates": { south: 22.6, north: 26.1, west: 51.4, east: 56.4 },
  "United Kingdom": { south: 49.9, north: 59.5, west: -8.6, east: 1.8 },
  "United States": { south: 24.5, north: 49.4, west: -125.0, east: -66.9 },
  "Alabama": { south: 30.1, north: 35.0, west: -88.5, east: -84.9 },
  "Alaska": { south: 51.2, north: 71.4, west: -179.1, east: -129.9 },
  "Arizona": { south: 31.3, north: 37.0, west: -114.8, east: -109.0 },
  "Arkansas": { south: 33.0, north: 36.5, west: -94.6, east: -89.6 },
  "California": { south: 32.5, north: 42.0, west: -124.4, east: -114.1 },
  "Colorado": { south: 36.9, north: 41.0, west: -109.1, east: -102.0 },
  "Connecticut": { south: 40.9, north: 42.0, west: -73.7, east: -71.8 },
  "Delaware": { south: 38.5, north: 39.8, west: -75.8, east: -75.0 },
  "Florida": { south: 24.5, north: 31.0, west: -87.6, east: -80.0 },
  "Georgia": { south: 30.4, north: 35.0, west: -85.6, east: -80.8 },
  "Hawaii": { south: 18.9, north: 22.3, west: -160.3, east: -154.8 },
  "Idaho": { south: 41.9, north: 49.0, west: -117.2, east: -111.0 },
  "Illinois": { south: 36.9, north: 42.5, west: -91.5, east: -87.5 },
  "Indiana": { south: 37.8, north: 41.8, west: -88.1, east: -84.8 },
  "Iowa": { south: 40.4, north: 43.5, west: -96.6, east: -90.1 },
  "Kansas": { south: 36.9, north: 40.0, west: -102.1, east: -94.6 },
  "Kentucky": { south: 36.5, north: 39.1, west: -89.6, east: -81.9 },
  "Louisiana": { south: 28.9, north: 33.0, west: -94.0, east: -88.8 },
  "Maine": { south: 43.1, north: 47.5, west: -71.1, east: -66.9 },
  "Maryland": { south: 37.9, north: 39.7, west: -79.5, east: -75.0 },
  "Massachusetts": { south: 41.2, north: 42.9, west: -73.5, east: -69.9 },
  "Michigan": { south: 41.7, north: 48.3, west: -90.4, east: -82.4 },
  "Minnesota": { south: 43.5, north: 49.4, west: -97.2, east: -89.5 },
  "Mississippi": { south: 30.2, north: 35.0, west: -91.7, east: -88.1 },
  "Missouri": { south: 35.9, north: 40.6, west: -95.8, east: -89.1 },
  "Montana": { south: 44.4, north: 49.0, west: -116.1, east: -104.0 },
  "Nebraska": { south: 40.0, north: 43.0, west: -104.1, east: -95.3 },
  "Nevada": { south: 35.0, north: 42.0, west: -120.0, east: -114.0 },
  "New Hampshire": { south: 42.7, north: 45.3, west: -72.6, east: -70.6 },
  "New Jersey": { south: 38.9, north: 41.4, west: -75.6, east: -73.9 },
  "New Mexico": { south: 31.3, north: 37.0, west: -109.1, east: -103.0 },
  "New York": { south: 40.5, north: 45.0, west: -79.8, east: -71.8 },
  "North Carolina": { south: 33.8, north: 36.6, west: -84.3, east: -75.5 },
  "North Dakota": { south: 45.9, north: 49.0, west: -104.1, east: -96.5 },
  "Ohio": { south: 38.4, north: 41.9, west: -84.8, east: -80.5 },
  "Oklahoma": { south: 33.6, north: 37.0, west: -103.0, east: -94.4 },
  "Oregon": { south: 41.9, north: 46.3, west: -124.6, east: -116.5 },
  "Pennsylvania": { south: 39.7, north: 42.3, west: -80.5, east: -74.7 },
  "Rhode Island": { south: 41.1, north: 42.0, west: -71.9, east: -71.1 },
  "South Carolina": { south: 32.0, north: 35.2, west: -83.3, east: -78.5 },
  "South Dakota": { south: 42.5, north: 45.9, west: -104.1, east: -96.4 },
  "Tennessee": { south: 34.9, north: 36.7, west: -90.3, east: -81.7 },
  "Texas": { south: 25.8, north: 36.5, west: -106.6, east: -93.5 },
  "Utah": { south: 36.9, north: 42.0, west: -114.1, east: -109.0 },
  "Vermont": { south: 42.7, north: 45.0, west: -73.4, east: -71.5 },
  "Virginia": { south: 36.5, north: 39.5, west: -83.7, east: -75.2 },
  "Washington": { south: 45.5, north: 49.0, west: -124.8, east: -116.9 },
  "West Virginia": { south: 37.2, north: 40.6, west: -82.7, east: -77.7 },
  "Wisconsin": { south: 42.5, north: 47.3, west: -92.9, east: -86.2 },
  "Wyoming": { south: 40.9, north: 45.0, west: -111.1, east: -104.1 },
  "Uruguay": { south: -35.0, north: -30.1, west: -58.5, east: -53.0 },
  "Uzbekistan": { south: 37.1, north: 45.6, west: 56.3, east: 73.1 },
  "Vanuatu": { south: -20.3, north: -13.0, west: 166.4, east: 170.7 },
  "Vatican City": { south: 41.8, north: 41.9, west: 12.4, east: 12.5 },
  "Venezuela": { south: 0.6, north: 12.2, west: -73.4, east: -59.7 },
  "Vietnam": { south: 8.2, north: 23.4, west: 102.1, east: 109.5 },
  "Yemen": { south: 12.5, north: 18.5, west: 42.5, east: 54.5 },
  "Zambia": { south: -18.1, north: -8.2, west: 21.9, east: 33.7 },
  "Zimbabwe": { south: -22.4, north: -15.6, west: 25.3, east: 33.1 }
};


let trailsEnabled = true;
let autoFollowEnabled = false;
let trackedPlaneId = null;

// Store aircraft data loaded from JSON
let aircraftData = null;

function getColorByAltitude(altitude, altitudeUnit = 'm') {
  // Convert altitude to meters if needed
  let altitudeMeters = altitude;
  if (altitudeUnit === 'ft') {
    altitudeMeters = altitude / 3.28084; // feet to meters
  }
  
  if (altitudeMeters < 1000) return Cesium.Color.LIME;         // Very low
  if (altitudeMeters < 3000) return Cesium.Color.CHARTREUSE;   // Low-mid
  if (altitudeMeters < 6000) return Cesium.Color.YELLOW;       // Mid
  if (altitudeMeters < 12000) return Cesium.Color.ORANGE;      // High
  return Cesium.Color.RED; 
}
  let speedKmh;
function getColorBySpeed(speed, speedUnit = 'kmh') {
  // Convert speed to kmh
  let speedKmh = speed;
  if (speedUnit === 'mph') {
    speedKmh = speed / 0.621371; // mph to kmh
  } else if (speedUnit === 'knots') {
    speedKmh = speed / 0.539957; // knots to kmh
  }

  if (speedKmh < 300) return Cesium.Color.LIME;         // Very low
  if (speedKmh < 600) return Cesium.Color.CHARTREUSE;   // Low-mid
  if (speedKmh < 900) return Cesium.Color.YELLOW;       // Mid
  if (speedKmh < 1200) return Cesium.Color.ORANGE;      // High
  return Cesium.Color.RED; 
}


const containerA = document.getElementById('telemetryContainer');
const toggleBtnA = document.getElementById('toggleTelemetry');

toggleBtnA.addEventListener('click', () => {
  const isHidden = containerA.classList.toggle('hidden');

  // Toggle button styles and position
  if (isHidden) {
    toggleBtnA.classList.add('fixed-left', 'inactive');
    toggleBtnA.style.left = '0px';
    
    // Update button title and text
    toggleBtnA.title = 'Show Window';
    toggleBtnA.querySelector('i').classList.add('rotate'); // Optional: Rotate the icon
  } else {
    toggleBtnA.classList.remove('fixed-left', 'inactive');
    toggleBtnA.style.left = '219px';
    
    // Update button title and text
    toggleBtnA.title = 'Hide Window';
    toggleBtnA.querySelector('i').classList.remove('rotate'); // Optional: Stop rotating the icon
  }
});


function addOrUpdatePlane(id, lon, lat, altitude, heading, velocity, timestamp, country) {
  const now = Cesium.JulianDate.fromDate(new Date(timestamp * 1000));
  let plane = planes.get(id);

  // Default model URI
  let modelUri = 'Cesium_Air_One.glb'; // Default model
  let aircraftType = 'Unknown Aircraft';

  if (aircraftData) {
    const ac = aircraftData[id.toLowerCase()]; // Use ICAO code (which is in lowercase) for matching
    if (ac) {
      const manufacturer = ac.manufacturer?.trim() || '';
      const model = ac.model?.trim() || '';

      // Check if the manufacturer contains "Boeing" and model contains "737"
      if (manufacturer.includes('BOEING') || model.includes('BOEING')) {
        modelUri = 'boeing33.glb';
        aircraftType = 'Boeing Aircraft';
      } else if (manufacturer.includes('AIRBUS') || model.includes('AIRBUS')) {
        modelUri = 'airbusone.glb';
        aircraftType = 'Airbus Aircraft';
      } else if (manufacturer.includes('EMBRAER') || model.includes('EMBRAER')) {
        modelUri = 'embraer33.glb';
        aircraftType = 'Embraer Aircraft';
      } else if (manufacturer.includes('PILATUS') || model.includes('PILATUS')) {
        modelUri = 'pilatus.glb';
        aircraftType = 'Pilatus Aircraft';
      } else {
        aircraftType = `${manufacturer} ${model}`;
      }
    }
  }

  // Log which model URI is selected
  console.log(`Selected Model URI for ${id}: ${modelUri}`);

  if (!plane) {
    const position = new Cesium.SampledPositionProperty();
    const sampleTimes = [];

    // Decide whether to use 3D model or 2D icon based on altitude
    let entityOptions = {
      id,
      name: id,
      position,
      orientation: new Cesium.VelocityOrientationProperty(position),
      label: {
        text: id,
        font: '12px Oxanium',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20),
        fillColor: Cesium.Color.YELLOW
      }
    };

    if (altitude < 50) {  // threshold for "on the ground"
      entityOptions.billboard = {
        image: 'plane_icon_empty.png',  // Path to your PNG icon file
        scale: 0.5,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        rotation: Cesium.Math.toRadians(heading),  // Rotate icon based on heading
        alignedAxis: Cesium.Cartesian3.UNIT_Z       // Rotate around vertical axis
      };
    } else {
      entityOptions.model = {
        uri: modelUri,
        scale: 30
      };
    }

    const entity = viewer.entities.add(entityOptions);

    // Trail code remains unchanged
    const trailEntity = viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return sampleTimes.map(t => position.getValue(t)).filter(p => p);
        }, false),
        width: 2,
        material: Cesium.Color.CYAN.withAlpha(0.6),
        clampToGround: false
      },
      show: trailsEnabled
    });

    plane = { entity, position, sampleTimes, trail: trailEntity };
    planes.set(id, plane);
  }

  // Prune samples older than 60s
  const pruneBefore = Cesium.JulianDate.addSeconds(now, -60, new Cesium.JulianDate());
  try {
    plane.position.removeSamples(pruneBefore);
    while (plane.sampleTimes.length && Cesium.JulianDate.lessThan(plane.sampleTimes[0], pruneBefore)) {
      plane.sampleTimes.shift();
    }
  } catch (e) {}

  const pos = Cesium.Cartesian3.fromDegrees(lon, lat, altitude);
  plane.position.addSample(now, pos);
  plane.sampleTimes.push(now);

  // Predict a future position for heading visualization
  if (velocity > 1) {
    const futureTime = Cesium.JulianDate.addSeconds(now, 40, new Cesium.JulianDate());
    const h = Cesium.Math.toRadians(heading);
    const d = velocity * 40;
    const R = 6371000 + altitude;
    const dx = d * Math.sin(h);
    const dy = d * Math.cos(h);
    const dLon = (dx / (R * Math.cos(Cesium.Math.toRadians(lat)))) * (180 / Math.PI);
    const dLat = (dy / R) * (180 / Math.PI);
    const futurePos = Cesium.Cartesian3.fromDegrees(lon + dLon, lat + dLat, altitude);
    plane.position.addSample(futureTime, futurePos);
  }

  plane.heading = heading;
  plane.velocity = velocity;

  // Update billboard rotation on every update if plane is on the ground
  if (plane.entity.billboard) {
    plane.entity.billboard.rotation = Cesium.Math.toRadians(heading);
  }

  const colorAlt = getColorByAltitude(altitude, altitudeUnit = 'm');
  if (plane.entity.model) {
    plane.entity.model.colorAlt = Cesium.Color.WHITE;
  }
  if (plane.trail) {
    plane.trail.polyline.material = colorAlt.withAlpha(0.6);
    plane.trail.show = trailsEnabled;
  }
}

if (!trackedPlaneId || !planes.has(trackedPlaneId)) {
  if (planes.size > 0) {
    trackedPlaneId = [...planes.keys()][0];
    viewer.trackedEntity = planes.get(trackedPlaneId).entity;
  } else {
    trackedPlaneId = null;
    viewer.trackedEntity = undefined;
  }
}
let currentCountryFetchToken = 0;

document.getElementById('countrySelect').addEventListener('change', function() {
  selectedCountry = this.value;

  // Increment fetch token
  currentCountryFetchToken++;

  // Remove old planes
  planes.forEach(p => {
    viewer.entities.remove(p.entity);
    if (p.trail) viewer.entities.remove(p.trail);
  });
  planes.clear();

  // Update telemetry immediately
  updateTelemetry();

  // Fly camera
  const bounds = countryBounds[selectedCountry];
  if (bounds) {
    viewer.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(bounds.west, bounds.south, bounds.east, bounds.north),
      duration: 2.5,
      offset: new Cesium.HeadingPitchRange(0.0, -0.5, 100)
    });
  }

  // Fetch new planes
  fetchLivePlanes(currentCountryFetchToken);
});

// 🌍 Utility to compute great-circle distance between 2 lat/lon points
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const toRad = angle => angle * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


function updateTelemetry() {
  const panel = document.getElementById('telemetry');
  if (!panel) return;

  const now = viewer.clock.currentTime;
  const filter = document.getElementById('filterInput').value.toLowerCase();
  const currentTimestamp = Date.now() / 1000; // seconds

  let telemetryContent = '<b>Telemetry:</b><br/>';
  let count = 0;

  planes.forEach((plane, id) => {
    const pos = plane.entity.position.getValue(now);
    if (!pos) return;

    const cartographic = Cesium.Cartographic.fromCartesian(pos);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const altitude = cartographic.height;
    let speedKmh = (plane.velocity || 0) * 3.6;

    let isStationary = false;
    const last = lastPositions.get(id);

    // Ensure that we have valid last data to compare
    if (last) {
      const timeDiff = currentTimestamp - last.timestamp;
      const distMoved = getDistanceInMeters(latitude, longitude, last.lat, last.lon);
      const speedDiff = Math.abs(speedKmh - last.speedKmh);

      // 🧭 Parking / minimal movement: extended grace period
      if (timeDiff > 10 && distMoved < 100 && altitude < 100 && speedKmh < 50) {
        isStationary = true;
      }

      // ✈️ Teleportation glitch (large distance, low speed): more lenient
      if (distMoved > 10000 && speedKmh < 100) {
        isStationary = true;
      }

      // 🧨 Crazy speed: Prevent false positives for sudden high-speed jumps
      if (speedKmh > 1200) {
        isStationary = true;
      }

      // ⚠️ High speed near ground: preventing sudden acceleration
      if (altitude < 100 && speedKmh > 300) {
        isStationary = true;
      }

      // 📉 Unrealistic altitude jump without speed: more smoothing
      if (altitude < 100 && Math.abs(altitude - last.alt) > 2000 && speedKmh < 100) {
        isStationary = true;
      }

      // 🚨 Sudden stop glitch: 5-second grace period before marking as stationary
      if (timeDiff < 5 && last.speedKmh > 1000 && speedKmh < 50) {
        isStationary = true;
      }

      // Handle small glitches by interpolating data
      if (timeDiff < 2 && distMoved < 10 && speedDiff < 50) {
        speedKmh = last.speedKmh; // Use previous speed if change is small
      }
    }

    // 🎯 Reject vertical pitch (±90°) - very unlikely pitch, mark as stationary
    if (plane.pitch !== undefined) {
      const pitchDeg = Cesium.Math.toDegrees(plane.pitch);
      if (Math.abs(pitchDeg) > 85 && Math.abs(pitchDeg) < 95) {
        isStationary = true; // Straight up/down, likely bad
      }
    }

    // ✅ Update last known position + speed
    lastPositions.set(id, {
      lat: latitude,
      lon: longitude,
      alt: altitude,
      speedKmh,
      timestamp: currentTimestamp
    });

    // Skip rendering if the plane is considered stationary
    if (isStationary) return;

    // ✈️ Aircraft info (used for filtering and display)
    let acType = 'Unknown Aircraft';
    let reg = 'N/A';
    let modelUri = '';
    let icao = 'N/A';

    if (aircraftData) {
      const ac = aircraftData[id.toLowerCase()];
      if (ac) {
        const manufacturer = (ac.manufacturer || '').trim();
        const model = (ac.model || '').trim();
        icao = (ac.icao || 'N/A').trim();

        const manufacturerUpper = manufacturer.toUpperCase();
        const modelUpper = model.toUpperCase();

        if (manufacturerUpper.includes('BOEING') || modelUpper.includes('BOEING')) {
          modelUri = 'boeing33.glb';
          acType = 'Boeing Aircraft';
        } else if (manufacturerUpper.includes('AIRBUS') || modelUpper.includes('AIRBUS')) {
          modelUri = 'airbusone.glb';
          acType = 'Airbus Aircraft';
        } else if (manufacturerUpper.includes('EMBRAER') || modelUpper.includes('EMBRAER')) {
          modelUri = 'embraer33.glb';
          acType = 'Embraer Aircraft';
        } else if (manufacturerUpper.includes('PILATUS') || modelUpper.includes('PILATUS')) {
          modelUri = 'pilatus.glb';
          acType = 'Pilatus Aircraft';
        } else {
          acType = `${manufacturer} ${model}`.trim() || acType;
        }

        reg = (ac.reg || 'N/A').trim();
      }
    }

    // 🔍 Apply filter
    const filterMatch =
      reg.toLowerCase().includes(filter) ||
      acType.toLowerCase().includes(filter) ||
      icao.toLowerCase().includes(filter);

    if (!filterMatch) return;

    const roundedSpeed = speedKmh.toFixed(0);
    const isTracked = String(id) === String(trackedPlaneId) ? 'tracked' : '';

    telemetryContent += `
      <div class="plane-entry ${isTracked ? 'tracked-row' : ''}">
        <strong>${plane.entity.name}</strong> (${reg} - ${acType}):<br/>
        Lat: ${latitude.toFixed(4)}, 
        Lon: ${longitude.toFixed(4)},<br/>
        Alt: ${altitude.toFixed(0)} m, 
        Hdg: ${plane.heading?.toFixed(0) || 'N/A'}, 
        Spd: ${roundedSpeed} km/h<br/>
        ICAO: ${icao}<br/>
        <button class="track-btn" data-id="${id}">Track</button>
      </div><br/>
    `;

    count++;
  });

  panel.innerHTML = telemetryContent;

  attachTrackButtonHandlers();

  const countElement = document.getElementById('planeCount');
  if (countElement) {
    countElement.textContent = `Planes Displayed: ${count}`;
  }
}

// New function to handle auto-clicking the track button every 15 seconds after it's clicked
let autoTrackIntervalId = null; // Variable to store the interval ID

function attachTrackButtonHandlers() {
  const trackButtons = document.querySelectorAll('.track-btn');
  
  trackButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const planeId = event.target.getAttribute('data-id');
      // Start auto-clicking the button for the selected plane
      startAutoTrack(planeId);

      // Manually trigger the track logic (if needed)
      trackPlane(planeId);
    });
  });
}

// Function to handle the tracking logic
function trackPlane(planeId) {
  // Add your plane tracking logic here.
  console.log(`Tracking plane with ID: ${planeId}`);
  trackedPlaneId = planeId;
  // Additional logic to show the tracking on the map, etc.
}

// Function to automatically click the button every 15 seconds
function startAutoTrack(planeId) {
  if (autoTrackIntervalId) {
    clearInterval(autoTrackIntervalId); // Clear any existing interval
  }

  autoTrackIntervalId = setInterval(() => {
    trackPlane(planeId); // Auto trigger track logic
  }, 15000); // Auto click every 15 seconds
}

function attachTrackButtonHandlers() {
  document.querySelectorAll('.track-btn').forEach(button => {
    button.addEventListener('click', () => {
      const planeId = button.getAttribute('data-id');
      const plane = planes.get(planeId);
      if (plane) {
        viewer.trackedEntity = plane.entity;
        trackedPlaneId = planeId;

        fetchLiveWeatherData(selectedLayer); // ✅ Update weather for new tracked plane
        updateTelemetry(); // ✅ Refresh telemetry UI
      }
    });
  });
}




async function fetchAircraftData() {
  const preloader = document.getElementById('preloader');
  const loadingText = preloader.querySelector('div:first-child');
  const loadingSizeText = preloader.querySelector('div:last-child');

  try {
    const response = await fetch('basic-ac-db.json');
    if (!response.ok) throw new Error('Failed to fetch aircraft DB');

    // Get total size from content-length header if available
    const contentLength = response.headers.get('Content-Length');
    const totalBytes = contentLength ? parseInt(contentLength, 10) : 118321 * 1024; // fallback to approx 118MB in bytes

    const reader = response.body.getReader();
    let receivedLength = 0;
    let chunks = [];

    while(true) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;

      // Update progress in KB
      const kbLoaded = (receivedLength / 1024).toFixed(1);
      const kbTotal = (totalBytes / 1024).toFixed(1);
      loadingText.textContent = `Loading aircraft database - (${kbLoaded} / ${kbTotal} KB)`;
      loadingSizeText.textContent = ''; // text loading notice
    }

    // Combine chunks into a single Uint8Array then decode text
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
    const text = new TextDecoder("utf-8").decode(chunksAll);

    // Process JSON lines
    const lines = text.trim().split('\n');

    aircraftData = {};
    lines.forEach(line => {
      try {
        const obj = JSON.parse(line);
        if (obj.icao) aircraftData[obj.icao.toLowerCase()] = obj;
      } catch (e) {
        console.warn('Invalid JSON line:', line);
      }
    });

    console.log(`Loaded aircraft DB with ${Object.keys(aircraftData).length} entries`);

    // Hide preloader after DB loaded
    preloader.style.transition = 'opacity 0.6s ease';
    preloader.style.opacity = 0;
    setTimeout(() => preloader.style.display = 'none', 600);

  } catch (e) {
    console.warn('Could not load aircraft DB:', e);
    aircraftData = null;
    loadingText.textContent = 'Failed to load aircraft DB.';
    loadingSizeText.textContent = '';
  }
}

async function fetchLivePlanes(fetchToken) {
  const telemetryPanel = document.getElementById('telemetry');
  try {
    const res = await fetch(`skyopen.php?country=${encodeURIComponent(selectedCountry)}`);
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    const data = await res.json();

    // Ignore if token doesn't match (country changed mid-fetch)
    if (fetchToken !== currentCountryFetchToken) return;

    if (data.states) {
      data.states.forEach(s => {
        const [icao, callsign, country, , , lon, lat, altitude, , velocity, track] = s;
        if (lon == null || lat == null) return;
        addOrUpdatePlane(
          icao.toLowerCase(),
          lon,
          lat,
          altitude || 1000,
          track || 0,
          velocity || 0,
          data.time,
          country
        );
      });
      updateTelemetry();
    }
  } catch (e) {
    console.warn('fetchLivePlanes error', e);
    if (telemetryPanel) {
      telemetryPanel.innerHTML = `<b>Error loading live data:</b> ${e.message}`;
    }
  }
}

setInterval(() => {
  fetchLivePlanes(currentCountryFetchToken);
}, 15000);

async function startApp() {
  // Show loading overlay
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.style.display = 'flex';

  await fetchAircraftData();

  // Hide loading overlay
  loadingOverlay.style.display = 'none';

  // Initial fetch of live planes
  await fetchLivePlanes();
  updateTelemetry();

  // Start periodic live updates
  liveUpdateInterval = setInterval(() => {
    fetchLivePlanes();
    updateTelemetry();

    if (autoFollowEnabled) {
      const now = viewer.clock.currentTime;
      let closest = null;
      let minDist = Number.MAX_VALUE;
      const camPos = viewer.camera.positionWC;

      planes.forEach(p => {
        const pos = p.entity.position.getValue(now);
        if (!pos) return;
        const d = Cesium.Cartesian3.distance(camPos, pos);
        if (d < minDist) {
          minDist = d;
          closest = p;
        }
      });

      if (closest) viewer.trackedEntity = closest.entity;
    }
  }, 15000);
}

const ticks = document.getElementById('ticks');
const labels = ['0','30', '60', '90', '120', '150', '180', '210', '240', '270', '300', '330']; // Labels for every 30 degrees

for (let i = 0; i < 360; i += 10) {
    const length = i % 30 === 0 ? 6 : 3; // Major tick every 30 deg
    const rad = i * Math.PI / 180;
    const x1 = 50 + Math.sin(rad) * 42;
    const y1 = 50 - Math.cos(rad) * 42;
    const x2 = 50 + Math.sin(rad) * (42 - length);
    const y2 = 50 - Math.cos(rad) * (42 - length);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#fff");
    line.setAttribute("stroke-width", "1");
    ticks.appendChild(line);
	
	    if (i % 30 === 0) {
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const labelText = labels[i / 30]; // Getting the correct label for each major tick
        const labelX = 50 + Math.sin(rad) * (42 - 10); // Positioning the label a bit away from the tick
        const labelY = 50 - Math.cos(rad) * (42 - 10);
        
        label.setAttribute("x", labelX);
            label.setAttribute("y", labelY);
            label.setAttribute("fill", "#fff");
            label.setAttribute("text-anchor", "middle");
            label.setAttribute("alignment-baseline", "middle");
            label.setAttribute("font-size", "6"); // Make degree labels smaller
            label.textContent = labelText;
            ticks.appendChild(label);
    }
}

let lastHeading = 0;
const airplaneContainer = document.getElementById('airplaneContainer');

function updateCompass() {
    const now = viewer.clock.currentTime;
    let closestPlane = null;
    let minDist = Number.MAX_VALUE;
    const camPos = viewer.camera.positionWC;

    planes.forEach(p => {
        const pos = p.entity.position.getValue(now);
        if (!pos) return;
        const d = Cesium.Cartesian3.distance(camPos, pos);
        if (d < minDist) {
            minDist = d;
            closestPlane = p;
        }
    });

    let heading = lastHeading;

    if (closestPlane) {
        heading = closestPlane.heading || 0;
        lastHeading = heading;
    }

    // Rotate the airplane group
airplaneContainer.style.transform = `rotate(${heading}deg)`;
}


viewer.clock.onTick.addEventListener(updateCompass);

// Converts altitude value to degrees for gauge needle rotation
  function getAltitudeDeg(altitude, altitudeUnit) {
  const metersToFeet = 3.28084;
  const maxAltitudeMeters = 12000;

  // Convert altitude to the gauge unit max for calculation
  const maxAltitude = altitudeUnit === 'm' ? maxAltitudeMeters : maxAltitudeMeters * metersToFeet;

  // altitude should already be in correct unit (m or ft)
  // Map altitude to degrees 0-360 capped at maxAltitude
  const altitudeDeg = Math.min((altitude / maxAltitude) * 360, 360);

  return altitudeDeg;
}

// Converts speed value to degrees for gauge needle rotation
function getSpeedDeg(speed, speedUnit) {
  const kmhToMph = 0.621371;
  const kmhToKnots = 0.539957;
  const maxSpeedKmh = 1200;

  // Convert max speed to correct unit
  let maxSpeed;
  if (speedUnit === 'kmh') maxSpeed = maxSpeedKmh;
  else if (speedUnit === 'mph') maxSpeed = maxSpeedKmh * kmhToMph;
  else maxSpeed = maxSpeedKmh * kmhToKnots;

  // Map speed to degrees 0-360 capped at maxSpeed
  const speedDeg = Math.min(speed / maxSpeed * 360, 360);

  return speedDeg;
}



// Current units state
let altitudeUnit = 'm';   // meters or feet
let speedUnit = 'kmh';    // kmh, mph, knots

// Conversion constants
const metersToFeet = 3.28084;
const kmhToMph = 0.621371;
const kmhToKnots = 0.539957;

// Reference to label elements (you need to add an id on the unit text)
const altitudeUnitText = document.querySelector('#altitudeGauge text.unitLabel');
const speedUnitText = document.querySelector('#speedGauge text.unitLabel');

// Update gauge labels to reflect unit changes
function updateAltitudeLabels() {
  // Clear old labels
  altitudeTicks.innerHTML = '';

  const maxAltitudeMeters = 12000;
  const maxAltitude = altitudeUnit === 'm' ? maxAltitudeMeters : maxAltitudeMeters * metersToFeet;

  for (let deg = 0; deg < 360; deg += 10) {
    const isMajor = deg % stepDegreesAlt === 0;
    const length = isMajor ? 6 : 3;
    const rad = (deg - 90) * Math.PI / 180;

    const x1 = 50 + Math.cos(rad) * 42;
    const y1 = 50 + Math.sin(rad) * 42;
    const x2 = 50 + Math.cos(rad) * (42 - length);
    const y2 = 50 + Math.sin(rad) * (42 - length);

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
    tick.setAttribute("x1", x1);
    tick.setAttribute("y1", y1);
    tick.setAttribute("x2", x2);
    tick.setAttribute("y2", y2);
    tick.setAttribute("stroke", "#fff");
    tick.setAttribute("stroke-width", "1");
    altitudeTicks.appendChild(tick);

    if (isMajor) {
      const labelValueMeters = Math.round(deg / 360 * maxAltitudeMeters);
      const labelValue = altitudeUnit === 'm' ? labelValueMeters : Math.round(labelValueMeters * metersToFeet);
      const labelX = 50 + Math.cos(rad) * 30;
      const labelY = 50 + Math.sin(rad) * 30 + 3;

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", labelX);
      label.setAttribute("y", labelY);
      label.setAttribute("fill", "#fff");
      label.setAttribute("font-size", "5");
      label.setAttribute("text-anchor", "middle");
      label.textContent = labelValue;
      altitudeTicks.appendChild(label);
    }
  }

  altitudeUnitText.textContent = altitudeUnit === 'm' ? 'Altitude (m)' : 'Altitude (ft)';
}

function updateSpeedLabels() {
  speedTicks.innerHTML = '';

  const maxSpeedKmh = 1200;
  let maxSpeed;
  if (speedUnit === 'kmh') maxSpeed = maxSpeedKmh;
  else if (speedUnit === 'mph') maxSpeed = maxSpeedKmh * kmhToMph;
  else maxSpeed = maxSpeedKmh * kmhToKnots;

  for (let deg = 0; deg < 360; deg += 10) {
    const isMajor = deg % stepDegrees === 0;
    const length = isMajor ? 6 : 3;
    const rad = (deg - 90) * Math.PI / 180;

    const x1 = 50 + Math.cos(rad) * 42;
    const y1 = 50 + Math.sin(rad) * 42;
    const x2 = 50 + Math.cos(rad) * (42 - length);
    const y2 = 50 + Math.sin(rad) * (42 - length);

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
    tick.setAttribute("x1", x1);
    tick.setAttribute("y1", y1);
    tick.setAttribute("x2", x2);
    tick.setAttribute("y2", y2);
    tick.setAttribute("stroke", "#fff");
    tick.setAttribute("stroke-width", "1");
    speedTicks.appendChild(tick);

    if (isMajor) {
      const labelValueKmh = Math.round(deg / 360 * maxSpeedKmh);
      let labelValue;
      if (speedUnit === 'kmh') labelValue = labelValueKmh;
      else if (speedUnit === 'mph') labelValue = Math.round(labelValueKmh * kmhToMph);
      else labelValue = Math.round(labelValueKmh * kmhToKnots);

      const labelX = 50 + Math.cos(rad) * 30;
      const labelY = 50 + Math.sin(rad) * 30 + 3;

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", labelX);
      label.setAttribute("y", labelY);
      label.setAttribute("fill", "#fff");
      label.setAttribute("font-size", "5");
      label.setAttribute("text-anchor", "middle");
      label.textContent = labelValue;
      speedTicks.appendChild(label);
    }
  }

  let unitLabel = speedUnit === 'kmh' ? 'Speed (kmh)' : speedUnit === 'mph' ? 'Speed (mph)' : 'Speed (knots)';
  speedUnitText.textContent = unitLabel;
}

// Add event listeners to toggle units
document.getElementById('altitudeGauge').addEventListener('click', () => {
  altitudeUnit = altitudeUnit === 'm' ? 'ft' : 'm';
  updateAltitudeLabels();
});

document.getElementById('speedGauge').addEventListener('click', () => {
  if (speedUnit === 'kmh') speedUnit = 'mph';
  else if (speedUnit === 'mph') speedUnit = 'knots';
  else speedUnit = 'kmh';
  updateSpeedLabels();
});

// Modify your updateSpeedAltitudeGauges to convert values before mapping degrees
function updateSpeedAltitudeGauges() {
  const now = viewer.clock.currentTime;
  let closestPlane = null;
  let minDist = Number.MAX_VALUE;
  const camPos = viewer.camera.positionWC;

  planes.forEach(p => {
      const pos = p.entity.position.getValue(now);
      if (!pos) return;
      const d = Cesium.Cartesian3.distance(camPos, pos);
      if (d < minDist) {
          minDist = d;
          closestPlane = p;
      }
  });

  const infoDiv = document.getElementById('selectedPlaneInfo');

  if (closestPlane) {
      infoDiv.textContent = `✈ Selected Plane: ${closestPlane.entity.name || 'Unknown'}`;
      const pos = closestPlane.entity.position.getValue(now);
      if (!pos) return;

      // Altitude in meters
      const carto = Cesium.Cartographic.fromCartesian(pos);
      let altitude = carto.height || 0;
      if (altitudeUnit === 'ft') altitude *= metersToFeet;

      // Velocity in m/s, convert to kmh first
      const velocity = getVelocityMagnitude(closestPlane.entity, now);
      let speedKmh = velocity * 3.6;
      let speed;

      if (speedUnit === 'kmh') speed = speedKmh;
      else if (speedUnit === 'mph') speed = speedKmh * kmhToMph;
      else speed = speedKmh * kmhToKnots;

      // Map speed and altitude to degrees (max values capped)
      const maxAltitudeForDeg = altitudeUnit === 'm' ? 12000 : 12000 * metersToFeet;
      const maxSpeedForDeg = speedUnit === 'kmh' ? 1200 : speedUnit === 'mph' ? 1200 * kmhToMph : 1200 * kmhToKnots;

      const speedDeg = getSpeedDeg(speed, speedUnit);
      const altitudeDeg = getAltitudeDeg(altitude, altitudeUnit);

      // Only update if there's a significant change (avoid jitter)
      if (Math.abs(speedDeg - lastSpeedDeg) > 0.1) {
          speedNeedle.setAttribute('transform', `rotate(${speedDeg} 50 50)`);
          // Update needle color based on speed
          const speedColor = getColorBySpeed(speed, speedUnit);
          const speedCssColor = `rgba(${Math.floor(speedColor.red * 255)}, ${Math.floor(speedColor.green * 255)}, ${Math.floor(speedColor.blue * 255)}, ${speedColor.alpha})`;
          speedNeedle.setAttribute('stroke', speedCssColor);
          lastSpeedDeg = speedDeg;
      }

      if (Math.abs(altitudeDeg - lastAltitudeDeg) > 0.1) {
          altitudeNeedle.setAttribute('transform', `rotate(${altitudeDeg} 50 50)`);

          // Update needle color based on altitude
          const color = getColorByAltitude(altitude, altitudeUnit);
          const cssColor = `rgba(${Math.floor(color.red * 255)}, ${Math.floor(color.green * 255)}, ${Math.floor(color.blue * 255)}, ${color.alpha})`;
          altitudeNeedle.setAttribute('stroke', cssColor);
          lastAltitudeDeg = altitudeDeg;
      }
  }
  else {
      infoDiv.textContent = '✈ Selected Plane: None';
  }
}

// Initialize labels on load
updateAltitudeLabels();
updateSpeedLabels();

viewer.clock.onTick.addEventListener(updateSpeedAltitudeGauges);


function getVelocityMagnitude(entity, time) {
    const dt = 1; // seconds
    const pos1 = entity.position.getValue(time);
    const pos2 = entity.position.getValue(Cesium.JulianDate.addSeconds(time, dt, new Cesium.JulianDate()));

    if (!pos1 || !pos2) return 0;

    const dist = Cesium.Cartesian3.distance(pos1, pos2);
    return dist / dt;
}

// Trail toggle
const trailsBtn = document.getElementById('toggleTrailsBtn');
trailsBtn.addEventListener('click', () => {
  trailsEnabled = !trailsEnabled;
  trailsBtn.textContent = `Trails: ${trailsEnabled ? 'ON' : 'OFF'}`;
  planes.forEach(p => {
    if (p.trail) p.trail.show = trailsEnabled;
  });
});
trailsBtn.textContent = `Trails: ON`;

// Auto-follow toggle
const autoFollowBtn = document.getElementById('toggleAutoFollowBtn');
autoFollowBtn.addEventListener('click', () => {
  autoFollowEnabled = !autoFollowEnabled;
  autoFollowBtn.textContent = `Follow: ${autoFollowEnabled ? 'ON' : 'OFF'}`;
  if (!autoFollowEnabled) {
    viewer.trackedEntity = undefined;
  }
});
autoFollowBtn.textContent = `Follow: OFF`;


startApp();
document.getElementById('toggleTelemetry').addEventListener('click', () => {
  const panel = document.getElementById('telemetry');
  panel.style.display = (panel.style.display === 'block' || panel.style.display === '') ? 'none' : 'block';

  // Toggle the icon class
  const icon = document.querySelector('#toggleTelemetry i');
  if (icon.classList.contains('fa-plane')) {
    icon.classList.remove('fa-plane');
    icon.classList.add('fa-plane'); // Or any other icon you want to toggle to
	//icon.style.transform = 'rotate(10deg)';
  } else {
    icon.classList.remove('fa-plane');
    icon.classList.add('fa-plane');
	//icon.style.transform = 'rotate(180deg)';
  }
});

 const worldClockDiv = document.getElementById('worldclock');
    const clockTimeSpan = document.getElementById('clock-time');

    const cities = [
    { name: 'Local', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { name: 'New York', timeZone: 'America/New_York' },
    { name: 'Los Angeles', timeZone: 'America/Los_Angeles' },
    { name: 'Chicago', timeZone: 'America/Chicago' },
    { name: 'Toronto', timeZone: 'America/Toronto' },
    { name: 'Mexico City', timeZone: 'America/Mexico_City' },
    { name: 'São Paulo', timeZone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', timeZone: 'America/Argentina/Buenos_Aires' },
    { name: 'London', timeZone: 'Europe/London' },
    { name: 'Paris', timeZone: 'Europe/Paris' },
    { name: 'Berlin', timeZone: 'Europe/Berlin' },
    { name: 'Madrid', timeZone: 'Europe/Madrid' },
	{ name: 'Ljubljana', timeZone: 'Europe/Ljubljana' },
    { name: 'Rome', timeZone: 'Europe/Rome' },
    { name: 'Athens', timeZone: 'Europe/Athens' },
    { name: 'Istanbul', timeZone: 'Europe/Istanbul' },
    { name: 'Moscow', timeZone: 'Europe/Moscow' },
    { name: 'Dubai', timeZone: 'Asia/Dubai' },
    { name: 'Jerusalem', timeZone: 'Asia/Jerusalem' },
    { name: 'Tehran', timeZone: 'Asia/Tehran' },
    { name: 'Karachi', timeZone: 'Asia/Karachi' },
    { name: 'Mumbai', timeZone: 'Asia/Kolkata' },
    { name: 'Delhi', timeZone: 'Asia/Kolkata' },
    { name: 'Dhaka', timeZone: 'Asia/Dhaka' },
    { name: 'Bangkok', timeZone: 'Asia/Bangkok' },
    { name: 'Singapore', timeZone: 'Asia/Singapore' },
    { name: 'Hong Kong', timeZone: 'Asia/Hong_Kong' },
    { name: 'Shanghai', timeZone: 'Asia/Shanghai' },
    { name: 'Beijing', timeZone: 'Asia/Shanghai' },
    { name: 'Seoul', timeZone: 'Asia/Seoul' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
    { name: 'Jakarta', timeZone: 'Asia/Jakarta' },
    { name: 'Manila', timeZone: 'Asia/Manila' },
    { name: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur' },
    { name: 'Sydney', timeZone: 'Australia/Sydney' },
    { name: 'Melbourne', timeZone: 'Australia/Melbourne' },
    { name: 'Auckland', timeZone: 'Pacific/Auckland' },
    { name: 'Honolulu', timeZone: 'Pacific/Honolulu' },
    { name: 'Anchorage', timeZone: 'America/Anchorage' },
    { name: 'Cape Town', timeZone: 'Africa/Johannesburg' },
    { name: 'Lagos', timeZone: 'Africa/Lagos' },
    { name: 'Nairobi', timeZone: 'Africa/Nairobi' },
    { name: 'Cairo', timeZone: 'Africa/Cairo' }
];
const cityInput = document.getElementById('city-input');
    const clockError = document.getElementById('clock-error');

    // Detect Enter key on input
    cityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = cityInput.value.trim().toLowerCase();
            if (!input) return;

            const matchIndex = cities.findIndex(city =>
                city.name.toLowerCase() === input
            );

            if (matchIndex !== -1) {
                currentCityIndex = matchIndex;
                updateClock();
                clockError.style.display = 'none';
            } else {
                clockError.style.display = 'block';
                setTimeout(() => clockError.style.display = 'none', 2000);
            }
        }
    });

    let currentCityIndex = 0;

    function updateClock() {
        const city = cities[currentCityIndex];
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: city.timeZone
        };

        const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
        worldClockDiv.innerHTML = `🕒 ${city.name}: <span id="clock-time">${timeStr}</span>`;
    }

    worldClockDiv.addEventListener('click', () => {
        currentCityIndex = (currentCityIndex + 1) % cities.length;
        updateClock();
    });

    setInterval(updateClock, 1000);
    updateClock();
	
	 const monitor = document.getElementById('monitor');
    const metricLabel = document.getElementById('metric-label');
    const metricValue = document.getElementById('metric-value');
    const graphCanvas = document.getElementById('graph');
    const ctx = graphCanvas.getContext('2d');

    const modes = ['fps', 'memory', 'canvas'];
    let mode = 'fps';

    const dataStorage = {
        fps: [],
        memory: [],
        canvas: []
    };
    const maxDataPoints = 200;
    let smoothedMaxY = 100;

    const padding = { left: 30, bottom: 16, right: 5, top: 5 };
    const w = graphCanvas.width;
    const h = graphCanvas.height;
    const graphW = w - padding.left - padding.right;
    const graphH = h - padding.top - padding.bottom;

    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fps = 0;

    let renderTime = 0;

    function setCanvasBackground(alpha) {
        graphCanvas.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
    }

    function animateModeChange(newMode) {
        metricLabel.style.transition = 'opacity 0.3s';
        metricValue.style.transition = 'opacity 0.3s';
        metricLabel.style.opacity = 0;
        metricValue.style.opacity = 0;

        setTimeout(() => {
            metricLabel.textContent =
                newMode === 'fps' ? 'FPS:' :
                newMode === 'memory' ? 'Memory:' : 'Canvas:';
            metricValue.textContent = '...';

            metricLabel.style.opacity = 1;
            metricValue.style.opacity = 1;
        }, 300);
    }

    monitor.addEventListener('click', () => {
        const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
        mode = modes[nextIndex];
        smoothedMaxY = 100;
        animateModeChange(mode);
    });

    function updateFPSCounter() {
        const now = performance.now();
        frameCount++;

        if (now - lastFrameTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastFrameTime = now;
        }

        requestAnimationFrame(updateFPSCounter);
    }

    function updateMonitor() {
        let value;

        if (mode === 'fps') {
            value = fps;
        } else if (mode === 'memory') {
            if (performance.memory) {
                value = performance.memory.usedJSHeapSize / (1024 * 1024);
            } else {
                value = 0;
            }
        } else if (mode === 'canvas') {
            value = renderTime;
        }

        // Update text
        metricValue.textContent =
            mode === 'fps' ? Math.round(value) :
            mode === 'memory' ? value.toFixed(1) + ' MB' :
            value.toFixed(2) + ' ms';

        const currentData = dataStorage[mode];
        if (currentData.length >= maxDataPoints) {
            currentData.shift();
        }
        currentData.push(value);

        const rawMax = Math.max(...currentData, 1);
        const targetMaxY = rawMax * 1.25;
        smoothedMaxY = smoothedMaxY * 0.9 + targetMaxY * 0.1;

        const renderStart = performance.now();
        updateGraph(currentData, smoothedMaxY);
        const renderEnd = performance.now();
        renderTime = renderEnd - renderStart;

        const threshold = 16;
        if (renderTime > threshold) {
            const alpha = Math.min((renderTime - threshold) / 20, 0.4);
            setCanvasBackground(alpha);
            console.warn(`Render spike: ${renderTime.toFixed(2)} ms`);
        } else {
            setCanvasBackground(0);
        }

        setTimeout(updateMonitor, 200);
    }

    function updateGraph(dataPoints, maxY) {
        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

        const gridLinesY = 5;
        const gridLinesX = 4;

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let i = 0; i <= gridLinesY; i++) {
            const y = padding.top + (i / gridLinesY) * graphH;
            ctx.moveTo(padding.left, y);
            ctx.lineTo(w - padding.right, y);
        }

        for (let i = 0; i <= gridLinesX; i++) {
            const x = padding.left + (i / gridLinesX) * graphW;
            ctx.moveTo(x, padding.top);
            ctx.lineTo(x, h - padding.bottom);
        }
        ctx.stroke();

        // Y-axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let i = 0; i <= gridLinesY; i++) {
            const valueY = maxY * (1 - i / gridLinesY);
            const y = padding.top + (i / gridLinesY) * graphH;

            ctx.fillText(
                mode === 'fps' ? Math.round(valueY) :
                mode === 'memory' ? valueY.toFixed(0) + '' :
                valueY.toFixed(1) + '',
                padding.left - 4,
                y
            );
        }

        // X-axis labels
        const totalSeconds = maxDataPoints * 0.2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        for (let i = 0; i <= gridLinesX; i++) {
            const secondsAgo = Math.round((1 - i / gridLinesX) * totalSeconds);
            const label = secondsAgo === 0 ? 'now' : `-${secondsAgo}s`;
            const x = padding.left + (i / gridLinesX) * graphW;
            ctx.fillText(label, x, h - padding.bottom + 2);
        }

        // Draw line graph
        ctx.beginPath();
        ctx.strokeStyle = 'DodgerBlue';
        ctx.lineWidth = 2;

        for (let i = 0; i < dataPoints.length; i++) {
            const x = padding.left + (i / maxDataPoints) * graphW;
            const y = padding.top + (1 - (dataPoints[i] / maxY)) * graphH;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    // Initial UI setup
    metricLabel.style.opacity = 1;
    metricValue.style.opacity = 1;

    updateFPSCounter();
    updateMonitor();
	let toggleStateWeather = 1;

function updateWeatherUI() {
    const telemetry = document.getElementById('gaugeContainer');
    const weather = document.getElementById('weatherContainer');
    const monitor = document.getElementById('monitor');
    const gaugeDiv = document.getElementById('gaugeDiv');
    //const mySidenav = document.getElementById('mySidenav');
    const htmlRadio = document.getElementById('htmlRadio');
 //const htmlHardware = document.getElementById('htmlHardware');	 
    const buttonNext = document.getElementById('toggleWeatherNext');
    const buttonPrev = document.getElementById('toggleWeatherPrev');

    // Reset all panels
    telemetry.style.display = 'none';
    weather.style.display = 'none';
    monitor.style.display = 'block';
    //mySidenav.style.display = 'none';
    //htmlRadio.style.display = 'none';
	//htmlHardware.style.display = 'none';
	

    // Reset gaugeDiv
    gaugeDiv.style.right = '0px';

    // Default button position
    let defaultRight = '219px';
    if (toggleStateWeather === 0) {
        defaultRight = '0px'; // Edge for state 0
        monitor.style.display = 'none';
        gaugeDiv.style.right = '-220px';
    }

    // Apply positions
    buttonNext.style.right = defaultRight;
    buttonPrev.style.right = defaultRight;

    // Apply state-specific panels and titles
    switch (toggleStateWeather) {
        case 0:
            buttonNext.title = 'Show Window';
            buttonPrev.title = 'Show Window';
            break;
        case 1:
            telemetry.style.display = 'block';
			monitor.style.display = 'block';
            buttonNext.title = 'Next Panel';
            buttonPrev.title = 'Previous Panel';
            break;
        case 2:
            weather.style.display = 'block';
            buttonNext.title = 'Next Panel';
            buttonPrev.title = 'Previous Panel';
			monitor.style.display = 'block';
            break;
       
    }
}

// Next button
document.getElementById('toggleWeatherNext').addEventListener('click', () => {
    toggleStateWeather++;
    if (toggleStateWeather > 2) toggleStateWeather = 0;
    updateWeatherUI();
});

// Prev button
document.getElementById('toggleWeatherPrev').addEventListener('click', () => {
    toggleStateWeather--;
    if (toggleStateWeather < 0) toggleStateWeather = 2;
    updateWeatherUI();
});

// Initial update
updateWeatherUI();


let selectedLayer = "none";
const legend = document.getElementById("selectedLayer");
const apiKey = "ee75af80eff0f774529877fd58bab3a9";
let weatherLayer = null;
let refreshIntervalId = null; // to hold the interval ID


// Map of rain weather codes → label + intensity (scale you choose)
const rainCodeMap = {
  500: { label: "Light Rain", intensity: 1 },
  501: { label: "Moderate Rain", intensity: 2 },
  502: { label: "Heavy Rain", intensity: 3 },
  503: { label: "Very Heavy Rain", intensity: 4 },
  504: { label: "Extreme Rain", intensity: 5 },
  511: { label: "Freezing Rain", intensity: 6 },
  520: { label: "Light Shower Rain", intensity: 1 },
  521: { label: "Shower Rain", intensity: 2 },
  522: { label: "Heavy Shower Rain", intensity: 3 },
  531: { label: "Ragged Shower Rain", intensity: 4 }
};

// Called when user clicks an icon in the SVG
function setWeatherLayerUI(layer) {
  selectedLayer = layer;
  legend.textContent = layer.replace("_new", "").toUpperCase();

  // Track whether rain logic should apply
  allowRainOverride = (layer === "precipitation_new");

  setWeatherLayer(layer);
  fetchLiveWeatherData(layer);

  // Only update legend for selected layer
  switch (layer) {
    case "pressure_new":
	document.getElementById('inlinePrecipLegend').innerHTML = '';
      createPressureLegend(
        980, 1050,
        [
          { offset: 0, color: '#0000FF' },
          { offset: 0.4, color: '#00FF00' },
          { offset: 1, color: '#FF0000' }
        ]
      );
      break;

    case "temp_new":
	document.getElementById('inlinePrecipLegend').innerHTML = '';
      createTemperatureLegend(
        -30, 40,
        [
          { offset: 0, color: '#0000FF' },
          { offset: 0.4, color: '#FFFF00' },
          { offset: 1, color: '#FF0000' }
        ]
      );
      break;

    case "precipitation_new":
	document.getElementById('inlinePrecipLegend').innerHTML = '';
      createPrecipitationLegend(
        0, 6,
        [
          { offset: 0, color: 'rgba(255, 255, 255, 0)' },
          { offset: 0.5, color: '#4A90E2' },
          { offset: 1, color: '#002F6C' }
        ]
      );
      break;

    case "clouds_new":
	document.getElementById('inlinePrecipLegend').innerHTML = '';
      createCloudsLegend(0, 100);
      break;

    case "wind_new":
	document.getElementById('inlinePrecipLegend').innerHTML = '';
      createWindLegend(0, 100);
      break;
	  
	  case "none":
      document.getElementById('legendContainer').innerHTML = '';
	  
      break;
  }

  // Don't clear legend anymore here unless needed
  // document.getElementById('legendContainer').innerHTML = '';

  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }

  refreshIntervalId = setInterval(() => {
    button.addEventListener('click', () => {
      const planeId = button.getAttribute('data-id');
      const plane = planes.get(planeId);
      if (plane) {
        viewer.trackedEntity = plane.entity;
        trackedPlaneId = planeId;
        fetchLiveWeatherData(selectedLayer);
        updateTelemetry();
      }
    });
  }, 150000);
}
 
function createPrecipitationLegend(minValue, maxValue) {
  const legendContainer = document.getElementById('legendContainer');
  legendContainer.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // transparent
  gradient.addColorStop(0.5, '#4A90E2'); 
  gradient.addColorStop(1, '#002F6C'); 

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 30);

  ctx.fillStyle = 'white';
  ctx.font = '14px Oxanium';
  ctx.textAlign = 'center';
  
  const steps = 6;
  const tickOffset = 20; // Adjust for proper positioning within canvas
  const tickXOffset = 10;
  for (let i = 0; i <= steps; i++) {
    const x = (canvas.width / steps) * i;
    const value = minValue + ((maxValue - minValue) / steps) * i;
    ctx.fillText(value.toFixed(1), x - tickXOffset, 45 - tickOffset); // Adjust the y position
  }

  legendContainer.appendChild(canvas);
}
function createCloudsLegend(minValue, maxValue) {
  const legendContainer = document.getElementById('legendContainer');
  legendContainer.innerHTML = ''; // Clear any existing legend

  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // transparent
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)'); // full white

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 30);

  ctx.fillStyle = 'white';
  ctx.font = '14px Oxanium';
  ctx.textAlign = 'center';
  
  const steps = 5;
  const tickOffset = 20; // Adjust for proper positioning within canvas
  const tickXOffset = 10;
  for (let i = 0; i <= steps; i++) {
    const x = (canvas.width / steps) * i;
    const value = minValue + ((maxValue - minValue) / steps) * i;
    ctx.fillText(value.toFixed(0), x - tickXOffset, 45 - tickOffset); // Adjust the y position
  }

  legendContainer.appendChild(canvas);
}

function createWindLegend(minValue, maxValue) {
  const legendContainer = document.getElementById('legendContainer');
  legendContainer.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(47, 31, 60, 1)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 30);

  ctx.fillStyle = 'white';
  ctx.font = '14px Oxanium';
  ctx.textAlign = 'center';

  const steps = 5;
  const tickOffset = 20; // Adjust for proper positioning within canvas
  const tickXOffset = 10;
  for (let i = 0; i <= steps; i++) {
    const x = (canvas.width / steps) * i;
    const value = minValue + ((maxValue - minValue) / steps) * i;
    ctx.fillText(value.toFixed(0), x - tickXOffset, 45 - tickOffset);
  }

  legendContainer.appendChild(canvas);
}

function createTemperatureLegend(minValue, maxValue, colors, currentValue = null) {
  const legendContainer = document.getElementById('legendContainer');
  legendContainer.innerHTML = ''; // Clear existing legend

  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(0, 0, 255, 0.4)');
  gradient.addColorStop(0.25, 'rgba(0, 255, 0, 0.4)');
  gradient.addColorStop(0.50, 'rgba(255, 255, 0, 0.4)');
  gradient.addColorStop(0.75, 'rgba(255, 0, 0, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.4)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 30);

  // Add the black horizontal line based on the current value
  if (currentValue !== null) {
    const valuePos = ((currentValue - minValue) / (maxValue - minValue)) * canvas.width;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(valuePos, 0);
    ctx.lineTo(valuePos, 30);
    ctx.stroke();
  }

  // Draw tick values
  ctx.fillStyle = 'white';
  ctx.font = '14px Oxanium';
  ctx.textAlign = 'center';
  const tickOffset = 20; // Adjust for proper positioning within canvas
  const tickXOffset = 10;  
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const x = (canvas.width / steps) * i;
    const value = minValue + ((maxValue - minValue) / steps) * i;
    ctx.fillText(value.toFixed(0), x - tickXOffset, 45 - tickOffset);
  }

  legendContainer.appendChild(canvas);
}


function createPressureLegend(minValue, maxValue, colors, currentValue = null) {
  const legendContainer = document.getElementById('legendContainer');
  legendContainer.innerHTML = ''; // Clear existing legend

  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(0, 0, 255, 0.4)');
  gradient.addColorStop(0.25, 'rgba(0, 255, 0, 0.4)');
  gradient.addColorStop(0.50, 'rgba(255, 255, 0, 0.4)');
  gradient.addColorStop(0.75, 'rgba(255, 0, 0, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0.4)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 30);

  // Add the black horizontal line based on the current pressure value
  if (currentValue !== null) {
    const valuePos = ((currentValue - minValue) / (maxValue - minValue)) * canvas.width;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(valuePos, 0);
    ctx.lineTo(valuePos, 30);
    ctx.stroke();
  }

  // Draw tick values
  ctx.fillStyle = 'white';
  ctx.font = '14px Oxanium';
  ctx.textAlign = 'center';
  const tickOffset = 20; // Adjust for proper positioning within canvas
  const tickXOffset = 10;  
  const steps = 7;
  for (let i = 0; i <= steps; i++) {
    const x = (canvas.width / steps) * i;
    const value = minValue + ((maxValue - minValue) / steps) * i;
    ctx.fillText(value.toFixed(0), x - tickXOffset, 45 - tickOffset);
  }

  legendContainer.appendChild(canvas);
}


// --- Keep this outside the function ---
let currentWindDeg = 0; // Current animated rotation
let targetWindDeg = 0;  // Target rotation from API
let windArrowElem = null;

function animateWindArrow() {
  if (!windArrowElem) return;

  // Calculate shortest rotation distance
  let diff = targetWindDeg - currentWindDeg;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  // Damping factor (0.1 = slow, 0.3 = faster)
  currentWindDeg += diff * 0.1;

  windArrowElem.style.transform = `rotate(${currentWindDeg}deg)`;

  // Continue animation if not yet at target
  if (Math.abs(diff) > 0.1) {
    requestAnimationFrame(animateWindArrow);
  } else {
    currentWindDeg = targetWindDeg; // Snap exactly
  }
}

async function fetchLiveWeatherData(layer) {
  let lat = defaultLat;
  let lon = defaultLng;

  if (trackedPlaneId && planes.has(trackedPlaneId)) {
    const plane = planes.get(trackedPlaneId);
    const pos = plane.entity.position.getValue(Cesium.JulianDate.now());
    if (pos) {
      const cartographic = Cesium.Cartographic.fromCartesian(pos);
      lat = Cesium.Math.toDegrees(cartographic.latitude);
      lon = Cesium.Math.toDegrees(cartographic.longitude);
    }
  }

  const weatherInfoDiv = document.getElementById("liveWeatherData");

  function getWindDirection(degree) {
    if (degree === "N/A") return "N/A";
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await res.json();

    const weatherDesc = data.weather?.[0]?.description ?? "Unknown";
    const weatherIcon = data.weather?.[0]?.icon ?? "01d";
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const temp = data.main?.temp ?? "N/A";
    const temp_min = data.main?.temp_min ?? "N/A";
    const temp_max = data.main?.temp_max ?? "N/A";
    const feels_like = data.main?.feels_like ?? "N/A";
    const humidity = data.main?.humidity ?? "N/A";
    const pressure = data.main?.pressure ?? "N/A";
    const sea_level = data.main?.sea_level ?? "N/A";
    const grnd_level = data.main?.grnd_level ?? "N/A";
    const visibility = data.visibility ?? "N/A";

    const windSpeed = data.wind?.speed ?? "N/A";
    const windDeg = data.wind?.deg ?? 0; 
    const windGust = data.wind?.gust ?? "N/A";
    const windDegSight = getWindDirection(windDeg);
    
    const rain = data.rain?.["1h"] ?? 0;
    const snow = data.snow?.["1h"] ?? 0;
    const precipitation = rain + snow;

    // --- Create or reference SVG arrow element ---
    if (!windArrowElem) {
      windArrowElem = document.createElement("span");
      windArrowElem.id = "windArrow";
      windArrowElem.style.display = "inline-block";
      windArrowElem.style.marginTop = "-15px";
	  //windArrowElem.style.marginLeft = "-90px";
	  //windArrowElem.style.position = "fixed";
      windArrowElem.style.transition = "transform 15s ease-in-out"; // Smooth rotation
      windArrowElem.style.transformOrigin = "center";

      // Inline SVG arrow
      windArrowElem.innerHTML = `
		<svg width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="20" x2="12" y2="4" stroke="white" stroke-width="2"/>
          <polygon points="8,4 16,4 12,0" fill="white"/>
        </svg>
      `;
    }

    targetWindDeg = windDeg; // Set new target rotation
    animateWindArrow(); // Start the smooth rotation

    // --- Keep all weather info intact ---
    const infoHtml = `
      <div style="display:flex; align-items:center; gap:5px;font-size:1.1em;">
        <img src="${iconUrl}" alt="Weather Icon" width="45" height="45">
        <div style="font-size:1.0em;"><strong>${weatherDesc.toUpperCase()}</strong></div>
      </div>
      🌡️ <strong>Temp:</strong> ${temp} °C <br>
      <strong>Temp Min:</strong> ${temp_min} °C <br>
      <strong>Temp Max:</strong> ${temp_max} °C <br>
      <strong>Feels Like:</strong> ${feels_like} °C <br>
      💧 <strong>Humidity:</strong> ${humidity}%<br>
      🧭 <strong>Wind:</strong> ${windSpeed} m/s | ${windDeg}° | ${windDegSight} <span id="windArrowContainer"></span><br>
      <strong>Gust:</strong> ${windGust} m/s<br>
      🌧️ <strong>Precipitation (1h):</strong> ${precipitation} mm<br>
      🧪 <strong>Pressure:</strong> ${pressure} hPa<br>
      <strong>Sea Level:</strong> ${sea_level} hPa<br>
      <strong>Ground Level:</strong> ${grnd_level} hPa<br>
      👁️ <strong>Visibility:</strong> ${Number(visibility).toLocaleString()} m
      <div id="inlinePrecipLegend" style="margin-top: 10px;"></div>
    `;

    weatherInfoDiv.innerHTML = infoHtml;

    // --- Inject SVG arrow into placeholder ---
    const windArrowContainer = document.getElementById("windArrowContainer");
    if (windArrowContainer && windArrowElem) {
      windArrowContainer.appendChild(windArrowElem);
    }

  } catch (err) {
    console.error("Failed to fetch OpenWeatherMap data:", err);
    weatherInfoDiv.innerHTML = "❌ Unable to load weather data.";
  }
}


// Helper function to update the legend with current layer value
function updateLegend(label, value) {
  const legendContainer = document.getElementById('inlinePrecipLegend');
  if (legendContainer) {
    legendContainer.innerHTML = ''; // Clear previous legend

    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    // Gradient for the legend bar
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 255, 1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 30);

    // Add value text in the center
    ctx.fillStyle = 'white';
    ctx.font = '14px Oxanium';
    ctx.textAlign = 'center';
    ctx.fillText(`${label}: ${value}`, canvas.width / 2, 45);

    legendContainer.appendChild(canvas);
  }
}

// Call the function every 15 seconds (15000 milliseconds)
const intervalId = setInterval(() => {
  fetchLiveWeatherData(selectedLayer);  // Use selectedLayer or another valid variable
}, 15000);

// To stop the interval later (for example, when the user leaves the page)
function stopWeatherRefresh() {
  clearInterval(intervalId);
}


// Applies the layer on the Cesium map
function setWeatherLayer(layer) {
  if (weatherLayer) {
    viewer.imageryLayers.remove(weatherLayer, true);
    weatherLayer = null;
  }
  if (layer !== "none") {
    weatherLayer = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
      url: `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`,
      credit: "© OpenWeatherMap"
    }));
  }
}

// Set the opacity / effect of precipitation based on intensity
function applyRainOverlayEffect(intensity) {
  if (!weatherLayer) return;
  // Map intensity to opacity (you can adjust this)
  // Example: intensity 1 → 0.25 opacity, intensity 5 → 1.0
  const base = 0.15;
  const step = 0.17;
  const opacity = Math.min(base + step * intensity, 1.0);
  weatherLayer.alpha = opacity;
}

// Remove precipitation / rain overlay
function removeRainOverlayEffect() {
  if (weatherLayer) {
    viewer.imageryLayers.remove(weatherLayer, true);
    weatherLayer = null;
  }
  const legendContainer = document.getElementById('legendContainer');
  if (legendContainer) {
    legendContainer.innerHTML = '';
  }
}

// Create a little rain legend / indicator
function createRainLegend(label, intensity) {
  const legendContainer = document.getElementById('legendContainer');

  legendContainer.innerHTML = `
    <div style="color:white; font-family: Oxanium; padding: 5px;">
      🌧 <strong>Rain:</strong> ${label}<br/>
      🔢 <strong>Intensity:</strong> ${intensity}
    </div>
  `;
}

 // Get the icon element
    const icon = document.querySelector('#toggleTelemetry i');

    // Add a click listener to toggle the "down" class
    icon.addEventListener('click', function () {
      this.classList.toggle('down');
    });
	
document.addEventListener('DOMContentLoaded', function () {
  const filterInput = document.getElementById('countryFilter');
  const select = document.getElementById('countrySelect');
  const suggestionsBox = document.getElementById('suggestions');

  // Filter function
  function filterCountries(search) {
    search = search.trim().toLowerCase();
    const matches = [];

    Array.from(select.querySelectorAll('option')).forEach(option => {
      const text = option.textContent.trim();
      const isMatch = text.toLowerCase().includes(search);
      option.style.display = isMatch ? '' : 'none';
      if (isMatch && search !== '') matches.push({ text, value: option.value });
    });

    Array.from(select.querySelectorAll('optgroup')).forEach(group => {
      const anyVisible = Array.from(group.children).some(opt => opt.style.display !== 'none');
      group.style.display = anyVisible ? '' : 'none';
    });

    return matches;
  }

  // Display suggestion box
  function showSuggestions(matches) {
    if (matches.length === 0) {
      suggestionsBox.style.display = 'none';
      return;
    }

    suggestionsBox.innerHTML = '';
    matches.forEach(match => {
      const div = document.createElement('div');
      div.textContent = match.text;
      div.style.padding = '5px 10px';
      div.style.cursor = 'pointer';

      div.addEventListener('click', function () {
        select.value = match.value;
        const event = new Event('change');
        select.dispatchEvent(event);
        suggestionsBox.style.display = 'none';
        filterInput.value = match.text;
      });

      div.addEventListener('mouseover', () => {
        div.style.background = '#444';
      });
      div.addEventListener('mouseout', () => {
        div.style.background = 'transparent';
      });

      suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = 'block';
  }

  filterInput.addEventListener('input', function () {
    const search = this.value;
    const matches = filterCountries(search);
    showSuggestions(matches);
  });

  filterInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const visibleOptions = Array.from(select.querySelectorAll('option')).filter(opt => opt.style.display !== 'none');
      if (visibleOptions.length > 0) {
        select.value = visibleOptions[0].value;
        const event = new Event('change');
        select.dispatchEvent(event);
        filterInput.value = visibleOptions[0].textContent;
        suggestionsBox.style.display = 'none';
      }
    }
  });

  // Hide suggestions if user clicks outside
  document.addEventListener('click', function (e) {
    if (!filterInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = 'none';
    }
  });
});

