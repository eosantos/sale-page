import styled from 'styled-components';
import { Offer } from '../../services/api';

interface OfferDescriptionProps {
  offer: Offer;
}

const OfferText = styled.p`
  color: #373737;
  font-size: 18px;
  margin-bottom: 25px;
  max-width: 450px;
`;

const OfferDescription: React.FC<OfferDescriptionProps> = ({ offer }) => {
  const invertFirstTwoNames = (name: string) => {
    const names = name.split(' ');
    if (names.length < 2) return name;
    return `${names[1]} ${names[0]}`;
  };

  return (
    <OfferText>
      Para finalizar seu investimento, faça transferência para a conta bancária
      da{' '}
      <span style={{ color: '#015047', fontWeight: 'bold' }}>
        {invertFirstTwoNames(offer.nome_oferta)}
      </span>
    </OfferText>
  );
};

export default OfferDescription;
