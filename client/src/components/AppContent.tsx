import React from 'react';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';
import RegistrationsList from './RegistrationsList';
import RegistrationForm from './RegistrationForm';

const AppContent = ({ auth }: IAppNavbar) => {
  console.log('auth', auth)
  return (
    <div>
      <Container>
        {auth && auth.isAuthenticated ? < RegistrationsList /> : <RegistrationForm />}
      </Container>
  </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppContent);
