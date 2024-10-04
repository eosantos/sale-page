import styled from 'styled-components';
import { Offer } from '../../services/api';

interface OfferDateValueProps {
  offer: Offer;
}

const OfferDateValueContainer = styled.div`
  display: flex;
  gap: 0px;

  @media (max-width: 1175px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const ValidityBox = styled.div`
  width: 200px;
  height: 60px;
  background-color: #f5f7f9;
  border-radius: 10px 0 0 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ddd;
  align-items: center;

  @media (max-width: 1175px) {
    border-radius: 10px 10px 0 0;
  }
`;

const ValueBox = styled.div`
  width: 200px;
  height: 60px;
  background-color: #015047;
  color: white;
  border-radius: 0 10px 10px 0;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1175px) {
    border-radius: 0 0 10px 10px;
  }
`;

const OfferInfo = styled.p`
  margin: 5px 0;
  font-size: 20px;
  font-weight: bold;
`;

const OfferInfoTitle = styled.p`
  margin: 5px 0;
  font-size: 12px;
`;

const OfferDateValue: React.FC<OfferDateValueProps> = ({ offer }) => {
  const formattedValue = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <OfferDateValueContainer>
      <ValidityBox>
        <OfferInfoTitle>PAGAMENTO VÁLIDO ATÉ:</OfferInfoTitle>
        <OfferInfo>{offer.validade}</OfferInfo>
      </ValidityBox>
      <ValueBox>
        <OfferInfoTitle>VALOR:</OfferInfoTitle>
        <OfferInfo>{formattedValue(offer.valor_a_ser_liquidado)}</OfferInfo>
      </ValueBox>
    </OfferDateValueContainer>
  );
};

export default OfferDateValue;
