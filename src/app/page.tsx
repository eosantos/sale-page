'use client';

import { Sidebar } from '../app/components/Sidebar';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

export default function Home() {
  return (
    <>
      <MainContainer>
        <Sidebar />
      </MainContainer>
    </>
  );
}
