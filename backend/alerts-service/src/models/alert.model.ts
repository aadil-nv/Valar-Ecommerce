import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  type: string; // "critical", "high", "medium", "low"
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const alertSchema = new Schema<IAlert>({
  type: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

export const Alert = mongoose.model<IAlert>("Alert", alertSchema);
