import Product from '../models/Product.js'
import multileMongooseToObject from '../../util/mongoose.js'
import Staff from '../models/Staff.js'

class SiteController {
    async index (req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', {
                    products: multileMongooseToObject.multileMongooseToObject(products)
                })
            })
    }

    home (req, res, next) {
        Product.find({})
            .then(products => {
                res.render('home', {
                    products: multileMongooseToObject.multileMongooseToObject(products)
                })
            })
            .catch(next)
    }

    message(req, res, next) {
        Staff.findById({_id: req.params.id})
            .then(staff => {
                res.render('me/message', {
                    staff: multileMongooseToObject.mongooseToObject(staff)
                })
            })
            .catch(next)
    }
}

export default new SiteController();