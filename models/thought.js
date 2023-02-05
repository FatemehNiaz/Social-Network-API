const {Schema, Types}=require("mongoose");
const reactionSchema = require("./reaction");

const reactionSchema=new Schema(
{
  thoughtText: {
    type: String,
    required: true,
    maxlength:280
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
  },
  //simple explanation for this code?
  {toJSON:{
    getters:true
  },
  id:false
}
);
thoughtchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
module.exports= thoughtsSchema;