import React from 'react';
import { Formik } from 'formik';
import { Animal } from '..';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { inputStyles } from '../../components/LoginForm/styles';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import _axios from '../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import OwnersSelect from '../owners/OwnersSelect';
import { LoadingButton } from '@mui/lab';

const animalValidationSchema = Yup.object().shape({});

type AnimalFormType = Omit<Omit<Animal, 'id'>, 'owner'>;

interface AnimalFormProps {
  onClose: () => void;
}

export const createAnimal = async (animal: AnimalFormType) => {
  const { data } = await _axios.post('api/Animal', animal, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

const AnimalForm = ({ onClose }: AnimalFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
      toast.success('Успешно создано');
      onClose();
    },
    onError: () => {
      toast.error('Ошибка!');
    },
  });

  return (
    <Formik<AnimalFormType>
      initialValues={{
        //@ts-ignore
        image: '',
        name: '',
        species: '',
        gender: '',
        birthDate: dayjs().toDate().toDateString(),
        age: 0,
        breed: '',
        color: '',
        ownerId: 1,
      }}
      validationSchema={animalValidationSchema}
      onSubmit={(values) => mutate(values)}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            error={Boolean(touched.name && errors.name)}
            sx={inputStyles}
          >
            <InputLabel>Имя</InputLabel>
            <OutlinedInput
              type="text"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Имя"
            />
            {touched.name && errors.name && (
              <FormHelperText error>{errors.name}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.image && errors.image)}
            sx={{ py: 2 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="image" style={{ color: '#9e9e9e' }}>
                Фото
              </label>
              <input
                style={{ marginTop: '6px' }}
                type="file"
                value={undefined}
                name="image"
                onBlur={handleBlur}
                onChange={(event) => {
                  //@ts-ignore
                  setFieldValue('image', event.target.files[0]);
                }}
              />
              {touched.image && errors.image && (
                <FormHelperText error>{errors.image}</FormHelperText>
              )}
            </Box>
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.species && errors.species)}
            sx={inputStyles}
          >
            <InputLabel>Вид</InputLabel>
            <OutlinedInput
              type="species"
              value={values.species}
              name="species"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Вид"
            />
            {touched.species && errors.species && (
              <FormHelperText error>{errors.species}</FormHelperText>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl
              fullWidth
              error={Boolean(touched.birthDate && errors.birthDate)}
              sx={inputStyles}
            >
              <DatePicker
                onChange={(value) => setFieldValue('birthDate', value, true)}
                value={dayjs(values.birthDate)}
                renderInput={(params) => (
                  <TextField
                    label="Дата рождения"
                    name="birthDate"
                    fullWidth
                    {...params}
                  />
                )}
              />
              {touched.birthDate && errors.birthDate && (
                <FormHelperText error>{errors.birthDate}</FormHelperText>
              )}
            </FormControl>
          </LocalizationProvider>

          <OwnersSelect
            formControlStyles={{ mt: 2 }}
            onSelectOwner={(id) => setFieldValue('ownerId', id)}
            selectedOwner={values.ownerId}
          />

          <FormControl
            fullWidth
            error={Boolean(touched.gender && errors.gender)}
            sx={inputStyles}
          >
            {!values.gender && <InputLabel>Гендер</InputLabel>}

            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={values.gender}
              name="gender"
              label="Гендер"
              onChange={handleChange}
            >
              <MenuItem value={'man'}>Мужской</MenuItem>
              <MenuItem value={'woman'}>Женский</MenuItem>
            </Select>
            {touched.gender && errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.breed && errors.breed)}
            sx={inputStyles}
          >
            <InputLabel>Порода</InputLabel>
            <OutlinedInput
              type="text"
              value={values.breed}
              name="breed"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Порода"
            />
            {touched.breed && errors.breed && (
              <FormHelperText error>{errors.breed}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.color && errors.color)}
            sx={inputStyles}
          >
            <InputLabel>Цвет</InputLabel>
            <OutlinedInput
              type="text"
              value={values.color}
              name="color"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Цвет"
            />
            {touched.color && errors.color && (
              <FormHelperText error>{errors.color}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.age && errors.age)}
            sx={inputStyles}
          >
            <InputLabel>Возраст</InputLabel>
            <OutlinedInput
              type="number"
              value={values.age}
              name="age"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Возраст"
            />
            {touched.age && errors.age && (
              <FormHelperText error>{errors.age}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <LoadingButton
              disableElevation
              sx={{ textTransform: 'none' }}
              loading={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Создать
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AnimalForm;
