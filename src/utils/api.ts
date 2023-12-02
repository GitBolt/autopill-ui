import axios from 'axios';
import { Medication } from '@/types';

const API_URL = '/api/medications';

export const getMedication = async (): Promise<Medication | null> => {
  try {
    const response = await axios.get(API_URL);
    return response.data[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addMedication = async (medication: Medication) => {
  try {
    await axios.post(API_URL, medication);
  } catch (error) {
    console.error(error);
  }
};

export const updateMedication = async (_id: string, medication: Medication) => {
  try {
    await axios.put(API_URL, { ...medication, _id });
  } catch (error) {
    console.error(error);
  }
};

export const deleteMedication = async (_id: string) => {
  try {
    await axios.delete(API_URL, { data: { _id } });
  } catch (error) {
    console.error(error);
  }
};
