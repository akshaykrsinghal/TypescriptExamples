import React from 'react';
import styled from 'styled-components';
import Login from 'Components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from 'Components/Navbar';
import ErrorPage from 'Components/ErrorPage';
import PrivateRoute from './config/privateRoutes';

const Wrapper = styled.div`
  height: 100%;
`;
function App() {
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/" element={<PrivateRoute Component={Navbar} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
