import {Router} from 'express'
import MemberRouter from "../components/members";

import HabitRouter from "../components/habits";
import CampingRouter from "../components/camping";

import VideoLogRouter from "../components/videoLog";

let router = Router();

/* GET users listing. */
router.use('/v1/auth', MemberRouter);

// for angularTest Project
router.use('/v1/habit', HabitRouter);
router.use('/v1/camping', CampingRouter);

// for react video Project
router.use('/v1/videoLog', VideoLogRouter);

module.exports = router;
