import React from 'react';
import styled from 'styled-components';
import { Offer } from '../../services/api';

const PaymentDetailsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 60%;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;

const PaymentDetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PaymentDetailTitle = styled.p`
  margin-bottom: 0;
`;

const PaymentDetail = styled.p`
  margin-bottom: 50px;
`;

const PaymentDetails: React.FC<{ offer: Offer }> = ({ offer }) => (
  <PaymentDetailsContainer>
    <PaymentDetailsColumn>
      <PaymentDetailTitle>CHAVE PIX (CNPJ)</PaymentDetailTitle>
      <PaymentDetail>{offer.cnpj}</PaymentDetail>
      <PaymentDetailTitle>BANCO</PaymentDetailTitle>
      <PaymentDetail>{offer.banco}</PaymentDetail>
      <PaymentDetailTitle>CONTA CORRENTE</PaymentDetailTitle>
      <PaymentDetail>{offer.numero_conta_corrente}</PaymentDetail>
    </PaymentDetailsColumn>
    <PaymentDetailsColumn>
      <PaymentDetailTitle>FAVORECIDO</PaymentDetailTitle>
      <PaymentDetail>{offer.nome_favorecido}</PaymentDetail>
      <PaymentDetailTitle>AGÊNCIA</PaymentDetailTitle>
      <PaymentDetail>{offer.agencia}</PaymentDetail>
      <PaymentDetailTitle>CNPJ</PaymentDetailTitle>
      <PaymentDetail>{offer.cnpj}</PaymentDetail>
    </PaymentDetailsColumn>
  </PaymentDetailsContainer>
);

export default PaymentDetails;
