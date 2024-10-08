import React from 'react';
import { Offer } from '../services/api';
import { OfferDetail } from '../components/Offer/OfferDetail';
import { PaymentInfo } from '../components/Payment/PaymentInfo';

interface ContentProps {
  offers: Offer[];
  selectedOfferIndex: number;
}

const Content: React.FC<ContentProps> = ({ offers, selectedOfferIndex }) => {
  const selectedOffer = offers[selectedOfferIndex];

  return (
    <div>
      {selectedOffer ? (
        <>
          <OfferDetail offer={selectedOffer} />
          <PaymentInfo offer={selectedOffer} />
        </>
      ) : (
        <p>Nenhuma oferta selecionada.</p>
      )}
    </div>
  );
};

export default Content;
