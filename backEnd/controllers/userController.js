const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (user)=>{
    const token = jwt.sign({
            id: user.id,
            email: user.email,
            role:user.role
        },
        process.env.SECRET_KEY, {
            expiresIn: '24h'
        }
    )
    return token
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Invalid params!"))
        }
        const candidate = await User.findOne({where: {email: email}})
        if (candidate) {
            return next(ApiError.badRequest('User already exist!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user)

        return res.json({token})
    }

    async login(req, res,next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email:email}})
        if(!user){
            return next(ApiError.internal("User ont found!"))
        }
        let comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
             return next(ApiError.internal("Wrong password!"))
        }
        const token = generateJwt(user)
        return res.json({accessToken:token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user)
        return res.json({accessToken:token})
    }
}

module.exports = new UserController()