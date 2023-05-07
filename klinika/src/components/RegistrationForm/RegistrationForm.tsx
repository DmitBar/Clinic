import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { localStorageManager } from '../../utils/localStorageManager';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

import { inputStyles, mainCardStyles } from './styles';
import * as Yup from 'yup';
import { MainCard } from '../MainCard/MainCard';
import _axios from '../../utils/axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type Dayjs } from 'dayjs';
import { parseJwt } from '../../utils';

const loginValidationSchema = Yup.object().shape({
  fullName: Yup.string().max(255).required('Full name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  position: Yup.string().max(255).required('Position is required'),
  qualification: Yup.string().max(255).required('Qualification is required'),
  role: Yup.number().required('Role is required'),
  username: Yup.string().max(255).required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

export interface IRegisterResponse {
  jWtToken: string;
}
export interface IRegister {
  fullName: string;
  dateOfBirth: Dayjs | null;
  position: string;
  qualification: string;
  username: string;
  password: string;
  role: number;
}

export const register = async (user: IRegister) => {
  const { data } = await _axios.post<IRegisterResponse>(
    'api/Auth/register',
    user
  );
  return data;
};

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: IRegister) => {
    try {
      await register(values);
      toast.success('Успешная регистрация');
      navigate('/');
    } catch (error) {
      toast.error('Ошибка регистрации');
    }
  };

  useEffect(() => {
    const token = localStorageManager.getItem('token');
    if (!token) {
      navigate('/');
    }

    const role =
      parseJwt(token)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] ?? false;

    if (role !== 'Registrar') {
      navigate('/');
    }
  }, []);

  return (
    <MainCard sx={mainCardStyles} content={false}>
      <Box sx={{ p: 6 }}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
          mb={5}
        >
          Регистрация
        </Grid>

        <Formik<IRegister>
          initialValues={{
            fullName: '',
            dateOfBirth: null,
            position: '',
            qualification: '',
            username: '',
            password: '',
            role: 0,
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
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
                  label="Полноеимя"
                />
                {touched.fullName && errors.fullName && (
                  <FormHelperText error>{errors.fullName}</FormHelperText>
                )}
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                  sx={inputStyles}
                >
                  <DatePicker
                    onChange={(value) =>
                      setFieldValue('dateOfBirth', value, true)
                    }
                    value={values.dateOfBirth}
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
                error={Boolean(touched.position && errors.position)}
                sx={inputStyles}
              >
                <InputLabel>Позиция</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.position}
                  name="position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Позиция"
                />
                {touched.position && errors.position && (
                  <FormHelperText error>{errors.position}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.qualification && errors.qualification)}
                sx={inputStyles}
              >
                <InputLabel>Квалификация</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.qualification}
                  name="qualification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Квалификация"
                />
                {touched.qualification && errors.qualification && (
                  <FormHelperText error>{errors.qualification}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.role && errors.role)}
                sx={inputStyles}
              >
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={values.role}
                  name="role"
                  label="Роль"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Глав. Врач</MenuItem>
                  <MenuItem value={1}>Врач</MenuItem>
                  <MenuItem value={2}>Регистратор</MenuItem>
                </Select>
                {touched.role && errors.role && (
                  <FormHelperText error>{errors.role}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.username && errors.username)}
                sx={inputStyles}
              >
                <InputLabel>Никнейм</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Никнейм"
                />
                {touched.username && errors.username && (
                  <FormHelperText error>{errors.username}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                sx={inputStyles}
              >
                <InputLabel>Пароль</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Пароль"
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  sx={{ textTransform: 'none' }}
                  disabled={false}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Регистрация
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </MainCard>
  );
};
