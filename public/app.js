import { withTypes } from 'riot';
import erre from 'erre';
import countryCodes from 'country-codes-list';
import { Router, Route, route, match, toRegexp } from '@riotjs/route';

var timezones = {
	"Africa/Abidjan": {
	country: "CI",
	code: "GMT"
},
	"Africa/Accra": {
	country: "GH",
	code: "GMT"
},
	"Africa/Addis_Ababa": {
	country: "ET",
	code: "EAT"
},
	"Africa/Algiers": {
	country: "DZ",
	code: "CET"
},
	"Africa/Asmara": {
	country: "ER",
	code: "EAT"
},
	"Africa/Bamako": {
	country: "ML",
	code: "GMT"
},
	"Africa/Bangui": {
	country: "CF",
	code: "WAT"
},
	"Africa/Banjul": {
	country: "GM",
	code: "GMT"
},
	"Africa/Bissau": {
	country: "GW",
	code: "GMT"
},
	"Africa/Blantyre": {
	country: "MW",
	code: "CAT"
},
	"Africa/Brazzaville": {
	country: "CG",
	code: "WAT"
},
	"Africa/Bujumbura": {
	country: "BI",
	code: "CAT"
},
	"Africa/Cairo": {
	country: "EG",
	code: "EET"
},
	"Africa/Casablanca": {
	country: "MA",
	code: "WEST"
},
	"Africa/Ceuta": {
	country: "ES",
	code: "CET"
},
	"Africa/Conakry": {
	country: "GN",
	code: "GMT"
},
	"Africa/Dakar": {
	country: "SN",
	code: "GMT"
},
	"Africa/Dar_es_Salaam": {
	country: "TZ",
	code: "EAT"
},
	"Africa/Djibouti": {
	country: "DJ",
	code: "EAT"
},
	"Africa/Douala": {
	country: "CM",
	code: "WAT"
},
	"Africa/El_Aaiun": {
	country: "MA",
	code: "WEST"
},
	"Africa/Freetown": {
	country: "SL",
	code: "GMT"
},
	"Africa/Gaborone": {
	country: "BW",
	code: "CAT"
},
	"Africa/Harare": {
	country: "ZW",
	code: "CAT"
},
	"Africa/Johannesburg": {
	country: "ZA",
	code: "SAST"
},
	"Africa/Juba": {
	country: "SS",
	code: "CAT"
},
	"Africa/Kampala": {
	country: "UG",
	code: "EAT"
},
	"Africa/Khartoum": {
	country: "SD",
	code: "CAT"
},
	"Africa/Kigali": {
	country: "RW",
	code: "CAT"
},
	"Africa/Kinshasa": {
	country: "CD",
	code: "WAT"
},
	"Africa/Lagos": {
	country: "NG",
	code: "WAT"
},
	"Africa/Libreville": {
	country: "GA",
	code: "WAT"
},
	"Africa/Lome": {
	country: "TG",
	code: "GMT"
},
	"Africa/Luanda": {
	country: "AO",
	code: "WAT"
},
	"Africa/Lubumbashi": {
	country: "CD",
	code: "CAT"
},
	"Africa/Lusaka": {
	country: "ZM",
	code: "CAT"
},
	"Africa/Malabo": {
	country: "GQ",
	code: "WAT"
},
	"Africa/Maputo": {
	country: "MZ",
	code: "CAT"
},
	"Africa/Maseru": {
	country: "LS",
	code: "SAST"
},
	"Africa/Mbabane": {
	country: "SZ",
	code: "SAST"
},
	"Africa/Mogadishu": {
	country: "SO",
	code: "EAT"
},
	"Africa/Monrovia": {
	country: "LR",
	code: "GMT"
},
	"Africa/Nairobi": {
	country: "KE",
	code: "EAT"
},
	"Africa/Ndjamena": {
	country: "TD",
	code: "WAT"
},
	"Africa/Niamey": {
	country: "NE",
	code: "WAT"
},
	"Africa/Nouakchott": {
	country: "MR",
	code: "GMT"
},
	"Africa/Ouagadougou": {
	country: "BF",
	code: "GMT"
},
	"Africa/Porto-Novo": {
	country: "BJ",
	code: "WAT"
},
	"Africa/Sao_Tome": {
	country: "ST",
	code: "GMT"
},
	"Africa/Tripoli": {
	country: "LY",
	code: "EET"
},
	"Africa/Tunis": {
	country: "TN",
	code: "CET"
},
	"Africa/Windhoek": {
	country: "NA",
	code: "CAT"
},
	"America/Adak": {
	country: "US",
	code: "HST"
},
	"America/Anchorage": {
	country: "US",
	code: "AKST"
},
	"America/Anguilla": {
	country: "AI",
	code: "AST"
},
	"America/Antigua": {
	country: "AG",
	code: "AST"
},
	"America/Araguaina": {
	country: "BR",
	code: "BRT"
},
	"America/Argentina/Buenos_Aires": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Catamarca": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Cordoba": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Jujuy": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/La_Rioja": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Mendoza": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Rio_Gallegos": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Salta": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/San_Juan": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/San_Luis": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Tucuman": {
	country: "AR",
	code: "ART"
},
	"America/Argentina/Ushuaia": {
	country: "AR",
	code: "ART"
},
	"America/Aruba": {
	country: "AW",
	code: "AST"
},
	"America/Asuncion": {
	country: "PY",
	code: "PYST"
},
	"America/Atikokan": {
	country: "CA",
	code: "EST"
},
	"America/Bahia_Banderas": {
	country: "MX",
	code: "CST"
},
	"America/Bahia": {
	country: "BR",
	code: "BRT"
},
	"America/Barbados": {
	country: "BB",
	code: "AST"
},
	"America/Belem": {
	country: "BR",
	code: "BRT"
},
	"America/Belize": {
	country: "BZ",
	code: "CST"
},
	"America/Blanc-Sablon": {
	country: "CA",
	code: "AST"
},
	"America/Boa_Vista": {
	country: "BR",
	code: "AMT"
},
	"America/Bogota": {
	country: "CO",
	code: "COT"
},
	"America/Boise": {
	country: "US",
	code: "MST"
},
	"America/Cambridge_Bay": {
	country: "CA",
	code: "MST"
},
	"America/Campo_Grande": {
	country: "BR",
	code: "AMT"
},
	"America/Cancun": {
	country: "MX",
	code: "EST"
},
	"America/Caracas": {
	country: "VE",
	code: "VET"
},
	"America/Cayenne": {
	country: "GF",
	code: "GFT"
},
	"America/Cayman": {
	country: "KY",
	code: "EST"
},
	"America/Chicago": {
	country: "US",
	code: "CST"
},
	"America/Chihuahua": {
	country: "MX",
	code: "CST"
},
	"America/Ciudad_Juarez": {
	country: "MX",
	code: "MST"
},
	"America/Costa_Rica": {
	country: "CR",
	code: "CST"
},
	"America/Creston": {
	country: "CA",
	code: "MST"
},
	"America/Cuiaba": {
	country: "BR",
	code: "BRT"
},
	"America/Curacao": {
	country: "CW",
	code: "AST"
},
	"America/Danmarkshavn": {
	country: "GL",
	code: "GMT"
},
	"America/Dawson": {
	country: "CA",
	code: "MST"
},
	"America/Dawson_Creek": {
	country: "CA",
	code: "MST"
},
	"America/Denver": {
	country: "US",
	code: "MST"
},
	"America/Detroit": {
	country: "US",
	code: "EST"
},
	"America/Dominica": {
	country: "DM",
	code: "AST"
},
	"America/Edmonton": {
	country: "CA",
	code: "MST"
},
	"America/Eirunepe": {
	country: "BR",
	code: "ACT"
},
	"America/El_Salvador": {
	country: "SV",
	code: "CST"
},
	"America/Fortaleza": {
	country: "BR",
	code: "BRT"
},
	"America/Fort_Nelson": {
	country: "CA",
	code: "MST"
},
	"America/Glace_Bay": {
	country: "CA",
	code: "AST"
},
	"America/Goose_Bay": {
	country: "CA",
	code: "AST"
},
	"America/Grand_Turk": {
	country: "TC",
	code: "EST"
},
	"America/Grenada": {
	country: "GD",
	code: "AST"
},
	"America/Guadeloupe": {
	country: "GP",
	code: "AST"
},
	"America/Guatemala": {
	country: "GT",
	code: "CST"
},
	"America/Guayaquil": {
	country: "EC",
	code: "ECT"
},
	"America/Guyana": {
	country: "GY",
	code: "GYT"
},
	"America/Halifax": {
	country: "CA",
	code: "AST"
},
	"America/Havana": {
	country: "CU",
	code: "CST"
},
	"America/Hermosillo": {
	country: "MX",
	code: "MST"
},
	"America/Indiana/Indianapolis": {
	country: "US",
	code: "EST"
},
	"America/Indiana/Knox": {
	country: "US",
	code: "CST"
},
	"America/Indiana/Marengo": {
	country: "US",
	code: "EST"
},
	"America/Indiana/Petersburg": {
	country: "US",
	code: "EST"
},
	"America/Indiana/Tell_City": {
	country: "US",
	code: "CST"
},
	"America/Indiana/Vevay": {
	country: "US",
	code: "EST"
},
	"America/Indiana/Vincennes": {
	country: "US",
	code: "EST"
},
	"America/Indiana/Winamac": {
	country: "US",
	code: "EST"
},
	"America/Inuvik": {
	country: "CA",
	code: "MST"
},
	"America/Iqaluit": {
	country: "CA",
	code: "EST"
},
	"America/Jamaica": {
	country: "JM",
	code: "EST"
},
	"America/Juneau": {
	country: "US",
	code: "AKST"
},
	"America/Kentucky/Louisville": {
	country: "US",
	code: "EST"
},
	"America/Kentucky/Monticello": {
	country: "US",
	code: "EST"
},
	"America/Kralendijk": {
	country: "BQ",
	code: "AST"
},
	"America/La_Paz": {
	country: "BO",
	code: "BOT"
},
	"America/Lima": {
	country: "PE",
	code: "PET"
},
	"America/Los_Angeles": {
	country: "US",
	code: "PST"
},
	"America/Lower_Princes": {
	country: "SX",
	code: "AST"
},
	"America/Maceio": {
	country: "BR",
	code: "BRT"
},
	"America/Managua": {
	country: "NI",
	code: "CST"
},
	"America/Manaus": {
	country: "BR",
	code: "AMT"
},
	"America/Marigot": {
	country: "MF",
	code: "AST"
},
	"America/Martinique": {
	country: "MQ",
	code: "AST"
},
	"America/Matamoros": {
	country: "MX",
	code: "CST"
},
	"America/Mazatlan": {
	country: "MX",
	code: "MST"
},
	"America/Menominee": {
	country: "US",
	code: "CST"
},
	"America/Merida": {
	country: "MX",
	code: "CST"
},
	"America/Metlakatla": {
	country: "US",
	code: "AKST"
},
	"America/Mexico_City": {
	country: "MX",
	code: "CST"
},
	"America/Miquelon": {
	country: "PM",
	code: "PMDT"
},
	"America/Moncton": {
	country: "CA",
	code: "AST"
},
	"America/Monterrey": {
	country: "MX",
	code: "CST"
},
	"America/Montevideo": {
	country: "UY",
	code: "UYT"
},
	"America/Montserrat": {
	country: "MS",
	code: "AST"
},
	"America/Nassau": {
	country: "BS",
	code: "EST"
},
	"America/New_York": {
	country: "US",
	code: "EST"
},
	"America/Nome": {
	country: "US",
	code: "AKST"
},
	"America/Noronha": {
	country: "BR",
	code: "FNT"
},
	"America/North_Dakota/Beulah": {
	country: "US",
	code: "CST"
},
	"America/North_Dakota/Center": {
	country: "US",
	code: "CST"
},
	"America/North_Dakota/New_Salem": {
	country: "US",
	code: "CST"
},
	"America/Nuuk": {
	country: "GL",
	code: "WGT"
},
	"America/Ojinaga": {
	country: "MX",
	code: "CST"
},
	"America/Panama": {
	country: "PA",
	code: "EST"
},
	"America/Paramaribo": {
	country: "SR",
	code: "SRT"
},
	"America/Phoenix": {
	country: "US",
	code: "MST"
},
	"America/Port-au-Prince": {
	country: "HT",
	code: "EST"
},
	"America/Port_of_Spain": {
	country: "TT",
	code: "AST"
},
	"America/Porto_Velho": {
	country: "BR",
	code: "AMT"
},
	"America/Puerto_Rico": {
	country: "PR",
	code: "AST"
},
	"America/Punta_Arenas": {
	country: "CL",
	code: "CLT"
},
	"America/Rankin_Inlet": {
	country: "CA",
	code: "CST"
},
	"America/Recife": {
	country: "BR",
	code: "BRT"
},
	"America/Regina": {
	country: "CA",
	code: "CST"
},
	"America/Resolute": {
	country: "CA",
	code: "CST"
},
	"America/Rio_Branco": {
	country: "BR",
	code: "ACT"
},
	"America/Santarem": {
	country: "BR",
	code: "BRT"
},
	"America/Santiago": {
	country: "CL",
	code: "CLST"
},
	"America/Santo_Domingo": {
	country: "DO",
	code: "AST"
},
	"America/Sao_Paulo": {
	country: "BR",
	code: "BRT"
},
	"America/Scoresbysund": {
	country: "GL",
	code: "CGT"
},
	"America/Sitka": {
	country: "US",
	code: "AKST"
},
	"America/St_Barthelemy": {
	country: "BL",
	code: "AST"
},
	"America/St_Johns": {
	country: "CA",
	code: "NST"
},
	"America/St_Kitts": {
	country: "KN",
	code: "AST"
},
	"America/St_Lucia": {
	country: "LC",
	code: "AST"
},
	"America/St_Thomas": {
	country: "VI",
	code: "AST"
},
	"America/St_Vincent": {
	country: "VC",
	code: "AST"
},
	"America/Swift_Current": {
	country: "CA",
	code: "CST"
},
	"America/Tegucigalpa": {
	country: "HN",
	code: "CST"
},
	"America/Thule": {
	country: "GL",
	code: "AST"
},
	"America/Tijuana": {
	country: "MX",
	code: "PST"
},
	"America/Toronto": {
	country: "CA",
	code: "EST"
},
	"America/Tortola": {
	country: "VG",
	code: "AST"
},
	"America/Vancouver": {
	country: "CA",
	code: "PST"
},
	"America/Whitehorse": {
	country: "CA",
	code: "MST"
},
	"America/Winnipeg": {
	country: "CA",
	code: "CST"
},
	"America/Yakutat": {
	country: "US",
	code: "AKST"
},
	"Antarctica/Casey": {
	country: "AQ",
	code: "CAST"
},
	"Antarctica/Davis": {
	country: "AQ",
	code: "DAVT"
},
	"Antarctica/DumontDUrville": {
	country: "AQ",
	code: "DDUT"
},
	"Antarctica/Macquarie": {
	country: "AU",
	code: "AEDT"
},
	"Antarctica/Mawson": {
	country: "AQ",
	code: "MAWT"
},
	"Antarctica/McMurdo": {
	country: "AQ",
	code: "NZDT"
},
	"Antarctica/Palmer": {
	country: "AQ",
	code: "CLST"
},
	"Antarctica/Rothera": {
	country: "AQ",
	code: "ART"
},
	"Antarctica/Syowa": {
	country: "AQ",
	code: "SYOT"
},
	"Antarctica/Troll": {
	country: "AQ",
	code: "GMT"
},
	"Antarctica/Vostok": {
	country: "AQ",
	code: "VOST"
},
	"Arctic/Longyearbyen": {
	country: "SJ",
	code: "CET"
},
	"Asia/Aden": {
	country: "YE",
	code: "AST"
},
	"Asia/Almaty": {
	country: "KZ",
	code: "ALMT"
},
	"Asia/Amman": {
	country: "JO",
	code: "EET"
},
	"Asia/Anadyr": {
	country: "RU",
	code: "ANAT"
},
	"Asia/Aqtau": {
	country: "KZ",
	code: "AQTT"
},
	"Asia/Aqtobe": {
	country: "KZ",
	code: "AQTT"
},
	"Asia/Ashgabat": {
	country: "TM",
	code: "TMT"
},
	"Asia/Atyrau": {
	country: "KZ",
	code: "AQTT"
},
	"Asia/Baghdad": {
	country: "IQ",
	code: "AST"
},
	"Asia/Bahrain": {
	country: "BH",
	code: "AST"
},
	"Asia/Baku": {
	country: "AZ",
	code: "AZT"
},
	"Asia/Bangkok": {
	country: "TH",
	code: "ICT"
},
	"Asia/Barnaul": {
	country: "RU",
	code: "MSK+4"
},
	"Asia/Beirut": {
	country: "LB",
	code: "EET"
},
	"Asia/Bishkek": {
	country: "KG",
	code: "KGT"
},
	"Asia/Brunei": {
	country: "BN",
	code: "BNT"
},
	"Asia/Chita": {
	country: "RU",
	code: "YAKT"
},
	"Asia/Colombo": {
	country: "LK",
	code: "IST"
},
	"Asia/Damascus": {
	country: "SY",
	code: "EET"
},
	"Asia/Dhaka": {
	country: "BD",
	code: "BST"
},
	"Asia/Dili": {
	country: "TL",
	code: "TLT"
},
	"Asia/Dubai": {
	country: "AE",
	code: "GST"
},
	"Asia/Dushanbe": {
	country: "TJ",
	code: "TJT"
},
	"Asia/Famagusta": {
	country: "CY",
	code: "EET"
},
	"Asia/Gaza": {
	country: "PS",
	code: "EET"
},
	"Asia/Hebron": {
	country: "PS",
	code: "EET"
},
	"Asia/Ho_Chi_Minh": {
	country: "VN",
	code: "IDT"
},
	"Asia/Hong_Kong": {
	country: "HK",
	code: "HKT"
},
	"Asia/Hovd": {
	country: "MN",
	code: "HOVT"
},
	"Asia/Irkutsk": {
	country: "RU",
	code: "IRKT"
},
	"Asia/Jakarta": {
	country: "ID",
	code: "WIB"
},
	"Asia/Jayapura": {
	country: "ID",
	code: "WIT"
},
	"Asia/Jerusalem": {
	country: "IL",
	code: "IST"
},
	"Asia/Kabul": {
	country: "AF",
	code: "AFT"
},
	"Asia/Kamchatka": {
	country: "RU",
	code: "PETT"
},
	"Asia/Karachi": {
	country: "PK",
	code: "PKT"
},
	"Asia/Kathmandu": {
	country: "NP",
	code: "NPT"
},
	"Asia/Khandyga": {
	country: "RU",
	code: "YAKT"
},
	"Asia/Kolkata": {
	country: "IN",
	code: "IST"
},
	"Asia/Krasnoyarsk": {
	country: "RU",
	code: "KRAT"
},
	"Asia/Kuala_Lumpur": {
	country: "MY",
	code: "MYT"
},
	"Asia/Kuching": {
	country: "MY",
	code: "MYT"
},
	"Asia/Kuwait": {
	country: "KW",
	code: "AST"
},
	"Asia/Macau": {
	country: "MO",
	code: "CST"
},
	"Asia/Magadan": {
	country: "RU",
	code: "MAGT"
},
	"Asia/Makassar": {
	country: "ID",
	code: "WITA"
},
	"Asia/Manila": {
	country: "PH",
	code: "PST"
},
	"Asia/Muscat": {
	country: "OM",
	code: "GST"
},
	"Asia/Nicosia": {
	country: "CY",
	code: "EET"
},
	"Asia/Novokuznetsk": {
	country: "RU",
	code: "KRAT"
},
	"Asia/Novosibirsk": {
	country: "RU",
	code: "NOVT"
},
	"Asia/Omsk": {
	country: "RU",
	code: "OMST"
},
	"Asia/Oral": {
	country: "KZ",
	code: "ORAT"
},
	"Asia/Phnom_Penh": {
	country: "KH",
	code: "ICT"
},
	"Asia/Pontianak": {
	country: "ID",
	code: "WIB"
},
	"Asia/Pyongyang": {
	country: "KP",
	code: "KST"
},
	"Asia/Qatar": {
	country: "QA",
	code: "AST"
},
	"Asia/Qostanay": {
	country: "KZ",
	code: "QYZT"
},
	"Asia/Qyzylorda": {
	country: "KZ",
	code: "MSK+2"
},
	"Asia/Riyadh": {
	country: "SA",
	code: "AST"
},
	"Asia/Sakhalin": {
	country: "RU",
	code: "SAKT"
},
	"Asia/Samarkand": {
	country: "UZ",
	code: "UZT"
},
	"Asia/Seoul": {
	country: "KR",
	code: "KST"
},
	"Asia/Shanghai": {
	country: "CN",
	code: "CST"
},
	"Asia/Singapore": {
	country: "SG",
	code: "SGT"
},
	"Asia/Srednekolymsk": {
	country: "RU",
	code: "SRET"
},
	"Asia/Taipei": {
	country: "TW",
	code: "CST"
},
	"Asia/Tashkent": {
	country: "UZ",
	code: "UZT"
},
	"Asia/Tbilisi": {
	country: "GE",
	code: "GET"
},
	"Asia/Tehran": {
	country: "IR",
	code: "IRDT"
},
	"Asia/Thimphu": {
	country: "BT",
	code: "BTT"
},
	"Asia/Tokyo": {
	country: "JP",
	code: "JST"
},
	"Asia/Tomsk": {
	country: "RU",
	code: "MSD+3"
},
	"Asia/Ulaanbaatar": {
	country: "MN",
	code: "ULAT"
},
	"Asia/Urumqi": {
	country: "CN",
	code: "URUT"
},
	"Asia/Ust-Nera": {
	country: "RU",
	code: "VLAT"
},
	"Asia/Vientiane": {
	country: "LA",
	code: "ICT"
},
	"Asia/Vladivostok": {
	country: "RU",
	code: "VLAT"
},
	"Asia/Yakutsk": {
	country: "RU",
	code: "YAKT"
},
	"Asia/Yangon": {
	country: "MM",
	code: "MMT"
},
	"Asia/Yekaterinburg": {
	country: "RU",
	code: "YEKT"
},
	"Asia/Yerevan": {
	country: "AM",
	code: "AMT"
},
	"Atlantic/Azores": {
	country: "PT",
	code: "AZOT"
},
	"Atlantic/Bermuda": {
	country: "BM",
	code: "AST"
},
	"Atlantic/Canary": {
	country: "ES",
	code: "WET"
},
	"Atlantic/Cape_Verde": {
	country: "CV",
	code: "CVT"
},
	"Atlantic/Faroe": {
	country: "FO",
	code: "WET"
},
	"Atlantic/Madeira": {
	country: "PT",
	code: "WET"
},
	"Atlantic/Reykjavik": {
	country: "IS",
	code: "GMT"
},
	"Atlantic/South_Georgia": {
	country: "GS",
	code: "GST"
},
	"Atlantic/Stanley": {
	country: "FK",
	code: "FKT"
},
	"Atlantic/St_Helena": {
	country: "SH",
	code: "GMT"
},
	"Australia/Adelaide": {
	country: "AU",
	code: "ACDT"
},
	"Australia/Brisbane": {
	country: "AU",
	code: "AEST"
},
	"Australia/Broken_Hill": {
	country: "AU",
	code: "ACDT"
},
	"Australia/Darwin": {
	country: "AU",
	code: "ACST"
},
	"Australia/Eucla": {
	country: "AU",
	code: "ACWST"
},
	"Australia/Hobart": {
	country: "AU",
	code: "AEDT"
},
	"Australia/Lindeman": {
	country: "AU",
	code: "AEST"
},
	"Australia/Lord_Howe": {
	country: "AU",
	code: "LHDT"
},
	"Australia/Melbourne": {
	country: "AU",
	code: "AEDT"
},
	"Australia/Perth": {
	country: "AU",
	code: "AWST"
},
	"Australia/Sydney": {
	country: "AU",
	code: "AEDT"
},
	"Europe/Amsterdam": {
	country: "NL",
	code: "CET"
},
	"Europe/Andorra": {
	country: "AD",
	code: "CET"
},
	"Europe/Astrakhan": {
	country: "RU",
	code: "MSK+1"
},
	"Europe/Athens": {
	country: "GR",
	code: "EET"
},
	"Europe/Belgrade": {
	country: "RS",
	code: "CET"
},
	"Europe/Berlin": {
	country: "DE",
	code: "CET"
},
	"Europe/Bratislava": {
	country: "SK",
	code: "CET"
},
	"Europe/Brussels": {
	country: "BE",
	code: "CET"
},
	"Europe/Bucharest": {
	country: "RO",
	code: "EET"
},
	"Europe/Budapest": {
	country: "HU",
	code: "CET"
},
	"Europe/Busingen": {
	country: "DE",
	code: "CET"
},
	"Europe/Chisinau": {
	country: "MD",
	code: "EET"
},
	"Europe/Copenhagen": {
	country: "DK",
	code: "CET"
},
	"Europe/Dublin": {
	country: "IE",
	code: "GMT"
},
	"Europe/Gibraltar": {
	country: "GI",
	code: "CET"
},
	"Europe/Guernsey": {
	country: "GG",
	code: "GMT"
},
	"Europe/Helsinki": {
	country: "FI",
	code: "EET"
},
	"Europe/Isle_of_Man": {
	country: "IM",
	code: "GMT"
},
	"Europe/Istanbul": {
	country: "TR",
	code: "TRT"
},
	"Europe/Jersey": {
	country: "JE",
	code: "GMT"
},
	"Europe/Kaliningrad": {
	country: "RU",
	code: "EET"
},
	"Europe/Kirov": {
	country: "RU",
	code: "MSK"
},
	"Europe/Kyiv": {
	country: "UA",
	code: "EET"
},
	"Europe/Lisbon": {
	country: "PT",
	code: "WET"
},
	"Europe/Ljubljana": {
	country: "SI",
	code: "CET"
},
	"Europe/London": {
	country: "GB",
	code: "GMT"
},
	"Europe/Luxembourg": {
	country: "LU",
	code: "CET"
},
	"Europe/Madrid": {
	country: "ES",
	code: "CET"
},
	"Europe/Malta": {
	country: "MT",
	code: "CET"
},
	"Europe/Mariehamn": {
	country: "AX",
	code: "EET"
},
	"Europe/Minsk": {
	country: "BY",
	code: "MSK"
},
	"Europe/Monaco": {
	country: "MC",
	code: "CET"
},
	"Europe/Moscow": {
	country: "RU",
	code: "MSK"
},
	"Europe/Oslo": {
	country: "NO",
	code: "CET"
},
	"Europe/Paris": {
	country: "FR",
	code: "CET"
},
	"Europe/Podgorica": {
	country: "ME",
	code: "CET"
},
	"Europe/Prague": {
	country: "CZ",
	code: "CET"
},
	"Europe/Riga": {
	country: "LV",
	code: "EET"
},
	"Europe/Rome": {
	country: "IT",
	code: "CET"
},
	"Europe/Samara": {
	country: "RU",
	code: "SAMT"
},
	"Europe/San_Marino": {
	country: "SM",
	code: "CET"
},
	"Europe/Sarajevo": {
	country: "BA",
	code: "CET"
},
	"Europe/Saratov": {
	country: "RU",
	code: "MSD"
},
	"Europe/Simferopol": {
	country: "UA",
	code: "MSK"
},
	"Europe/Skopje": {
	country: "MK",
	code: "CET"
},
	"Europe/Sofia": {
	country: "BG",
	code: "EET"
},
	"Europe/Stockholm": {
	country: "SE",
	code: "CET"
},
	"Europe/Tallinn": {
	country: "EE",
	code: "EET"
},
	"Europe/Tirane": {
	country: "AL",
	code: "CET"
},
	"Europe/Ulyanovsk": {
	country: "RU",
	code: "MSK+1"
},
	"Europe/Vaduz": {
	country: "LI",
	code: "CET"
},
	"Europe/Vatican": {
	country: "VA",
	code: "CET"
},
	"Europe/Vienna": {
	country: "AT",
	code: "CET"
},
	"Europe/Vilnius": {
	country: "LT",
	code: "EET"
},
	"Europe/Volgograd": {
	country: "RU",
	code: "MSK"
},
	"Europe/Warsaw": {
	country: "PL",
	code: "CET"
},
	"Europe/Zagreb": {
	country: "HR",
	code: "CET"
},
	"Europe/Zurich": {
	country: "CH",
	code: "CET"
},
	"Indian/Antananarivo": {
	country: "MG",
	code: "EAT"
},
	"Indian/Chagos": {
	country: "IO",
	code: "IOT"
},
	"Indian/Christmas": {
	country: "CX",
	code: "CXT"
},
	"Indian/Cocos": {
	country: "CC",
	code: "CCT"
},
	"Indian/Comoro": {
	country: "KM",
	code: "EAT"
},
	"Indian/Kerguelen": {
	country: "TF",
	code: "TFT"
},
	"Indian/Mahe": {
	country: "SC",
	code: "SCT"
},
	"Indian/Maldives": {
	country: "MV",
	code: "MVT"
},
	"Indian/Mauritius": {
	country: "MU",
	code: "MUT"
},
	"Indian/Mayotte": {
	country: "YT",
	code: "EAT"
},
	"Indian/Reunion": {
	country: "RE",
	code: "RET"
},
	"Pacific/Apia": {
	country: "WS",
	code: "WST"
},
	"Pacific/Auckland": {
	country: "NZ",
	code: "NZDT"
},
	"Pacific/Bougainville": {
	country: "PG",
	code: "BST"
},
	"Pacific/Chatham": {
	country: "NZ",
	code: "CHADT"
},
	"Pacific/Chuuk": {
	country: "FM",
	code: "CHUT"
},
	"Pacific/Easter": {
	country: "CL",
	code: "EASST"
},
	"Pacific/Efate": {
	country: "VU",
	code: "VUT"
},
	"Pacific/Fakaofo": {
	country: "TK",
	code: "TKT"
},
	"Pacific/Fiji": {
	country: "FJ",
	code: "FJT"
},
	"Pacific/Funafuti": {
	country: "TV",
	code: "TVT"
},
	"Pacific/Galapagos": {
	country: "EC",
	code: "GALT"
},
	"Pacific/Gambier": {
	country: "PF",
	code: "GAMT"
},
	"Pacific/Guadalcanal": {
	country: "SB",
	code: "SBT"
},
	"Pacific/Guam": {
	country: "GU",
	code: "ChST"
},
	"Pacific/Honolulu": {
	country: "US",
	code: "HST"
},
	"Pacific/Kanton": {
	country: "KI",
	code: "EST"
},
	"Pacific/Kiritimati": {
	country: "KI",
	code: "LINT"
},
	"Pacific/Kosrae": {
	country: "FM",
	code: "KOST"
},
	"Pacific/Kwajalein": {
	country: "MH",
	code: "+12"
},
	"Pacific/Majuro": {
	country: "MH",
	code: "+12"
},
	"Pacific/Marquesas": {
	country: "PF",
	code: "MART"
},
	"Pacific/Midway": {
	country: "UM",
	code: "SST"
},
	"Pacific/Nauru": {
	country: "NR",
	code: "NRT"
},
	"Pacific/Niue": {
	country: "NU",
	code: "NUT"
},
	"Pacific/Norfolk": {
	country: "NF",
	code: "NFDT"
},
	"Pacific/Noumea": {
	country: "NC",
	code: "NCT"
},
	"Pacific/Pago_Pago": {
	country: "AS",
	code: "SST"
},
	"Pacific/Palau": {
	country: "PW",
	code: "+09"
},
	"Pacific/Pitcairn": {
	country: "PN",
	code: "PST"
},
	"Pacific/Pohnpei": {
	country: "FM",
	code: "PONT"
},
	"Pacific/Port_Moresby": {
	country: "PG",
	code: "PGT"
},
	"Pacific/Rarotonga": {
	country: "CK",
	code: "CKT"
},
	"Pacific/Saipan": {
	country: "MP",
	code: "ChST"
},
	"Pacific/Tahiti": {
	country: "PF",
	code: "TAHT"
},
	"Pacific/Tarawa": {
	country: "KI",
	code: "GILT"
},
	"Pacific/Tongatapu": {
	country: "TO",
	code: "TOT"
},
	"Pacific/Wake": {
	country: "UM",
	code: "WAKT"
},
	"Pacific/Wallis": {
	country: "WF",
	code: "WFT"
}
};

var Home = {
  css: `home p span,[is="home"] p span{ font-size: 0.6em; max-width: 75%; margin: 0.6em auto 2em; display: block; } home div p.app,[is="home"] div p.app{ font-size: 0.8em; } home div.history,[is="home"] div.history{ margin-top: 2em; } home select,[is="home"] select{ display: inline; width: 8.8em; margin-right: 0.5em; padding: 0.14em 0.1em; font-size: 0.7em; } home select option,[is="home"] select option{ } home select option span.name,[is="home"] select option span.name{ text-overflow: ellipsis; } home input,[is="home"] input{ margin-top: 0.5em; line-height: 1.17em; width: 10em; font-size: 0.8em; } home div p.app input,[is="home"] div p.app input{ margin: 0.1em 0.2em 0; width: auto; } home p.button,[is="home"] p.button{ margin-top: 1em; } home button,[is="home"] button{ font-size: 0.7em; } home div.history h3,[is="home"] div.history h3{ margin-bottom: 1.2em; } home div.history p,[is="home"] div.history p{ font-size: 0.8em; }`,

  exports: {
    state: {
      codes: countryCodes.customList("countryNameEn", "{countryCallingCode}"),
      countryCodes: countryCodes.customList("countryCode", "{countryNameEn}"),
      activeCountry: "",
      activeNumber: "",
      appPresent: false,
      history: [],
    },

    onMounted() {

      const tz = Intl.DateTimeFormat().resolvedOptions();
      const country = timezones[tz.timeZone];
      let activeCountry;


      if(country){
        activeCountry = this.state.codes[this.state.countryCodes[country.country]];
      } else {
        activeCountry = Object.values(this.state.codes)[0];
      }

      this.update({
        activeCountry
      });

    },

    numberOnly(e) {
      return new RegExp(/[0-9]/).test(e.key);
    },

    phoneNumbeChange(p) {
      this.update({
        activeNumber: p.target.value,
      });
    },

    countryChange(e) {
      this.update({
        activeCountry: e.target.value,
      });
    },

    appPresentChange(e) {
      this.update({
        appPresent: !this.state.appPresent,
      });
    },

    chatNow(e) {
      e.preventDefault();

      const api =
        "https://api.whatsapp.com/send/?phone=[n]&text&type=phone_number&app_absent=[a]";
      const n = `${this.state.activeCountry}${this.state.activeNumber.replace(
        this.state.activeNumber.length > 10 ? new RegExp(/^0/) : "",
        ""
      )}`;
      const a = this.state.appPresent ? 0 : 1;
      const apid = api.replace("[n]", n).replace("[a]", a);

      const updateHistory = () => {
        this.update({
          history: this.state.history.concat([
            {
              [n]: apid,
            },
          ]),
        });
      };

      if (this.state.history.length > 0) {
        const findIndex = this.state.history.findIndex((hist) =>
          Object.keys(hist).includes(n)
        );

        if (findIndex > -1) {
          if (Object.values(this.state.history[findIndex]).includes(apid)) ; else {
            const history = this.state.history;
            history.splice(findIndex, 1, {
              [n]: apid,
            });

            this.update({
              history,
            });
          }
        } else {
          updateHistory();
        }
      } else {
        updateHistory();
      }

      window.open(apid, "_blank");
    }
  },

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h2>Hello <b>Stranger,</b></h2><p>\n    Chat with anyone on Whatsapp without saving the number to your contacts! <br/><span>\n      Ever had to chat with a number on whatsapp just once; perhaps to send some \n      information across or to complete some process? <br/>\n      Now you can, without saving the number as a contact.\n      </span></p><div><form expr5="expr5"></form></div><div class="history"><h3 expr12="expr12"> </h3><p expr13="expr13"></p><p expr15="expr15"></p></div>',
    [
      {
        type: bindingTypes.IF,
        evaluate: _scope => Object.keys(_scope.state.codes).length > 0,
        redundantAttribute: 'expr5',
        selector: '[expr5]',

        template: template(
          '<p><select expr6="expr6" name="countryCode"></select><input expr10="expr10" type="tel" pattern="[0-9]+" minlength="10" maxlength="11" placeholder="xxxxxxxxxx" required/><p class="app"><input expr11="expr11" id="appPresent" type="checkbox"/><label for="appPresent"> \n            Do you have Whatsapp installed?\n          </label></p></p><p class="button"><button type="submit"> Chat Now </button></p>',
          [
            {
              expressions: [
                {
                  type: expressionTypes.EVENT,
                  name: 'onsubmit',
                  evaluate: _scope => _scope.chatNow
                }
              ]
            },
            {
              type: bindingTypes.IF,
              evaluate: _scope => Object.keys(_scope.state.codes).length > 0,
              redundantAttribute: 'expr6',
              selector: '[expr6]',

              template: template(
                '<option expr7="expr7"></option>',
                [
                  {
                    expressions: [
                      {
                        type: expressionTypes.ATTRIBUTE,
                        isBoolean: false,
                        name: 'value',
                        evaluate: _scope => _scope.state.activeCountry
                      },
                      {
                        type: expressionTypes.EVENT,
                        name: 'onchange',
                        evaluate: _scope => _scope.countryChange
                      }
                    ]
                  },
                  {
                    type: bindingTypes.EACH,
                    getKey: null,
                    condition: null,

                    template: template(
                      '<span expr8="expr8" class="name"> </span><span expr9="expr9"> </span>',
                      [
                        {
                          expressions: [
                            {
                              type: expressionTypes.ATTRIBUTE,
                              isBoolean: false,
                              name: 'value',
                              evaluate: _scope => _scope.cc[1]
                            },
                            {
                              type: expressionTypes.ATTRIBUTE,
                              isBoolean: false,
                              name: null,
                              evaluate: _scope => _scope.state.activeCountry === _scope.cc[1] ? {selected: "selected"} : {}
                            }
                          ]
                        },
                        {
                          redundantAttribute: 'expr8',
                          selector: '[expr8]',

                          expressions: [
                            {
                              type: expressionTypes.TEXT,
                              childNodeIndex: 0,

                              evaluate: _scope => [
                                _scope.cc[0]
                              ].join(
                                ''
                              )
                            }
                          ]
                        },
                        {
                          redundantAttribute: 'expr9',
                          selector: '[expr9]',

                          expressions: [
                            {
                              type: expressionTypes.TEXT,
                              childNodeIndex: 0,

                              evaluate: _scope => [
                                ' ',
                                '(+',
                                _scope.cc[1],
                                ')'
                              ].join(
                                ''
                              )
                            }
                          ]
                        }
                      ]
                    ),

                    redundantAttribute: 'expr7',
                    selector: '[expr7]',
                    itemName: 'cc',
                    indexName: null,

                    evaluate: _scope => Object.entries(_scope.state.codes).sort(
                      (a,b) => a[0] > b[0] ? 1 : -1
                    )
                  }
                ]
              )
            },
            {
              redundantAttribute: 'expr10',
              selector: '[expr10]',

              expressions: [
                {
                  type: expressionTypes.VALUE,
                  evaluate: _scope => _scope.state.activeNumber
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onkeypress',
                  evaluate: _scope => _scope.numberOnly
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onchange',
                  evaluate: _scope => _scope.phoneNumbeChange
                }
              ]
            },
            {
              redundantAttribute: 'expr11',
              selector: '[expr11]',

              expressions: [
                {
                  type: expressionTypes.VALUE,
                  evaluate: _scope => _scope.state.appPresent
                },
                {
                  type: expressionTypes.EVENT,
                  name: 'onchange',
                  evaluate: _scope => _scope.appPresentChange
                }
              ]
            }
          ]
        )
      },
      {
        redundantAttribute: 'expr12',
        selector: '[expr12]',

        expressions: [
          {
            type: expressionTypes.TEXT,
            childNodeIndex: 0,

            evaluate: _scope => [
              'Previous Chats (',
              _scope.state.history.length,
              ')'
            ].join(
              ''
            )
          }
        ]
      },
      {
        type: bindingTypes.EACH,
        getKey: null,
        condition: null,

        template: template(
          '<a expr14="expr14" target="_blank"> </a>',
          [
            {
              redundantAttribute: 'expr14',
              selector: '[expr14]',

              expressions: [
                {
                  type: expressionTypes.TEXT,
                  childNodeIndex: 0,

                  evaluate: _scope => [
                    Object.keys(_scope.h)[0]
                  ].join(
                    ''
                  )
                },
                {
                  type: expressionTypes.ATTRIBUTE,
                  isBoolean: false,
                  name: 'href',
                  evaluate: _scope => Object.values(_scope.h)[0]
                },
                {
                  type: expressionTypes.ATTRIBUTE,
                  isBoolean: false,
                  name: 'title',
                  evaluate: _scope => Object.keys(_scope.h)[0]
                }
              ]
            }
          ]
        ),

        redundantAttribute: 'expr13',
        selector: '[expr13]',
        itemName: 'h',
        indexName: null,
        evaluate: _scope => _scope.state.history
      },
      {
        type: bindingTypes.IF,
        evaluate: _scope => _scope.state.history.length === 0,
        redundantAttribute: 'expr15',
        selector: '[expr15]',

        template: template(
          '\n      No history yet.\n    ',
          []
        )
      }
    ]
  ),

  name: 'home'
};

var routes = {
    HOME: {
        path: '/',
        label: 'Home',
        component: 'home'
    },
    ABOUT: {
        path: '/about',
        label: 'What\'s Whatsapp with Stangers?',
        component: 'about'
    }
};

var NotFound = {
  css: null,

  exports: withTypes(
    {
      ...routes
    }
  ),

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h1>Page not found</h1><p>Opsi, wrong page. Go back to <a expr16="expr16"> </a> :(</p>',
    [
      {
        redundantAttribute: 'expr16',
        selector: '[expr16]',

        expressions: [
          {
            type: expressionTypes.TEXT,
            childNodeIndex: 0,
            evaluate: _scope => _scope.HOME.label
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'href',
            evaluate: _scope => _scope.HOME.path
          }
        ]
      }
    ]
  ),

  name: 'not-found'
};

var About = {
  css: null,
  exports: null,

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<h1>A <b>modern</b> runtime for <b>JavaScript</b> and <b>TypeScript</b>.</h1><p>Deno is a simple, modern and secure runtime for JavaScript, TypeScript, and WebAssembly that uses V8 and is built in Rust.</p><p><a href="https://deno.land/" target="_blank" rel="nofollow">Read More</a></p>',
    []
  ),

  name: 'about'
};

var app = {
  css: `app,[is="app"]{ --primary-color: rgba(96, 165, 254, 1); --background-color: aliceblue; --light-gray: #f4f4f4; font-family: ui-sans-serif, system-ui, sans-serif; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; margin: 0 auto; padding: 2rem 1rem 1rem; min-height: 100vh; text-align: center; background-color: var(--background-color); } app h1,[is="app"] h1{ font-weight: 300; font-size: 1.6rem; margin-bottom: 1.2rem; } app h1 b,[is="app"] h1 b{ font-weight: bold; } app header,[is="app"] header{ display: flex; justify-content: center; align-items: center; padding: 0.2rem 1rem 0.5rem; margin: 1rem 0; gap: 2rem; } app main,[is="app"] main{ margin: 0 auto; max-width: 600px; min-height: 200px; } app main p,[is="app"] main p{ line-height: 1.6; margin-bottom: 1rem; } app nav,[is="app"] nav{ display: flex; align-items: center; justify-content: center; padding: 0rem 1rem 1.4rem; } app a,[is="app"] a{ color: var(--primary-color); text-decoration: none; } app a:focus,[is="app"] a:focus,app a:active,[is="app"] a:active,app a:hover,[is="app"] a:hover{ opacity: 0.7; } app nav a,[is="app"] nav a{ padding: 0 0.4rem; } app nav a.active,[is="app"] nav a.active{ text-decoration: underline; pointer-events: none; }`,

  exports: withTypes(
    {
      components: {
        Router,
        Route,
        Home,
        About,
        NotFound
      },
      state: {
        currentPath: null,
        showNotFound: false
      },
      // the isServer property is automatically injected by @riotjs/ssr
      onBeforeMount({ initialRoute }) {
        // create a stream on all routes
        this.anyRouteStream = route('(.*)');
        // create a stream to check the riot-router state
        this.routerStateStream = erre();
        // update the state of the not found component depending on the initial route
        this.state.showNotFound = this.isNotFoundVisible(initialRoute);
        // check any route change to understand if the not found site should be displayed
        // and to update the menu link classes
        this.anyRouteStream.on.value(this.onAnyRoute);
        // set the initial current path
        this.state.currentPath = initialRoute;
      },
      onRouterStarted() {
        // broadcast the router started event
        this.routerStateStream.push('started');
      },
      // Needed only for SSR
      onAsyncRendering(resolve) {
        const onReady = () => {
          this.routerStateStream.off.value(onReady);
          resolve();
        };

        // wait the router started event
        this.routerStateStream.on.value(onReady);
      },
      getPages() {
        return Object.values(this.props.routes)
      },
      isNotFoundVisible(path) {
        return !this.getPages().some(p => match(path, toRegexp(p.path)))
      },
      onAnyRoute({ pathname }) {
        // show the not found page if none of the page paths are matched
        this.update({
          currentPath: pathname,
          showNotFound: this.isNotFoundVisible(pathname)
        });
      },
      getLinkClass(path) {

        return this.state?.currentPath === path ? 'active' : null
      },
      onBeforeUnmount() {
        this.routerStateStream.end();
        this.anyRouteStream.end();
      }
    }
  ),

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<router expr0="expr0"></router>',
    [
      {
        type: bindingTypes.TAG,
        getComponent: getComponent,
        evaluate: _scope => 'router',

        slots: [
          {
            id: 'default',
            html: '<header><img width="60" height="60" src="./src/images/phone.png" alt="Phone Logo"/>\n      +\n      <img width="75" height="76" src="./src/images/whatsapp.png" alt="Whatsapp Logo"/></header><nav><a expr1="expr1"></a></nav><not-found expr2="expr2"></not-found><main><route expr3="expr3"></route></main>',

            bindings: [
              {
                type: bindingTypes.EACH,
                getKey: null,
                condition: null,

                template: template(
                  ' ',
                  [
                    {
                      expressions: [
                        {
                          type: expressionTypes.TEXT,
                          childNodeIndex: 0,

                          evaluate: _scope => [
                            _scope.page.label
                          ].join(
                            ''
                          )
                        },
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'class',

                          evaluate: _scope => _scope.getLinkClass(
                            _scope.page.path
                          )
                        },
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'href',
                          evaluate: _scope => _scope.page.path
                        }
                      ]
                    }
                  ]
                ),

                redundantAttribute: 'expr1',
                selector: '[expr1]',
                itemName: 'page',
                indexName: null,
                evaluate: _scope => _scope.getPages()
              },
              {
                type: bindingTypes.IF,
                evaluate: _scope => _scope.state.showNotFound,
                redundantAttribute: 'expr2',
                selector: '[expr2]',

                template: template(
                  null,
                  [
                    {
                      type: bindingTypes.TAG,
                      getComponent: getComponent,
                      evaluate: _scope => 'not-found',
                      slots: [],
                      attributes: []
                    }
                  ]
                )
              },
              {
                type: bindingTypes.EACH,
                getKey: null,
                condition: null,

                template: template(
                  null,
                  [
                    {
                      type: bindingTypes.TAG,
                      getComponent: getComponent,
                      evaluate: _scope => 'route',

                      slots: [
                        {
                          id: 'default',
                          html: '<main expr4="expr4"></main>',

                          bindings: [
                            {
                              type: bindingTypes.TAG,
                              getComponent: getComponent,
                              evaluate: _scope => _scope.page.component,
                              slots: [],
                              attributes: [],
                              redundantAttribute: 'expr4',
                              selector: '[expr4]'
                            }
                          ]
                        }
                      ],

                      attributes: [
                        {
                          type: expressionTypes.ATTRIBUTE,
                          isBoolean: false,
                          name: 'path',
                          evaluate: _scope => _scope.page.path
                        }
                      ]
                    }
                  ]
                ),

                redundantAttribute: 'expr3',
                selector: '[expr3]',
                itemName: 'page',
                indexName: null,
                evaluate: _scope => _scope.getPages()
              }
            ]
          }
        ],

        attributes: [
          {
            type: expressionTypes.EVENT,
            name: 'on-started',
            evaluate: _scope => _scope.onRouterStarted
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'base',
            evaluate: _scope => _scope.props.base
          },
          {
            type: expressionTypes.ATTRIBUTE,
            isBoolean: false,
            name: 'initial-route',
            evaluate: _scope => _scope.props.initialRoute
          }
        ],

        redundantAttribute: 'expr0',
        selector: '[expr0]'
      }
    ]
  ),

  name: 'app'
};

export { app as default };
