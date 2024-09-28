import React from 'react';
import styled from 'styled-components';

const TedDetailContainer = styled.div`
  width: 350px;
  display: grid;
  border-radius: 10px;
  justify-items: start;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 500;
`;

const Subtopic = styled.p`
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  font-weight: 500;
`;

const Recommendation = styled.p`
  margin: 0;
  font-weight: 500;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: #015047;
`;

const UnderlinedText = styled(HighlightedText)`
  text-decoration: underline;
`;

const PaymentTedDetail: React.FC = () => (
  <TedDetailContainer>
    <Title>
      TEDs são válidos mas{' '}
      <HighlightedText>
        possuem desvantagens em relação à Chave PIX.
      </HighlightedText>{' '}
      Sendo essas:
    </Title>
    <Subtopic>• Serão cobradas taxas pela transação</Subtopic>
    <Subtopic>• O tempo para concluir o pagamento será maior</Subtopic>
    <Recommendation>
      Por esses motivos, recomendamos que utilize a
      <UnderlinedText> CHAVE PIX </UnderlinedText> como método de pagamento.
    </Recommendation>
  </TedDetailContainer>
);

export default PaymentTedDetail;
