import {Router} from 'express'
import {login} from "../components/auth";
import {encrypt} from "../utils/cryptoUtils";
import {responseHandler} from "../middleware/requestResponseHandler";
import init from "../middleware/init";

let router = Router();

/* GET users listing. */
router.post('/v1/auth', init, login, responseHandler);

module.exports = router;
