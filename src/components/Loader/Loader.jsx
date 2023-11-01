import React from 'react';
import { LineWave } from 'react-loader-spinner';
import styled from 'styled-components';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <StyledLoader>
      <LineWave
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor="blue"
        middleLineColor="yellow"
        lastLineColor="black"
      />
    </StyledLoader>
  );
};

export default Loader;