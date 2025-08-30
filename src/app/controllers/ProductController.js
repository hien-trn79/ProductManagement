import Products from '../models/Product.js'
import multi from '../../util/mongoose.js'

class ProductController {
    async index(req, res, next) {
        let productQuery = Products.find({})
        try {
        
            if('_sort' in req.query) {
                productQuery = productQuery.sort({
                    [req.query.product_debut]: req.query.type
                })
            }

            productQuery = await productQuery;
        } catch(error) {
            console.log(error)
        }

        Promise.all([productQuery, Products.findWithDeleted({deleted: true})])
            .then(([products, productDeleted]) => {
                res.render('product', {
                    products: multi.multileMongooseToObject(products),
                    deletedCount: productDeleted.length,
                    productsTotal: products.length
                })
            })

    }

    // [GET] /product/:slug
    show(req, res, next) {
        Products.findOne({ name: req.params.slug })
            .then(product => res.render('products/show', {
                product: multi.mongooseToObject(product)
            }))
            .catch(next)
    }
    // [GET] product/create
    create(req, res, next) {
        res.render('products/create')
    }

    // [POST] product/create/:slug
    save(req, res, next) {
        const newProduct = req.body;
        newProduct.img = '/imgs/products/LenovoLegionPro7.jpg';
        const product = new Products(newProduct);
        product.save();
        res.redirect('/');
    }

    // [GET] /product/:id/edit
    edit(req, res, next) {
        Products.findById(req.params.id)
            .then(product => res.render('products/edit', {
                product: multi.mongooseToObject(product)
            }))
            .catch(next)
    }

    // [PUT] /product/:id
    update(req, res, next) {
        Products.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/product'))
            .catch(next)
    }

    // [DELETE] /product/:id
    delete(req, res, next) {
        Products.delete({_id: req.params.id})
            .then(() => res.redirect('/product'))
            .catch(next)
    }

    // [PATCH] /product/:id/restore
    restore (req, res, next) {
        Products.restore({_id: req.params.id})
            .then(() => res.redirect('/me/restore'))
            .catch(next)
    }

    forceDelete(req, res, next) {
        Products.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/me/restore'))
            .catch(next)
    }

    // [POST] /product/handleForm
    handleForm(req, res, next) {
        let data = req.body
        data.slug = req.params.slug;
        switch(data.slug) {
            case 'restore':
                Products.restore({_id: { $in: data.checkboxItems }})
                    .then(() => res.redirect('/me/restore'))
                    .catch(next)
                break;
            case 'remove':
                Products.deleteOne({_id: { $in: data.checkboxItems }})
                    .then(() => res.redirect('/me/restore'))
                    .catch(next)
                break;

            default:
                res.json({message: 'Data invalid'})
        }
    }
}

export default new ProductController();