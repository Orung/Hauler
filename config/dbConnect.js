const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://orung:12345@cluster0.wzwby8p.mongodb.net/HaulerDB?retryWrites=true&w=majority', {
           useUnifiedTopology:true,
           useNewUrlParser:true 
        });
    }catch (err) {
        console.error(err)
    }
}


module.exports = connectDB