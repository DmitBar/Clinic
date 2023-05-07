import React from 'react';
import { ITableCol, Table } from '../../components/Table';
import { Animal } from '..';
import _axios from '../../utils/axios';
import CreateAnimalDialog from './CreateAnimalDialog';
import { useQuery } from '@tanstack/react-query';
import AnimalDeleteDialog from './AnimalDeleteDialog';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import EditAnimalDialog from './EditAnimalDialog';
import AnimalImageDialog from './AnimalImageDialog';

function AnimalsList() {
  const [open, setOpen] = React.useState(false);
  const [animal, setAnimal] = React.useState<Animal | null>(null);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  const columns: Array<ITableCol<Animal>> = [
    {
      label: 'Имя',
      accessor: 'name',
    },
    {
      label: 'Вид',
      accessor: 'species',
    },
    {
      label: 'Дата рождения',
      accessor: 'birthDate',
      renderCell(value: Animal) {
        return <div>{dayjs(value.birthDate).format('YYYY-MM-DD')}</div>;
      },
    },
    {
      label: 'Порода',
      accessor: 'breed',
    },
    {
      label: 'Возраст',
      accessor: 'age',
    },
    {
      label: 'Пол',
      accessor: 'gender',
    },
    {
      label: 'Цвет',
      accessor: 'color',
    },
    {
      label: 'Имя владельца',
      accessor: 'owner',
      renderCell: (animal: Animal) => <div>{animal.owner?.fullName}</div>,
    },
    {
      label: 'Действии',
      renderCell: (value: Animal) => {
        return (
          <Box sx={{ display: 'flex' }}>
            <EditAnimalDialog animal={value} />
            <AnimalDeleteDialog id={value.id} />
          </Box>
        );
      },
    },
  ];

  const { data: animals, isLoading } = useQuery({
    queryKey: ['animals'],
    queryFn: () => _axios.get('/api/Animal').then((res) => res.data),
  });

  const handleOpenAnimalDetails = (animal: Animal) => {
    setAnimal(animal);
    handleToggleDialog();
  };

  return (
    <div>
      <Table
        cols={columns}
        count={animals?.length || 0}
        data={animals}
        onRowClick={handleOpenAnimalDetails}
        page={1}
        rowsPerPage={25}
        rowsPerPageOptions={[25, 50, 100]}
        loading={isLoading}
        title={'Список животных'}
        interactive
        rightActions={<CreateAnimalDialog />}
      />

      <AnimalImageDialog
        animal={animal}
        open={open}
        onClose={handleToggleDialog}
      />
    </div>
  );
}

export default AnimalsList;
