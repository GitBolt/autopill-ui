// pages/api/medications.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import connectDB from '@/utils/db';
import MedicationModel, { Medication } from '@/models/medication';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const medications = await MedicationModel.find();
        res.status(200).json(medications);
      } catch (e: any) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        const newMedication = new MedicationModel(req.body);
        await newMedication.save();
        res.status(201).json(newMedication);
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
      break;

    case 'PUT':
      try {
        const { _id, ...updateData } = req.body;
        const updatedMedication = await MedicationModel.findByIdAndUpdate(_id, updateData, { new: true });
        res.status(200).json(updatedMedication);
      } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        await MedicationModel.findByIdAndDelete(_id);
        res.status(204).send("Successfully Deleted");
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
