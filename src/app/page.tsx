'use client';

import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Sidebar } from '../app/components/Sidebar';
import { fetchOffers, Offer } from '../app/services/api';
import { OfferDetail } from '../app/components/OfferDetail';
import { PaymentInfo } from './components/PaymentInfo';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (error) {
        setError('Erro ao carregar ofertas');
      }
    };

    getOffers();
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
        <Sidebar />
        <Content>
          <h1>Você está quase lá!</h1>
          {error && <p>{error}</p>}
          {offers.map((offer, index) => (
            <div key={index}>
              <OfferDetail offer={offer} />
              <PaymentInfo offer={offer} />
            </div>
          ))}
        </Content>
      </MainContainer>
    </>
  );
}
