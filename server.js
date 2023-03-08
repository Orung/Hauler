require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path'); 
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const  mongoose = require('mongoose');
const connectDB = require('./config/dbConnect')

const PORT = process.env.PORT || 3500


//connect mongo db
connectDB();

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// routes
app.use('/employees', require('./routes/api/employee'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT);

app.set('/', (req, res) => {
    res.send('Hello World')
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

mongoose.connection.once('open', ()=> {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log('server is on port', PORT));
})