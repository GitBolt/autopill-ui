// models/Medication.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface Medication extends Document {
  name: string;
  times: string[];
  counter: number;
}

const MedicationSchema = new Schema({
  name: { type: String, required: true },
  times: { type: [String], required: true },
  counter: { type: Number, default: 0 },
});

const MedicationModel = mongoose.models.Medication || mongoose.model<Medication>('Medication', MedicationSchema);

export default MedicationModel;
