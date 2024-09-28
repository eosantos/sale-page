import React from 'react';
import styled from 'styled-components';

const PaymentHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
`;

const PaymentState = styled.h3`
  color: white;
  font-size: 16px;
`;

const MinimizeIcon = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

const PaymentHeader: React.FC<{ isPix: boolean }> = ({ isPix }) => (
  <PaymentHeaderContainer>
    <PaymentState>{isPix ? 'PIX' : 'TED'}</PaymentState>
    <MinimizeIcon>—</MinimizeIcon>
  </PaymentHeaderContainer>
);

export default PaymentHeader;
