import React from 'react';
import { ITableCol, Table } from '../../components/Table';
import { Appointment } from '..';
import _axios from '../../utils/axios';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import { useQuery } from '@tanstack/react-query';
import AppointmentDeleteDialog from './AppointmentDeleteDialog';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import EditAppointmentDialog from './EditAppointmentDialog';

const AppointmentsList = () => {
  const columns: Array<ITableCol<Appointment>> = [
    {
      label: 'Дата',
      accessor: 'date',
      renderCell(value: Appointment) {
        return <div>{dayjs(value.date).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      label: 'Вес',
      accessor: 'weight',
    },
    {
      label: 'Тип',
      accessor: 'type',
    },
    {
      label: 'Имя доктора',
      accessor: 'doctorName',
    },
    {
      label: 'Описание',
      accessor: 'examinationDescription',
    },
    {
      label: 'Имя животного',
      renderCell: (appointment: Appointment) => (
        <div>{appointment.animal?.name}</div>
      ),
    },
    {
      label: 'Возраст животного',
      renderCell: (appointment: Appointment) => (
        <div>{appointment.animal?.age}</div>
      ),
    },
    {
      label: 'Пол животного',
      renderCell: (appointment: Appointment) => (
        <div>{appointment.animal?.gender}</div>
      ),
    },
    {
      label: 'Имя владельца',
      renderCell: (appointment: Appointment) => (
        <div>{appointment.animal.owner?.fullName}</div>
      ),
    },
    {
      label: 'Действии',
      renderCell: (value: Appointment) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <EditAppointmentDialog appointment={value} />
            <AppointmentDeleteDialog id={value.id} />
          </Box>
        );
      },
    },
  ];

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => _axios.get('/api/Appointment').then((res) => res.data),
  });

  return (
    <div>
      <Table
        cols={columns}
        count={appointments?.length || 0}
        data={appointments}
        page={1}
        rowsPerPage={25}
        rowsPerPageOptions={[25, 50, 100]}
        loading={isLoading}
        title={'Список приемов'}
        rightActions={<CreateAppointmentDialog />}
      />
    </div>
  );
};

export default AppointmentsList;
