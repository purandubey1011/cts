let mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error.message);
    }
}