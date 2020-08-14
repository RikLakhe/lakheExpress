import {Router} from 'express'
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

import coursesDetail from './mock'

let router = Router();

router.get('/',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = coursesDetail.courses
        next();
    },
    responseHandler);

router.post('/courses',
    init,
    (req, res, next) => {
        let formData = req.body
        res.locals.status = 200;
        coursesDetail.courses.push(formData)

        res.locals.data = coursesDetail.courses
        next();
    },
    responseHandler);

router.put('/courses',
    init,
    (req, res, next) => {
        let formData = req.body
        res.locals.status = 200;
        coursesDetail.courses.push(formData)

        res.locals.data = coursesDetail.courses
        next();
    },
    responseHandler);

router.get('/lessons',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = coursesDetail.lessons
        next();
    },
    responseHandler);

module.exports = router;
