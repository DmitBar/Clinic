import React from 'react';
import { ITableCol, Table } from '../../components/Table';
import { Owner } from '..';
import _axios from '../../utils/axios';
import CreateOwnerDialog from './CreateOwnerDialog';
import { useQuery } from '@tanstack/react-query';
import OwnerDeleteDialog from './OwnerDeleteDialog';
import dayjs from 'dayjs';
import EditOwnerDialog from './EditOwnerDialog';
import { Box } from '@mui/material';

const OwnersList = () => {
  const columns: Array<ITableCol<Owner>> = [
    {
      label: 'Полное имя',
      accessor: 'fullName',
    },
    {
      label: 'Дата рождения',
      accessor: 'dateOfBirth',
      renderCell(value: Owner) {
        return <div>{dayjs(value.dateOfBirth).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      label: 'Гендер',
      accessor: 'gender',
    },
    {
      label: 'Тип документа',
      accessor: 'typeofdocument',
    },
    {
      label: 'Серия документа',
      accessor: 'serialNumber',
    },
    {
      label: 'Номер телефона',
      accessor: 'telephone',
    },
    {
      label: 'Эл. почта',
      accessor: 'email',
    },
    {
      label: 'Действии',
      renderCell: (value: Owner) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <EditOwnerDialog owner={value} />
            <OwnerDeleteDialog id={value.id} />
          </Box>
        );
      },
    },
  ];

  const { data: owners, isLoading } = useQuery({
    queryKey: ['owners'],
    queryFn: () => _axios.get('/api/Owner').then((res) => res.data),
  });

  return (
    <div>
      <Table
        cols={columns}
        count={owners?.length || 0}
        data={owners}
        page={1}
        rowsPerPage={25}
        rowsPerPageOptions={[25, 50, 100]}
        loading={isLoading}
        title={'Список владельцев'}
        rightActions={<CreateOwnerDialog />}
      />
    </div>
  );
};

export default OwnersList;
