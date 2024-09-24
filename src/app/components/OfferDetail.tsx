import styled from 'styled-components';
import { Offer } from '../services/api';
import Image from 'next/image';
import logoImage from '../assets/avatar-padrao.png';

const OfferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 25px;
  border-radius: 8px;
  background-color: #f9f9f9;

  @media (max-width: 1175px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OfferDetails = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 1175px) {
    margin-left: 0;
    text-align: center;
  }
`;

const OfferTitle = styled.h2`
  color: #015047;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const OfferName = styled.h2`
  color: #373737;
  font-size: 22px;
  margin-bottom: 5px;
`;

const OfferSubtitle = styled.p`
  color: #373737;
  font-size: 18px;
  margin-bottom: 10px;
`;

const OfferText = styled.p`
  color: #373737;
  font-size: 18px;
  margin-bottom: 25px;
  max-width: 450px;
`;

const OfferStatus = styled.p`
  color: #373737;
  font-size: 18px;
  margin-bottom: 25px;
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

const PaymentInfoContainer = styled.div`
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
`;

interface OfferDetailProps {
  offer: Offer;
}

export const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
  // Formata o valor para moeda
  const formattedValue = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <OfferContainer>
      <Image src={logoImage} alt="Avatar" width={125} height={65} />
      <OfferDetails>
        <OfferTitle>Você está Quase lá!</OfferTitle>
        <OfferName>{offer.nome_oferta}</OfferName>
        <OfferSubtitle>{offer.slogan}</OfferSubtitle>
        <OfferStatus>Status: {offer.status}</OfferStatus>
        <OfferText>
          Para finalizar seu investimento, faça transferência para a conta
          bancária da {offer.nome_oferta}
        </OfferText>
      </OfferDetails>
      <PaymentInfoContainer>
        <ValidityBox>
          <OfferInfoTitle>PAGAMENTO VÁLIDO ATÉ:</OfferInfoTitle>
          <OfferInfo>{offer.validade}</OfferInfo>
        </ValidityBox>
        <ValueBox>
          <OfferInfoTitle>VALOR:</OfferInfoTitle>
          <OfferInfo>{formattedValue(offer.valor_a_ser_liquidado)}</OfferInfo>
        </ValueBox>
      </PaymentInfoContainer>
    </OfferContainer>
  );
};
