export default function  SortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        product_debut: 'default',
        type: 'default',
    };

    if('_sort' in req.query) {
        // Hop nhat object
        Object.assign(res.locals._sort, {   // Ket hop thanh 1 object
            enabled: true,
            product_debut : req.query.product_debut,
            type: req.query.type
        })
    }



    next();
}