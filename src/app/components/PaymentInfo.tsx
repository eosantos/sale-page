import React, { useState } from 'react';
import styled from 'styled-components';
import { Offer } from '../services/api';
import PaymentHeader from './PaymentHeader';
import PaymentQRCode from './PaymentQRCode';
import PaymentDetails from './PaymentDetails';
import PaymentTedDetail from './PaymentTedDetail';
import PaymentChangeMethod from './PaymentChangeMethod';

const PaymentContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: #f1f1f1;
  position: relative;
`;

const PaymentContent = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin: 30px 0 0 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 30px;
  }
`;

export const PaymentInfo: React.FC<{ offer: Offer }> = ({ offer }) => {
  const [isPix, setIsPix] = useState(true);
  const [copied, setCopied] = useState(false);

  const handlePaymentChange = () => setIsPix(!isPix);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(offer.chave_pix);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <PaymentContainer>
      <PaymentHeader isPix={isPix} />
      <PaymentContent>
        {isPix ? (
          <PaymentQRCode
            offer={offer}
            copied={copied}
            copyToClipboard={copyToClipboard}
          />
        ) : (
          <PaymentTedDetail />
        )}
        <PaymentDetails offer={offer} />
      </PaymentContent>
      <PaymentChangeMethod onClick={handlePaymentChange} />
    </PaymentContainer>
  );
};

export default PaymentInfo;
