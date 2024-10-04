import Image, { StaticImageData } from 'next/image';
import logoImage1 from '../../assets/logoImage1.png';
import logoImage2 from '../../assets/logoImage2.jpg';
import logoImage3 from '../../assets/logoImage3.jpg';
import logoImage4 from '../../assets/logoImage4.png';

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

interface OfferImageProps {
  offerName: string;
}

const OfferImage: React.FC<OfferImageProps> = ({ offerName }) => {
  const offerImage = offerImages[offerName as OfferNames];
  return <Image src={offerImage} alt="Avatar" width={125} height={100} />;
};

export default OfferImage;
