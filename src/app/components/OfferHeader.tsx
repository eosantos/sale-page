import styled from 'styled-components';
import { Offer } from '../services/api';

interface OfferHeaderProps {
  offer: Offer;
}

const OfferDetails = styled.div`
  flex: 1;
  margin-left: 0px;

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

const OfferStatus = styled.p`
  color: #373737;
  font-size: 18px;
  margin-bottom: 25px;
`;

const OfferHeader: React.FC<OfferHeaderProps> = ({ offer }) => {
  return (
    <OfferDetails>
      <OfferTitle>Você está Quase lá!</OfferTitle>
      <OfferName>{offer.nome_oferta}</OfferName>
      <OfferSubtitle>{offer.slogan}</OfferSubtitle>
      <OfferStatus>Status: {offer.status}</OfferStatus>
    </OfferDetails>
  );
};

export default OfferHeader;
