import React from 'react';
import styled from 'styled-components';
import { Offer } from '../../services/api';
import QRCodeGenerator from './../QRCodeGenerator';

const QRCodeContainer = styled.div`
  text-align: center;
  display: grid;
  justify-items: center;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  width: 245px;
  height: 45px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #212121;
  cursor: pointer;
  border-radius: 5px;

  @media (max-width: 1024px) {
    text-align: center;
    margin: 20px 0 30px 0;
  }

  &:hover {
    background-color: #e7f3ff;
  }

  ${(props) =>
    props.$copied &&
    `
    background-color: #dff0d8;
    color: #3c763d;
    border-color: #d6e9c6;
  `}
`;

const PaymentQRCode: React.FC<{
  offer: Offer;
  copied: boolean;
  copyToClipboard: () => void;
}> = ({ offer, copied, copyToClipboard }) => (
  <QRCodeContainer>
    <QRCodeGenerator offer={offer} />
    <CopyButton $copied={copied} onClick={copyToClipboard}>
      {copied ? 'Copiado!' : 'Copiar Chave PIX'}
    </CopyButton>
  </QRCodeContainer>
);

export default PaymentQRCode;
