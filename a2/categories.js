// http://www.iucnredlist.org/technical-documents/data-organization/countries-by-regions
var regions = [
{
    'name': 'North America',
    'members': ['United States', 'Canada'],
    'color': '#ff0000'
},
{
    'name': 'North Africa',
    'members': ['Algeria', 'Egypt, Arab Rep.', 'Libya', 'Morocco', 'Tunisia'],
    'color': '#ff0000'
},
{
    'name': 'Sub-Saharan Africa',
    'members': ['Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Congo, Rep.', 'Congo, Dem. Rep.', 'Cote d\'Ivoire', 'Djibouti', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia, The', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mayotte', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Reunion', 'Rwanda', 'St. Helena', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Uganda', 'Zambia', 'Zimbabwe'],
    'color': '#ff0000'
},
//~ {
    //~ 'name': 'Antarctic',
    //~ 'members': ['Bouvet Island', 'French Southern Territories [includes the Amsterdam-St Paul, Crozet, Kerguelen and Mozambique Channel island groups]', 'Heard Island and McDonald Islands', 'South Georgia and the South Sandwich Islands'],
    //~ 'color': '#ff0000'
//~ },
{
    'name': 'East Asia',
    'members': ['China', 'Hong Kong SAR, China', 'Japan', 'Korea, Rep.', 'Korea, Dem. Rep.', 'Macao SAR, China', 'Mongolia', 'Taiwan, China'],
    'color': '#ff0000'
},
{
    'name': 'North Asia',
    'members': ['Belarus', 'Moldova', 'Russian Federation', 'Ukraine'],
    'color': '#709F66'
},
{
    'name': 'West & Central Asia',
    'members': ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Cyprus', 'Georgia', 'Iran, Islamic Rep.', 'Iraq', 'Israel', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyz Republic', 'Lebanon', 'Oman', 'Pakistan', /* 'Palestine, State of',*/ 'Qatar', 'Saudi Arabia', 'Syrian Arab Republic', 'Tajikistan', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Yemen, Rep.'],
    'color': '#E161A5'
},
{
    'name': 'South & Southeast Asia',
    'members': ['Bangladesh', 'Bhutan', /* 'British Indian Ocean Territory [includes the Chagos Archipelago]',*/ 'Brunei Darussalam', 'Cambodia', /* 'Disputed Territory [includes the Paracel Islands and Spratly Islands]', */ 'India', 'Indonesia', 'Lao PDR', 'Malaysia', 'Maldives', 'Myanmar', 'Nepal', 'Philippines', 'Singapore', 'Sri Lanka', 'Thailand', 'Timor-Leste', 'Vietnam'],
    'color': '#ff0000'
},
{
    'name': 'Europe',
    'members': [/* 'Aland Islands', */ 'Albania', 'Andorra', 'Austria', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', /* 'Faroe Islands',*/ 'Finland', 'France', 'Germany', 'Gibraltar', 'Greece', 'Greenland', /* 'Guernsey',  Holy See (Vatican City State)', */ 'Hungary', 'Iceland', 'Ireland', 'Isle of Man', 'Italy', /* 'Jersey', */  'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia, FYR', 'Malta', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovak Republic', 'Slovenia', 'Spain', /* 'Svalbard and Jan Mayen', */ 'Sweden', 'Switzerland', 'United Kingdom'],
    'color': '#ff0000'
},
{
    'name': 'Caribbean Islands',
    'members': ['Anguilla', 'Antigua and Barbuda', 'Aruba', 'Bahamas, The', 'Barbados', 'Bermuda', 'Cayman Islands', /* 'Bonaire, Sint Eustatius and Saba', */ 'Cuba', 'Dominica', 'Curacao', 'Dominican Republic', 'Grenada', 'Guadeloupe', 'Haiti', 'Jamaica', 'Martinique', 'Montserrat', 'Puerto Rico', /* 'St. Bathélemy',*/ 'St. Kitts and Nevis', 'St. Lucia', 'St. Martin (French part)', 'St. Vincent and the Grenadines', 'Sint Maarten (Dutch part)', 'Trinidad and Tobago', 'Turks and Caicos Islands', 'British Virgin Islands', 'Virgin Islands (U.S.)'],
    'color': '#ff0000'
},
{
    'name': 'Central America',
    'members': ['Belize', 'Costa Rica', 'El Salvador', 'Guatemala', 'Honduras', 'Mexico', 'Nicaragua', 'Panama'],
    'color': '#ff0000'
},
{
    'name': 'Oceania',
    'members': ['American Samoa', 'Australia', /* 'Christmas Island', 'Cocos (Keeling) Islands',*/ 'Cook Islands', 'Fiji', 'French Polynesia', 'Guam', 'Kiribati', 'Marshall Islands', 'Micronesia, Fed. Sts.', 'Nauru', 'New Caledonia', 'New Zealand', 'Niue', /* 'Norfolk Island',*/ 'Northern Mariana Islands', 'Palau', 'Papua New Guinea', /* 'Pitcairn', */ 'Samoa', 'Solomon Islands', /* 'Tokelau', */ 'Tonga', 'Tuvalu', /* 'United States Minor Outlying Islands [includes the Howland-Baker, Johnston, Midway, US Line and Wake island groups]', */ 'Vanuatu', 'Wallis and Futuna'],
    'color': '#ff0000'
},
{
    'name': 'South America',
    'members': ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Falkland Islands', /* 'French Guiana', */ 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela, RB'],
    'color': '#ff0000'
}
]
