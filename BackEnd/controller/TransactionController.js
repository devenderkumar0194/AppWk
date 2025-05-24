
const Helper = require('../helper');
const Transaction = require('../modal/Transaction');
const User = require('../modal/UserModal');

const Validation = require('../validation');
const Joi = require('joi'); 
const sendMail = require('../mail');
const jwt = require('jsonwebtoken');


const addTrns = async (req, res) => {

    const user = req.user ? req.user : [];
    const desc = req.body.desc ? req.body.desc : "" ;
    const  credit = req.body.credit ? req.body.credit : 0;
    const debit = req.body.debit ? req.body.debit : 0;

    if(!user){
        return res.send(409, {status : "error", message : "please provide valid user id"});
    } else {

        const trns = await Transaction.findOne({user : user.id}).sort({ createdAt: -1 });

        if(trns){

            var balence = parseInt(trns.balence) + parseInt(credit) - parseInt(debit);

            console.log(credit, debit, balence);

        }else {
            var balence = 0 + credit - debit;        
        }

        await Transaction.create({ user : user.id ,desc : desc, credit : credit, debit : debit, balence : balence });

        return res.status(200).json({ status: "success" });

    }

}

const trnsList = async (req, res) => {
    const user = req.user ? req.user : [];

    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 15;  
    const skip = (page - 1) * limit;

    const trns = await Transaction.find({user : user.id}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.status(200).json({ status: "success", data : trns  });

}

module.exports = {
    addTrns,
    trnsList
}
