import styled from 'styled-components';
import Image from 'next/image';
import logoImage from '../assets/logo.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e5e5e5;
`;

const Logo = styled.div`
  font-size: 24px;
  padding-left: 10px;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <MenuIcon>☰</MenuIcon>
      <Logo>
        <Image src={logoImage} alt="Logo" width={115} height={32} />
      </Logo>
    </HeaderContainer>
  );
};
