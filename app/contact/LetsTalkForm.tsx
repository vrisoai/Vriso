'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── All countries with dial codes ──────────────────────────────────────── */
/* Priority tier shown first, rest alphabetical */
const DIAL_CODES = [
  /* ── Most common first ── */
  { code: 'US',  dial: '+1',    flag: '🇺🇸', name: 'United States'                },
  { code: 'GB',  dial: '+44',   flag: '🇬🇧', name: 'United Kingdom'               },
  { code: 'IN',  dial: '+91',   flag: '🇮🇳', name: 'India'                        },
  { code: 'AU',  dial: '+61',   flag: '🇦🇺', name: 'Australia'                    },
  { code: 'CA',  dial: '+1',    flag: '🇨🇦', name: 'Canada'                       },
  { code: 'AE',  dial: '+971',  flag: '🇦🇪', name: 'United Arab Emirates'         },
  { code: 'SG',  dial: '+65',   flag: '🇸🇬', name: 'Singapore'                    },
  { code: 'DE',  dial: '+49',   flag: '🇩🇪', name: 'Germany'                      },
  { code: 'FR',  dial: '+33',   flag: '🇫🇷', name: 'France'                       },
  { code: 'NL',  dial: '+31',   flag: '🇳🇱', name: 'Netherlands'                  },
  { code: 'CH',  dial: '+41',   flag: '🇨🇭', name: 'Switzerland'                  },
  { code: 'SE',  dial: '+46',   flag: '🇸🇪', name: 'Sweden'                       },
  { code: 'IT',  dial: '+39',   flag: '🇮🇹', name: 'Italy'                        },
  { code: 'ES',  dial: '+34',   flag: '🇪🇸', name: 'Spain'                        },
  { code: 'JP',  dial: '+81',   flag: '🇯🇵', name: 'Japan'                        },
  { code: 'KR',  dial: '+82',   flag: '🇰🇷', name: 'South Korea'                  },
  { code: 'BR',  dial: '+55',   flag: '🇧🇷', name: 'Brazil'                       },
  { code: 'MX',  dial: '+52',   flag: '🇲🇽', name: 'Mexico'                       },
  { code: 'ZA',  dial: '+27',   flag: '🇿🇦', name: 'South Africa'                 },
  { code: 'NG',  dial: '+234',  flag: '🇳🇬', name: 'Nigeria'                      },
  /* ── All others A–Z ── */
  { code: 'AF',  dial: '+93',   flag: '🇦🇫', name: 'Afghanistan'                  },
  { code: 'AL',  dial: '+355',  flag: '🇦🇱', name: 'Albania'                      },
  { code: 'DZ',  dial: '+213',  flag: '🇩🇿', name: 'Algeria'                      },
  { code: 'AS',  dial: '+1',    flag: '🇦🇸', name: 'American Samoa'               },
  { code: 'AD',  dial: '+376',  flag: '🇦🇩', name: 'Andorra'                      },
  { code: 'AO',  dial: '+244',  flag: '🇦🇴', name: 'Angola'                       },
  { code: 'AI',  dial: '+1',    flag: '🇦🇮', name: 'Anguilla'                     },
  { code: 'AG',  dial: '+1',    flag: '🇦🇬', name: 'Antigua and Barbuda'          },
  { code: 'AR',  dial: '+54',   flag: '🇦🇷', name: 'Argentina'                    },
  { code: 'AM',  dial: '+374',  flag: '🇦🇲', name: 'Armenia'                      },
  { code: 'AW',  dial: '+297',  flag: '🇦🇼', name: 'Aruba'                        },
  { code: 'AT',  dial: '+43',   flag: '🇦🇹', name: 'Austria'                      },
  { code: 'AZ',  dial: '+994',  flag: '🇦🇿', name: 'Azerbaijan'                   },
  { code: 'BS',  dial: '+1',    flag: '🇧🇸', name: 'Bahamas'                      },
  { code: 'BH',  dial: '+973',  flag: '🇧🇭', name: 'Bahrain'                      },
  { code: 'BD',  dial: '+880',  flag: '🇧🇩', name: 'Bangladesh'                   },
  { code: 'BB',  dial: '+1',    flag: '🇧🇧', name: 'Barbados'                     },
  { code: 'BY',  dial: '+375',  flag: '🇧🇾', name: 'Belarus'                      },
  { code: 'BE',  dial: '+32',   flag: '🇧🇪', name: 'Belgium'                      },
  { code: 'BZ',  dial: '+501',  flag: '🇧🇿', name: 'Belize'                       },
  { code: 'BJ',  dial: '+229',  flag: '🇧🇯', name: 'Benin'                        },
  { code: 'BM',  dial: '+1',    flag: '🇧🇲', name: 'Bermuda'                      },
  { code: 'BT',  dial: '+975',  flag: '🇧🇹', name: 'Bhutan'                       },
  { code: 'BO',  dial: '+591',  flag: '🇧🇴', name: 'Bolivia'                      },
  { code: 'BA',  dial: '+387',  flag: '🇧🇦', name: 'Bosnia and Herzegovina'       },
  { code: 'BW',  dial: '+267',  flag: '🇧🇼', name: 'Botswana'                     },
  { code: 'VG',  dial: '+1',    flag: '🇻🇬', name: 'British Virgin Islands'       },
  { code: 'BN',  dial: '+673',  flag: '🇧🇳', name: 'Brunei'                       },
  { code: 'BG',  dial: '+359',  flag: '🇧🇬', name: 'Bulgaria'                     },
  { code: 'BF',  dial: '+226',  flag: '🇧🇫', name: 'Burkina Faso'                 },
  { code: 'BI',  dial: '+257',  flag: '🇧🇮', name: 'Burundi'                      },
  { code: 'KH',  dial: '+855',  flag: '🇰🇭', name: 'Cambodia'                     },
  { code: 'CM',  dial: '+237',  flag: '🇨🇲', name: 'Cameroon'                     },
  { code: 'CV',  dial: '+238',  flag: '🇨🇻', name: 'Cape Verde'                   },
  { code: 'KY',  dial: '+1',    flag: '🇰🇾', name: 'Cayman Islands'               },
  { code: 'CF',  dial: '+236',  flag: '🇨🇫', name: 'Central African Republic'     },
  { code: 'TD',  dial: '+235',  flag: '🇹🇩', name: 'Chad'                         },
  { code: 'CL',  dial: '+56',   flag: '🇨🇱', name: 'Chile'                        },
  { code: 'CN',  dial: '+86',   flag: '🇨🇳', name: 'China'                        },
  { code: 'CO',  dial: '+57',   flag: '🇨🇴', name: 'Colombia'                     },
  { code: 'KM',  dial: '+269',  flag: '🇰🇲', name: 'Comoros'                      },
  { code: 'CG',  dial: '+242',  flag: '🇨🇬', name: 'Congo'                        },
  { code: 'CD',  dial: '+243',  flag: '🇨🇩', name: 'Congo (DRC)'                  },
  { code: 'CK',  dial: '+682',  flag: '🇨🇰', name: 'Cook Islands'                 },
  { code: 'CR',  dial: '+506',  flag: '🇨🇷', name: 'Costa Rica'                   },
  { code: 'HR',  dial: '+385',  flag: '🇭🇷', name: 'Croatia'                      },
  { code: 'CU',  dial: '+53',   flag: '🇨🇺', name: 'Cuba'                         },
  { code: 'CW',  dial: '+599',  flag: '🇨🇼', name: 'Curaçao'                      },
  { code: 'CY',  dial: '+357',  flag: '🇨🇾', name: 'Cyprus'                       },
  { code: 'CZ',  dial: '+420',  flag: '🇨🇿', name: 'Czech Republic'               },
  { code: 'DK',  dial: '+45',   flag: '🇩🇰', name: 'Denmark'                      },
  { code: 'DJ',  dial: '+253',  flag: '🇩🇯', name: 'Djibouti'                     },
  { code: 'DM',  dial: '+1',    flag: '🇩🇲', name: 'Dominica'                     },
  { code: 'DO',  dial: '+1',    flag: '🇩🇴', name: 'Dominican Republic'           },
  { code: 'EC',  dial: '+593',  flag: '🇪🇨', name: 'Ecuador'                      },
  { code: 'EG',  dial: '+20',   flag: '🇪🇬', name: 'Egypt'                        },
  { code: 'SV',  dial: '+503',  flag: '🇸🇻', name: 'El Salvador'                  },
  { code: 'GQ',  dial: '+240',  flag: '🇬🇶', name: 'Equatorial Guinea'            },
  { code: 'ER',  dial: '+291',  flag: '🇪🇷', name: 'Eritrea'                      },
  { code: 'EE',  dial: '+372',  flag: '🇪🇪', name: 'Estonia'                      },
  { code: 'SZ',  dial: '+268',  flag: '🇸🇿', name: 'Eswatini'                     },
  { code: 'ET',  dial: '+251',  flag: '🇪🇹', name: 'Ethiopia'                     },
  { code: 'FK',  dial: '+500',  flag: '🇫🇰', name: 'Falkland Islands'             },
  { code: 'FO',  dial: '+298',  flag: '🇫🇴', name: 'Faroe Islands'                },
  { code: 'FJ',  dial: '+679',  flag: '🇫🇯', name: 'Fiji'                         },
  { code: 'FI',  dial: '+358',  flag: '🇫🇮', name: 'Finland'                      },
  { code: 'GF',  dial: '+594',  flag: '🇬🇫', name: 'French Guiana'                },
  { code: 'PF',  dial: '+689',  flag: '🇵🇫', name: 'French Polynesia'             },
  { code: 'GA',  dial: '+241',  flag: '🇬🇦', name: 'Gabon'                        },
  { code: 'GM',  dial: '+220',  flag: '🇬🇲', name: 'Gambia'                       },
  { code: 'GE',  dial: '+995',  flag: '🇬🇪', name: 'Georgia'                      },
  { code: 'GH',  dial: '+233',  flag: '🇬🇭', name: 'Ghana'                        },
  { code: 'GI',  dial: '+350',  flag: '🇬🇮', name: 'Gibraltar'                    },
  { code: 'GR',  dial: '+30',   flag: '🇬🇷', name: 'Greece'                       },
  { code: 'GL',  dial: '+299',  flag: '🇬🇱', name: 'Greenland'                    },
  { code: 'GD',  dial: '+1',    flag: '🇬🇩', name: 'Grenada'                      },
  { code: 'GP',  dial: '+590',  flag: '🇬🇵', name: 'Guadeloupe'                   },
  { code: 'GU',  dial: '+1',    flag: '🇬🇺', name: 'Guam'                         },
  { code: 'GT',  dial: '+502',  flag: '🇬🇹', name: 'Guatemala'                    },
  { code: 'GN',  dial: '+224',  flag: '🇬🇳', name: 'Guinea'                       },
  { code: 'GW',  dial: '+245',  flag: '🇬🇼', name: 'Guinea-Bissau'                },
  { code: 'GY',  dial: '+592',  flag: '🇬🇾', name: 'Guyana'                       },
  { code: 'HT',  dial: '+509',  flag: '🇭🇹', name: 'Haiti'                        },
  { code: 'HN',  dial: '+504',  flag: '🇭🇳', name: 'Honduras'                     },
  { code: 'HK',  dial: '+852',  flag: '🇭🇰', name: 'Hong Kong'                    },
  { code: 'HU',  dial: '+36',   flag: '🇭🇺', name: 'Hungary'                      },
  { code: 'IS',  dial: '+354',  flag: '🇮🇸', name: 'Iceland'                      },
  { code: 'ID',  dial: '+62',   flag: '🇮🇩', name: 'Indonesia'                    },
  { code: 'IR',  dial: '+98',   flag: '🇮🇷', name: 'Iran'                         },
  { code: 'IQ',  dial: '+964',  flag: '🇮🇶', name: 'Iraq'                         },
  { code: 'IE',  dial: '+353',  flag: '🇮🇪', name: 'Ireland'                      },
  { code: 'IL',  dial: '+972',  flag: '🇮🇱', name: 'Israel'                       },
  { code: 'CI',  dial: '+225',  flag: '🇨🇮', name: 'Ivory Coast'                  },
  { code: 'JM',  dial: '+1',    flag: '🇯🇲', name: 'Jamaica'                      },
  { code: 'JO',  dial: '+962',  flag: '🇯🇴', name: 'Jordan'                       },
  { code: 'KZ',  dial: '+7',    flag: '🇰🇿', name: 'Kazakhstan'                   },
  { code: 'KE',  dial: '+254',  flag: '🇰🇪', name: 'Kenya'                        },
  { code: 'KI',  dial: '+686',  flag: '🇰🇮', name: 'Kiribati'                     },
  { code: 'XK',  dial: '+383',  flag: '🇽🇰', name: 'Kosovo'                       },
  { code: 'KW',  dial: '+965',  flag: '🇰🇼', name: 'Kuwait'                       },
  { code: 'KG',  dial: '+996',  flag: '🇰🇬', name: 'Kyrgyzstan'                   },
  { code: 'LA',  dial: '+856',  flag: '🇱🇦', name: 'Laos'                         },
  { code: 'LV',  dial: '+371',  flag: '🇱🇻', name: 'Latvia'                       },
  { code: 'LB',  dial: '+961',  flag: '🇱🇧', name: 'Lebanon'                      },
  { code: 'LS',  dial: '+266',  flag: '🇱🇸', name: 'Lesotho'                      },
  { code: 'LR',  dial: '+231',  flag: '🇱🇷', name: 'Liberia'                      },
  { code: 'LY',  dial: '+218',  flag: '🇱🇾', name: 'Libya'                        },
  { code: 'LI',  dial: '+423',  flag: '🇱🇮', name: 'Liechtenstein'                },
  { code: 'LT',  dial: '+370',  flag: '🇱🇹', name: 'Lithuania'                    },
  { code: 'LU',  dial: '+352',  flag: '🇱🇺', name: 'Luxembourg'                   },
  { code: 'MO',  dial: '+853',  flag: '🇲🇴', name: 'Macau'                        },
  { code: 'MG',  dial: '+261',  flag: '🇲🇬', name: 'Madagascar'                   },
  { code: 'MW',  dial: '+265',  flag: '🇲🇼', name: 'Malawi'                       },
  { code: 'MY',  dial: '+60',   flag: '🇲🇾', name: 'Malaysia'                     },
  { code: 'MV',  dial: '+960',  flag: '🇲🇻', name: 'Maldives'                     },
  { code: 'ML',  dial: '+223',  flag: '🇲🇱', name: 'Mali'                         },
  { code: 'MT',  dial: '+356',  flag: '🇲🇹', name: 'Malta'                        },
  { code: 'MH',  dial: '+692',  flag: '🇲🇭', name: 'Marshall Islands'             },
  { code: 'MQ',  dial: '+596',  flag: '🇲🇶', name: 'Martinique'                   },
  { code: 'MR',  dial: '+222',  flag: '🇲🇷', name: 'Mauritania'                   },
  { code: 'MU',  dial: '+230',  flag: '🇲🇺', name: 'Mauritius'                    },
  { code: 'YT',  dial: '+262',  flag: '🇾🇹', name: 'Mayotte'                      },
  { code: 'FM',  dial: '+691',  flag: '🇫🇲', name: 'Micronesia'                   },
  { code: 'MD',  dial: '+373',  flag: '🇲🇩', name: 'Moldova'                      },
  { code: 'MC',  dial: '+377',  flag: '🇲🇨', name: 'Monaco'                       },
  { code: 'MN',  dial: '+976',  flag: '🇲🇳', name: 'Mongolia'                     },
  { code: 'ME',  dial: '+382',  flag: '🇲🇪', name: 'Montenegro'                   },
  { code: 'MS',  dial: '+1',    flag: '🇲🇸', name: 'Montserrat'                   },
  { code: 'MA',  dial: '+212',  flag: '🇲🇦', name: 'Morocco'                      },
  { code: 'MZ',  dial: '+258',  flag: '🇲🇿', name: 'Mozambique'                   },
  { code: 'MM',  dial: '+95',   flag: '🇲🇲', name: 'Myanmar'                      },
  { code: 'NA',  dial: '+264',  flag: '🇳🇦', name: 'Namibia'                      },
  { code: 'NR',  dial: '+674',  flag: '🇳🇷', name: 'Nauru'                        },
  { code: 'NP',  dial: '+977',  flag: '🇳🇵', name: 'Nepal'                        },
  { code: 'NC',  dial: '+687',  flag: '🇳🇨', name: 'New Caledonia'                },
  { code: 'NZ',  dial: '+64',   flag: '🇳🇿', name: 'New Zealand'                  },
  { code: 'NI',  dial: '+505',  flag: '🇳🇮', name: 'Nicaragua'                    },
  { code: 'NE',  dial: '+227',  flag: '🇳🇪', name: 'Niger'                        },
  { code: 'KP',  dial: '+850',  flag: '🇰🇵', name: 'North Korea'                  },
  { code: 'MK',  dial: '+389',  flag: '🇲🇰', name: 'North Macedonia'              },
  { code: 'NO',  dial: '+47',   flag: '🇳🇴', name: 'Norway'                       },
  { code: 'OM',  dial: '+968',  flag: '🇴🇲', name: 'Oman'                         },
  { code: 'PK',  dial: '+92',   flag: '🇵🇰', name: 'Pakistan'                     },
  { code: 'PW',  dial: '+680',  flag: '🇵🇼', name: 'Palau'                        },
  { code: 'PS',  dial: '+970',  flag: '🇵🇸', name: 'Palestine'                    },
  { code: 'PA',  dial: '+507',  flag: '🇵🇦', name: 'Panama'                       },
  { code: 'PG',  dial: '+675',  flag: '🇵🇬', name: 'Papua New Guinea'             },
  { code: 'PY',  dial: '+595',  flag: '🇵🇾', name: 'Paraguay'                     },
  { code: 'PE',  dial: '+51',   flag: '🇵🇪', name: 'Peru'                         },
  { code: 'PH',  dial: '+63',   flag: '🇵🇭', name: 'Philippines'                  },
  { code: 'PL',  dial: '+48',   flag: '🇵🇱', name: 'Poland'                       },
  { code: 'PT',  dial: '+351',  flag: '🇵🇹', name: 'Portugal'                     },
  { code: 'PR',  dial: '+1',    flag: '🇵🇷', name: 'Puerto Rico'                  },
  { code: 'QA',  dial: '+974',  flag: '🇶🇦', name: 'Qatar'                        },
  { code: 'RE',  dial: '+262',  flag: '🇷🇪', name: 'Réunion'                      },
  { code: 'RO',  dial: '+40',   flag: '🇷🇴', name: 'Romania'                      },
  { code: 'RU',  dial: '+7',    flag: '🇷🇺', name: 'Russia'                       },
  { code: 'RW',  dial: '+250',  flag: '🇷🇼', name: 'Rwanda'                       },
  { code: 'KN',  dial: '+1',    flag: '🇰🇳', name: 'Saint Kitts and Nevis'        },
  { code: 'LC',  dial: '+1',    flag: '🇱🇨', name: 'Saint Lucia'                  },
  { code: 'VC',  dial: '+1',    flag: '🇻🇨', name: 'Saint Vincent & Grenadines'   },
  { code: 'WS',  dial: '+685',  flag: '🇼🇸', name: 'Samoa'                        },
  { code: 'SM',  dial: '+378',  flag: '🇸🇲', name: 'San Marino'                   },
  { code: 'ST',  dial: '+239',  flag: '🇸🇹', name: 'São Tomé and Príncipe'        },
  { code: 'SA',  dial: '+966',  flag: '🇸🇦', name: 'Saudi Arabia'                 },
  { code: 'SN',  dial: '+221',  flag: '🇸🇳', name: 'Senegal'                      },
  { code: 'RS',  dial: '+381',  flag: '🇷🇸', name: 'Serbia'                       },
  { code: 'SC',  dial: '+248',  flag: '🇸🇨', name: 'Seychelles'                   },
  { code: 'SL',  dial: '+232',  flag: '🇸🇱', name: 'Sierra Leone'                 },
  { code: 'SK',  dial: '+421',  flag: '🇸🇰', name: 'Slovakia'                     },
  { code: 'SI',  dial: '+386',  flag: '🇸🇮', name: 'Slovenia'                     },
  { code: 'SB',  dial: '+677',  flag: '🇸🇧', name: 'Solomon Islands'              },
  { code: 'SO',  dial: '+252',  flag: '🇸🇴', name: 'Somalia'                      },
  { code: 'SS',  dial: '+211',  flag: '🇸🇸', name: 'South Sudan'                  },
  { code: 'LK',  dial: '+94',   flag: '🇱🇰', name: 'Sri Lanka'                    },
  { code: 'SD',  dial: '+249',  flag: '🇸🇩', name: 'Sudan'                        },
  { code: 'SR',  dial: '+597',  flag: '🇸🇷', name: 'Suriname'                     },
  { code: 'SY',  dial: '+963',  flag: '🇸🇾', name: 'Syria'                        },
  { code: 'TW',  dial: '+886',  flag: '🇹🇼', name: 'Taiwan'                       },
  { code: 'TJ',  dial: '+992',  flag: '🇹🇯', name: 'Tajikistan'                   },
  { code: 'TZ',  dial: '+255',  flag: '🇹🇿', name: 'Tanzania'                     },
  { code: 'TH',  dial: '+66',   flag: '🇹🇭', name: 'Thailand'                     },
  { code: 'TL',  dial: '+670',  flag: '🇹🇱', name: 'Timor-Leste'                  },
  { code: 'TG',  dial: '+228',  flag: '🇹🇬', name: 'Togo'                         },
  { code: 'TO',  dial: '+676',  flag: '🇹🇴', name: 'Tonga'                        },
  { code: 'TT',  dial: '+1',    flag: '🇹🇹', name: 'Trinidad and Tobago'          },
  { code: 'TN',  dial: '+216',  flag: '🇹🇳', name: 'Tunisia'                      },
  { code: 'TR',  dial: '+90',   flag: '🇹🇷', name: 'Turkey'                       },
  { code: 'TM',  dial: '+993',  flag: '🇹🇲', name: 'Turkmenistan'                 },
  { code: 'TC',  dial: '+1',    flag: '🇹🇨', name: 'Turks and Caicos Islands'     },
  { code: 'TV',  dial: '+688',  flag: '🇹🇻', name: 'Tuvalu'                       },
  { code: 'UG',  dial: '+256',  flag: '🇺🇬', name: 'Uganda'                       },
  { code: 'UA',  dial: '+380',  flag: '🇺🇦', name: 'Ukraine'                      },
  { code: 'UY',  dial: '+598',  flag: '🇺🇾', name: 'Uruguay'                      },
  { code: 'UZ',  dial: '+998',  flag: '🇺🇿', name: 'Uzbekistan'                   },
  { code: 'VU',  dial: '+678',  flag: '🇻🇺', name: 'Vanuatu'                      },
  { code: 'VA',  dial: '+379',  flag: '🇻🇦', name: 'Vatican City'                 },
  { code: 'VE',  dial: '+58',   flag: '🇻🇪', name: 'Venezuela'                    },
  { code: 'VN',  dial: '+84',   flag: '🇻🇳', name: 'Vietnam'                      },
  { code: 'WF',  dial: '+681',  flag: '🇼🇫', name: 'Wallis and Futuna'            },
  { code: 'YE',  dial: '+967',  flag: '🇾🇪', name: 'Yemen'                        },
  { code: 'ZM',  dial: '+260',  flag: '🇿🇲', name: 'Zambia'                       },
  { code: 'ZW',  dial: '+263',  flag: '🇿🇼', name: 'Zimbabwe'                     },
] as const;

/* ── Types ──────────────────────────────────────────────────────────────── */
type Field = {
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  company: string;
  brief: string;
};

type Errors = Partial<Record<keyof Field, string>>;

/* ── Validation ─────────────────────────────────────────────────────────── */
function validate(f: Field): Errors {
  const err: Errors = {};
  if (!f.name.trim()) err.name = 'Name is required.';
  if (!f.email.trim()) {
    err.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    err.email = 'Enter a valid email address.';
  }
  if (f.phone.trim() && !/^[\d\s\-().]{4,20}$/.test(f.phone.trim())) {
    err.phone = 'Enter a valid phone number.';
  }
  return err;
}

const EMPTY: Field = { name: '', email: '', dialCode: '+1', phone: '', company: '', brief: '' };

/* ── Component ──────────────────────────────────────────────────────────── */
export function LetsTalkForm() {
  const uid = useId();
  const [fields, setFields]   = useState<Field>(EMPTY);
  const [errors, setErrors]   = useState<Errors>({});
  const [status, setStatus]   = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const set = (key: keyof Field) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields(prev => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      const payload = {
        ...fields,
        phone: fields.phone.trim() ? `${fields.dialCode} ${fields.phone.trim()}` : '',
      };
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const currentEntry = DIAL_CODES.find(c => c.dial === fields.dialCode) ?? DIAL_CODES[0];

  return (
    <AnimatePresence mode="wait">

      {/* ══════════════════════════════════════ SUCCESS ══════════════════════ */}
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lets-talk-success flex flex-col items-center justify-center gap-6 text-center"
          style={{ padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          <motion.div
            className="lets-talk-success-icon"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <circle cx="32" cy="32" r="31" stroke="var(--color-action-accent)" strokeWidth="1" opacity="0.2" />
              <motion.circle
                cx="32" cy="32" r="31"
                stroke="var(--color-action-accent)"
                strokeWidth="1.5"
                strokeDasharray={2 * Math.PI * 31}
                strokeDashoffset={2 * Math.PI * 31}
                animate={{ strokeDashoffset: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                fill="none"
              />
              <motion.path
                d="M20 32l9 9 15-17"
                stroke="var(--color-action-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="36"
                strokeDashoffset="36"
                animate={{ strokeDashoffset: 0 }}
                transition={{ delay: 0.75, duration: 0.4, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>

          <div className="flex flex-col gap-2">
            <p className="font-mono text-[0.625rem] tracking-[0.22em] text-text-tertiary uppercase">
              Brief Received
            </p>
            <h3 className="font-serif text-2xl font-semibold text-text-primary">
              We&apos;ll be in touch.
            </h3>
            <p className="font-display text-sm leading-relaxed text-text-secondary max-w-xs mx-auto" style={{ marginTop: '0.25rem' }}>
              Expect a response within 24 hours. Every brief is reviewed personally — no autoresponders, ever.
            </p>
          </div>

          <button
            onClick={() => { setStatus('idle'); setFields(EMPTY); setErrors({}); }}
            className="btn-primary text-sm"
            style={{ marginTop: '0.5rem' }}
          >
            Send another brief
          </button>
        </motion.div>

      ) : (
        /* ══════════════════════════════════════ FORM ════════════════════════ */
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lets-talk-form"
        >

          {/* ── Terminal chrome ── */}
          <div className="contact-form-chrome">
            <div className="contact-form-chrome-dots">
              <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </div>
            <span className="contact-form-chrome-title">ENGAGEMENT_BRIEF.txt</span>
            <span className="contact-form-chrome-status">
              <span className="contact-status-dot-sm" aria-hidden="true" />
              READY
            </span>
          </div>

          {/* ── Form header ── */}
          <div className="lets-talk-form-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] text-text-tertiary uppercase">
                New engagement brief
              </p>
              <p className="font-mono text-[0.6rem] tracking-[0.12em] text-text-tertiary uppercase" style={{ opacity: 0.45 }}>
                6 fields
              </p>
            </div>
          </div>

          {/* ── Row 1 : Name + Email ── */}
          <div className="lets-talk-row">
            {/* Name */}
            <div className="lets-talk-field">
              <label htmlFor={`${uid}-name`} className="lets-talk-label">
                <span className="lets-talk-label-index">01</span>
                Full Name
              </label>
              <input
                id={`${uid}-name`}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={fields.name}
                onChange={set('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                className={`lets-talk-input${errors.name ? ' lets-talk-input--error' : ''}`}
              />
              {errors.name && (
                <p id={`${uid}-name-err`} role="alert" className="lets-talk-error">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="lets-talk-field">
              <label htmlFor={`${uid}-email`} className="lets-talk-label">
                <span className="lets-talk-label-index">02</span>
                Work Email
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={fields.email}
                onChange={set('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                className={`lets-talk-input${errors.email ? ' lets-talk-input--error' : ''}`}
              />
              {errors.email && (
                <p id={`${uid}-email-err`} role="alert" className="lets-talk-error">{errors.email}</p>
              )}
            </div>
          </div>

          {/* ── Row 2 : Phone (full width) ── */}
          <div className="lets-talk-field">
            <label htmlFor={`${uid}-phone`} className="lets-talk-label">
              <span className="lets-talk-label-index">03</span>
              Phone Number
              <span className="lets-talk-optional">optional</span>
            </label>

            <div className={`lets-talk-phone-group${errors.phone ? ' lets-talk-phone-group--error' : ''}`}>

              {/* Country picker */}
              <div className="lets-talk-dial-wrapper">
                {/* Visible display */}
                <span className="lets-talk-dial-flag" aria-hidden="true">{currentEntry.flag}</span>
                <span className="lets-talk-dial-code" aria-hidden="true">{fields.dialCode}</span>
                <svg className="lets-talk-dial-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Real invisible select on top */}
                <select
                  value={fields.dialCode}
                  onChange={set('dialCode')}
                  className="lets-talk-dial-select"
                  aria-label="Country dial code"
                >
                  {DIAL_CODES.map((c, i) => (
                    <option key={`${c.code}-${i}`} value={c.dial}>
                      {c.flag}  {c.name}  ({c.dial})
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider line */}
              <span className="lets-talk-phone-divider" aria-hidden="true" />

              {/* Number input */}
              <input
                id={`${uid}-phone`}
                type="tel"
                autoComplete="tel-national"
                placeholder="Phone number"
                value={fields.phone}
                onChange={set('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                className="lets-talk-phone-input"
              />
            </div>

            {errors.phone && (
              <p id={`${uid}-phone-err`} role="alert" className="lets-talk-error">{errors.phone}</p>
            )}
          </div>

          {/* ── Row 3 : Company (full width) ── */}
          <div className="lets-talk-field">
            <label htmlFor={`${uid}-company`} className="lets-talk-label">
              <span className="lets-talk-label-index">04</span>
              Company / Project
              <span className="lets-talk-optional">optional</span>
            </label>
            <input
              id={`${uid}-company`}
              type="text"
              autoComplete="organization"
              placeholder="Your company or project name"
              value={fields.company}
              onChange={set('company')}
              className="lets-talk-input"
            />
          </div>

          {/* ── Row 4 : Brief (full width) ── */}
          <div className="lets-talk-field">
            <label htmlFor={`${uid}-brief`} className="lets-talk-label">
              <span className="lets-talk-label-index">05</span>
              What are you building?
            </label>
            <p className="lets-talk-hint">
              Describe the system, workflow, or problem you&apos;re trying to solve. The more context, the better.
            </p>
            <textarea
              id={`${uid}-brief`}
              rows={4}
              placeholder="We need an AI system that…"
              value={fields.brief}
              onChange={set('brief')}
              className="lets-talk-input lets-talk-textarea"
            />
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <p role="alert" className="lets-talk-banner-error">
              Something went wrong. Please try again or email{' '}
              <a href="mailto:hello@vriso.ai" style={{ color: 'var(--color-action-accent)', textDecoration: 'none' }}>
                hello@vriso.ai
              </a>
            </p>
          )}

          {/* ── Submit ── */}
          <div className="lets-talk-actions">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-accent lets-talk-submit"
            >
              {status === 'sending' ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{
                      display: 'inline-block', width: 14, height: 14,
                      border: '2px solid rgba(255,255,255,0.25)',
                      borderTopColor: '#fff', borderRadius: '50%',
                    }}
                    aria-hidden
                  />
                  Sending Brief…
                </>
              ) : 'Send Brief →'}
            </button>
            <p className="lets-talk-privacy" aria-hidden="true">
              ⌥ &nbsp;Encrypted · No spam · No cold follow-ups
            </p>
          </div>

        </motion.form>
      )}
    </AnimatePresence>
  );
}
