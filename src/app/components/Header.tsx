import styled from 'styled-components';
import Image from 'next/image';
import logoImage from '../assets/logo.png';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e5e5e5;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1001;
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
  margin-right: 20px;

  &:focus {
    outline: none;
  }
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
