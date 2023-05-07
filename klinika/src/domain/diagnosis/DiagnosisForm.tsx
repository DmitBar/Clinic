import React from 'react';
import { Formik } from 'formik';
import { Diagnosis } from '..';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { inputStyles } from '../../components/LoginForm/styles';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import _axios from '../../utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import AppointmentSelect from '../appointments/AppointmentSelect';

const ownerValidationSchema = Yup.object().shape({
  description: Yup.string().required('Обязательное поле'),
  appointmentId: Yup.number().required('Обязательное поле'),
  price: Yup.string().required('Обязательное поле'),
  medicines: Yup.string().required('Обязательное поле'),
});

type DiagnosisFormType = Omit<Omit<Diagnosis, 'id'>, 'appointment'>;

export const createDiagnosis = async (diagnosis: DiagnosisFormType) => {
  const { data } = await _axios.post('api/Diagnosis', diagnosis);
  return data;
};

interface DiagnosisFormProps {
  onClose: () => void;
}

const DiagnosisForm = ({ onClose }: DiagnosisFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createDiagnosis, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosis'] });
      toast.success('Диагноз успешно создан');
      onClose();
    },
    onError: () => {
      toast.error('Произошла ошибка при создании диагноза');
    },
  });

  return (
    <Formik<DiagnosisFormType>
      initialValues={{
        description: '',
        medicines: '',
        price: '',
        appointmentId: 0,
      }}
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
            error={Boolean(touched.description && errors.description)}
            sx={inputStyles}
          >
            <InputLabel>Описание</InputLabel>
            <OutlinedInput
              type="text"
              value={values.description}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Описание"
            />
            {touched.description && errors.description && (
              <FormHelperText error>{errors.description}</FormHelperText>
            )}
          </FormControl>

          <AppointmentSelect
            formControlStyles={{ mt: 2 }}
            selectedValue={values.appointmentId}
            onSelect={(id) => setFieldValue('appointmentId', id)}
          />

          <FormControl
            fullWidth
            error={Boolean(touched.medicines && errors.medicines)}
            sx={inputStyles}
          >
            <InputLabel>Лекарства</InputLabel>
            <OutlinedInput
              type="medicines"
              value={values.medicines}
              name="medicines"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Лекарства"
            />
            {touched.medicines && errors.medicines && (
              <FormHelperText error>{errors.medicines}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.price && errors.price)}
            sx={inputStyles}
          >
            <InputLabel>Цена</InputLabel>
            <OutlinedInput
              type="text"
              value={values.price}
              name="price"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Цена"
            />
            {touched.price && errors.price && (
              <FormHelperText error>{errors.price}</FormHelperText>
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

export default DiagnosisForm;
