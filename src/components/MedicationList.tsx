import { Box, Button, VStack, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Medication } from '@/types';

interface MedicationListProps {
  medication: Medication | null;
  onEdit: (medication: Medication) => void;
  onDelete: (id: string) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ medication, onEdit, onDelete }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const shadow = useColorModeValue('sm', 'dark-lg');

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  if (!medication) {
    return <Text>No Medication Found</Text>;
  }

  return (
    <Box bg={bgColor} p={4} borderRadius="lg" shadow={shadow} w="300px">
      <VStack spacing={3} align="stretch">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">Medication: {medication.name}</Text>
        {medication.times.map((time, index) => (
          <HStack key={index} justify="space-between" p={2} bg="gray.100" borderRadius="md">
            <Text fontSize="md">Time {index + 1}</Text>
            <Text fontSize="md" fontWeight="bold">{formatTime(time)}</Text>
          </HStack>
        ))}
        <HStack spacing={2} mt={4} justify="center">
          <Button colorScheme="red" onClick={() => onDelete(medication!._id!)}>Delete</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default MedicationList;
