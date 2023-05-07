import React from 'react';
import { NotFound } from '../components/NotFound';
import Layout from '../components/layout/Layout';
import { Login } from '../components/Login';
import { Registration } from '../components/Registration';
import OwnersList from '../domain/owners/OwnersList';
import AppointmentsList from '../domain/appointments/AppointmentsList';
import AnimalsList from '../domain/animals/AnimalsList';
import DiagnosisList from '../domain/diagnosis/DiagnosisList';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'owners',
        children: [
          {
            index: true,
            element: <div>Owners</div>,
          },
          {
            path: 'list',
            element: <OwnersList />,
          },
        ],
      },
      {
        path: 'appointments',
        children: [
          {
            index: true,
            element: <div>Appointments</div>,
          },
          {
            path: 'list',
            element: <AppointmentsList />,
          },
        ],
      },
      {
        path: 'animals',
        children: [
          {
            index: true,
            element: <div>Animals</div>,
          },
          {
            path: 'list',
            element: <AnimalsList />,
          },
        ],
      },
      {
        path: 'diagnoses',
        children: [
          {
            index: true,
            element: <div>Diagnosis</div>,
          },
          {
            path: 'list',
            element: <DiagnosisList />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Registration />,
  },
];

export default routes;
