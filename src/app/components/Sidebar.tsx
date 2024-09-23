import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { OfferDetail } from '../components/OfferDetail';
import { PaymentInfo } from '../components/PaymentInfo';
import { ImportantConsiderations } from '../components/ImportantConsiderations';
import { UploadArea } from '../components/UploadArea';
import { fetchOffers, Offer } from '../services/api';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 60px; /* Fica logo abaixo do Header */
  left: ${({ isOpen }) =>
    isOpen
      ? '0'
      : '-250px'}; /* Controle para abrir e fechar em dispositivos menores */
  width: 250px;
  height: calc(100% - 60px); /* Altura ajustada para não cobrir o Header */
  background-color: #007bff;
  transition: left 0.3s ease;
  z-index: 1000;
  padding-top: 20px;
  color: white;

  @media (min-width: 780px) {
    left: 0; /* Sidebar sempre visível em telas maiores */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 30px;

  &:focus {
    outline: none;
  }
`;

const MenuItem = styled.p`
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubMenuItem = styled.p`
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Menu = styled.div`
  margin-top: 20px;
`;

const Content = styled.main`
  margin-left: 250px; /* Espaço reservado para a Sidebar */
  padding: 80px 20px; /* Espaçamento interno para o conteúdo e evitar sobreposição do Header */
  background-color: #f9f9f9;

  @media (max-width: 780px) {
    margin-left: 0; /* Remove o espaçamento da Sidebar em telas menores */
  }
`;

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Novo estado para controlar o submenu

  useEffect(() => {
    const getOffers = async () => {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (error) {
        setError('Erro ao carregar ofertas');
      }
    };

    getOffers();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen); // Alterna a visibilidade do submenu
  };

  const handleOfferSelect = (index: number) => {
    setSelectedOfferIndex(index);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <CloseButton onClick={toggleSidebar}>
          &#x2715; {/* Ícone de "X" */}
        </CloseButton>
        <Menu>
          <MenuItem>Pessoal</MenuItem>
          <MenuItem>Meu Portfólio</MenuItem>
          <MenuItem onClick={handleSubMenuToggle}>
            Liquidação <span>(4)</span>
          </MenuItem>
          {isSubMenuOpen && ( // Renderiza o submenu se estiver aberto
            <>
              {offers.map((offer, index) => (
                <SubMenuItem
                  key={index}
                  onClick={() => handleOfferSelect(index)}
                >
                  {offer.nome_oferta}
                </SubMenuItem>
              ))}
            </>
          )}
          <MenuItem>Meu Perfil</MenuItem>
        </Menu>
      </SidebarContainer>

      <Content>
        <h1>Você está quase lá!</h1>
        {error && <p>{error}</p>}
        {offers.length > 0 && (
          <>
            <OfferDetail offer={offers[selectedOfferIndex]} />
            <PaymentInfo offer={offers[selectedOfferIndex]} />
          </>
        )}
        <h2>Considerações importantes</h2>
        <ImportantConsiderations />
        <h2>APÓS EFETUAR O PAGAMENTO</h2>
        <UploadArea />
      </Content>
    </>
  );
};
