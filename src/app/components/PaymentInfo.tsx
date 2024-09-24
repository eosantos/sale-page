import { useState } from 'react';
import styled from 'styled-components';
import { Offer } from '../services/api';
import QRCodeGenerator from './QRCodeGenerator';

const PaymentContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: #f1f1f1;
  position: relative;
`;

const PaymentHeader = styled.div`
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

const PaymentContent = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
  justify-content: space-around;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const QRCodeContainer = styled.div`
  text-align: center;
  display: grid;
  justify-items: center;
`;

const TedDetailContainer = styled.div`
  width: 350px;
  display: grid;
  border-radius: 10px;
  justify-items: start;
  background-color: #fff;
  padding: 20px;

  @media (max-width: 1245px) {
    margin-bottom: 20px;
  }
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: #015047;
`;

const UnderlinedText = styled(HighlightedText)`
  text-decoration: underline;
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
    props.$copied && // Alterado para '$copied'
    `
    background-color: #dff0d8;
    color: #3c763d;
    border-color: #d6e9c6;
  `}
`;

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

const ChangePaymentMethod = styled.p`
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

interface PaymentInfoProps {
  offer: Offer;
}

export const PaymentInfo: React.FC<PaymentInfoProps> = ({ offer }) => {
  const [isPix, setIsPix] = useState(true);
  const [copied, setCopied] = useState(false);

  const handlePaymentChange = () => {
    setIsPix(!isPix);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(offer.chave_pix);
    setCopied(true);

    // Volta o texto do botão para "Copiar Chave PIX" após 5 segundos
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <PaymentContainer>
      <PaymentHeader>
        <PaymentState>{isPix ? 'PIX' : 'TED'}</PaymentState>
        <MinimizeIcon>—</MinimizeIcon>
      </PaymentHeader>
      <PaymentContent>
        {isPix ? (
          <>
            <QRCodeContainer>
              <QRCodeGenerator offer={offer} />
              <CopyButton $copied={copied} onClick={copyToClipboard}>
                {copied ? 'Copiado!' : 'Copiar Chave PIX'}
              </CopyButton>
            </QRCodeContainer>
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
          </>
        ) : (
          <>
            <TedDetailContainer>
              {/* Parte 1 */}
              <Title>
                TEDs são válidos mas{' '}
                <HighlightedText>
                  possuem desvantagens em relação a Chave PIX.{' '}
                </HighlightedText>
                Sendo essas:
              </Title>

              <Subtopic>• Serão cobradas taxas pela transação</Subtopic>
              <Subtopic>• Tempo para concluir o pagamento será maior</Subtopic>

              <Recommendation>
                Por esses motivos, recomendamos que utilize a
                <UnderlinedText> CHAVE PIX </UnderlinedText> como método de
                pagamento.
              </Recommendation>
            </TedDetailContainer>
            <PaymentDetailsContainer>
              <PaymentDetailsColumn>
                <PaymentDetailTitle>BANCO</PaymentDetailTitle>
                <PaymentDetail>{offer.banco}</PaymentDetail>
                <PaymentDetailTitle>CONTA CORRENTE</PaymentDetailTitle>
                <PaymentDetail>{offer.numero_conta_corrente}</PaymentDetail>
                <PaymentDetailTitle>AGÊNCIA</PaymentDetailTitle>
                <PaymentDetail>{offer.agencia}</PaymentDetail>
              </PaymentDetailsColumn>
              <PaymentDetailsColumn>
                <PaymentDetailTitle>FAVORECIDO</PaymentDetailTitle>
                <PaymentDetail>{offer.nome_favorecido}</PaymentDetail>
                <PaymentDetailTitle>CNPJ</PaymentDetailTitle>
                <PaymentDetail>{offer.cnpj}</PaymentDetail>
              </PaymentDetailsColumn>
            </PaymentDetailsContainer>
          </>
        )}
      </PaymentContent>
      <ChangePaymentMethod onClick={handlePaymentChange}>
        MUDAR FORMA DE PAGAMENTO
      </ChangePaymentMethod>
    </PaymentContainer>
  );
};
