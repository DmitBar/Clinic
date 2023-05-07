import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import _axios from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { Animal, Appointment } from '..';
import dayjs from 'dayjs';

interface OwnersSelectProps {
  selectedValue: number;
  formControlStyles?: any;

  onSelect: (value: string | null) => void;
}

const fetchAppointments = async () => {
  const { data } = await _axios.get('/api/Appointment');

  return data;
};

const AppointmentSelect = ({
  selectedValue,
  formControlStyles,
  onSelect,
}: OwnersSelectProps): JSX.Element => {
  const handleChange = (event: any): void => {
    onSelect(event.target.value);
  };

  const { data: appointments = [] } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });

  return (
    <FormControl fullWidth sx={formControlStyles}>
      <InputLabel id="appointment-select-label">Прием</InputLabel>
      <Select
        labelId="appointment-select-label"
        id="appointment-select"
        value={selectedValue}
        label={'Прием'}
        onChange={handleChange}
      >
        {appointments.map((appointment: Appointment) => {
          return (
            <MenuItem key={appointment.id} value={appointment.id}>
              {appointment.doctorName}{' '}
              {dayjs(appointment.date).toDate().toDateString()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default AppointmentSelect;
