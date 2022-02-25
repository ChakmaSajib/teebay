import { Navigate } from 'react-router';
import React from 'react';

export default function PrivateRoute({ children }) {
  if (!localStorage.getItem('token')) {
    return <Navigate to='/signin' replace />;
  }

  return children;
}
