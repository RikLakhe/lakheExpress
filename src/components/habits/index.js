import {Router} from 'express'
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

import habit from './mock'

let router = Router();

let habitList = habit;

/* GET users listing. */
router.get('/',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = habit

        next();
    },
    responseHandler);

router.post('/',
    init,
    (req, res, next) => {
    console.log('here',req.body)

        let newHabit = req.body

        const id = habitList.length + 1;
        newHabit.id = id;
        newHabit.count = 0;

        habitList.push(newHabit)

        res.locals.status = 200;
        res.locals.data = newHabit
        next();
    },
    responseHandler);

module.exports = router;
