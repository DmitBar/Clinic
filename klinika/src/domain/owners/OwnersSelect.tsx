import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import _axios from '../../utils/axios';
import { Owner } from '..';
import { useQuery } from '@tanstack/react-query';

interface OwnersSelectProps {
  selectedOwner: number;
  formControlStyles?: any;

  onSelectOwner: (owner: string | null) => void;
}

const fetchOwners = async () => {
  const { data } = await _axios.get('/api/Owner');

  return data;
};

const OwnersSelect = ({
  selectedOwner: selectedRegion,
  formControlStyles,
  onSelectOwner,
}: OwnersSelectProps): JSX.Element => {
  const handleChange = (event: any): void => {
    onSelectOwner(event.target.value);
  };

  const { data: owners = [] } = useQuery({
    queryKey: ['owners'],
    queryFn: fetchOwners,
  });

  return (
    <FormControl fullWidth sx={formControlStyles}>
      <InputLabel id="owner-select-label">Владелец</InputLabel>
      <Select
        labelId="owner-select-label"
        id="owner-select"
        value={selectedRegion}
        label={'Владелец'}
        onChange={handleChange}
      >
        {owners.map((owner: Owner) => {
          return (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.fullName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default OwnersSelect;
