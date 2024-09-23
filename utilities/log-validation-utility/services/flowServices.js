const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
const fs = require('fs');
const path = require('path');
const pipelines = require('./pipelines');
let productCollection, database, sellerCollection, logsCollection, orderCollection = false;
const bpp_id = "prelive.buyume.io";
const bpp_uri = "https://prelive.buyume.io/ondc";

let connect = async () => {
    if (!database) {
        console.log(process.env.MONGO_URI)
        database = await mongoose.connect(process.env.MONGO_URI);

        productCollection = database.model('products', new Schema());
        sellerCollection = database.model('sellers', new Schema());
        orderCollection = database.model('productorders', new Schema());
        logsCollection = database.model('ondclogs', new Schema());
    }
}

const create_flow_file = async () => {
    try {
        // await connect();
        console.log("db connected")
        // let search_response = await get_search();
        // await create_on_search(search_response.msg);
        // await get_select();
        await create_on_select();
        return { success: true, msg: "Done" };
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}
const create_on_search = async (search) => {
    try {
        let seller_pipeline = await pipelines.seller_pipeline();
        let product_pipeline = await pipelines.product_pipeline();
        let context = {
            ...(await pipelines.context("on_search")),
            "bpp_id": bpp_id,
            "bpp_uri": bpp_uri,
        }
        let catalog = await pipelines.on_search_catalog();
        let ondc_response_obj = {
            "context": context,
            "message": {
                "catalog": catalog
            }
        }
        let [
            seller_details,
            product_details
        ] = await Promise.all([
            sellerCollection.aggregate(seller_pipeline),
            productCollection.aggregate(product_pipeline)
        ])
        product_details = product_details.map((ele)=>{
            ele['@ondc/org/returnable'] = false;
            ele['@ondc/org/cancellable'] = false;
            ele['@ondc/org/available_on_cod'] = true;
            ele['@ondc/org/seller_pickup_return'] = false;
            return ele;
        })
        seller_details = seller_details.map((seller) => {
            let obj = {
                ...seller,
                items: product_details
            }
            return obj;
        })
        ondc_response_obj.message.catalog["bpp/providers"] = seller_details;
        let destination = path.join(__dirname, '../Buyume/Retail/Testing_flow/on_search.json');
        // console.log('destination', destination)
        fs.writeFileSync(destination, JSON.stringify(ondc_response_obj));
        return { success: true, msg: ondc_response_obj };
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}
const get_search = async()=>{
    try {
        // let response = await logsCollection.findOne({type:"search"}).sort({createdAt:-1}).lean();
        // let logs = response.logs;
        // logs.context.domain = "nic2004:52110";
        let context = {
            ...(await pipelines.context("search")),
            // "bpp_id": bpp_id,
            // "bpp_uri": bpp_uri,
        }
        let intent = await pipelines.search_intent();
        ondc_response_obj = {
            "context":context,
            "message":{
                "intent":intent
            }
        };
        let destination = path.join(__dirname, '../Buyume/Retail/Testing_flow/search.json');
        // console.log('destination', destination)
        fs.writeFileSync(destination, JSON.stringify(ondc_response_obj));
        return { success: true, msg: ondc_response_obj };
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}

const get_select = async () => {
    try {
        let context = {
            ...(await pipelines.context("select")),
            "bpp_id": bpp_id,
            "bpp_uri": bpp_uri,
        }
        let order = await pipelines.select_order();
        ondc_response_obj = {
            "context":context,
            "message":{
                "order":order
            }
        };
        let destination = path.join(__dirname, '../Buyume/Retail/Testing_flow/select.json');
        // console.log('destination', destination)
        fs.writeFileSync(destination, JSON.stringify(ondc_response_obj));
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}

const create_on_select = async () => {
    try {
        let context = {
            ...(await pipelines.context("on_select")),
            "bpp_id": bpp_id,
            "bpp_uri": bpp_uri,
        }
        let  order = await pipelines.on_select_resp();
        let ondc_response_obj = {
            "context":context,
            "message":{
                "order":order
            }
        }
        let destination = path.join(__dirname, '../Buyume/Retail/Testing_flow/on_select.json');
        // console.log('destination', destination)
        fs.writeFileSync(destination, JSON.stringify(ondc_response_obj));
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}


module.exports = {
    create_flow_file,
    get_search,
    create_on_search,
};