import React from 'react';
import { ITableCol, Table } from '../../components/Table';
import { Diagnosis } from '..';
import _axios from '../../utils/axios';
import CreateDiagnosisDialog from './CreateDiagnosisDialog';
import { useQuery } from '@tanstack/react-query';
import DiagnosisDeleteDialog from './DiagnosisDeleteDialog';
import { Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import EditDiagnosisDialog from './EditDiagnosisDialog';

const DiagnosisList = () => {
  const columns: Array<ITableCol<Diagnosis>> = [
    {
      label: 'Тип Приема',
      accessor: 'appointment',
      renderCell: (diagnosis: Diagnosis) => <>{diagnosis.appointment?.type}</>,
    },
    {
      label: 'Описание',
      accessor: 'description',
    },
    {
      label: 'Лекарства',
      accessor: 'medicines',
    },
    {
      label: 'Цена',
      accessor: 'price',
    },
    {
      label: 'Действии',
      renderCell: (value: Diagnosis) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <EditDiagnosisDialog diagnosis={value} />
            <DiagnosisDeleteDialog id={value.id} />
          </Box>
        );
      },
    },
  ];

  const { data: diagnosis, isLoading } = useQuery({
    queryKey: ['diagnosis'],
    queryFn: () => _axios.get('/api/Diagnosis').then((res) => res.data),
  });

  return (
    <div>
      <Table
        cols={columns}
        count={diagnosis?.length || 0}
        data={diagnosis}
        page={1}
        rowsPerPage={25}
        rowsPerPageOptions={[25, 50, 100]}
        loading={isLoading}
        title={'Список диагностики'}
        rightActions={<CreateDiagnosisDialog />}
      />
    </div>
  );
};

export default DiagnosisList;
