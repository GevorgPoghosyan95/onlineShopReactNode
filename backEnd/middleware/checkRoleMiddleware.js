module.exports = function (role) {
    return function (req,res,next){
        if(req.user.role !== role){
            res.status(403).json({message:"User haven't permission!"})
        }else{
            next()
        }
    }

}