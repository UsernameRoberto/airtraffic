<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// === CONFIG ===
$clientId = 'your_client_id_json_credentials';
$clientSecret = 'your_client_Secret_json_credentials';
$cacheDir = __DIR__ . '/tmp'; // directory created
$cacheTime = 15; // seconds to cache API response


$boundingBoxes = [
    'Afghanistan' => [
        'lamin' => 29.38,
        'lamax' => 38.49,
        'lomin' => 60.53,
        'lomax' => 74.89
    ],
    'Åland Islands' => [
        'lamin' => 59.7,
        'lamax' => 60.5,
        'lomin' => 19.8,
        'lomax' => 21.2
    ],
    'Albania' => [
        'lamin' => 39.6,
        'lamax' => 42.7,
        'lomin' => 19.2,
        'lomax' => 21.1
    ],
    'Algeria' => [
        'lamin' => 18.96,
        'lamax' => 37.11,
        'lomin' => -8.67,
        'lomax' => 11.98
    ],
    'American Samoa' => [
        'lamin' => -14.35,
        'lamax' => -11.04,
        'lomin' => -172.53,
        'lomax' => -168.03
    ],
    'Andorra' => [
        'lamin' => 42.4,
        'lamax' => 42.7,
        'lomin' => 1.4,
        'lomax' => 1.8
    ],
    'Angola' => [
        'lamin' => -18.04,
        'lamax' => -4.39,
        'lomin' => 11.67,
        'lomax' => 24.08
    ],
    'Anguilla' => [
        'lamin' => 17.05,
        'lamax' => 18.4,
        'lomin' => -63.17,
        'lomax' => -62.94
    ],
    'Antarctica' => [
        'lamin' => -90,
        'lamax' => -60,
        'lomin' => -180,
        'lomax' => 180
    ],
    'Antigua and Barbuda' => [
        'lamin' => 16.99,
        'lamax' => 17.85,
        'lomin' => -62.54,
        'lomax' => -61.69
    ],
    'Argentina' => [
        'lamin' => -55.05,
        'lamax' => -21.78,
        'lomin' => -73.58,
        'lomax' => -53.64
    ],
    'Armenia' => [
        'lamin' => 38.8,
        'lamax' => 41.3,
        'lomin' => 43.4,
        'lomax' => 46.6
    ],
    'Aruba' => [
        'lamin' => 12.3,
        'lamax' => 12.6,
        'lomin' => -70.1,
        'lomax' => -69.8
    ],
    'Australia' => [
        'lamin' => -44.04,
        'lamax' => -10.68,
        'lomin' => 112.91,
        'lomax' => 153.63
    ],
	'New South Wales' => [
        'lamin' => -37.5,
        'lamax' => -28.0,
        'lomin' => 141.0,
        'lomax' => 154.0
    ],
    'Victoria' => [
        'lamin' => -39.2,
        'lamax' => -34.0,
        'lomin' => 141.0,
        'lomax' => 150.5
    ],
    'Queensland' => [
        'lamin' => -29.0,
        'lamax' => -10.5,
        'lomin' => 138.0,
        'lomax' => 154.0
    ],
    'South Australia' => [
        'lamin' => -38.0,
        'lamax' => -26.0,
        'lomin' => 129.0,
        'lomax' => 141.0
    ],
    'Western Australia' => [
        'lamin' => -35.0,
        'lamax' => -13.0,
        'lomin' => 112.9,
        'lomax' => 129.0
    ],
    'Northern Territory' => [
        'lamin' => -25.0,
        'lamax' => -10.7,
        'lomin' => 129.0,
        'lomax' => 138.0
    ],
    'Tasmania' => [
        'lamin' => -43.7,
        'lamax' => -40.5,
        'lomin' => 144.0,
        'lomax' => 148.5
    ],
    'Australian Capital Territory' => [
        'lamin' => -35.9,
        'lamax' => -35.1,
        'lomin' => 148.7,
        'lomax' => 149.5
    ],
    'Austria' => [
        'lamin' => 46.2,
        'lamax' => 49.0,
        'lomin' => 9.5,
        'lomax' => 17.5
    ],
    'Azerbaijan' => [
        'lamin' => 38.4,
        'lamax' => 42.1,
        'lomin' => 44.8,
        'lomax' => 50.4
    ],
    'Bahamas' => [
        'lamin' => 20.7,
        'lamax' => 27.05,
        'lomin' => -79.5,
        'lomax' => -74.2
    ],
    'Bahrain' => [
        'lamin' => 25.79,
        'lamax' => 26.32,
        'lomin' => 50.45,
        'lomax' => 50.68
    ],
    'Bangladesh' => [
        'lamin' => 20.74,
        'lamax' => 26.63,
        'lomin' => 88.01,
        'lomax' => 92.67
    ],
    'Barbados' => [
        'lamin' => 13.03,
        'lamax' => 13.33,
        'lomin' => -59.65,
        'lomax' => -59.43
    ],
    'Belarus' => [
        'lamin' => 51.2,
        'lamax' => 56.2,
        'lomin' => 23.1,
        'lomax' => 32.8
    ],
    'Belgium' => [
        'lamin' => 49.5,
        'lamax' => 51.5,
        'lomin' => 2.5,
        'lomax' => 6.4
    ],
    'Belize' => [
        'lamin' => 15.88,
        'lamax' => 18.5,
        'lomin' => -89.23,
        'lomax' => -87.5
    ],
    'Benin' => [
        'lamin' => 6.14,
        'lamax' => 12.41,
        'lomin' => 0.77,
        'lomax' => 3.84
    ],
    'Bermuda' => [
        'lamin' => 32.24,
        'lamax' => 32.47,
        'lomin' => -64.9,
        'lomax' => -64.6
    ],
    'Bhutan' => [
        'lamin' => 26.7,
        'lamax' => 28.3,
        'lomin' => 88.7,
        'lomax' => 92.1
    ],
    'Bolivia' => [
        'lamin' => -22.9,
        'lamax' => -9.68,
        'lomin' => -69.64,
        'lomax' => -57.45
    ],
    'Bosnia and Herzegovina' => [
        'lamin' => 42.6,
        'lamax' => 45.3,
        'lomin' => 15.7,
        'lomax' => 19.6
    ],
    'Botswana' => [
        'lamin' => -26.89,
        'lamax' => -17.79,
        'lomin' => 20.0,
        'lomax' => 29.38
    ],
    'Brazil' => [
        'lamin' => -33.75,
        'lamax' => 5.27,
        'lomin' => -73.99,
        'lomax' => -34.79
    ],
    'Brunei' => [
        'lamin' => 4.0,
        'lamax' => 5.0,
        'lomin' => 114.0,
        'lomax' => 115.0
    ],
    'Bulgaria' => [
        'lamin' => 41.2,
        'lamax' => 44.2,
        'lomin' => 22.4,
        'lomax' => 28.6
    ],
    'Burkina Faso' => [
        'lamin' => 9.4,
        'lamax' => 15.1,
        'lomin' => -5.5,
        'lomax' => 2.4
    ],
    'Burundi' => [
        'lamin' => -4.46,
        'lamax' => -2.3,
        'lomin' => 29.0,
        'lomax' => 30.85
    ],
    'Cabo Verde' => [
        'lamin' => 14.8,
        'lamax' => 17.2,
        'lomin' => -25.4,
        'lomax' => -22.6
    ],
    'Cambodia' => [
        'lamin' => 10.4,
        'lamax' => 14.7,
        'lomin' => 102.3,
        'lomax' => 107.6
    ],
    'Cameroon' => [
        'lamin' => 1.6,
        'lamax' => 13.1,
        'lomin' => 8.5,
        'lomax' => 16.2
    ],
    'Canada' => [
        'lamin' => 41.7,
        'lamax' => 83.1,
        'lomin' => -141.0,
        'lomax' => -52.6
    ],
	'Alberta' => [
        'lamin' => 49.0,
        'lamax' => 60.0,
        'lomin' => -120.0,
        'lomax' => -110.0
    ],
    'British Columbia' => [
        'lamin' => 48.3,
        'lamax' => 60.0,
        'lomin' => -139.1,
        'lomax' => -114.0
    ],
    'Manitoba' => [
        'lamin' => 49.0,
        'lamax' => 60.0,
        'lomin' => -102.0,
        'lomax' => -95.0
    ],
    'New Brunswick' => [
        'lamin' => 45.0,
        'lamax' => 48.3,
        'lomin' => -69.1,
        'lomax' => -64.8
    ],
    'Newfoundland and Labrador' => [
        'lamin' => 46.7,
        'lamax' => 60.0,
        'lomin' => -61.3,
        'lomax' => -52.6
    ],
    'Northwest Territories' => [
        'lamin' => 60.0,
        'lamax' => 70.0,
        'lomin' => -136.0,
        'lomax' => -110.0
    ],
    'Nova Scotia' => [
        'lamin' => 43.3,
        'lamax' => 47.1,
        'lomin' => -65.0,
        'lomax' => -60.9
    ],
    'Nunavut' => [
        'lamin' => 56.0,
        'lamax' => 83.1,
        'lomin' => -115.0,
        'lomax' => -60.0
    ],
    'Ontario' => [
        'lamin' => 41.7,
        'lamax' => 56.9,
        'lomin' => -95.2,
        'lomax' => -74.3
    ],
    'Prince Edward Island' => [
        'lamin' => 45.9,
        'lamax' => 47.3,
        'lomin' => -64.5,
        'lomax' => -62.6
    ],
    'Quebec' => [
        'lamin' => 45.0,
        'lamax' => 62.0,
        'lomin' => -79.8,
        'lomax' => -57.1
    ],
    'Saskatchewan' => [
        'lamin' => 49.0,
        'lamax' => 60.0,
        'lomin' => -110.0,
        'lomax' => -101.5
    ],
    'Yukon' => [
        'lamin' => 60.0,
        'lamax' => 69.6,
        'lomin' => -141.0,
        'lomax' => -130.0
    ],
    'Central African Republic' => [
        'lamin' => 2.2,
        'lamax' => 11.0,
        'lomin' => 14.4,
        'lomax' => 27.5
    ],
    'Chad' => [
        'lamin' => 7.45,
        'lamax' => 23.45,
        'lomin' => 13.5,
        'lomax' => 24.0
    ],
    'Chile' => [
        'lamin' => -56.0,
        'lamax' => -17.5,
        'lomin' => -75.6,
        'lomax' => -66.0
    ],
    'China' => [
        'lamin' => 18.1,
        'lamax' => 53.6,
        'lomin' => 73.5,
        'lomax' => 135.0
    ],
    'Colombia' => [
        'lamin' => -4.23,
        'lamax' => 13.4,
        'lomin' => -79.0,
        'lomax' => -66.9
    ],
    'Comoros' => [
        'lamin' => -12.4,
        'lamax' => -11.4,
        'lomin' => 43.2,
        'lomax' => 44.5
    ],
    'Costa Rica' => [
        'lamin' => 8.0,
        'lamax' => 11.22,
        'lomin' => -85.97,
        'lomax' => -82.54
    ],
    'Côte d\'Ivoire' => [
        'lamin' => 4.3,
        'lamax' => 10.7,
        'lomin' => -8.6,
        'lomax' => -2.48
    ],
    'Croatia' => [
        'lamin' => 42.3,
        'lamax' => 46.6,
        'lomin' => 13.5,
        'lomax' => 19.4
    ],
    'Cuba' => [
        'lamin' => 19.8,
        'lamax' => 23.2,
        'lomin' => -85.4,
        'lomax' => -74.1
    ],
    'Cyprus' => [
        'lamin' => 34.5,
        'lamax' => 35.8,
        'lomin' => 32.2,
        'lomax' => 34.6
    ],
    'Czech Republic' => [
        'lamin' => 48.5,
        'lamax' => 51.1,
        'lomin' => 12.1,
        'lomax' => 18.9
    ],
    'Democratic Republic of the Congo' => [
        'lamin' => -13.46,
        'lamax' => 5.39,
        'lomin' => 12.18,
        'lomax' => 31.3
    ],
    'Denmark' => [
        'lamin' => 54.6,
        'lamax' => 57.8,
        'lomin' => 8.0,
        'lomax' => 12.7
    ],
    'Djibouti' => [
        'lamin' => 10.9,
        'lamax' => 12.7,
        'lomin' => 41.7,
        'lomax' => 43.3
    ],
    'Dominica' => [
        'lamin' => 15.17,
        'lamax' => 15.63,
        'lomin' => -61.45,
        'lomax' => -61.15
    ],
    'Dominican Republic' => [
        'lamin' => 17.53,
        'lamax' => 19.93,
        'lomin' => -72.0,
        'lomax' => -68.3
    ],
    'Ecuador' => [
        'lamin' => -5.0,
        'lamax' => 1.43,
        'lomin' => -81.0,
        'lomax' => -75.19
    ],
    'Egypt' => [
        'lamin' => 22.0,
        'lamax' => 31.67,
        'lomin' => 24.7,
        'lomax' => 35.9
    ],
    'El Salvador' => [
        'lamin' => 13.13,
        'lamax' => 14.45,
        'lomin' => -90.1,
        'lomax' => -87.6
    ],
    'Equatorial Guinea' => [
        'lamin' => -1.5,
        'lamax' => 3.79,
        'lomin' => 5.62,
        'lomax' => 11.3
    ],
    'Eritrea' => [
        'lamin' => 12.3,
        'lamax' => 18.0,
        'lomin' => 36.44,
        'lomax' => 43.12
    ],
    'Estonia' => [
        'lamin' => 57.5,
        'lamax' => 59.6,
        'lomin' => 21.8,
        'lomax' => 28.2
    ],
    'Eswatini' => [
        'lamin' => -27.3,
        'lamax' => -25.7,
        'lomin' => 30.8,
        'lomax' => 32.1
    ],
    'Ethiopia' => [
        'lamin' => 3.39,
        'lamax' => 14.9,
        'lomin' => 33.0,
        'lomax' => 48.0
    ],
    'Fiji' => [
        'lamin' => -20.02,
        'lamax' => -12.02,
        'lomin' => 175.2,
        'lomax' => 179.9
    ],
    'Finland' => [
        'lamin' => 59.5,
        'lamax' => 70.1,
        'lomin' => 20.5,
        'lomax' => 31.6
    ],
    'France' => [
        'lamin' => 41.3,
        'lamax' => 51.1,
        'lomin' => -5.1,
        'lomax' => 9.6
    ],
    'Gabon' => [
        'lamin' => -3.98,
        'lamax' => 2.3,
        'lomin' => 8.7,
        'lomax' => 14.53
    ],
    'Gambia' => [
        'lamin' => 13.07,
        'lamax' => 13.82,
        'lomin' => -16.8,
        'lomax' => -13.79
    ],
    'Georgia' => [
        'lamin' => 41.0,
        'lamax' => 43.6,
        'lomin' => 40.0,
        'lomax' => 47.5
    ],
    'Germany' => [
        'lamin' => 47.2,
        'lamax' => 55.1,
        'lomin' => 5.9,
        'lomax' => 15.0
    ],
	'Ghana' => [
        'lamin' => 4.55,
        'lamax' => 11.17,
        'lomin' => -3.25,
        'lomax' => 1.2
    ],
	'Greece' => [
        'lamin' => 34.8,
        'lamax' => 41.8,
        'lomin' => 19.4,
        'lomax' => 28.3
    ],
	'Greenland' => [
        'lamin' => 59.7,
        'lamax' => 83.6,
        'lomin' => -73.3,
        'lomax' => -11.3
    ],
	'Grenada' => [
        'lamin' => 11.96,
        'lamax' => 12.36,
        'lomin' => -61.85,
        'lomax' => -61.45
    ],
	'Guatemala' => [
        'lamin' => 13.72,
        'lamax' => 17.82,
        'lomin' => -92.23,
        'lomax' => -88.22
    ],
	'Guinea' => [
        'lamin' => 7.19,
        'lamax' => 12.67,
        'lomin' => -15.06,
        'lomax' => -7.64
    ],
	'Guinea-Bissau' => [
        'lamin' => 10.89,
        'lamax' => 12.68,
        'lomin' => -16.68,
        'lomax' => -13.7
    ],
	'Guyana' => [
        'lamin' => 1.17,
        'lamax' => 8.56,
        'lomin' => -61.36,
        'lomax' => -56.5
    ],
	'Haiti' => [
        'lamin' => 18.0,
        'lamax' => 20.1,
        'lomin' => -74.5,
        'lomax' => -71.6
    ],
    'Honduras' => [
        'lamin' => 12.98,
        'lamax' => 16.51,
        'lomin' => -89.35,
        'lomax' => -83.13
    ],'Hungary' => [
        'lamin' => 45.7,
        'lamax' => 48.6,
        'lomin' => 16.1,
        'lomax' => 22.9
    ],
    'Iceland' => [
        'lamin' => 63.1,
        'lamax' => 66.6,
        'lomin' => -24.5,
        'lomax' => -13.5
    ],
    'India' => [
        'lamin' => 6.55,
        'lamax' => 35.67,
        'lomin' => 68.11,
        'lomax' => 97.4
    ],
    'Indonesia' => [
        'lamin' => -11.0,
        'lamax' => 6.0,
        'lomin' => 95.0,
        'lomax' => 141.0
    ],
    'Iran' => [
        'lamin' => 24.0,
        'lamax' => 40.0,
        'lomin' => 44.0,
        'lomax' => 63.3
    ],
    'Iraq' => [
        'lamin' => 29.0,
        'lamax' => 37.4,
        'lomin' => 38.79,
        'lomax' => 48.62
    ],
    'Ireland' => [
        'lamin' => 51.4,
        'lamax' => 55.4,
        'lomin' => -10.6,
        'lomax' => -5.4
    ],
    'Israel' => [
        'lamin' => 29.5,
        'lamax' => 33.3,
        'lomin' => 34.3,
        'lomax' => 35.9
    ],
    'Italy' => [
        'lamin' => 36.6,
        'lamax' => 47.1,
        'lomin' => 6.6,
        'lomax' => 18.5
    ],
	    'Madagascar' => [
        'lamin' => -25.6,
        'lamax' => -11.9,
        'lomin' => 43.2,
        'lomax' => 50.5
    ],
	'Jamaica' => [
        'lamin' => 17.7,
        'lamax' => 18.5,
        'lomin' => -78.4,
        'lomax' => -76.1
    ],
    'Japan' => [
        'lamin' => 24.3,
        'lamax' => 45.5,
        'lomin' => 122.9,
        'lomax' => 153.9
    ],
    'Jordan' => [
        'lamin' => 29.2,
        'lamax' => 33.4,
        'lomin' => 34.9,
        'lomax' => 39.3
    ],
    'Kazakhstan' => [
        'lamin' => 40.6,
        'lamax' => 55.4,
        'lomin' => 46.5,
        'lomax' => 87.3
    ],
    'Kenya' => [
        'lamin' => -4.68,
        'lamax' => 4.62,
        'lomin' => 33.9,
        'lomax' => 41.9
    ],
    'Kiribati' => [
        'lamin' => -3.2,
        'lamax' => 4.7,
        'lomin' => 169.5,
        'lomax' => -150.3
    ],
    'Kuwait' => [
        'lamin' => 28.52,
        'lamax' => 30.1,
        'lomin' => 46.4,
        'lomax' => 48.3
    ],
    'Kyrgyzstan' => [
        'lamin' => 39.2,
        'lamax' => 43.3,
        'lomin' => 69.3,
        'lomax' => 80.3
    ],
    'Laos' => [
        'lamin' => 13.9,
        'lamax' => 22.5,
        'lomin' => 100.1,
        'lomax' => 107.6
    ],
    'Latvia' => [
        'lamin' => 55.7,
        'lamax' => 58.1,
        'lomin' => 20.9,
        'lomax' => 28.2
    ],
    'Lebanon' => [
        'lamin' => 33.05,
        'lamax' => 34.7,
        'lomin' => 35.1,
        'lomax' => 36.6
    ],
    'Lesotho' => [
        'lamin' => -30.68,
        'lamax' => -28.67,
        'lomin' => 27.0,
        'lomax' => 29.33
    ],
    'Liberia' => [
        'lamin' => 4.21,
        'lamax' => 8.5,
        'lomin' => -11.5,
        'lomax' => -7.4
    ],
    'Libya' => [
        'lamin' => 19.5,
        'lamax' => 33.17,
        'lomin' => 9.3,
        'lomax' => 25.0
    ],
    'Liechtenstein' => [
        'lamin' => 47.0,
        'lamax' => 47.3,
        'lomin' => 9.5,
        'lomax' => 9.8
    ],
    'Lithuania' => [
        'lamin' => 53.9,
        'lamax' => 56.4,
        'lomin' => 20.9,
        'lomax' => 26.8
    ],
    'Luxembourg' => [
        'lamin' => 49.4,
        'lamax' => 50.2,
        'lomin' => 5.7,
        'lomax' => 6.5
    ],
   'Madagascar' => [
        'lamin' => -25.6,
        'lamax' => -11.9,
        'lomin' => 43.2,
        'lomax' => 50.5
    ],
    'Malawi' => [
        'lamin' => -17.1,
        'lamax' => -9.38,
        'lomin' => 32.67,
        'lomax' => 35.92
    ],
    'Malaysia' => [
        'lamin' => 0.85,
        'lamax' => 7.5,
        'lomin' => 99.6,
        'lomax' => 119.3
    ],
    'Maldives' => [
        'lamin' => -0.7,
        'lamax' => 7.1,
        'lomin' => 72.6,
        'lomax' => 73.7
    ],
    'Mali' => [
        'lamin' => 10.1,
        'lamax' => 25.0,
        'lomin' => -12.3,
        'lomax' => 4.3
    ],
    'Malta' => [
        'lamin' => 35.7,
        'lamax' => 36.1,
        'lomin' => 14.2,
        'lomax' => 14.6
    ],
    'Marshall Islands' => [
        'lamin' => 4.5,
        'lamax' => 14.6,
        'lomin' => 165.5,
        'lomax' => 172.1
    ],
    'Mauritania' => [
        'lamin' => 14.7,
        'lamax' => 27.3,
        'lomin' => -17.1,
        'lomax' => -4.8
    ],
    'Mauritius' => [
        'lamin' => -20.6,
        'lamax' => -10.5,
        'lomin' => 56.0,
        'lomax' => 63.5
    ],
    'Mexico' => [
        'lamin' => 14.5,
        'lamax' => 32.7,
        'lomin' => -117.1,
        'lomax' => -86.7
    ],
    'Micronesia' => [
        'lamin' => 1.0,
        'lamax' => 10.0,
        'lomin' => 137.0,
        'lomax' => 163.0
    ],
    'Moldova' => [
        'lamin' => 45.2,
        'lamax' => 48.5,
        'lomin' => 26.6,
        'lomax' => 30.2
    ],
    'Monaco' => [
        'lamin' => 43.7,
        'lamax' => 43.8,
        'lomin' => 7.4,
        'lomax' => 7.5
    ],
    'Mongolia' => [
        'lamin' => 41.5,
        'lamax' => 52.1,
        'lomin' => 87.7,
        'lomax' => 119.9
    ],
    'Montenegro' => [
        'lamin' => 41.8,
        'lamax' => 43.6,
        'lomin' => 18.4,
        'lomax' => 20.3
    ],
    'Morocco' => [
        'lamin' => 27.6,
        'lamax' => 36.0,
        'lomin' => -13.2,
        'lomax' => -1.4
    ],
    'Mozambique' => [
        'lamin' => -26.9,
        'lamax' => -10.5,
        'lomin' => 30.2,
        'lomax' => 40.9
    ],
    'Myanmar' => [
        'lamin' => 9.9,
        'lamax' => 28.54,
        'lomin' => 92.2,
        'lomax' => 101.17
    ],
    'Namibia' => [
        'lamin' => -29.0,
        'lamax' => -16.9,
        'lomin' => 11.7,
        'lomax' => 25.3
    ],
    'Nauru' => [
        'lamin' => -0.56,
        'lamax' => -0.52,
        'lomin' => 166.9,
        'lomax' => 166.95
    ],
    'Nepal' => [
        'lamin' => 26.36,
        'lamax' => 30.45,
        'lomin' => 80.0,
        'lomax' => 88.2
    ],
    'Netherlands' => [
        'lamin' => 50.7,
        'lamax' => 53.6,
        'lomin' => 3.3,
        'lomax' => 7.2
    ],
    'New Zealand' => [
        'lamin' => -47.3,
        'lamax' => -34.4,
        'lomin' => 166.3,
        'lomax' => 178.6
    ],
    'Nicaragua' => [
        'lamin' => 10.7,
        'lamax' => 15.0,
        'lomin' => -87.7,
        'lomax' => -82.7
    ],
    'Niger' => [
        'lamin' => 11.7,
        'lamax' => 23.5,
        'lomin' => 0.15,
        'lomax' => 15.99
    ],
    'Nigeria' => [
        'lamin' => 4.2,
        'lamax' => 13.9,
        'lomin' => 2.7,
        'lomax' => 14.6
    ],
    'North Korea' => [
        'lamin' => 37.7,
        'lamax' => 43.0,
        'lomin' => 124.0,
        'lomax' => 131.0
    ],
    'North Macedonia' => [
        'lamin' => 40.9,
        'lamax' => 42.4,
        'lomin' => 20.4,
        'lomax' => 23.0
    ],
    'Norway' => [
        'lamin' => 58.0,
        'lamax' => 71.2,
        'lomin' => 4.5,
        'lomax' => 31.1
    ],
    'Oman' => [
        'lamin' => 16.64,
        'lamax' => 26.39,
        'lomin' => 52.0,
        'lomax' => 59.8
    ],
    'Pakistan' => [
        'lamin' => 23.7,
        'lamax' => 37.1,
        'lomin' => 60.8,
        'lomax' => 77.9
    ],
    'Palau' => [
        'lamin' => 2.9,
        'lamax' => 7.4,
        'lomin' => 131.0,
        'lomax' => 134.7
    ],
    'Palestine' => [
        'lamin' => 31.2,
        'lamax' => 32.6,
        'lomin' => 34.2,
        'lomax' => 35.6
    ],
    'Panama' => [
        'lamin' => 7.2,
        'lamax' => 9.6,
        'lomin' => -83.1,
        'lomax' => -77.2
    ],
    'Papua New Guinea' => [
        'lamin' => -11.5,
        'lamax' => -1.3,
        'lomin' => 140.9,
        'lomax' => 156.0
    ],
    'Paraguay' => [
        'lamin' => -27.6,
        'lamax' => -19.3,
        'lomin' => -62.7,
        'lomax' => -54.3
    ],
    'Peru' => [
        'lamin' => -18.35,
        'lamax' => 0.02,
        'lomin' => -81.3,
        'lomax' => -68.7
    ],
    'Philippines' => [
        'lamin' => 4.6,
        'lamax' => 21.0,
        'lomin' => 116.9,
        'lomax' => 126.6
    ],
    'Poland' => [
        'lamin' => 49.0,
        'lamax' => 54.9,
        'lomin' => 14.1,
        'lomax' => 24.1
    ],
    'Portugal' => [
        'lamin' => 36.9,
        'lamax' => 42.2,
        'lomin' => -9.6,
        'lomax' => -6.2
    ],
    'Qatar' => [
        'lamin' => 24.4,
        'lamax' => 26.2,
        'lomin' => 50.6,
        'lomax' => 51.7
    ],
    'Republic of the Congo' => [
        'lamin' => -5.0,
        'lamax' => 3.7,
        'lomin' => 11.0,
        'lomax' => 18.6
    ],
    'Romania' => [
        'lamin' => 43.6,
        'lamax' => 48.3,
        'lomin' => 20.3,
        'lomax' => 29.7
    ],
    'Russia' => [
        'lamin' => 41.2,
        'lamax' => 81.9,
        'lomin' => 19.6,
        'lomax' => 180.0
    ],
    'Rwanda' => [
        'lamin' => -2.85,
        'lamax' => -1.0,
        'lomin' => 28.9,
        'lomax' => 30.9
    ],
    'Saint Kitts and Nevis' => [
        'lamin' => 17.1,
        'lamax' => 17.5,
        'lomin' => -62.85,
        'lomax' => -62.5
    ],
    'Saint Lucia' => [
        'lamin' => 13.7,
        'lamax' => 14.1,
        'lomin' => -61.1,
        'lomax' => -60.8
    ],
    'Saint Vincent and the Grenadines' => [
        'lamin' => 12.6,
        'lamax' => 13.4,
        'lomin' => -61.5,
        'lomax' => -61.0
    ],
    'Samoa' => [
        'lamin' => -14.1,
        'lamax' => -13.4,
        'lomin' => -172.1,
        'lomax' => -171.3
    ],
    'San Marino' => [
        'lamin' => 43.9,
        'lamax' => 44.1,
        'lomin' => 12.4,
        'lomax' => 12.6
    ],
    'Sao Tome and Principe' => [
        'lamin' => 0.0,
        'lamax' => 1.7,
        'lomin' => 6.4,
        'lomax' => 7.5
    ],
    'Saudi Arabia' => [
        'lamin' => 16.0,
        'lamax' => 32.2,
        'lomin' => 34.5,
        'lomax' => 55.7
    ],
    'Senegal' => [
        'lamin' => 12.3,
        'lamax' => 16.7,
        'lomin' => -17.7,
        'lomax' => -11.3
    ],
    'Serbia' => [
        'lamin' => 42.2,
        'lamax' => 46.2,
        'lomin' => 18.8,
        'lomax' => 23.0
    ],
    'Seychelles' => [
        'lamin' => -10.3,
        'lamax' => -3.0,
        'lomin' => 46.1,
        'lomax' => 56.3
    ],
    'Sierra Leone' => [
        'lamin' => 6.9,
        'lamax' => 10.0,
        'lomin' => -13.3,
        'lomax' => -10.3
    ],
    'Singapore' => [
        'lamin' => 1.20,
        'lamax' => 1.47,
        'lomin' => 103.6,
        'lomax' => 104.0
    ],
    'Slovakia' => [
        'lamin' => 47.7,
        'lamax' => 49.6,
        'lomin' => 16.8,
        'lomax' => 22.6
    ],
    'Slovenia' => [
        'lamin' => 45.0,
        'lamax' => 47.0,
        'lomin' => 13.3,
        'lomax' => 16.6
    ],
    'Solomon Islands' => [
        'lamin' => -12.3,
        'lamax' => -6.5,
        'lomin' => 155.0,
        'lomax' => 170.0
    ],
    'Somalia' => [
        'lamin' => -1.66,
        'lamax' => 11.98,
        'lomin' => 40.98,
        'lomax' => 51.42
    ],
    'South Africa' => [
        'lamin' => -34.8,
        'lamax' => -22.1,
        'lomin' => 16.4,
        'lomax' => 32.9
    ],
    'South Korea' => [
        'lamin' => 33.1,
        'lamax' => 38.6,
        'lomin' => 126.1,
        'lomax' => 129.5
    ],
    'South Sudan' => [
        'lamin' => 3.49,
        'lamax' => 12.23,
        'lomin' => 24.4,
        'lomax' => 35.9
    ],
    'Spain' => [
        'lamin' => 36.0,
        'lamax' => 43.8,
        'lomin' => -9.3,
        'lomax' => 3.3
    ],
    'Sri Lanka' => [
        'lamin' => 5.9,
        'lamax' => 9.83,
        'lomin' => 79.7,
        'lomax' => 81.88
    ],
    'Sudan' => [
        'lamin' => 9.5,
        'lamax' => 22.27,
        'lomin' => 21.8,
        'lomax' => 38.6
    ],
    'Suriname' => [
        'lamin' => 1.8,
        'lamax' => 6.0,
        'lomin' => -58.0,
        'lomax' => -53.98
    ],
    'Sweden' => [
        'lamin' => 55.3,
        'lamax' => 69.1,
        'lomin' => 11.1,
        'lomax' => 23.2
    ],
    'Switzerland' => [
        'lamin' => 45.8,
        'lamax' => 47.8,
        'lomin' => 5.9,
        'lomax' => 10.5
    ],
    'Syria' => [
        'lamin' => 32.3,
        'lamax' => 37.3,
        'lomin' => 35.5,
        'lomax' => 42.4
    ],
    'Taiwan' => [
        'lamin' => 21.8,
        'lamax' => 25.3,
        'lomin' => 119.3,
        'lomax' => 122.0
    ],
    'Tajikistan' => [
        'lamin' => 36.7,
        'lamax' => 41.0,
        'lomin' => 67.4,
        'lomax' => 75.2
    ],
    'Tanzania' => [
        'lamin' => -11.8,
        'lamax' => -0.9,
        'lomin' => 29.3,
        'lomax' => 40.5
    ],
    'Thailand' => [
        'lamin' => 5.6,
        'lamax' => 20.5,
        'lomin' => 97.35,
        'lomax' => 105.6
    ],
    'Timor-Leste' => [
        'lamin' => -9.5,
        'lamax' => -8.1,
        'lomin' => 124.0,
        'lomax' => 127.3
    ],
    'Togo' => [
        'lamin' => 6.1,
        'lamax' => 11.14,
        'lomin' => -0.14,
        'lomax' => 1.8
    ],
    'Tonga' => [
        'lamin' => -22.3,
        'lamax' => -15.5,
        'lomin' => -175.2,
        'lomax' => -173.0
    ],
    'Trinidad and Tobago' => [
        'lamin' => 10.0,
        'lamax' => 11.5,
        'lomin' => -61.9,
        'lomax' => -60.4
    ],
    'Tunisia' => [
        'lamin' => 30.2,
        'lamax' => 37.55,
        'lomin' => 7.5,
        'lomax' => 11.6
    ],
    'Turkey' => [
        'lamin' => 36.0,
        'lamax' => 42.1,
        'lomin' => 26.0,
        'lomax' => 44.8
    ],
    'Turkmenistan' => [
        'lamin' => 35.1,
        'lamax' => 42.8,
        'lomin' => 52.4,
        'lomax' => 66.7
    ],
    'Tuvalu' => [
        'lamin' => -10.0,
        'lamax' => -5.6,
        'lomin' => 176.0,
        'lomax' => 179.9
    ],
    'Uganda' => [
        'lamin' => -1.5,
        'lamax' => 4.2,
        'lomin' => 29.5,
        'lomax' => 35.0
    ],
    'Ukraine' => [
        'lamin' => 44.4,
        'lamax' => 52.4,
        'lomin' => 22.1,
        'lomax' => 40.2
    ],
    'United Arab Emirates' => [
        'lamin' => 22.6,
        'lamax' => 26.1,
        'lomin' => 51.4,
        'lomax' => 56.4
    ],
    'United Kingdom' => [
        'lamin' => 49.9,
        'lamax' => 59.5,
        'lomin' => -8.6,
        'lomax' => 1.8
    ],
    'United States' => [
        'lamin' => 24.5,
        'lamax' => 49.4,
        'lomin' => -125.0,
        'lomax' => -66.9
    ],
    'Alabama' => [
        'lamin' => 30.1,
        'lamax' => 35.0,
        'lomin' => -88.5,
        'lomax' => -84.9
    ],
    'Alaska' => [
        'lamin' => 51.2,
        'lamax' => 71.4,
        'lomin' => -179.1,
        'lomax' => -129.9
    ],
    'Arizona' => [
        'lamin' => 31.3,
        'lamax' => 37.0,
        'lomin' => -114.8,
        'lomax' => -109.0
    ],
    'Arkansas' => [
        'lamin' => 33.0,
        'lamax' => 36.5,
        'lomin' => -94.6,
        'lomax' => -89.6
    ],
    'California' => [
        'lamin' => 32.5,
        'lamax' => 42.0,
        'lomin' => -124.4,
        'lomax' => -114.1
    ],
    'Colorado' => [
        'lamin' => 36.9,
        'lamax' => 41.0,
        'lomin' => -109.1,
        'lomax' => -102.0
    ],
    'Connecticut' => [
        'lamin' => 40.9,
        'lamax' => 42.0,
        'lomin' => -73.7,
        'lomax' => -71.8
    ],
    'Delaware' => [
        'lamin' => 38.5,
        'lamax' => 39.8,
        'lomin' => -75.8,
        'lomax' => -75.0
    ],
    'Florida' => [
        'lamin' => 24.5,
        'lamax' => 31.0,
        'lomin' => -87.6,
        'lomax' => -80.0
    ],
    'Georgia' => [
        'lamin' => 30.4,
        'lamax' => 35.0,
        'lomin' => -85.6,
        'lomax' => -80.8
    ],
    'Hawaii' => [
        'lamin' => 18.9,
        'lamax' => 22.3,
        'lomin' => -160.3,
        'lomax' => -154.8
    ],
	    'Idaho' => [
        'lamin' => 41.9,
        'lamax' => 49.0,
        'lomin' => -117.2,
        'lomax' => -111.0
    ],
    'Illinois' => [
        'lamin' => 36.9,
        'lamax' => 42.5,
        'lomin' => -91.5,
        'lomax' => -87.5
    ],
    'Indiana' => [
        'lamin' => 37.8,
        'lamax' => 41.8,
        'lomin' => -88.1,
        'lomax' => -84.8
    ],
    'Iowa' => [
        'lamin' => 40.4,
        'lamax' => 43.5,
        'lomin' => -96.6,
        'lomax' => -90.1
    ],
    'Kansas' => [
        'lamin' => 36.9,
        'lamax' => 40.0,
        'lomin' => -102.1,
        'lomax' => -94.6
    ],
    'Kentucky' => [
        'lamin' => 36.5,
        'lamax' => 39.1,
        'lomin' => -89.6,
        'lomax' => -81.9
    ],
    'Louisiana' => [
        'lamin' => 28.9,
        'lamax' => 33.0,
        'lomin' => -94.0,
        'lomax' => -88.8
    ],
    'Maine' => [
        'lamin' => 43.1,
        'lamax' => 47.5,
        'lomin' => -71.1,
        'lomax' => -66.9
    ],
    'Maryland' => [
        'lamin' => 37.9,
        'lamax' => 39.7,
        'lomin' => -79.5,
        'lomax' => -75.0
    ],
    'Massachusetts' => [
        'lamin' => 41.2,
        'lamax' => 42.9,
        'lomin' => -73.5,
        'lomax' => -69.9
    ],
    'Michigan' => [
        'lamin' => 41.7,
        'lamax' => 48.3,
        'lomin' => -90.4,
        'lomax' => -82.4
    ],
    'Minnesota' => [
        'lamin' => 43.5,
        'lamax' => 49.4,
        'lomin' => -97.2,
        'lomax' => -89.5
    ],
    'Mississippi' => [
        'lamin' => 30.2,
        'lamax' => 35.0,
        'lomin' => -91.7,
        'lomax' => -88.1
    ],
    'Missouri' => [
        'lamin' => 35.9,
        'lamax' => 40.6,
        'lomin' => -95.8,
        'lomax' => -89.1
    ],
    'Montana' => [
        'lamin' => 44.4,
        'lamax' => 49.0,
        'lomin' => -116.1,
        'lomax' => -104.0
    ],
    'Nebraska' => [
        'lamin' => 40.0,
        'lamax' => 43.0,
        'lomin' => -104.1,
        'lomax' => -95.3
    ],
    'Nevada' => [
        'lamin' => 35.0,
        'lamax' => 42.0,
        'lomin' => -120.0,
        'lomax' => -114.0
    ],
    'New Hampshire' => [
        'lamin' => 42.7,
        'lamax' => 45.3,
        'lomin' => -72.6,
        'lomax' => -70.6
    ],
    'New Jersey' => [
        'lamin' => 38.9,
        'lamax' => 41.4,
        'lomin' => -75.6,
        'lomax' => -73.9
    ],
    'New Mexico' => [
        'lamin' => 31.3,
        'lamax' => 37.0,
        'lomin' => -109.1,
        'lomax' => -103.0
    ],
    'New York' => [
        'lamin' => 40.5,
        'lamax' => 45.0,
        'lomin' => -79.8,
        'lomax' => -71.8
    ],
    'North Carolina' => [
        'lamin' => 33.8,
        'lamax' => 36.6,
        'lomin' => -84.3,
        'lomax' => -75.5
    ],
    'North Dakota' => [
        'lamin' => 45.9,
        'lamax' => 49.0,
        'lomin' => -104.1,
        'lomax' => -96.5
    ],
    'Ohio' => [
        'lamin' => 38.4,
        'lamax' => 41.9,
        'lomin' => -84.8,
        'lomax' => -80.5
    ],
    'Oklahoma' => [
        'lamin' => 33.6,
        'lamax' => 37.0,
        'lomin' => -103.0,
        'lomax' => -94.4
    ],
    'Oregon' => [
        'lamin' => 41.9,
        'lamax' => 46.3,
        'lomin' => -124.6,
        'lomax' => -116.5
    ],
    'Pennsylvania' => [
        'lamin' => 39.7,
        'lamax' => 42.3,
        'lomin' => -80.5,
        'lomax' => -74.7
    ],
    'Rhode Island' => [
        'lamin' => 41.1,
        'lamax' => 42.0,
        'lomin' => -71.9,
        'lomax' => -71.1
    ],
    'South Carolina' => [
        'lamin' => 32.0,
        'lamax' => 35.2,
        'lomin' => -83.3,
        'lomax' => -78.5
    ],
    'South Dakota' => [
        'lamin' => 42.5,
        'lamax' => 45.9,
        'lomin' => -104.1,
        'lomax' => -96.4
    ],
    'Tennessee' => [
        'lamin' => 34.9,
        'lamax' => 36.7,
        'lomin' => -90.3,
        'lomax' => -81.7
    ],
    'Texas' => [
        'lamin' => 25.8,
        'lamax' => 36.5,
        'lomin' => -106.6,
        'lomax' => -93.5
    ],
    'Utah' => [
        'lamin' => 36.9,
        'lamax' => 42.0,
        'lomin' => -114.1,
        'lomax' => -109.0
    ],
    'Vermont' => [
        'lamin' => 42.7,
        'lamax' => 45.0,
        'lomin' => -73.4,
        'lomax' => -71.5
    ],
    'Virginia' => [
        'lamin' => 36.5,
        'lamax' => 39.5,
        'lomin' => -83.7,
        'lomax' => -75.2
    ],
    'Washington' => [
        'lamin' => 45.5,
        'lamax' => 49.0,
        'lomin' => -124.8,
        'lomax' => -116.9
    ],
    'West Virginia' => [
        'lamin' => 37.2,
        'lamax' => 40.6,
        'lomin' => -82.7,
        'lomax' => -77.7
    ],
    'Wisconsin' => [
        'lamin' => 42.5,
        'lamax' => 47.3,
        'lomin' => -92.9,
        'lomax' => -86.2
    ],
    'Wyoming' => [
        'lamin' => 40.9,
        'lamax' => 45.0,
        'lomin' => -111.1,
        'lomax' => -104.1
    ],
    'Uruguay' => [
        'lamin' => -35.0,
        'lamax' => -30.1,
        'lomin' => -58.5,
        'lomax' => -53.0
    ],
    'Uzbekistan' => [
        'lamin' => 37.1,
        'lamax' => 45.6,
        'lomin' => 56.3,
        'lomax' => 73.1
    ],
    'Vanuatu' => [
        'lamin' => -20.3,
        'lamax' => -13.0,
        'lomin' => 166.4,
        'lomax' => 170.7
    ],
    'Vatican City' => [
        'lamin' => 41.8,
        'lamax' => 41.9,
        'lomin' => 12.4,
        'lomax' => 12.5
    ],
    'Venezuela' => [
        'lamin' => 0.6,
        'lamax' => 12.2,
        'lomin' => -73.4,
        'lomax' => -59.7
    ],
    'Vietnam' => [
        'lamin' => 8.2,
        'lamax' => 23.4,
        'lomin' => 102.1,
        'lomax' => 109.5
    ],
    'Yemen' => [
        'lamin' => 12.5,
        'lamax' => 18.5,
        'lomin' => 42.5,
        'lomax' => 54.5
    ],
    'Zambia' => [
        'lamin' => -18.1,
        'lamax' => -8.2,
        'lomin' => 21.9,
        'lomax' => 33.7
    ],
    'Zimbabwe' => [
        'lamin' => -22.4,
        'lamax' => -15.6,
        'lomin' => 25.3,
        'lomax' => 33.1
    ]
];

// Get the selected country from GET, default Slovenia
$selectedCountry = $_GET['country'] ?? 'Slovenia';

// Validate country, fallback to Slovenia if invalid
if (!isset($boundingBoxes[$selectedCountry])) {
    $selectedCountry = 'Slovenia';
}

$boundingBox = $boundingBoxes[$selectedCountry];

// Ensure tmp directory exists
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}

// Cache file per country to avoid mixing data
$cacheFile = $cacheDir . '/opensky-cache-' . strtolower($selectedCountry) . '.json';

// Serve cached data if fresh
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTime) {
    header('Content-Type: application/json');
    echo file_get_contents($cacheFile);
    exit;
}

try {
    // Step 1: Obtain access token
    $tokenUrl = 'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';
    $postFields = http_build_query([
        'grant_type' => 'client_credentials',
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
    ]);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $tokenUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ]);

    $tokenResponse = curl_exec($ch);
    if (curl_errno($ch)) throw new Exception('Curl error while requesting token: ' . curl_error($ch));
    $tokenData = json_decode($tokenResponse, true);
    if (!isset($tokenData['access_token'])) throw new Exception('Failed to obtain access token: ' . $tokenResponse);
    $accessToken = $tokenData['access_token'];
    curl_close($ch);

    // Step 2: Fetch OpenSky data for the selected bounding box
    $apiUrl = sprintf(
        'https://opensky-network.org/api/states/all?lamin=%s&lamax=%s&lomin=%s&lomax=%s',
        $boundingBox['lamin'], $boundingBox['lamax'], $boundingBox['lomin'], $boundingBox['lomax']
    );

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $accessToken,
            'Accept: application/json'
        ],
    ]);

    $apiResponse = curl_exec($ch);
    if (curl_errno($ch)) throw new Exception('Curl error while requesting data: ' . curl_error($ch));

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        // Forward the upstream status and response as-is
        http_response_code($httpCode);
        header('Content-Type: application/json');
        echo $apiResponse;
        exit;
    }

    // Save to cache
    file_put_contents($cacheFile, $apiResponse);

    // Return to client
    header('Content-Type: application/json');
    echo $apiResponse;

} catch (Exception $e) {
    // Only now send 500 if an actual internal proxy error happened
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'OpenSky API proxy error',
        'message' => $e->getMessage()
    ]);
}
