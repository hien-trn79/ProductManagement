import Staff from '../models/Staff.js'
import myMongoose from '../../util/mongoose.js'

class ContactController {

    // [GET] /contact/createStaff
    createStaff(req, res, next) {
        res.render('contact/createStaff')
    }

    // [GET] /contact
    show(req, res, next) {
        Staff.find({})
            .then(staffs => {
                res.render('contact', {
                    staffs: myMongoose.multileMongooseToObject(staffs)
                })
            })
            .catch(next)
    }

    // [POST] /contact/createStaff/:slug
    save(req, res, next) {
        const data = req.body;
        const staff = new Staff(data)
        staff.save();
        res.redirect('/contact/createStaff');
    }

    // [GET] /contact/:slug/detail
    detail(req, res, next) {
        Staff.findOne({name: req.params.slug})
            .then(staff => {
                res.render('contact/detail', {
                    staff: myMongoose.mongooseToObject(staff)
                })
            })
            .catch(next)
    }
}

export default new ContactController();