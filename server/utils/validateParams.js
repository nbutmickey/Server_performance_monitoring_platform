exports.validate=function (req,res,next) {
    let type= req.query.type;
    if(type>5||type<0){
        req.query.type=0;
    }
    next();
}
