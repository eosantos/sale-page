import styled from 'styled-components';
import { Offer } from '../services/api';

const OfferContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const OfferTitle = styled.h2`
  margin-bottom: 10px;
`;

const OfferSubtitle = styled.p`
  margin-bottom: 10px;
`;

const OfferInfo = styled.p`
  margin: 5px 0;
`;

interface OfferDetailProps {
  offer: Offer;
}

export const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
  return (
    <OfferContainer>
      <OfferTitle>{offer.nome_oferta}</OfferTitle>
      <p>{offer.slogan}</p>
      <p>Status: {offer.status}</p>
      <OfferSubtitle>
        Para finalizar seu investimento, faça transferência para a conta
        bancária da {offer.nome_oferta}
      </OfferSubtitle>
      <OfferInfo>PAGAMENTO VÁLIDO ATÉ: {offer.validade}</OfferInfo>
      <OfferInfo>VALOR: R$ {offer.valor_a_ser_liquidado}</OfferInfo>
    </OfferContainer>
  );
};
