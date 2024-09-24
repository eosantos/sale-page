import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { OfferDetail } from '../components/OfferDetail';
import { PaymentInfo } from '../components/PaymentInfo';
import { ImportantConsiderations } from '../components/ImportantConsiderations';
import { UploadArea } from '../components/UploadArea';
import { fetchOffers, Offer } from '../services/api';
import { FaCoins, FaUser, FaArrowRightArrowLeft } from 'react-icons/fa6';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 60px; /* Fica logo abaixo do Header */
  left: ${({ isOpen }) =>
    isOpen
      ? '0'
      : '-250px'}; /* Controle para abrir e fechar em dispositivos menores */
  width: 250px;
  height: calc(100% - 60px); /* Altura ajustada para não cobrir o Header */
  background-color: #eef2f5;
  border: 1px solid #d6dadc;
  transition: left 0.3s ease;
  z-index: 1000;
  padding-top: 20px;
  color: #373737;

  @media (min-width: 780px) {
    left: 0; /* Sidebar sempre visível em telas maiores */
  }
`;

const UploadTitle = styled.h3`
  margin-bottom: 20px;
  text-align: left
  width: 100%;
  color: #015047;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  color: #373737;
  border: none;
  cursor: pointer;
  font-size: 30px;

  &:focus {
    outline: none;
  }
`;

const MenuItem = styled.p<{ isSelected?: boolean; isDisabled?: boolean }>`
  padding: 15px;
  font-size: ${({ isDisabled }) => (isDisabled ? '13px' : '18px')};
  cursor: ${({ isDisabled }) =>
    isDisabled
      ? 'default'
      : 'pointer'}; /* Desabilita o cursor se for 'Pessoal' */
  color: ${({ isSelected }) => (isSelected ? '#20651F' : '#373737')};
  background-color: ${({ isSelected }) =>
    isSelected ? '#CFE4D5' : 'transparent'}; /* Fundo selecionado */
  transition: background-color 0.2s;

  &:hover {
    background-color: #cfe4d5; /* Fundo ao passar o mouse */
    color: #20651f; /* Cor do texto ao passar o mouse */
  }
`;

const SubMenuItem = styled.p<{ isSelected?: boolean }>`
  padding: 5px 50px;
  font-size: 12px;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? '#20651F' : '#373737')};
  background-color: transparent;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cfe4d5; /* Fundo ao passar o mouse */
    color: #20651f; /* Cor do texto ao passar o mouse */
  }
`;

const Menu = styled.div`
  margin-top: 20px;
`;

// Estilização para o contador de notificações
const NotificationContainer = styled.span`
  position: relative;
  display: inline-block;
  margin-left: 5px;

  .count {
    position: absolute;
    top: -15px;
    left: 65px;
    background-color: white;
    color: red;
    border-radius: 50%;
    padding: 3px 10px;
    font-size: 14px;
    font-weight: bold;
    z-index: 1; // Adicionado para garantir que a bolinha branca fique acima
  }

  .inner-circle {
    position: absolute;
    background-color: red;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    top: 3px;
    left: 85px;
    z-index: 2; // Adicionado para garantir que a bolinha vermelha fique acima
  }
`;

const Content = styled.main`
  margin-left: 250px;
  padding: 80px 20px;
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
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState<
    number | null
  >(null); // Índice do submenu selecionado

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

  const handleSubMenuSelect = (index: number) => {
    setSelectedSubMenuIndex(index); // Altera o índice do submenu selecionado
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <CloseButton onClick={toggleSidebar}>
          &#x2715; {/* Ícone de "X" */}
        </CloseButton>
        <Menu>
          <MenuItem isDisabled>Pessoal</MenuItem> {/* 'Pessoal' desabilitado */}
          <MenuItem>
            <FaCoins style={{ marginRight: '10px' }} /> Meu Portfólio
          </MenuItem>
          <MenuItem
            onClick={handleSubMenuToggle}
            isSelected={isSubMenuOpen} // Indica se o submenu está aberto
          >
            <span>
              <FaArrowRightArrowLeft style={{ marginRight: '10px' }} />
              Liquidação
            </span>
            <NotificationContainer>
              <span className="count">{offers.length}</span>
              <div className="inner-circle" />
            </NotificationContainer>
          </MenuItem>
          {isSubMenuOpen && ( // Renderiza o submenu se estiver aberto
            <>
              {offers.map((offer, index) => (
                <SubMenuItem
                  key={index}
                  onClick={() => {
                    handleOfferSelect(index);
                    handleSubMenuSelect(index); // Muda a seleção do submenu
                  }}
                  isSelected={selectedSubMenuIndex === index} // Adiciona a verificação de seleção
                >
                  {offer.nome_oferta}
                </SubMenuItem>
              ))}
            </>
          )}
          <MenuItem>
            <FaUser style={{ marginRight: '10px' }} /> Meu Perfil
          </MenuItem>
        </Menu>
      </SidebarContainer>

      <Content>
        {error && <p>{error}</p>}
        {offers.length > 0 && (
          <>
            <OfferDetail offer={offers[selectedOfferIndex]} />
            <PaymentInfo offer={offers[selectedOfferIndex]} />
          </>
        )}
        <ImportantConsiderations />
        <UploadTitle>APÓS EFETUAR O PAGAMENTO</UploadTitle>
        <UploadArea />
      </Content>
    </>
  );
};
