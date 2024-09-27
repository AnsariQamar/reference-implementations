const { times } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
const bpp_id = "prelive.buyume.io";
const bpp_uri = "https://prelive.buyume.io/ondc";
const REQUEST_ID = '8ccf209c-a183-41e6-bf97-74053a3a0370';
const message_id = {
    "search": "1772c64a-0a6d-48bf-9762-7c2053027427",
    "on_search": "1772c64a-0a6d-48bf-9762-7c2053027427",
    "select": "f69a8c06-a784-43af-b540-b6f4238ad2c6",
    "on_select": "f69a8c06-a784-43af-b540-b6f4238ad2c6",
    "init": "49d934f2-6e0e-5e00-b715-68baf1dbe981",
    "on_init": "49d934f2-6e0e-5e00-b715-68baf1dbe981",
    "confirm": "msgondm_bnvhoatzn4mn_56orfw",
    "on_confirm": "msgondm_bnvhoatzn4mn_56orfw",
    "cancel": "de17ebb7-cf1e-48a6-9c7b-ef52ddb3c925",
    "on_cancel": "de17ebb7-cf1e-48a6-9c7b-ef52ddb3c925",
    "status": "234c0539-240e-48a8-a6f1-18eef46142f2",
    "on_status": "234c0539-240e-48a8-a6f1-18eef46142f2"
}
const transaction_id = "dd23e065-8906-4075-9ed2-e3f5addf4d48";
const city_code = "std:080";
const country_code = "IND";
const version = "2.0.2";
const ttl = "PT30S";
const domain = "ONDC:RET13";
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
              'unitized': {
                'measure': {
                  'unit': 'gram', 
                  'value': '10.0'
                }
              }, 
              'available': {
                'count': {
                  '$toString': '99'
                }
              }, 
              'maximum': {
                'count': {
                  '$toString': '100'
                }
              }
            }, 
            'category_id': 'Skin Care - Face Cleansers', 
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
              'code': {
                '$concat': [
                  '1:', '$EANCode'
                ]
              }, 
              'symbol': {
                '$arrayElemAt': [
                  '$images', 0
                ]
              }, 
              'short_desc': '$description', 
              'long_desc': '$description', 
              'images': '$images'
            }, 
            '@ondc/org/returnable': 'false', 
            'location_id': 'SALON_ADDRESS', 
            'fulfillment_id': '1', 
            '@ondc/org/cancellable': 'false', 
            '@ondc/org/available_on_cod': 'true', 
            '@ondc/org/time_to_ship': 'P1D', 
            'time': {
              'label': 'enable', 
              'timestamp': timeStamp
            }, 
            '@ondc/org/return_window': 'P2D', 
            '@ondc/org/seller_pickup_return': 'false', 
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
                new ObjectId('62a03165ced1fb651ad9230c')
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
              'tags': [
                {
                  'code': 'bpp_terms', 
                  'list': [
                    {
                      'code': 'np_type', 
                      'value': 'MSN'
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
                  'area_code': '560001', 
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
                  'timestamp': timeStamp, 
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
                    'value': 'SALON_ADDRESS'
                  }, {
                    'code': 'day_from', 
                    'value': '1'
                  }, {
                    'code': 'day_to', 
                    'value': '7'
                  }, {
                    'code': 'time_from', 
                    'value': '0000'
                  }, {
                    'code': 'time_to', 
                    'value': '2359'
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
                    'value': 'SALON_ADDRESS'
                  }, {
                    'code': 'day_from', 
                    'value': '1'
                  }, {
                    'code': 'day_to', 
                    'value': '7'
                  }, {
                    'code': 'time_from', 
                    'value': '0000'
                  }, {
                    'code': 'time_to', 
                    'value': '2359'
                  }
                ]
              }, {
                'code': 'serviceability', 
                'list': [
                  {
                    'code': 'location', 
                    'value': 'SALON_ADDRESS'
                  }, {
                    'code': 'category', 
                    'value': 'Skin Care - Face Cleansers'
                  }, {
                    'code': 'type', 
                    'value': '10'
                  }, {
                    'code': 'val', 
                    'value': '10'
                  }, {
                    'code': 'unit', 
                    'value': 'km'
                  }
                ]
              }
            ], 
            'categories': [
              {
                'id': 'SKINCARE1234', 
                'descriptor': {
                  'name': 'BPC'
                }, 
                'tags': [
                  { 
                    'code': 'order', 
                    'list': [
                      {
                        'code': 'location', 
                        'value': 'SALON_ADDRESS'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ]
    return pipeline;
}
let context = async (action) => {
    let messageId = message_id[action];
    let contextRespose = {
        "domain": domain,
        "country": country_code,
        "city": city_code,
        "action": action,
        "core_version": "1.2.0",
        "bap_id": "preprod-ondc-buyer.adloggs.com",
        "bap_uri": "https://preprod-ondc-buyer.adloggs.com/ondcbuyerapi",
        "transaction_id": transaction_id,
        "message_id": messageId,
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
            "tags": [
                {
                    "code": "bpp_terms",
                    "list": [
                        {
                            "code": "np_type",
                            "value": "MSN"
                        }
                    ]
                }
            ]
        },
        "bpp/fulfillments": [
            {
                "id": "1",
                "type": "Delivery"
            },
            {
                "id": "2",
                "type": "Self-Pickup"
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
            "id": "62a03165ced1fb651ad9230c",
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
                            "area_code": "560001"
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
            "id": "62a03165ced1fb651ad9230c",
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
            }
        ],
        "fulfillments": [
            {
                "id": "1",
                "@ondc/org/provider_name": "Trends unisex salon",
                "state": {
                    "descriptor": {
                        "code": "Serviceable"
                    }
                },
                "@ondc/org/category": "Express Delivery",
                "@ondc/org/TAT": "P2D"
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
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "99"
                            },
                            "available": {
                                "count": "99"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                },
                {
                    "title": "delivery charges",
                    "price": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "delivery",
                    "@ondc/org/item_id": "1",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "99"
                            },
                            "available": {
                                "count": "99"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                }
            ],
            "ttl": "PT30S"
        }
    };
    return orderResponse;
}

const init_order = async () => {
    let orderResponse = {
        "provider": {
            "id": "62a03165ced1fb651ad9230c",
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
                "area_code": "560001"
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
                            "area_code": "560001"
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
            "id": "62a03165ced1fb651ad9230c",
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
                "area_code": "560001"
            },
            "phone": "7304569870",
            "created_at": timeStamp,
            "updated_at": timeStamp
        },
        "fulfillments": [
            {
                "id": "1",
                "type": "Delivery",
                "tracking":true,
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
                            "area_code": "560001"
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
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "99"
                            },
                            "available": {
                                "count": "99"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                },
                {
                    "title": "delivery charges",
                    "price": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "delivery",
                    "@ondc/org/item_id": "1",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "99"
                            },
                            "available": {
                                "count": "99"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                }
            ],
            "ttl": "PT30S"
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
        },
        "tags": [
            {
                "code": "bpp_terms",
                "list": [
                    {
                        "code": "tax_number",
                        "value": "07ABHCS6941F1Z5"
                    }
                ]
            }
        ]
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
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                },
                {
                    "title": "delivery charges",
                    "price": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "delivery",
                    "@ondc/org/item_id": "1",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                }
            ],
            "ttl": "PT30S"
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
                "@ondc/org/provider_name": "Trends unisex salon",
                "state": {
                    "descriptor": {
                        "code": "Pending"
                    }
                },
                "type": "Delivery",
                "start": {
                    // "person": {
                    //     "name": "Buyume"
                    // },
                    "location": {
                        "id": "SALON_ADDRESS",
                        "descriptor": {
                            "name": "Buyume"
                        },
                        "gps": "28.4032527,76.9504511",
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
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                },
                {
                    "title": "delivery charges",
                    "price": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "delivery",
                    "@ondc/org/item_id": "1",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                }
            ],
            "ttl": "PT30S"
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

const on_status_order = async (state) => {
    let orderState = "";
    let fullfilementState = "";
    let documents;
    if (state == "pending") {
        orderState = "Accepted";
        fullfilementState = "Pending"
    }
    if (state == "picked") {
        orderState = "In-progress";
        fullfilementState = "Order-picked-up";
        documents = [
            {
                "url": "https://buyume-app.s3.ap-south-1.amazonaws.com/fcOrderLabels/Label-2876713.pdf",
                "label": "Invoice"
            }
        ]
    }
    if (state == "delivered") {
        orderState = "Completed",
            fullfilementState = "Order-delivered";
        documents = [
            {
                "url": "https://buyume-app.s3.ap-south-1.amazonaws.com/fcOrderLabels/Label-2876713.pdf",
                "label": "Invoice"
            }
        ]
    }
    let orderResponse = {
        "id": "BM1000",
        "state": orderState,
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
                "@ondc/org/provider_name": "Trends unisex salon",
                "state": {
                    "descriptor": {
                        "code": fullfilementState
                    }
                },
                "type": "Delivery",
                "start": {
                    "location": {
                        "id": "SALON_ADDRESS",
                        "descriptor": {
                            "name": "Buyume"
                        },
                        "gps": "28.4032527,76.9504511",
                    },
                    "contact": {
                        "phone": "7304569870"
                    }
                },
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
                    "@ondc/org/item_id": "66ea637d805c438709fccdf6",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                },
                {
                    "title": "delivery charges",
                    "price": {
                        "value": "0",
                        "currency": "INR"
                    },
                    "@ondc/org/title_type": "delivery",
                    "@ondc/org/item_id": "1",
                    "item": {
                        "quantity": {
                            "maximum": {
                                "count": "1"
                            },
                            "available": {
                                "count": "1"
                            }
                        },
                        "price": {
                            "value": "325",
                            "currency": "INR"
                        }
                    },
                    "@ondc/org/item_quantity": {
                        "count": 1
                    }

                }
            ],
            "ttl": "PT30S"
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
    if(documents) orderResponse.documents = documents
    return orderResponse;
}

const on_cancel_order = async () => {
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