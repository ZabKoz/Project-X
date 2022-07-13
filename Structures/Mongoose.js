const mongoose = require('mongoose');

module.exports = async () => {

    if (!process.env.mongoose_token) return;

    await mongoose.connect(process.env.mongoose_token, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(console.log('Connected'))
}