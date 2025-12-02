<?php ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
<link rel="icon" type="image/svg+xml" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="50" font-size="100" text-anchor="middle" dominant-baseline="middle" fill="DodgerBlue">✈</text></svg>' />
  <title>Live Flight Radar</title>
  <script src="https://www.yourdomainename.com/Build/Cesium/Cesium.js"></script>
  <link href="https://www.yourdomainename.com/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
  <link href="index.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>

</head>
<body>
<div id="preloader">
  <div>Loading aircraft database, please wait...</div>
  <div class="sizer">Size: 118.321 KB</div>
  <div class="spinner"></div>
</div>

<div id="cesiumContainer"></div>
  <div id="loadingOverlay"></div>


  <input value="Slovenia" type="text" id="countryFilter" placeholder="🔍 Search country...">

<div id="suggestions"></div>
  <select class="style widthHeight" style="display:none;" id="countrySelect" hidden>
  <option value="Afghanistan">Afghanistan</option>
  <option value="Åland Islands">Åland Islands</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="American Samoa">American Samoa</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Anguilla">Anguilla</option>
  <option value="Antarctica">Antarctica</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Aruba">Aruba</option>
  <optgroup label="Australia">
  <option value="New South Wales">New South Wales</option>
  <option value="Victoria">Victoria</option>
  <option value="Queensland">Queensland</option>
  <option value="South Australia">South Australia</option>
  <option value="Western Australia">Western Australia</option>
  <option value="Northern Territory">Northern Territory</option>
  <option value="Tasmania">Tasmania</option>
  <option value="Australian Capital Territory">Australian Capital Territory</option>
  </optgroup>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bermuda">Bermuda</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Brazil">Brazil</option>
  <option value="Brunei">Brunei</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cabo Verde">Cabo Verde</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Alberta">Alberta</option>
  <option value="British Columbia">British Columbia</option>
  <option value="Manitoba">Manitoba</option>
  <option value="New Brunswick">New Brunswick</option>
  <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
  <option value="Northwest Territories">Northwest Territories</option>
  <option value="Nova Scotia">Nova Scotia</option>
  <option value="Nunavut">Nunavut</option>
  <option value="Ontario">Ontario</option>
  <option value="Prince Edward Island">Prince Edward Island</option>
  <option value="Quebec">Quebec</option>
  <option value="Saskatchewan">Saskatchewan</option>
  <option value="Yukon">Yukon</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czech Republic">Czech Republic</option>
  <option value="Congo">Democratic Republic of the Congo</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Eswatini">Eswatini</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Fiji">Fiji</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Greece">Greece</option>
  <option value="Grenada">Grenada</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-Bissau">Guinea-Bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Honduras">Honduras</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran">Iran</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Laos">Laos</option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libya">Libya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia">Micronesia</option>
  <option value="Moldova">Moldova</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolia">Mongolia</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Morocco">Morocco</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Myanmar">Myanmar</option>
  <option value="Namibia">Namibia</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Netherlands">Netherlands</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="North Macedonia">North Macedonia</option>
  <option value="Norway">Norway</option>
  <option value="Oman">Oman</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palau">Palau</option>
  <option value="Panama">Panama</option>
  <option value="Papua New Guinea">Papua New Guinea</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Peru">Peru</option>
  <option value="Philippines">Philippines</option>
  <option value="Poland">Poland</option>
  <option value="Portugal">Portugal</option>
  <option value="Qatar">Qatar</option>
  <option value="Republic of the Congo">Republic of the Congo</option>
  <option value="Romania">Romania</option>
  <option value="Russia">Russia</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
  <option value="Saint Lucia">Saint Lucia</option>
  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
  <option value="Samoa">Samoa</option>
  <option value="San Marino">San Marino</option>
  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
  <option value="Saudi Arabia">Saudi Arabia</option>
  <option value="Senegal">Senegal</option>
  <option value="Serbia">Serbia</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapore">Singapore</option>
  <option value="Slovakia">Slovakia</option>
  <option value="Slovenia" selected>Slovenia</option>
  <option value="Solomon Islands">Solomon Islands</option>
  <option value="Somalia">Somalia</option>
  <option value="South Africa">South Africa</option>
  <option value="South Korea">South Korea</option>
  <option value="South Sudan">South Sudan</option>
  <option value="Spain">Spain</option>
  <option value="Sri Lanka">Sri Lanka</option>
  <option value="Sudan">Sudan</option>
  <option value="Suriname">Suriname</option>
  <option value="Sweden">Sweden</option>
  <option value="Switzerland">Switzerland</option>
  <option value="Syria">Syria</option>
  <option value="Taiwan">Taiwan</option>
  <option value="Tajikistan">Tajikistan</option>
  <option value="Tanzania">Tanzania</option>
  <option value="Thailand">Thailand</option>
  <option value="Timor-Leste">Timor-Leste</option>
  <option value="Togo">Togo</option>
  <option value="Tonga">Tonga</option>
  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
  <option value="Tunisia">Tunisia</option>
  <option value="Turkey">Turkey</option>
  <option value="Turkmenistan">Turkmenistan</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Uganda">Uganda</option>
  <option value="Ukraine">Ukraine</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="United Kingdom">United Kingdom</option>
  <optgroup label="United States">
  <option value="Alabama">Alabama</option>
  <option value="Alaska">Alaska</option>
  <option value="Arizona">Arizona</option>
  <option value="Arkansas">Arkansas</option>
  <option value="California">California</option>
  <option value="Colorado">Colorado</option>
  <option value="Connecticut">Connecticut</option>
  <option value="Delaware">Delaware</option>
  <option value="Florida">Florida</option>
  <option value="Georgia">Georgia</option>
  <option value="Hawaii">Hawaii</option>
  <option value="Idaho">Idaho</option>
  <option value="Illinois">Illinois</option>
  <option value="Indiana">Indiana</option>
  <option value="Iowa">Iowa</option>
  <option value="Kansas">Kansas</option>
  <option value="Kentucky">Kentucky</option>
  <option value="Louisiana">Louisiana</option>
  <option value="Maine">Maine</option>
  <option value="Maryland">Maryland</option>
  <option value="Massachusetts">Massachusetts</option>
  <option value="Michigan">Michigan</option>
  <option value="Minnesota">Minnesota</option>
  <option value="Mississippi">Mississippi</option>
  <option value="Missouri">Missouri</option>
  <option value="Montana">Montana</option>
  <option value="Nebraska">Nebraska</option>
  <option value="Nevada">Nevada</option>
  <option value="New Hampshire">New Hampshire</option>
  <option value="New Jersey">New Jersey</option>
  <option value="New Mexico">New Mexico</option>
  <option value="New York">New York</option>
  <option value="North Carolina">North Carolina</option>
  <option value="North Dakota">North Dakota</option>
  <option value="Ohio">Ohio</option>
  <option value="Oklahoma">Oklahoma</option>
  <option value="Oregon">Oregon</option>
  <option value="Pennsylvania">Pennsylvania</option>
  <option value="Rhode Island">Rhode Island</option>
  <option value="South Carolina">South Carolina</option>
  <option value="South Dakota">South Dakota</option>
  <option value="Tennessee">Tennessee</option>
  <option value="Texas">Texas</option>
  <option value="Utah">Utah</option>
  <option value="Vermont">Vermont</option>
  <option value="Virginia">Virginia</option>
  <option value="Washington">Washington</option>
  <option value="West Virginia">West Virginia</option>
  <option value="Wisconsin">Wisconsin</option>
  <option value="Wyoming">Wyoming</option>
  </optgroup>
  <option value="Uruguay">Uruguay</option>
  <option value="Uzbekistan">Uzbekistan</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Vatican City">Vatican City</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Vietnam">Vietnam</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambia">Zambia</option>
  <option value="Zimbabwe">Zimbabwe</option>
</select>


<div id="telemetryContainer">
  <div class="scroller" id="telemetry"><b>Telemetry:</b><br/>
  </div>
 

  </div>
  <button title="Hide Window" id="toggleTelemetry">
    <i class="fa-solid fa-plane rotate"></i>
  </button>

  <button title="Flight Telemetry" id="toggleWeather"><i class="fas fa-chevron-right"></i></button>
  
  <button  style="position:absolute;margin-left:-50px;" title="Previous Panel" id="toggleWeatherPrev">
    <i class="fas fa-chevron-left"></i>
</button>
<button title="Next Panel" id="toggleWeatherNext">
    <i class="fas fa-chevron-right"></i>
</button>
  <div id="bottomMenu">
  <button id="toggleTrailsBtn" class="overlay-btn">Trails</button>
  <button class="overlay-count" id="planeCount">
  Planes Displayed: 0
</button>
<button class="overlay-count" id="selectedPlaneInfo">
✈ Selected Plane: None
</button>
<div id="clock-controls">
</div>
<button class="overlay-btn" id="worldclock">🕒 Local: <span id="clock-time">--:--:--</span></button>

<input title="Add City" id="city-input" type="text" value="Local" placeholder="Enter city..." />
    <div id="clock-error" style="display: none;">City not found</div>
  <input class="overlay-count" type="text" id="filterInput" placeholder="Filter by Reg/Type/ICAO" oninput="updateTelemetry()" />
  <button id="toggleAutoFollowBtn" class="overlay-btn">Follow Nearest</button>
</div>


<!-- HTML structure for Cesium -->
<div id="cesiumContainer" class="cesium-viewer"></div>
<div id="gaugeDiv" style="position:fixed;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);overflow:hidden;top:0px;right:0px;width:220px;height:100%;">
<div>
<div id="gaugeContainer">

<center>
<div id="compassContainer">
    <svg id="compass" viewBox="0 0 100 100" width="200" height="200">
        <!-- Outer circle -->
        <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="transparent" />
        
        <!-- Tick marks -->
        <g id="ticks">
            <line x1="50" y1="2" x2="50" y2="0" stroke="#fff" stroke-width="2" />
            <line x1="98" y1="50" x2="100" y2="50" stroke="#fff" stroke-width="2" />
            <line x1="50" y1="98" x2="50" y2="100" stroke="#fff" stroke-width="2" />
            <line x1="2" y1="50" x2="0" y2="50" stroke="#fff" stroke-width="2" />
        </g>
        
        <!-- Large Airplane Outline centered & filling compass -->
       <g id="airplaneContainer" transform="rotate(0 50 50)">
    <image 
        id="airplaneImage"
        href="plane.png" 
        x="7.5" y="7.5"  <!-- position inside SVG -->
        width="100" height="100"  <!-- size of airplane -->
        preserveAspectRatio="xMidYMid meet"
    />
</g>


        <!-- N, S, E, W Labels -->
        <text x="50" y="5" text-anchor="middle" fill="#fff" font-size="6">N</text>
        <text x="50" y="98" text-anchor="middle" fill="#fff" font-size="6">S</text>
        <text x="95" y="54" text-anchor="middle" fill="#fff" font-size="6">E</text>
        <text x="5" y="54" text-anchor="middle" fill="#fff" font-size="6">W</text>

        <!-- Heading Label -->
        <text x="50" y="60" text-anchor="middle" fill="#fff" font-size="6">Heading (deg°)</text>
    </svg>
</div>



<br>
<div id="speedGauge">
  <svg viewBox="0 0 100 100" class="speedGauge">
    <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="transparent" />
    <g id="speedTicks"></g>  
    <line id="speedNeedle" x1="50" y1="50" x2="50" y2="10" stroke="lime" opacity="0.7" stroke-width="3" />
<text id="speedUnitText" class="unitLabel" x="50" y="60" text-anchor="middle" fill="#fff" font-size="6">Speed (km/h)</text>
  </svg>
</div>
<br>
<div id="altitudeGauge">
  <svg viewBox="0 0 100 100" class="altitudeGauge" style="width: 100%; height: 100%;font-family: 'Oxanium', sans-serif;">
    <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="transparent" />
    <g id="altitudeTicks"></g> 
    <line id="altitudeNeedle" x1="50" y1="50" x2="50" y2="10" stroke="yellow" opacity="0.7" stroke-width="3" />
<text id="altitudeUnitText" class="unitLabel" x="50" y="60" text-anchor="middle" fill="#fff" font-size="6">Altitude (m)</text>
  </svg>
  
</div>
</center>

</div>



<div style="display:none;" id="weatherContainer">
  <center>
        <!-- SVG Container with Weather Icons -->
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="margin-top:200px;width: 100%; height: auto; position: relative;transform:scale(0.8);">
          <defs>
            <style>
              .weather-icon {
                cursor: pointer;
                font-size: 22px;
                fill: #ccc;
                transition: fill 0.2s ease;
              }
              .weather-icon:hover {
                fill: #fff;
              }
            </style>
          </defs>

          <!-- Outer circle (globe boundary) -->
          <circle cx="100" cy="100" r="98" stroke="none" fill="none" stroke-width="0.5" stroke="#888" />

          <!-- Layer Icons (clickable) -->
          <!-- Clouds -->
          <text x="100" y="30" text-anchor="middle"
                class="weather-icon"
                onclick="setWeatherLayerUI('clouds_new')"><title>CLOUDS</title>☁️</text>

          <!-- Wind -->
          <text x="60" y="160" text-anchor="middle"
                class="weather-icon"
                onclick="setWeatherLayerUI('wind_new')"><title>WIND</title>💨</text>

          <!-- Precipitation -->
          <text x="140" y="160" text-anchor="middle"
                class="weather-icon"
                onclick="setWeatherLayerUI('precipitation_new')"><title>PRECIPITATION</title>🌧️</text>

          <!-- Pressure -->
          <text x="30" y="100" text-anchor="middle"
                class="weather-icon"
                onclick="setWeatherLayerUI('pressure_new')"><title>PRESSURE</title>🧪</text>

          <!-- Temperature -->
          <text x="170" y="100" text-anchor="middle"
                class="weather-icon"
                onclick="setWeatherLayerUI('temp_new')"><title>TEMPERATURE</title>🌡️</text>

          <!-- None (center) -->
          <text x="100" y="105" text-anchor="middle"
                class="weather-icon"
                style="font-size: 20px;"
                onclick="setWeatherLayerUI('none')"><title>NONE</title>❌</text>
        </svg>

        <!-- Weather Legend -->
        <div id="weatherLegend" style="color:white;font-size:12px;">
          <br><strong>Selected Layer:</strong> <span id="selectedLayer">None</span><br>
          <div id="liveWeatherData" style="margin:10px;"></div>
          <div id="legendContainer" style="margin-top:10px;"></div>
          <div id="inlinePrecipLegend" style="margin-top: 10px;"></div>
        </div>
      </div>
    </div>
  </center>
</div>

<div id="monitor">
    
    <span id="metric-label">FPS:</span> <span id="metric-value">0</span>
    <canvas id="graph" width="200" height="auto"></canvas>
</div>
</div>
<script src="index.js"></script>

</body>
</html>
