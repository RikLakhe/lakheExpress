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


module.exports = router;
