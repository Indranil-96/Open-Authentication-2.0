import mongoose from 'mongoose';

const loostSchema = new mongoose.Schema({}, { strict: false });

const MDB = mongoose.model('OAuth', loostSchema);

export default MDB;