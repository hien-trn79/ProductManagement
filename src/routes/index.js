import siteRoute from './site.js'
import productRoute from './product.js'
import contactRoute from './contact.js'
import notificationRoute from './notification.js'
import meRouter from './me.js'


function route(app) {
    // [GET] /product
    app.use('/product', productRoute)
    
    // [GET] / or /home
    app.use('/', siteRoute)

    //[GET] /contact
    app.use('/contact', contactRoute)

    // [GET] /notification
    app.use('/notification', notificationRoute)

    //[GET] /me
    app.use('/me', meRouter);
}   

export default route;