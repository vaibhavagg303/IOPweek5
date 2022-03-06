import mongoose from 'mongoose';

const hostSchema = mongoose.Schema({
    Name: String,
    City: String,
    PhoneNumber: String,
    Email: String
});

const Host= mongoose.model('Host',hostSchema);
export default Host;