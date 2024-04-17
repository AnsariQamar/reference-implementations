module.exports = Object.freeze({
  RET_CONTEXT_TTL: "PT30S",
  RET_CONTEXT_ACTION: "action",
  DB_PATH: "dbfiles",
  DB_Keys: {
    search: {
      context: ["timestamp", "transaction_id", "message_id", "city"],
      message: {
        intent: { payment: ["@ondc/org/buyer_app_finder_fee_amount"] },
      },
    },
    on_search: { context: ["bap_id", "bpp_id"], message: ["catalog"] },
  },
  SUPPORTED_DOMAINS_SORTED_INDEX: {
    logistics: 'LOG_SORTED_INDEX',
    b2b: 'B2B_SORTED_INDEX',
  }, // must match mergesort.js
  SERVER_LOG_DEST: "/public/server",
  FULL_ACTION_LIST: [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "track",
    "on_track",
    "cancel",
    "on_cancel",
    "update",
    "on_update",
    "status",
    "on_status",
    "support",
    "on_support",
  ],
  LOG_SORTED_INDEX: [
    "search",
    "on_search",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  B2B_SORTED_INDEX: [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  SRV_SORTED_INDEX: [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  RET_SEARCH: "search",
  RET_ONSEARCH: "on_search",
  RET_SELECT: "select",
  RET_ONSELECT: "on_select",
  RET_INIT: "init",
  RET_ONINIT: "on_init",
  RET_CONFIRM: "confirm",
  RET_ONCONFIRM: "on_confirm",
  RET_TRACK: "track",
  RET_ONTRACK: "on_track",
  RET_CANCEL: "cancel",
  RET_ONCANCEL: "on_cancel",
  RET_UPDATE: "update",
  RET_ONUPDATE: "on_update",
  RET_STATUS: "status",
  RET_ONSTATUS: "on_status",
  RET_SUPPORT: "support",
  RET_ONSUPPORT: "on_support",
  //logistics
  LOG_CONTEXT_TTL: "PT30S",
  LOG_CONTEXT_ACTION: "action",
  LOG_SEARCH: "search",
  LOG_ONSEARCH: "on_search",
  LOG_INIT: "init",
  LOG_ONINIT: "on_init",
  LOG_CONFIRM: "confirm",
  LOG_ONCONFIRM: "on_confirm",
  LOG_TRACK: "track",
  LOG_ONTRACK: "on_track",
  LOG_CANCEL: "cancel",
  LOG_ONCANCEL: "on_cancel",
  LOG_UPDATE: "update",
  LOG_ONUPDATE: "on_update",
  LOG_STATUS: "status",
  LOG_ONSTATUS: "on_status",
  LOG_SUPPORT: "support",
  LOG_ONSUPPORT: "on_support",
  FULFILLMENT_TYPE: ["Delivery", "Return", "RTO"],
  CATEGORY_ID: [
    "Express Delivery",
    "Standard Delivery",
    "Immediate Delivery",
    "Same Day Delivery",
    "Next Day Delivery",
  ],
  PAYMENT_TYPE: ["ON-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"],
  PAYMENT_COLLECTEDBY: ["BAP", "BPP"],
  UNITS_WEIGHT: ["unit","dozen","gram","kilogram","tonne","litre","millilitre"],
  UNITS_DIMENSIONS: ["centimeter", "meter"],
  CATEGORIES: [
    "Grocery",
    "F&B",
    "Fashion",
    "BPC",
    "Electronics",
    "Home & Kitchen",
    "Pharma",
    "Agriculture",
    "Mobility",
  ],
  SHIPMENT_TYPE: ["P2P", "P2H2P"],
  SETTLEMENT_TYPE: ["upi", "neft", "rtgs"],
  TITLE_TYPE: ["delivery", "rto", "reverseqc","tax"],
  PCC_CODE: ["1", "2", "3", "4"],
  DCC_CODE: ["1", "2", "3"],
  FULFILLMENT_TAGS_CODE: ["state", "rto_action","weather_check"],
  FULFILLMENT_TAGS_LIST_CODE: ["ready_to_ship", "return_to_origin","raining"],
  FULFILLMENT_TAGS_LIST_VALUE: ["yes", "no"],
  TRACKING_STATUS: ["active", "inactive"],
  TRACK_TAGS_CODE:["config","order","path"],
  TRACK_TAGS_LIST_CODE:["id","attr","type","lat_lng","sequence"],
  ORDER_STATE: ["Created", "Accepted", "Cancelled", "In-progress","Completed"],
  CANCELLATION_CODE: [
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
    "010",
    "011",
    "012",
    "013",
    "014",
    "015",
    "016",
    "017",
    "018",
    "019",
    "020",
    "021",
  ],
  FULFILLMENT_STATE: [
    "Pending",
    "Packed",
    "Searching-for-Agent",
    "Agent-assigned",
    "Out-for-pickup",
    "Pickup-failed",
    "Pickup-rescheduled",
    "Order-picked-up",
    "In-transit",
    "At-destination-hub",
    "Out-for-delivery",
    "Delivery-failed",
    "Delivery-rescheduled",
    "Order-delivered",
    "RTO-Initiated",
    "RTO-Delivered",
    "RTO-Disposed",
    "Cancelled",
  ],
  CURRENCY:["INR","AUD","USD","SGD"],
  CANCELLATION_TAGS_CODES:["rto_event","precancel_state"],
  CANCELLATION_TAGS_LIST:["retry_count","rto_id","cancellation_reason_id","sub_reason_id","cancelled_by","fulfillment_state","updated_at"],
  FASHION_ATTRIBUTES : ["brand","colour","size","gender","material"],
  ELECTRONICS_ATTRIBUTES: ["brand","model"],
  MANDATORY_ATTRIBUTES: ["brand"],
  TERMS:["buyer_id","bap_terms","bpp_terms"],
  B2B_BPP_TERMS:["buyer_id_code","buyer_id_no","max_liability","max_liability_cap","mandatory_arbitration","court_jurisdiction","delay_interest","accept_bpp_terms"],
  ATTR_DOMAINS:["ONDC:RET12","ONDC:RET14","ONDC:RET1A","ONDC:RET1B","ONDC:RET1C","ONDC:RET1D"],
  G2TAGS:["time_to_ship","cancellable","tax_rate"],

  //services
  SRV_FULFILLMENT_TYPE:["Home-Service","Store-Service"],
  SRV_PAYMENT_TYPE:["PRE-FULFILLMENT","ON-FULFILLMENT","POST-FULFILLMENT"],
  SRV_FULFILLMENT_STATE:["Pending","At-Location","In-Transit","Completed","Cancelled"],
  SRV_ORDER_STATE:["Created","Accepted","In-progress","Completed","Cancelled","Pending"],
  GPS_PATTERN: "^(-?[0-9]{1,3}(?:.[0-9]{6,15})?),( )*?(-?[0-9]{1,3}(?:.[0-9]{6,15})?)$",
  SERVICEABILITY:["location","category","type","val","unit"],
  RESCHEDULE_TERMS:["fulfillment_state","reschedule_eligible","reschedule_fee","reschedule_within"]

});
