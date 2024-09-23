import { useState } from 'react';
import styled from 'styled-components';
import { Offer } from '../services/api';

const PaymentContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f1f1f1;
`;

const PaymentTitle = styled.h3`
  margin-bottom: 15px;
`;

const PaymentDetails = styled.p`
  margin: 5px 0;
`;

const PaymentButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface PaymentInfoProps {
  offer: Offer;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ offer }) => {
  const [isPix, setIsPix] = useState(true);

  const handlePaymentChange = () => {
    setIsPix(!isPix);
  };

  return (
    <PaymentContainer>
      <PaymentTitle>Forma de Pagamento: {isPix ? 'PIX' : 'TED'}</PaymentTitle>
      {isPix ? (
        <>
          <img src={offer.imagem_qrcode} alt="QR Code para pagamento via PIX" />
          <PaymentDetails>Chave PIX: {offer.chave_pix}</PaymentDetails>
          <PaymentDetails>FAVORECIDO: {offer.nome_favorecido}</PaymentDetails>
          <PaymentDetails>BANCO: {offer.banco}</PaymentDetails>
          <PaymentDetails>AGÊNCIA: {offer.agencia}</PaymentDetails>
          <PaymentDetails>
            CONTA CORRENTE CORRENTE: {offer.numero_conta_corrente}
          </PaymentDetails>
          <PaymentDetails>CNPJ: {offer.cnpj}</PaymentDetails>
        </>
      ) : (
        <>
          <PaymentDetails>BANCO: {offer.banco}</PaymentDetails>
          <PaymentDetails>AGÊNCIA: {offer.agencia}</PaymentDetails>
          <PaymentDetails>
            CONTA CORRENTE CORRENTE: {offer.numero_conta_corrente}
          </PaymentDetails>
          <PaymentDetails>CNPJ: {offer.cnpj}</PaymentDetails>
        </>
      )}
      <PaymentButton onClick={handlePaymentChange}>
        {isPix ? 'Mudar para TED' : 'Mudar para PIX'}
      </PaymentButton>
    </PaymentContainer>
  );
};
