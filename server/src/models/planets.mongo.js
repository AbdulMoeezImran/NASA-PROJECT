import mongoose from 'mongoose';

const planetsSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        require: true
    }
});

const planets = mongoose.model('planet', planetsSchema)

export default planets;