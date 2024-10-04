import React from 'react';
import styled from 'styled-components';

const ChangePaymentMethodText = styled.p`
  text-align: left;
  color: #212121;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #8c8c8c;
  }

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const PaymentChangeMethod: React.FC<{ onClick: () => void }> = ({
  onClick
}) => (
  <ChangePaymentMethodText onClick={onClick}>
    MUDAR FORMA DE PAGAMENTO
  </ChangePaymentMethodText>
);

export default PaymentChangeMethod;
