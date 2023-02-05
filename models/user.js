const {Schema, Types}=require("mongoose");

const reactionSchema=new Schema(
{
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
type: String,
required: true,
unique: true,
// Must match a valid email address (look into Mongoose's matching validation)
  },
 // `thoughts`* Array of `_id` values referencing the `Thought` model

//* `friends` * Array of `_id` values referencing the `User` model (self-reference)
  thoughts: [thoughtsSchema],
  friends: post
}
);
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports=userSchema;