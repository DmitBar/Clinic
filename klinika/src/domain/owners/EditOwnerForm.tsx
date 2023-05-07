import React from 'react';
import { Formik } from 'formik';
import { Owner } from '..';
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
import { LoadingButton } from '@mui/lab';

const ownerValidationSchema = Yup.object().shape({});

export const editOwner = async (owner: Owner) => {
  const { data } = await _axios.put(`api/Owner/${owner.id}`, owner);
  return data;
};

interface OwnerFormProps {
  owner: Owner;
  onClose: () => void;
}

const EditOwnerForm = ({ owner, onClose }: OwnerFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: editOwner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owners'] });
      toast.success('Успешно изменено');
      onClose();
    },
    onError: () => {
      toast.error('Ошибка!');
    },
  });

  return (
    <Formik<Owner>
      initialValues={owner}
      validationSchema={ownerValidationSchema}
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
            error={Boolean(touched.fullName && errors.fullName)}
            sx={inputStyles}
          >
            <InputLabel>Полное имя</InputLabel>
            <OutlinedInput
              type="text"
              value={values.fullName}
              name="fullName"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Полное имя"
            />
            {touched.fullName && errors.fullName && (
              <FormHelperText error>{errors.fullName}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            sx={inputStyles}
          >
            <InputLabel>Эл. почта</InputLabel>
            <OutlinedInput
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Эл. почта"
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl
              fullWidth
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              sx={inputStyles}
            >
              <DatePicker
                onChange={(value) => setFieldValue('dateOfBirth', value, true)}
                value={dayjs(values.dateOfBirth)}
                renderInput={(params) => (
                  <TextField
                    label="Дата рождения"
                    name="dateOfBirth"
                    fullWidth
                    {...params}
                  />
                )}
              />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <FormHelperText error>{errors.dateOfBirth}</FormHelperText>
              )}
            </FormControl>
          </LocalizationProvider>

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
              <MenuItem value={'transgender'}>Что то между ними</MenuItem>
            </Select>
            {touched.gender && errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.typeofdocument && errors.typeofdocument)}
            sx={inputStyles}
          >
            <InputLabel>Тип документа</InputLabel>
            <OutlinedInput
              type="text"
              value={values.typeofdocument}
              name="typeofdocument"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Тип документа"
            />
            {touched.typeofdocument && errors.typeofdocument && (
              <FormHelperText error>{errors.typeofdocument}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.serialNumber && errors.serialNumber)}
            sx={inputStyles}
          >
            <InputLabel>Серия документа</InputLabel>
            <OutlinedInput
              type="text"
              value={values.serialNumber}
              name="serialNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Серия документа"
            />
            {touched.serialNumber && errors.serialNumber && (
              <FormHelperText error>{errors.serialNumber}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.telephone && errors.telephone)}
            sx={inputStyles}
          >
            <InputLabel>Номер телефона</InputLabel>
            <OutlinedInput
              type="tel"
              value={values.telephone}
              name="telephone"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Номер телефона"
            />
            {touched.telephone && errors.telephone && (
              <FormHelperText error>{errors.telephone}</FormHelperText>
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
              Изменить
            </LoadingButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditOwnerForm;
