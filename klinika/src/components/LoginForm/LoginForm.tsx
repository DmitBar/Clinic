import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { localStorageManager } from '../../utils/localStorageManager';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import { inputStyles, mainCardStyles } from './styles';
import * as Yup from 'yup';
import { MainCard } from '../MainCard/MainCard';
import _axios from '../../utils/axios';
import { LoadingButton } from '@mui/lab';

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().max(255).required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

export interface ILoginResponse {
  jWtToken: string;
}
export interface ILogin {
  username: string;
  password: string;
  remember?: boolean;
}

export const login = async (user: ILogin) => {
  const { data } = await _axios.post<ILoginResponse>('api/Auth/login', user);
  return data;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: ILogin) => {
    setLoading(true);
    try {
      const data = await login(values);
      localStorageManager.setItem('token', data.jWtToken);
      toast.success('Успешный вход в систему');
      navigate('/');
    } catch (error) {
      toast.error('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

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
          Клиника
        </Grid>

        <Formik<ILogin>
          initialValues={{
            username: '',
            password: '',
            remember: false,
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
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.username && errors.username)}
                sx={inputStyles}
              >
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.username}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Username"
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
                <InputLabel>Password</InputLabel>
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
                  label="Password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.remember}
                    onChange={handleChange}
                    name="remember"
                    color="primary"
                  />
                }
                label="Запомнить меня"
              />

              <Box sx={{ mt: 2 }}>
                <LoadingButton
                  disableElevation
                  sx={{ textTransform: 'none' }}
                  loading={loading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Вход в систему
                </LoadingButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </MainCard>
  );
};
