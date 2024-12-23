const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRouter = require('./routes/contactRouter');
const userRouter = require('./routes/userRouter');
const serveless =require('serverless-http')

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'https://your-netlify-site.netlify.app' }));
app.use(bodyParser.json());
app.use('/api', contactRouter);
app.use('/api', userRouter);


// Connect to MongoDB
mongoose.connect(  'mongodb+srv://srcoat7600:sagar4078@cluster0.nhujj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('./netlify/server.js',router);
module.exports.handler = serverless(app);

