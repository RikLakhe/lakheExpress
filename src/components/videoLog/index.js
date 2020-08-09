import {Router} from 'express'
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

import multer from 'multer'

let router = Router();

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage: storage}).single('videoFile');


router.post('/', function (request, response) {
        upload(request, response, function (err) {
            if (err) {
                console.log('Error Occured');
                return;
            }
            console.log(request.file);
            response.end('Your file Uploaded');
            console.log('Video Uploaded');
        })
    }
)


module.exports = router;
