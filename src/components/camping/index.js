import {Router} from 'express'
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

import campingDetail from './mock'

let router = Router();

/* GET users listing. */
router.get('/',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = campingDetail
        next();
    },
    responseHandler);

router.get('/info/:id',
    init,
    (req, res, next) => {
        let id = req.params.id
        res.locals.status = 200;
        res.locals.data = campingDetail[id].info
        next();
    },
    responseHandler);

router.get('/item/:id',
    init,
    (req, res, next) => {
        let id = req.params.id
        res.locals.status = 200;
        res.locals.data = campingDetail[id].item
        next();
    },
    responseHandler);

module.exports = router;
