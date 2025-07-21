const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        title:{
            type: String,
            required: [true,'please add a title!']
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
    },
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('Post', postSchema);