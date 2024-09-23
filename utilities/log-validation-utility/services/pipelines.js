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
const ttl = "PT30S";
const domain = "nic2004:52110";
const timeStamp = new Date().toISOString();

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
                'quantity': {
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
                'category_id': "Hair Care",
                '@ondc/org/contact_details_consumer_care': 'Sailendra Nagvani,tech@buyume.io,8826345311',
                'price': {
                    'currency': 'INR',
                    'value': {
                        '$toString': '$mrp'
                    },
                    'maximum_value': {
                        '$toString': '$mrp'
                    }
                },
                'descriptor': {
                    'name': '$name',
                    'code': '$EANCode',
                    'symbol': {
                        '$arrayElemAt': [
                            '$images', 0
                        ]
                    },
                    'short_desc': '$description',
                    'long_desc': '$description',
                    'images': '$images'
                },
                // '@ondc/org/returnable': 'false',
                'location_id': 'SALON_ADDRESS',
                'fulfillment_id': '1',
                // '@ondc/org/cancellable': 'false',
                // '@ondc/org/available_on_cod': 'true',
                '@ondc/org/time_to_ship': 'P1D',
                '@ondc/org/return_window': 'P2D',
                // '@ondc/org/seller_pickup_return': 'false'
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
                        new ObjectId('62a03165ced1fb651ad9230c'), new ObjectId('61073b09e022eac709348d46')
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
                'time': {
                    'label': 'enable',
                    'timestamp': timeStamp
                },
                'descriptor': {
                    'name': '$businessName',
                    'symbol': '$profilePic',
                    'short_desc': 'Salon',
                    'long_desc': 'Salon',
                    'images': [
                        '$profilePic'
                    ],
                    // tags: [
                    //   {
                    //     code: "bpp_terms",
                    //     list: [
                    //       {
                    //         code: "np_type",
                    //         value: "MSN"
                    //       },
                    //       {
                    //         code: "accept_bap_terms",
                    //         value: "Y"
                    //       },
                    //       {
                    //         code: "collect_payment",
                    //         value: "Y"
                    //       }
                    //     ]
                    //   }
                    // ]
                },
                'ttl': ttl,
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
                            'city': '$permanentSalonAddress.city',
                            'area_code': '$permanentSalonAddress.postalCode',
                            'state': '$permanentSalonAddress.state',
                            // locality: "$permanentSalonAddress.landmark",
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
                            // 'label': 'enable',
                            // 'timestamp': new Date().toISOString(),
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
                        // 'id': '1',
                        // 'type': 'Delivery',
                        'contact': {
                            'phone': '$phoneNumber',
                            'email': 'tech@buyume.io'
                        }
                    }
                ],
                'tags': [
                    {
                        'code': 'serviceability',
                        'list': [
                            {
                                'code': 'type',
                                'value': '12'
                            }, {
                                'code': 'location',
                                'value': 'SALON_ADDRESS'
                            }, {
                                'code': 'category',
                                'value': "Hair Care"
                            }, {
                                'code': 'unit',
                                'value': 'country'
                            }, {
                                'code': 'val',
                                'value': 'IND'
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
        "domain": domain,
        "country": country_code,
        "city": city_code,
        "action": action,
        "core_version": "1.1.0",
        "bap_id": "buyer-app-preprod-v2.ondc.org",
        "bap_uri": "https://buyer-app-preprod-v2.ondc.org/protocol/v1",
        "bpp_id": bpp_id,
        "bpp_uri": bpp_uri,
        "transaction_id": transaction_id,
        "message_id": message_id,
        "timestamp": timeStamp,
        "ttl": ttl
    }
    return contextRespose
}
let catalog = async () => {
    let catalogResponse = {
        "bpp/descriptor": {
            "name": "Buyume",
            "symbol": "https://pep1.in/ondc_retail/nav-logo.png",
            "short_desc": "Online eCommerce Store",
            "long_desc": "Online eCommerce Store",
            "images": [
                "https://pep1.in/ondc_retail/nav-logo.png"
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
        "bpp/fulfillments": [
            {
                "id": "1",
                "type": "Delivery"
            },
            {
                "id": "2",
                "type": "Self-Pickup"
            },
            {
                "id": "3",
                "type": "Delivery and Self-Pickup"
            }
        ],
        // "payments":[
        //     {
        //         "id":"1",
        //         "type":"PRE-FULFILLMENT"
        //     },
        //     {
        //         "id":"2",
        //         "type":"ON-FULFILLMENT"
        //     }
        // ]
    };
    return catalogResponse;
}

let order = async () => {
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