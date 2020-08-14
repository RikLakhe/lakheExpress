import {Router} from 'express'
import MemberRouter from "../components/members";

import HabitRouter from "../components/habits";
import CampingRouter from "../components/camping";
import CourseRouter from "../components/courses";

import VideoLogRouter from "../components/videoLog";

let router = Router();

/* GET users listing. */
router.use('/v1/auth', MemberRouter);

// for angularTest Project
router.use('/v1/habit', HabitRouter);
router.use('/v1/camping', CampingRouter);
router.use('/v1/course', CourseRouter);

// for react video Project
router.use('/v1/videoLog', VideoLogRouter);

module.exports = router;
