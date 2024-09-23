import styled from 'styled-components';
import Image from 'next/image';
import logoImage from '../assets/logo.png';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center; /* Alinha verticalmente */
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e5e5e5;
  position: fixed; /* Mantém o header fixo no topo */
  top: 0; /* Fixa no topo */
  width: 100%; /* Largura total */
  z-index: 1001; /* Garante que o header fique acima de outros elementos */
`;

const Logo = styled.div`
  font-size: 24px;
  padding-left: 10px;
`;

const HamburgerButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  cursor: pointer;
  font-size: 30px;
  margin-right: 20px; /* Espaço entre o botão e o logo */

  &:focus {
    outline: none;
  }

  /* Removido: não esconder em telas maiores */
`;

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <HeaderContainer>
      {/* Botão Hamburger sempre visível */}
      <HamburgerButton onClick={toggleSidebar}>
        &#x2630; {/* Ícone de "hamburger" */}
      </HamburgerButton>

      <Logo>
        <Image src={logoImage} alt="Logo" width={115} height={32} />
      </Logo>
    </HeaderContainer>
  );
};
