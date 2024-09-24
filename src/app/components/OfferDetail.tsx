import styled from 'styled-components';
import { Offer } from '../services/api';
import Image, { StaticImageData } from 'next/image';
import logoImage1 from '../assets/logoImage1.png';
import logoImage2 from '../assets/logoImage2.jpg';
import logoImage3 from '../assets/logoImage3.jpg';
import logoImage4 from '../assets/logoImage4.png';

type OfferNames =
  | 'Mima Jornada Alimentar'
  | 'Pet Delícia'
  | 'Green Ventures'
  | 'Tech Innovate';

const offerImages: Record<string, StaticImageData> = {
  'Mima Jornada Alimentar': logoImage1,
  'Pet Delícia': logoImage2,
  'Green Ventures': logoImage3,
  'Tech Innovate': logoImage4
};

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

  // Captura e inverte os dois primeiros nomes
  const invertFirstTwoNames = (name: string) => {
    const names = name.split(' '); // Divide o nome em partes
    if (names.length < 2) return name; // Retorna o nome original se tiver menos de 2 partes
    return `${names[1]} ${names[0]}`; // Retorna os dois primeiros nomes invertidos
  };

  // Obtenha a imagem correspondente à oferta
  const offerImage = offerImages[offer.nome_oferta as OfferNames];

  return (
    <OfferContainer>
      <Image src={offerImage} alt="Avatar" width={125} height={100} />
      <OfferDetails>
        <OfferTitle>Você está Quase lá!</OfferTitle>
        <OfferName>{offer.nome_oferta}</OfferName>
        <OfferSubtitle>{offer.slogan}</OfferSubtitle>
        <OfferStatus>Status: {offer.status}</OfferStatus>
        <OfferText>
          Para finalizar seu investimento, faça transferência para a conta
          bancária da{' '}
          <span style={{ color: '#015047', fontWeight: 'bold' }}>
            {invertFirstTwoNames(offer.nome_oferta)}
          </span>
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
