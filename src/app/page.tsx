'use client';

import { useEffect, useState } from 'react';
import { Header } from '../app/components/Header';
import { Sidebar } from '../app/components/Sidebar';
import { fetchOffers, Offer } from '../app/services/api';
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
          <h1>Você está quase lá</h1>
          {error && <p>{error}</p>}
          {offers.map((offer, index) => (
            <div key={index}>
              <h2>{offer.nome_oferta}</h2>
              <p>{offer.slogan}</p>
              <p>Status: {offer.status}</p>
              <p>Valor a ser liquidado: R$ {offer.valor_a_ser_liquidado}</p>
              <p>Validade: {offer.validade}</p>
              <img src={offer.imagem_qrcode} alt="QR Code" />
            </div>
          ))}
        </Content>
      </MainContainer>
    </>
  );
}
