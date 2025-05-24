
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
    const search = req.query.search ? req.query.search : "";
    
    // const startDate = '2024-01-01';
    // const endDate = '2025-12-31';

    const startDate = req.query.startDate ? req.query.startDate : "";
    const endDate = req.query.endDate ? req.query.endDate : "";

    console.log(startDate, endDate, search);

    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 15;  
    const skip = (page - 1) * limit;

    var conditonObj = {
        user : user.id
    };

    if(search){
        conditonObj.desc = { $regex : search , $options : "i" };
        console.log("sss");
    }

    if(startDate && endDate){
        console.log("ddd");

        conditonObj.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }; 
    }

    
    const totalTrns = await Transaction.find(conditonObj).countDocuments();
    const lastPage = Math.ceil( totalTrns/limit);

    // const trns = await Transaction.find({user : user.id}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const trns = await Transaction.find(conditonObj)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
    
//     const trns = await Transaction.find({
//   user: user.id,
//   createdAt: {
//     $gte: new Date(startDate),
//     $lte: new Date(endDate)
//   }
// })






    return res.status(200).json({ status: "success", lastPage : lastPage, data : trns  });

}

module.exports = {
    addTrns,
    trnsList
}
