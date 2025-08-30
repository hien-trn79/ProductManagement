import mongoose from "mongoose";
import slugify from 'slugify';
import mongooseDelete from 'mongoose-delete';


const Schema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    brand: {type: String},
    price: {type: String},
    img: {type: String},
    slug: {type: String, slug: 'name', unique: true}
},  {
    collection: 'Products',
    versionKey: false,
})

// tu dong chuyen slug len truoc
Schema.pre("save", function(next) {
    if(this.name) {
        this.slug = slugify(this.name, {lower: true, strict: true})
    }
    next();
})

// add plugin
Schema.plugin(mongooseDelete, { 
    deletedAt: true,
    deletedBy: true,
    overrideMethods: 'all'
 });


const Product = mongoose.model('Products', Schema);


export default Product;