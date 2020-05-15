
const mongoose = require('mongoose');

const User = require('../models/user-model')

mongoose.connect(`mongodb://localhost/project2`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


users = [

    {
        // Log-in Data
        username: bb,
        password: bb,
        linkedinID: String,
        //Personal Data
        name: {
            bb
        },
        surname: {
            bb
        },
        age: {
            type: Number,
            min: 0,
            max: 99
        }, // Date of birth would be better 
        country: { bb },
        city: { bb },
        phone: {
            type: Number,
            max: 15
        },
        email: {
            type: String,
        },
        avatarUrl: {
            type: String,
            default: ''
        }, // TDB Default Image
        //Professional Profile

        bioDescription: {
            type: String
        },

        blog: {
            type: String
        },

        professionalField: {
            type: String,
            enum: ['Web-development', 'UX/UI', 'Product Management', 'Data Science']
        },
        position: {
            type: String
        },
        _followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        network: {
            type: Number
        },
        role: {
            type: String,
            enum: ['Mentor', 'Mentee']
        },
        imgName: { type: String },
        imgPath: { type: String }
    }



]


User.create(movies).then(() => {
    console.log(`Created users ${users.body} `);
    mongoose.connection.close();
});
