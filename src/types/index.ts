export interface Medication {
    _id?: string;
    name: string;
    times: string[]; // Assuming times are stored as datetime strings
    counter: number;
  }
  