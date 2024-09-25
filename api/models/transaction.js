
const mongoose=require('mongoose');

const{Schema,model}=mongoose;

const TransactionSchema = new Schema({
    name: { type: String },
    price:{type:Number},
    description: { type: String },
    datetime: { type: String }
});

const TransactionModel=model('Transaction',TransactionSchema);

module.exports=TransactionModel;
