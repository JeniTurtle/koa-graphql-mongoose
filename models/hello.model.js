import { Schema } from 'mongoose';

const helloSchema = new Schema({
    email:  String,
    lastIP: String,
});

export default global.db.model('Hello', helloSchema);