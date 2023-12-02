import { useState } from 'react';
import {
  Box, Button, CloseButton, Flex, FormControl, FormLabel, Input, Text, useTheme,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker'
import { Medication } from '@/types';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
interface MedicationFormProps {
  onSave: (medication: Medication) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onSave }) => {
  const [medication, setMedication] = useState<Medication>({ name: '', times: [], counter: 0 });
  const theme = useTheme();

  const handleSave = () => {
    onSave(medication);
    setMedication({ name: '', times: [], counter: 0 });
  };

  const removeTimeInput = (index: number) => {
    const newTimes = [...medication.times];
    newTimes.splice(index, 1);
    setMedication({ ...medication, times: newTimes });
  };

  const handleTimeChange = (index: number, timeString: string | null) => {
    const newTimes = [...medication.times];

    if (timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const dateTime = new Date();
      dateTime.setHours(hours, minutes, 0, 0);
      newTimes[index] = dateTime.toISOString();
    } else {
      newTimes[index] = '';
    }
    setMedication({ ...medication, times: newTimes });
  };


  const addTimeInput = () => {
    if (medication.times.length < 5) {
      setMedication({ ...medication, times: [...medication.times, ''] });
    }
  };




  return (
    <Flex height="50vh" w="300px" flexFlow="column" align="center" justify="center" bg="#F5F7F9" padding="20px 20px" borderRadius="20px">
      <FormLabel fontSize="20px">Add New Medical Pill Time</FormLabel>
      <Input
        value={medication.name}
        placeholder='Enter name'
        onChange={(e) => setMedication({ ...medication, name: e.target.value })}
      />

      {medication.times.map((time, index) => (
        <Box marginTop="10px" key={index} zIndex={1000} w="250px">
          <Text>Time {index + 1}</Text>
          <Flex align="center" gap="10px" w="100%">

            <TimePicker clockClassName="clock" className="testPicker" onChange={(time) => handleTimeChange(index, time)} value={time ? new Date(time) : null} />
            <CloseButton bg="gray.200" onClick={() => removeTimeInput(index)} />
          </Flex>
        </Box>
      ))}

      <Flex w="80%">
        {medication.times.length ? <Button w="100%" mt={4} colorScheme="blue" onClick={handleSave}>Save</Button> : null}
        {medication.times.length < 5 && (
          <Button mt={4} ml={4} colorScheme="green" onClick={addTimeInput} w="100%">
            Add Time
          </Button>
        )}
      </Flex>

    </Flex>
  );
};

export default MedicationForm;
