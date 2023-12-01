// pages/index.tsx
// @ts-nocheck

import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

interface Medication {
  _id: string;
  name: string;
  times: string[];
  counter: number;
}

const MedicationsPage = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState({ name: '', times: '' });
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const toast = useToast();

  const fetchMedications = async () => {
    try {
      const response = await axios.get<Medication[]>('/api/medication');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleAddMedication = async () => {
    try {
      await axios.post('/api/medication', newMedication);
      toast({
        title: 'Medication Added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchMedications();
      setNewMedication({ name: '', times: '' });
    } catch (error) {
      console.error('Error adding medication:', error);
      toast({
        title: 'Error Adding Medication',
        description: 'An error occurred while adding the medication.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateMedication = async (id: string, name: string, times: string[]) => {
    try {
      await axios.put('/api/medication', { id, name, times });
      toast({
        title: 'Medication Updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchMedications();
      setEditingMedication(null);
    } catch (error) {
      console.error('Error updating medication:', error);
      toast({
        title: 'Error Updating Medication',
        description: 'An error occurred while updating the medication.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMedication = async (id: string) => {
    try {
      await axios.delete('/api/medication', { data: { id } });
      toast({
        title: 'Medication Deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchMedications();
    } catch (error) {
      console.error('Error deleting medication:', error);
      toast({
        title: 'Error Deleting Medication',
        description: 'An error occurred while deleting the medication.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Text fontSize="2xl" mb={4}>
          Medications
        </Text>
        <Box mb={4}>
          <Input
            placeholder="Medication Name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            mb={2}
          />
          <Input
            placeholder="Medication Times (comma-separated)"
            value={newMedication.times}
            onChange={(e) => setNewMedication({ ...newMedication, times: e.target.value })}
            mb={2}
          />
          <Button colorScheme="teal" onClick={handleAddMedication}>
            Add Medication
          </Button>
        </Box>
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Times</Th>
              <Th>Counter</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {medications.map((medication) => (
              <Tr key={medication._id}>
                <Td>
                  // @ts-ignore
                  {editingMedication === medication._id ? (
                    <Input
                      value={medication.name}
                      onChange={(e) =>
                        setEditingMedication({
                          ...editingMedication,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    medication.name
                  )}
                </Td>
                <Td>
                  {editingMedication === medication._id ? (
                    <Input
                      value={medication.times.join(', ')}
                      onChange={(e) =>
                        setEditingMedication({
                          ...editingMedication,
                          times: e.target.value.split(',').map((t) => t.trim()),
                        })
                      }
                    />
                  ) : (
                    medication.times.join(', ')
                  )}
                </Td>
                <Td>{medication.counter}</Td>
                <Td>
                  {editingMedication === medication._id ? (
                    <>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() =>
                          handleUpdateMedication(
                            medication._id,
                            editingMedication.name,
                            editingMedication.times
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        ml={2}
                        onClick={() => setEditingMedication(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => setEditingMedication({ ...medication })}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        ml={2}
                        onClick={() => handleDeleteMedication(medication._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default MedicationsPage;
