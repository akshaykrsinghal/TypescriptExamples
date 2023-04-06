import React from 'react';
import Navbar from 'Components/Navbar';
import styled from 'styled-components';

function App() {
  const Wrapper = styled.div`
    background-color: #f2f2f2;
    height: 100%;
  `;

  return (
    <Wrapper>
      <Navbar />
    </Wrapper>
  );
}

export default App;
