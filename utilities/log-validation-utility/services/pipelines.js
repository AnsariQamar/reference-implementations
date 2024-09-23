const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
const bpp_id = "prelive.buyume.io";
const bpp_uri = "https://prelive.buyume.io/ondc";
const REQUEST_ID = '8ccf209c-a183-41e6-bf97-74053a3a0370';
const message_id = "7a550f77-054f-4749-b576-5bf19f583d17";
const transaction_id = "ad5f65ea-0c31-4027-9d6e-5660246651f5";
const city_code = "std:080";
const country_code = "IND";
const version = "2.0.2";
const ttl = "P1D";



let product_pipeline = async () => {
    let pipeline = [
        {
            '$match': {
                'brandId': {
                    '$in': [
                        new ObjectId('6539e5f4ccd18dd0dbc4dc79'), new ObjectId('65447bd2c93023787fedfa7c')
                    ]
                },
                'comboProductIds.0': {
                    '$exists': 0
                },
                'weight': {
                    '$gt': 0
                }
            }
        }, {
            '$addFields': {
                'nameSize': {
                    '$strLenCP': '$name'
                },
                'des': {
                    '$strLenCP': '$description'
                }
            }
        }, {
            '$match': {
                'des': {
                    '$gt': 0
                }
            }
        }, {
            '$sort': {
                'des': 1,
                'nameSize': 1
            }
        }, {
            '$project': {
                '_id': 0,
                'id': {
                    '$toString': '$_id'
                },
                'time': {
                    'label': 'enable',
                    'timestamp': new Date()
                },
                'descriptor': {
                    'name': '$name',
                    'code': '$EANCode',
                    'Symbol': {
                        '$arrayElemAt': [
                            '$images', 0
                        ]
                    },
                    'short_desc': '$description',
                    'long_desc': '$description',
                    'images': '$images'
                },
                'quantity': {
                    'unitized': {
                        'measure': {
                            'unit': 'kilogram',
                            'value': '$weight'
                        }
                    },
                    'available': {
                        'count': {
                            '$toString': '100'
                        }
                    },
                    'maximum': {
                        'count': {
                            '$toString': '100'
                        }
                    }
                },
                'price': {
                    'currency': 'INR',
                    'value': {
                        '$toString': '$mrp'
                    },
                    'maximum_value': {
                        '$toString': '$mrp'
                    }
                },
                'category_id': '$categoryId',
                'fulfillment_id': '1',
                'location_id': '655c606924ceb7a7991b3c18',
                '@ondc/org/returnable': 'false',
                '@ondc/org/cancellable': 'false',
                '@ondc/org/return_window': 'P2D',
                '@ondc/org/seller_pickup_return': 'false',
                '@ondc/org/time_to_ship': 'PT1H',
                '@ondc/org/available_on_cod': 'true',
                '@ondc/org/contact_details_consumer_care': 'Sailendra Nagvani,tech@buyume.io,8826345311',
                '@ondc/org/statutory_reqs_packaged_commodities': {
                    'manufacturer_or_packer_name': '$brand',
                    'manufacturer_or_packer_address': 'Plot No. 47, Okhla Phase 3 Near Bada Business, Delhi, 110020',
                    'common_or_generic_name_of_commodity': '$subcategory',
                    'net_quantity_or_measure_of_commodity_in_pkg': {
                        '$concat': [
                            {
                                '$toString': '$weight'
                            }, ' (in kilogram)'
                        ]
                    },
                    'month_year_of_manufacture_packing_import': 'Yes'
                },
                'tags': [
                    {
                        'code': 'origin',
                        'list': [
                            {
                                'code': 'country',
                                'value': 'IND'
                            }
                        ]
                    }, {
                        'code': 'image',
                        'list': [
                            {
                                'code': 'url',
                                'value': {
                                    '$arrayElemAt': [
                                        '$images', 0
                                    ]
                                }
                            }
                        ]
                    }, {
                        'code': 'attribute',
                        'list': [
                            {
                                'code': 'brand',
                                'value': '$brand'
                            }
                        ]
                    }
                ]
            }
        }, {
            '$limit': 20
        }
    ];
    return pipeline;
}
let seller_pipeline = async () => {
    let pipeline = [
        {
            '$match': {
                '_id': {
                    '$in': [
                        new ObjectId('62a03165ced1fb651ad9230c'), new ObjectId('61f51a65ee7da1d1e61bd7b3')
                    ]
                }
            }
        }, {
            '$addFields': {
                'orderAddress': {
                    '$arrayElemAt': [
                        '$addresses', 0
                    ]
                }
            }
        }, {
            '$project': {
                '_id': 0,
                'id': {
                    '$toString': '$_id'
                },
                // 'time': {
                //     'label': 'enable',
                //     'timestamp': new Date()
                // },
                'descriptor': {
                    'name': '$businessName',
                    'Symbol': '$profilePic',
                    'short_desc': 'Salon',
                    'long_desc': 'Salon',
                    'images': [
                        '$profilePic'
                    ],
                    'tags': [
                        {
                            'code': 'bpp_terms',
                            'list': [
                                {
                                    'code': 'np_type',
                                    'value': 'MSN'
                                }, {
                                    'code': 'accept_bap_terms',
                                    'value': 'Y'
                                }, {
                                    'code': 'collect_payment',
                                    'value': 'Y'
                                }
                            ]
                        }
                    ]
                },
                'ttl': 'P1D',
                'locations': [
                    {
                        'id': 'SALON_ADDRESS',
                        'gps': {
                            '$concat': [
                                {
                                    '$toString': {
                                        '$arrayElemAt': [
                                            '$salonCoordinates.coordinates', 1
                                        ]
                                    }
                                }, ',', {
                                    '$toString': {
                                        '$arrayElemAt': [
                                            '$salonCoordinates.coordinates', 0
                                        ]
                                    }
                                }
                            ]
                        },
                        'address': {
                            'street': '$permanentSalonAddress.address1',
                            'locality': '$permanentSalonAddress.landmark',
                            'city': '$permanentSalonAddress.city',
                            'area_code': '$permanentSalonAddress.postalCode',
                            'state': '$permanentSalonAddress.state'
                        },
                        'circle': {
                            'gps': {
                                '$concat': [
                                    {
                                        '$toString': {
                                            '$arrayElemAt': [
                                                '$salonCoordinates.coordinates', 1
                                            ]
                                        }
                                    }, ',', {
                                        '$toString': {
                                            '$arrayElemAt': [
                                                '$salonCoordinates.coordinates', 0
                                            ]
                                        }
                                    }
                                ]
                            },
                            'radius': {
                                'unit': 'km',
                                'value': '10'
                            }
                        },
                        'time': {
                            'label': 'enable',
                            'timestamp': new Date(),
                            'days': '1,2,3,4,5,6,7',
                            'schedule': {
                                'holidays': []
                            },
                            'range': {
                                'start': '0800',
                                'end': '2300'
                            }
                        }
                    }, {
                        'id': 'ORDER_ADDRESS',
                        'gps': {
                            '$concat': [
                                {
                                    '$toString': {
                                        '$arrayElemAt': [
                                            '$downloadCoordinates.coordinates', 1
                                        ]
                                    }
                                }, ',', {
                                    '$toString': {
                                        '$arrayElemAt': [
                                            '$downloadCoordinates.coordinates', 0
                                        ]
                                    }
                                }
                            ]
                        },
                        'address': {
                            'street': '$orderAddress.address1',
                            'locality': '$orderAddress.landmark',
                            'city': '$orderAddress.city',
                            'area_code': '$orderAddress.postalCode',
                            'state': '$orderAddress.state'
                        },
                        'circle': {
                            'gps': {
                                '$concat': [
                                    {
                                        '$toString': {
                                            '$arrayElemAt': [
                                                '$downloadCoordinates.coordinates', 1
                                            ]
                                        }
                                    }, ',', {
                                        '$toString': {
                                            '$arrayElemAt': [
                                                '$downloadCoordinates.coordinates', 0
                                            ]
                                        }
                                    }
                                ]
                            },
                            'radius': {
                                'unit': 'km',
                                'value': '10'
                            }
                        },
                        'time': {
                            'label': 'enable',
                            'timestamp': new Date(),
                            'days': '1,2,3,4,5,6,7',
                            'schedule': {
                                'holidays': []
                            },
                            'range': {
                                'start': '0800',
                                'end': '2300'
                            }
                        }
                    }
                ],
                'offers': [],
                'fulfillments': [
                    {
                        'id': '1',
                        'type': 'Delivery',
                        'contact': {
                            'phone': '$phoneNumber',
                            'email': 'tech@buyume.io'
                        }
                    }
                ],
                'tags': [
                    {
                        'code': 'timing',
                        'list': [
                            {
                                'code': 'type',
                                'value': 'Order'
                            }, {
                                'code': 'location',
                                'value': '4d66464d-3ae8-42bd-858f-9e28817c70b4'
                            }, {
                                'code': 'day_from',
                                'value': '1'
                            }, {
                                'code': 'day_to',
                                'value': '7'
                            }, {
                                'code': 'time_from',
                                'value': '0800'
                            }, {
                                'code': 'time_to',
                                'value': '2300'
                            }
                        ]
                    }, {
                        'code': 'timing',
                        'list': [
                            {
                                'code': 'type',
                                'value': 'Delivery'
                            }, {
                                'code': 'location',
                                'value': '4d66464d-3ae8-42bd-858f-9e28817c70b4'
                            }, {
                                'code': 'day_from',
                                'value': '1'
                            }, {
                                'code': 'day_to',
                                'value': '7'
                            }, {
                                'code': 'time_from',
                                'value': '0800'
                            }, {
                                'code': 'time_to',
                                'value': '2300'
                            }
                        ]
                    }
                ]
            }
        }
    ];
    return pipeline;
}
let context = async (action) => {
    let contextRespose = {
        "domain": "ONDC:RET13",
        "location": {
            "country": {
                "code": country_code
            },
            "city": {
                "code": city_code
            }
        },
        "action": action,
        "version": "2.0.2",
        "bap_id": "buyer-app-preprod-v2.ondc.org",
        "bap_uri": "https://buyer-app-preprod-v2.ondc.org/protocol/v1",
        "bpp_id": bpp_id,
        "bpp_uri": bpp_uri,
        "transaction_id": transaction_id,
        "message_id": message_id,
        "timestamp": new Date().toISOString(),
        "ttl": "PT30S"
    }
    return contextRespose
}
let catalog = async()=>{
    let catalogResponse = {
        "descriptor": {
            "name": "Buyume",
            "symbol": "https://pep1.in/ondc_retail/nav-logo.png",
            "short_desc": "Online eCommerce Store",
            "long_desc": "Online eCommerce Store",
            "images": [
                { "url": "https://pep1.in/ondc_retail/nav-logo.png" }
            ],
            // "tags": [
            //     {
            //         "code": "bpp_terms",
            //         "list": [
            //             {
            //                 "code": "np_type",
            //                 "value": "MSN"
            //             }
            //         ]
            //     }
            // ]
        },
        "fulfillments": [
            {
                "id": "1",
                "type": "Delivery"
            },
            {
                "id": "2",
                "type": "Self-Pickup"
            }
        ],
        "payments":[
            {
                "id":"1",
                "type":"PRE-FULFILLMENT"
            },
            {
                "id":"2",
                "type":"ON-FULFILLMENT"
            }
        ]
    };
    return catalogResponse;
}

let order = async()=>{
    let orderResponse = {};
    return orderResponse;
}

module.exports = {
    product_pipeline,
    seller_pipeline,
    context,
    catalog,
    order
}