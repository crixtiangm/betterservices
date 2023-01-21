const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    
    comment: {
        type: String,
        required: true
    },
    _service:[{
        type: Schema.Types.ObjectId,
        ref:"Service"
    }],
    _user:[{
        type: Schema.Types.ObjectId,
        ref:"User"
    }]    
},
{
    timestamps: true, 
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;