const express =require('express')
const cors=require('cors')
const Transaction=require('./models/transaction');
const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json())

app.get('/api/test',(req,res)=>{
    res.json("test ok");
})

app.post('/api/transaction',async(req,res)=>{
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("connected");
    });
   
    const{name,price,description,datetime}=req.body;
    const  transaction= await Transaction.create({name,price,description,datetime});
    res.json(transaction);
});

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions= await Transaction.find();
    res.json(transactions);
})
// app.delete('/api/transaction/:id',async(req,res)=>{
//     await mongoose.connect(process.env.MONGO_URL);
//     const req_id=req.params.id;
//     console.log(req_id);
//     const query = { _id: new ObjectId(req_id) };

//     const transaction=await Transaction.findOne(query);
//     console.log(transaction);
//     await Transaction.deleteOne({_id: new ObjectId(req_id)});
//     res.redirect('/api/transactions');

// })



// Assuming Transaction is your Mongoose model for transactions

app.delete('/api/transaction/:id', async (req, res) => {
    try {
        // Establish connection to MongoDB
        await mongoose.connect(process.env.MONGO_URL);

        const req_id = req.params.id;
        console.log(req_id);

        // Query for the transaction
        const transaction = await Transaction.findOne({ _id: new ObjectId(req_id) });
        console.log(transaction);

        // If transaction not found, send a 404 response
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Delete the transaction
        await Transaction.deleteOne({ _id: new ObjectId(req_id) });

        // Send a success response
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        // Send an error response
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(4040);