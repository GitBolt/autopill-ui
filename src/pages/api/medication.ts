// api/medications.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/db';
import MedicationModel, { Medication } from '@/models/medication';

// Connect to MongoDB
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get all medications
      try {
        const medications = await MedicationModel.find();
        res.status(200).json(medications);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      // Add a new medication
      try {
        const { name, times } = req.body;
        const newMedication: Medication = new MedicationModel({
          name,
          times,
          counter: 0,
        });

        await newMedication.save();
        res.status(201).json(newMedication);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error });
      }
      break;

    case 'PUT':
      // Update a medication
      try {
        const { id, name, times } = req.body;
        const updatedMedication = await MedicationModel.findByIdAndUpdate(
          id,
          { name, times },
          { new: true }
        );

        res.status(200).json(updatedMedication);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      // Remove a medication
      try {
        const { id } = req.body;
        await MedicationModel.findByIdAndDelete(id);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
