const mongoose = require('mongoose');

// mongoose.connect(`mongodb://0.0.0.0/habit-tracker`);
mongoose.connect('mongodb+srv://nandishmohanty:Mohanty1818@cluster0.vugqe6n.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection;

// If error print error message
db.on('error', console.error.bind(console, 'error in connection DB'));

// if success the print the message
db.once('open',()=> {
    console.log('successfully connect to the database');
})

module.exports = db;