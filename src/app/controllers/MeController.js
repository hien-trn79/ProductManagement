import Products from '../models/Product.js'
import myMongoose from '../../util/mongoose.js'

class MeController {
    index (req, res, next) {
        Products.findWithDeleted({deleted: true})
            .then (products => {
                res.render('me/restore', {
                    deletedCount: products.length,
                    products: myMongoose.multileMongooseToObject(products)
                })
            })
    }
}

export default new MeController();