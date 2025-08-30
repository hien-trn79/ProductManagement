class NotificationController {
    index(req, res, next) {
        res.render('notification')
    }
}

export default new NotificationController();