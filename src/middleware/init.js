export default (req,res,next)=>{
    res.setHeader('X-Powered-By', 'Express')
    req.res = res;
    res.req = req;
    req.next = next;
    res.locals = res.locals || Object.create(null);

    next()
}
