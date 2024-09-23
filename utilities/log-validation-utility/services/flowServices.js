const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
const fs = require('fs');
const path = require('path');
const pipelines = require('./pipelines');
let productCollection, database, sellerCollection, orderCollection = false;

let connect = async () => {
    if (!database) {
        database = await mongoose.connect(process.env.MONGO_URI);

        productCollection = database.model('products', new Schema());
        sellerCollection = database.model('sellers', new Schema());
        orderCollection = database.model('productorders', new Schema());
    }
}

const create_flow_file = async () => {
    try {
        await connect();
        await create_flow_1();
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}
const create_flow_1 = async () => {
    try {
        let seller_pipeline = await pipelines.seller_pipeline();
        let product_pipeline = await pipelines.product_pipeline();
        let context = await pipelines.context("on_search");
        let catalog = await pipelines.catalog();
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
        seller_details = seller_details.map((seller) => {
            let obj = {
                ...seller,
                items: product_details
            }
            return obj;
        })
        ondc_response_obj.message.catalog["providers"] = seller_details;
        let destination = path.join(__dirname, '../Buyume/Retail/Flow1/on_search.json');
        console.log('destination', destination)
        // fs.writeFileSync(destination, JSON.stringify(ondc_response_obj));
        return { success: true, msg: ondc_response_obj };
    } catch (er) {
        console.log(er);
        return { success: false, msg: "Something Went Wrong" };
    }
}


module.exports = {
    create_flow_file,
};