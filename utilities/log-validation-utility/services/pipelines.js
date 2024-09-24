const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
const bpp_id = "prelive.buyume.io";
const bpp_uri = "https://prelive.buyume.io/ondc";
const REQUEST_ID = '8ccf209c-a183-41e6-bf97-74053a3a0370';
const message_id = "1772c64a-0a6d-48bf-9762-7c2053027427";
const transaction_id = "dd23e065-8906-4075-9ed2-e3f5addf4d48";
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
        "bap_id": "preprod-ondc-buyer.adloggs.com",
        "bap_uri": "https://preprod-ondc-buyer.adloggs.com/ondcbuyerapi",
        "transaction_id": transaction_id,
        "message_id": message_id,
        "timestamp": timeStamp,
        "ttl": ttl
    }
    return contextRespose
}
let on_search_catalog = async () => {
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

let search_intent = async () => {
    let catalogResponse = {
        "item": {
            "descriptor": {
                "name": "Paytm"
            }
        },
        "fulfillment": {
            "type": "Delivery",
            "start": {
                "location": {
                    "gps": "12.95622500,77.63648340",
                    "address": {
                        "area_code": "560071"
                    }
                }
            },
            "end": {
                "location": {
                    "gps": "12.95680530,77.63706540",
                    "address": {
                        "area_code": "560071"
                    }
                }
            }
        },
        "payment": {
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "5"
        }
    };
    return catalogResponse;
}

let select_order = async () => {
    let orderResponse = {
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "location_id": "SALON_ADDRESS",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "fulfillments": [
            {
                "end": {
                    "location": {
                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "area_code": "560071"
                        }
                    }
                }
            }
        ],
        // "billing":{
        //     "tax_number":
        // }
    };
    return orderResponse;
}

let on_select_resp = async () => {
    let orderResponse = {
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "SALON_ADDRESS",
            }
        ],
        "fulfillments": [
            {
                "id": "SALON_ADDRESS",
                "@ondc/org/provider_name": "Trends unisex salon",
                "state": {
                    "descriptor": {
                        "code": "Serviceable"
                    }
                },
                "@ondc/org/category": "Express Delivery",
                "@ondc/org/TAT": ttl
            }
        ],
        "quote": {
            "price": {
                "value": "325",
                "currency": "INR"
            },
            "breakup": [
                {
                    "title": "KELYN NATURALS GOLD FACIAL KIT",
                    "price": {
                        "value": "325",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "item",
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6"
                }
            ],
            "ttl": ttl

        }
    };
    return orderResponse;
}

const init_order = async () => {
    let orderResponse = {
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "1",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "billing": {
            "name": "Paytm",
            "address": {
                "name": "Paytm",
                "building": "10/53 raju partment",
                "locality": "greater kailash",
                "city": "Delhi",
                "state": "New Delhi",
                "country": "IND",
                "area_code": "560071"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "type": "Delivery",
                "end": {
                    "location": {

                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "name": "Paytm",
                            "building": "10/53 raju partment",
                            "locality": "greater kailash",
                            "city": "Delhi",
                            "state": "New Delhi",
                            "country": "IND",
                            "area_code": "560071"
                        }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                }
            }
        ]
    }
    return orderResponse;
}

const on_init_order = async () => {
    let orderResponse = {
        "provider": {
            "id": "61073b09e022eac709348d46",
        },
        "provider_location": {
            "id": "SALON_ADDRESS"
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "1",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "billing": {
            "name": "Paytm",
            "address": {
                "name": "Paytm",
                "building": "10/53 raju partment",
                "locality": "greater kailash",
                "city": "Delhi",
                "state": "New Delhi",
                "country": "IND",
                "area_code": "560071"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "type": "Delivery",
                "end": {
                    "location": {

                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "name": "Paytm",
                            "building": "10/53 raju partment",
                            "locality": "greater kailash",
                            "city": "Delhi",
                            "state": "New Delhi",
                            "country": "IND",
                            "area_code": "560071"
                        }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                }
            }
        ],
        "quote": {
            "price": {
                "value": "325",
                "currency": "INR"
            },
            "breakup": [
                {
                    "title": "KELYN NATURALS GOLD FACIAL KIT",
                    "price": {
                        "value": "325",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "item",
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6"
                }
            ],
            "ttl": ttl
        },
        "payment": {
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "5",
            "@ondc/org/settlement_details": [
                {
                    "settlement_counterparty": "seller-app",
                    "settlement_phase": "sale-amount",
                    "settlement_type": "upi",
                    "upi_address": "7304569870@ybl"
                }
            ],
        }
    }
    return orderResponse;
}

const confirm_order = async () => {
    let orderResponse = {
        "id": "BM1000",
        "state": "Created",
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "1",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "billing": {
            "name": "Paytm",
            "address": {
                "name": "Paytm",
                "building": "10/53 raju partment",
                "locality": "greater kailash",
                "city": "Delhi",
                "state": "New Delhi",
                "country": "IND",
                "area_code": "560071"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "type": "Delivery",
                "end": {
                    "person": {
                        "name": "Buyume"
                    },
                    "location": {

                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "name": "Paytm",
                            "building": "10/53 raju partment",
                            "locality": "greater kailash",
                            "city": "Delhi",
                            "state": "New Delhi",
                            "country": "IND",
                            "area_code": "560071"
                        }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                }
            }
        ],
        "quote": {
            "price": {
                "value": "325",
                "currency": "INR"
            },
            "breakup": [
                {
                    "title": "KELYN NATURALS GOLD FACIAL KIT",
                    "price": {
                        "value": "325",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "item",
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6"
                }
            ],
            "ttl": ttl
        },
        "payment": {
            "status": "PAID",
            "type": "ON-ORDER",
            "params": {
                "amount": "325",
                "currency": "INR",
                "transaction_id": "try_iusjwu3j2h3"
            },
            "collected_by": "BAP",
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "5",
            "@ondc/org/settlement_details": [
                {
                    "settlement_counterparty": "seller-app",
                    "settlement_phase": "sale-amount",
                    "settlement_type": "upi",
                    "upi_address": "7304569870@ybl"
                }
            ],
        },
        "created_at": timeStamp,
        "updated_at": timeStamp
    }
    return orderResponse;
}

const on_confirm_order = async () => {
    let orderResponse = {
        "id": "BM1000",
        "state": "Created",
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "1",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "billing": {
            "name": "Paytm",
            "address": {
                "name": "Paytm",
                "building": "10/53 raju partment",
                "locality": "greater kailash",
                "city": "Delhi",
                "state": "New Delhi",
                "country": "IND",
                "area_code": "560071"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "@ondc/org/provider_name":"Trends unisex salon",
                "state":{
                    "descriptor":{
                        "code":"Pending"
                    }
                },
                "type": "Delivery",
                "start": {
                    // "person": {
                    //     "name": "Buyume"
                    // },
                    "location": {
                        "id":"SALON_ADDRESS",
                        "descriptor":{
                            "name":"Buyume"
                        },
                        "gps": "12.95680530,77.63706540",
                        // "address": {
                        //     "name": "Paytm",
                        //     "building": "10/53 raju partment",
                        //     "locality": "greater kailash",
                        //     "city": "Delhi",
                        //     "state": "New Delhi",
                        //     "country": "IND",
                        //     "area_code": "560071"
                        // }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                },
                "end": {
                    // "person": {
                    //     "name": "Buyume"
                    // },
                    "location": {

                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "name": "Paytm",
                            "building": "10/53 raju partment",
                            "locality": "greater kailash",
                            "city": "Delhi",
                            "state": "New Delhi",
                            "country": "IND",
                            "area_code": "560071"
                        }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                }
            }
        ],
        "quote": {
            "price": {
                "value": "325",
                "currency": "INR"
            },
            "breakup": [
                {
                    "title": "KELYN NATURALS GOLD FACIAL KIT",
                    "price": {
                        "value": "325",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "item",
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6"
                }
            ],
            "ttl": ttl
        },
        "payment": {
            "status": "PAID",
            "type": "ON-ORDER",
            "params": {
                "amount": "325",
                "currency": "INR",
                "transaction_id": "try_iusjwu3j2h3"
            },
            "collected_by": "BAP",
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "5",
            "@ondc/org/settlement_details": [
                {
                    "settlement_counterparty": "seller-app",
                    "settlement_phase": "sale-amount",
                    "settlement_type": "upi",
                    "upi_address": "7304569870@ybl"
                }
            ],
        },
        "created_at": timeStamp,
        "updated_at": timeStamp
    }
    return orderResponse;
}

const on_status_order = async()=>{
    let orderResponse = {
        "id": "BM1000",
        "state": "Accepted",
        "provider": {
            "id": "61073b09e022eac709348d46",
            "locations": [
                {
                    "id": "SALON_ADDRESS"
                }
            ]
        },
        "items": [
            {
                "id": "66ea637d805c438709fccdf6",
                "fulfillment_id": "1",
                "quantity": {
                    "count": 1
                }
            }
        ],
        "billing": {
            "name": "Paytm",
            "address": {
                "name": "Paytm",
                "building": "10/53 raju partment",
                "locality": "greater kailash",
                "city": "Delhi",
                "state": "New Delhi",
                "country": "IND",
                "area_code": "560071"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "@ondc/org/provider_name":"Trends unisex salon",
                "state":{
                    "descriptor":{
                        "code":"Pending"
                    }
                },
                "type": "Delivery",
                "start": {
                    // "person": {
                    //     "name": "Buyume"
                    // },
                    "location": {
                        "id":"SALON_ADDRESS",
                        "descriptor":{
                            "name":"Buyume"
                        },
                        "gps": "12.95680530,77.63706540",
                        // "address": {
                        //     "name": "Paytm",
                        //     "building": "10/53 raju partment",
                        //     "locality": "greater kailash",
                        //     "city": "Delhi",
                        //     "state": "New Delhi",
                        //     "country": "IND",
                        //     "area_code": "560071"
                        // }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                },
                "end": {
                    // "person": {
                    //     "name": "Buyume"
                    // },
                    "location": {

                        "gps": "12.95680530,77.63706540",
                        "address": {
                            "name": "Paytm",
                            "building": "10/53 raju partment",
                            "locality": "greater kailash",
                            "city": "Delhi",
                            "state": "New Delhi",
                            "country": "IND",
                            "area_code": "560071"
                        }
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                }
            }
        ],
        "quote": {
            "price": {
                "value": "325",
                "currency": "INR"
            },
            "breakup": [
                {
                    "title": "KELYN NATURALS GOLD FACIAL KIT",
                    "price": {
                        "value": "325",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "item",
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6"
                }
            ],
            "ttl": ttl
        },
        "payment": {
            "status": "PAID",
            "type": "ON-ORDER",
            "params": {
                "amount": "325",
                "currency": "INR",
                "transaction_id": "try_iusjwu3j2h3"
            },
            "collected_by": "BAP",
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "5",
            "@ondc/org/settlement_details": [
                {
                    "settlement_counterparty": "seller-app",
                    "settlement_phase": "sale-amount",
                    "settlement_type": "upi",
                    "upi_address": "7304569870@ybl"
                }
            ],
        },
        "created_at": timeStamp,
        "updated_at": timeStamp
    }
    return orderResponse;
}

const on_cancel_order = async()=>{
    let orderResponse = {
        "id": "BM1000",
        "state": "Accepted",
        "tags": {
            "cancellation_reason_id": "003"
        }
    }
    return orderResponse;
}

module.exports = {
    product_pipeline,
    seller_pipeline,
    context,
    on_search_catalog,
    search_intent,
    select_order,
    on_select_resp,
    init_order,
    on_init_order,
    confirm_order,
    on_confirm_order,
    on_status_order,
    on_cancel_order
}