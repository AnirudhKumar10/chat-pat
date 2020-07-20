import mongoose from "mongoose";

const Schema = mongoose.Schema;

let messageSchema = new Schema({
  msg: { type: String, required: true },
  sender_id: { type: Schema.Types.ObjectId, required: true },
  rcv_id: { type: Schema.Types.ObjectId, required: true },
  time: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema, "messages");
