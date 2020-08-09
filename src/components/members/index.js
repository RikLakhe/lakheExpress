import {Router} from 'express'
import {login,signUp} from "./authController";
import {responseHandler} from "../../middleware/requestResponseHandler";
import init from "../../middleware/init";

let router = Router();

/* GET users listing. */
router.post('/login', init, login, responseHandler);
router.post('/signUp', init, signUp, responseHandler);
// router.use('/verify', init, login, responseHandler);
// router.use('/resend', init, login, responseHandler);
// router.use('/reset', init, login, responseHandler);
// router.use('/forgot', init, login, responseHandler);

module.exports = router;
