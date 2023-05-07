import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import _axios from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { Animal } from '..';

interface OwnersSelectProps {
  selectedValue: number;
  formControlStyles?: any;

  onSelect: (value: string | null) => void;
}

const fetchAnimals = async () => {
  const { data } = await _axios.get('/api/Animal');

  return data;
};

const AnimalSelect = ({
  selectedValue,
  formControlStyles,
  onSelect,
}: OwnersSelectProps): JSX.Element => {
  const handleChange = (event: any): void => {
    onSelect(event.target.value);
  };

  const { data: animals = [] } = useQuery({
    queryKey: ['animals'],
    queryFn: fetchAnimals,
  });

  return (
    <FormControl fullWidth sx={formControlStyles}>
      <InputLabel id="animal-select-label">Животное</InputLabel>
      <Select
        labelId="animal-select-label"
        id="animal-select"
        value={selectedValue}
        label={'Животное'}
        onChange={handleChange}
      >
        {animals.map((animal: Animal) => {
          return (
            <MenuItem key={animal.id} value={animal.id}>
              {animal.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default AnimalSelect;
