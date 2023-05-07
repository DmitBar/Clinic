import React from 'react';
import { Formik } from 'formik';
import { Appointment } from '..';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
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
import AnimalSelect from '../animals/AnimalSelect';
import { LoadingButton } from '@mui/lab';

const ownerValidationSchema = Yup.object().shape({});

export const editAppointment = async (appointment: Appointment) => {
  const { data } = await _axios.put(
    `api/Appointment/${appointment.id}`,
    appointment
  );
  return data;
};

interface AppointmentFormProps {
  appointment: Appointment;
  onClose: () => void;
}

const EditAppointmentForm = ({
  appointment,
  onClose,
}: AppointmentFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: editAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Успешно изменено');
      onClose();
    },
    onError: () => {
      toast.error('Ошибка!');
    },
  });

  return (
    <Formik<Appointment>
      initialValues={appointment}
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
            error={Boolean(touched.weight && errors.weight)}
            sx={inputStyles}
          >
            <InputLabel>Вес</InputLabel>
            <OutlinedInput
              type="text"
              value={values.weight}
              name="weight"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Вес"
            />
            {touched.weight && errors.weight && (
              <FormHelperText error>{errors.weight}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.type && errors.type)}
            sx={inputStyles}
          >
            <InputLabel>Тип</InputLabel>
            <OutlinedInput
              type="text"
              value={values.type}
              name="type"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Тип"
            />
            {touched.type && errors.type && (
              <FormHelperText error>{errors.type}</FormHelperText>
            )}
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl
              fullWidth
              error={Boolean(touched.date && errors.date)}
              sx={inputStyles}
            >
              <DatePicker
                onChange={(value) => setFieldValue('date', value, true)}
                value={dayjs(values.date)}
                renderInput={(params) => (
                  <TextField label="Дата" name="date" fullWidth {...params} />
                )}
              />
              {touched.date && errors.date && (
                <FormHelperText error>{errors.date}</FormHelperText>
              )}
            </FormControl>
          </LocalizationProvider>

          <FormControl
            fullWidth
            error={Boolean(touched.doctorName && errors.doctorName)}
            sx={inputStyles}
          >
            <InputLabel>Имя доктора</InputLabel>
            <OutlinedInput
              type="text"
              value={values.doctorName}
              name="doctorName"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Имя доктора"
            />
            {touched.doctorName && errors.doctorName && (
              <FormHelperText error>{errors.doctorName}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(
              touched.examinationDescription && errors.examinationDescription
            )}
            sx={inputStyles}
          >
            <InputLabel>Описание исследования</InputLabel>
            <OutlinedInput
              type="text"
              value={values.examinationDescription}
              name="examinationDescription"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Описание исследования"
            />
            {touched.examinationDescription &&
              errors.examinationDescription && (
                <FormHelperText error>
                  {errors.examinationDescription}
                </FormHelperText>
              )}
          </FormControl>

          <AnimalSelect
            formControlStyles={{ mt: 2 }}
            selectedValue={values.animalId}
            onSelect={(id) => setFieldValue('animalId', id, true)}
          />

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

export default EditAppointmentForm;
