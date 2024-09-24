import styled from 'styled-components';
import { FaFileContract, FaBan, FaMoneyBill, FaClock } from 'react-icons/fa';

const ConsiderationsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between; /* Para distribuir os cards igualmente */
  flex-wrap: wrap; /* Para garantir que os cards se ajustem em telas menores */
`;

const ConsiderationItem = styled.div`
  flex-direction: column;
  align-items: center;
  width: 22%; /* Para garantir 4 cards por linha */
  margin-bottom: 20px;
  text-align: left; /* Alinha o conteúdo à esquerda */
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 1024px) {
    width: 48%; /* 2 cards por linha em telas menores */
  }

  @media (max-width: 768px) {
    width: 100%; /* 1 card por linha em telas pequenas */
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
  font-size: 40px;
  color: green;
  text-align: left;
`;

const TextWrapper = styled.p`
  text-align: left;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const ConsiderationsTitle = styled.h3`
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  color: #015047;
`;

const parseBoldText = (text: string) => {
  const parts = text.split('*');
  return parts.map((part, index) =>
    index % 2 === 1 ? <BoldText key={index}>{part}</BoldText> : part
  );
};

export const ImportantConsiderations: React.FC = () => {
  return (
    <ConsiderationsContainer>
      <ConsiderationsTitle>CONSIDERAÇÕES IMPORTANTES</ConsiderationsTitle>
      <ConsiderationItem>
        <IconWrapper>
          <FaFileContract />
        </IconWrapper>
        <TextWrapper>
          {parseBoldText(
            'Você pode fazer transações de diferentes contas, porém, *elas precisam* ter a *mesma titularidade* de que, *assinou o contrato de investimento*'
          )}
        </TextWrapper>
      </ConsiderationItem>
      <ConsiderationItem>
        <IconWrapper>
          <FaBan />
        </IconWrapper>
        <TextWrapper>
          {parseBoldText(
            '*Nunca enviamos* boletos ou pedidos de pagamentos via WhatsApp'
          )}
        </TextWrapper>
      </ConsiderationItem>
      <ConsiderationItem>
        <IconWrapper>
          <FaMoneyBill />
        </IconWrapper>
        <TextWrapper>
          {parseBoldText('Não é permitido *pagamento em espécie* (dinheiro)')}
        </TextWrapper>
      </ConsiderationItem>
      <ConsiderationItem>
        <IconWrapper>
          <FaClock />
        </IconWrapper>
        <TextWrapper>
          {parseBoldText(
            'Transferências via PIX realizadas entre *20h* e *6h* podem sofrer limitações'
          )}
        </TextWrapper>
      </ConsiderationItem>
    </ConsiderationsContainer>
  );
};
