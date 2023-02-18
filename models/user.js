const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      
      unique: true,

      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please make sure to enter valid email address"],
      // Must match a valid email address (look into Mongoose's matching validation)
    },
    // `thoughts`* Array of `_id` values referencing the `Thought` model

    //* `friends` * Array of `_id` values referencing the `User` model (self-reference)
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User= model("User", userSchema);
module.exports = User;
