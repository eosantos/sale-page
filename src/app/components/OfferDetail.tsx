import styled from 'styled-components';

import { Offer } from '../services/api';
import OfferImage from './OfferImage';
import OfferHeader from './OfferHeader';
import OfferDescription from './OfferDescription';
import OfferDateValue from './OfferDateValue';

interface OfferDetailProps {
  offer: Offer;
}

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

export const OfferDetail: React.FC<OfferDetailProps> = ({ offer }) => {
  return (
    <OfferContainer>
      <OfferImage offerName={offer.nome_oferta} />
      <OfferDetails>
        <OfferHeader offer={offer} />
        <OfferDescription offer={offer} />
      </OfferDetails>
      <OfferDateValue offer={offer} />
    </OfferContainer>
  );
};
