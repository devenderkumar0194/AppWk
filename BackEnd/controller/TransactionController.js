
const Helper = require('../helper');
const Transaction = require('../modal/Transaction');

const Validation = require('../validation');
const Joi = require('joi'); 
const sendMail = require('../mail');
const jwt = require('jsonwebtoken');


const addTrns = async (req, res) => {

    const desc = req.body.desc ? req.body.desc : "" ;
    const  credit = req.body.credit ? req.body.credit : 0;
    const debit = req.body.debit ? req.body.debit : 0;
      


    const trns = await Transaction.findOne().sort({ createdAt: -1 });

    if(trns){

        var balence = parseInt(trns.balence) + parseInt(credit) - parseInt(debit);

        console.log(credit, debit, balence);

    }else {
        var balence = 0 + credit - debit;        
    }

    await Transaction.create({ desc : desc, credit : credit, debit : debit, balence : balence });

    return res.status(200).json({ status: "success" });
}

const trnsList = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 15;  
    const skip = (page - 1) * limit;

    const trns = await Transaction.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    return res.status(200).json({ status: "success", data : trns  });

}

module.exports = {
    addTrns,
    trnsList
}
