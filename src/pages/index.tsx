import { useEffect, useState } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import MedicationForm from '../components/MedicationForm';
import MedicationList from '../components/MedicationList';
import { Medication } from '@/types';
import { addMedication, deleteMedication, getMedication, updateMedication } from '@/utils/api';

const HomePage = () => {
  const [medication, setMedication] = useState<Medication | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchMedication()
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    const intervalId = setInterval(fetchData, 800);
    return () => clearInterval(intervalId);
  }, []);


  const fetchMedication = async () => {
    const fetchedMedication = await getMedication();
    setMedication(fetchedMedication);
  };

  useEffect(() => {
    fetchMedication();
  }, []);

  const handleSave = async (med: Medication) => {
    if (med._id) {
      await updateMedication(med._id, med);
    } else {
      await addMedication(med);
    }
    fetchMedication();
  };

  const handleDelete = async (id: string) => {
    await deleteMedication(id);
    fetchMedication();
  };

  return (
    <Flex direction="column" align="center" m={8}>
      <Heading mb={6}>AutoPill</Heading>

      {medication ? <MedicationList
        medication={medication}
        onEdit={setMedication}
        onDelete={handleDelete}
      /> : <MedicationForm onSave={handleSave} />
      }

    <Flex>Built By <a href="https://aabis.dev" style={{color:"blue", textDecoration:"underline", margin:"0 5px"}}> Aabis </a> and Rohan</Flex>
    </Flex>
  );
};

export default HomePage;
