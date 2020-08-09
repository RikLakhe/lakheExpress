export default (req,res,next)=>{
    res.setHeader('X-Powered-By', 'Express')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    req.res = res;
    res.req = req;
    req.next = next;
    res.locals = res.locals || Object.create(null);

    next()
}
