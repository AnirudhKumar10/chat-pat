import mongoose from "mongoose";

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String },
  user_id: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  friends: { type: [Schema.Types.ObjectId] },
});

export default mongoose.model("User", userSchema, "users");
