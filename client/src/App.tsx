import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './flux/store';
import { loadUser } from './flux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppContent from './components/AppContent';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppNavbar />
          <AppContent />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
