import {Router} from 'express'
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

import coursesDetail from './mock'
import {isEmpty} from "../../utils/commonUtils";

let coursesList = coursesDetail.courses;
let lessonList = coursesDetail.lessons;

let router = Router();

router.get('/',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = coursesList
        next();
    },
    responseHandler);

router.post('/',
    init,
    (req, res, next) => {
        let formData = req.body
            if(formData && !isEmpty(formData)){
                    res.locals.status = 200;
                    coursesList.push(formData)
                    res.locals.data = coursesList
            }else{
                    return res
                        .status(400)
                        .json({
                                type: 'Failed',
                                message: "Data missing!"
                        })
            }

        next();
    },
    responseHandler);

router.put('/',
    init,
    (req, res, next) => {
        let formData = req.body

        if(formData && !isEmpty(formData)){
            coursesList = coursesList.map(data=>{
                if(data.id===formData.id){
                    return formData
                }else{
                    return data
                }
            })
            res.locals.status = 200;
            res.locals.data = coursesList
        }else{
            return res
                .status(400)
                .json({
                    type: 'Failed',
                    message: "Data missing!"
                })
        }

        next();
    },
    responseHandler);

router.delete('/:id',
    init,
    (req, res, next) => {
        let id = req.params.id
        coursesList = coursesList.filter(item => parseInt(item.id) != parseInt(id))
        res.locals.status = 200;
        res.locals.data = coursesList
        next();
    },
    responseHandler);

router.get('/lessons',
    init,
    (req, res, next) => {
        res.locals.status = 200;
        res.locals.data = lessonList
        next();
    },
    responseHandler);

module.exports = router;
