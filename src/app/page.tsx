'use client';

import { Header } from '../app/components/Header';
import { Sidebar } from '../app/components/Sidebar';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

export default function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <Sidebar />
        <Content>
          <h1>Você está quase lá</h1>
          <p>Finalize seu investimento seguindo as instruções abaixo.</p>
        </Content>
      </MainContainer>
    </>
  );
}
