import mongoose from "mongoose";
import slugify from "slugify";

const Schema = new mongoose.Schema({
    name: {type: String},
    position: {type: String},
    date: {type: String},
    email: {type: String},
    numberPhone: {type: String},
    education: {type: String},
    professional: {type: String},
    introduce: {type: String, maxLength: 500},
    begin: {type: String},
    slug: {type: String, slug: 'name', unique: true}
}, {
    collection: 'Staffs',
    versionKey: false,
})

Schema.pre("save", async function(next) {
    if(this.name) {
        this.slug = slugify(this.name, {lower: true, strict: true});
        let slug = this.slug;
        let count = 1;

        while(await mongoose.models.Staff.findOne({slug})) {
            slug = this.slug + '-' + count++;
        }
        
        this.slug = slug;
    }
    next();
})

const Staff = new mongoose.model('Staff', Schema);

export default Staff;