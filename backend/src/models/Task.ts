import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<ITask>("Task", TaskSchema);
