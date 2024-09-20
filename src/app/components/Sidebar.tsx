import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 265px;
  height: 680px;
  padding: 20px;
  background-color: #fafafa;
  border: 2px solid #e5e5e5;
  border-radius: 10px;
  margin-top: 20px;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <MenuItem>Pessoa</MenuItem>
      <MenuItem>Meu Portfólio</MenuItem>
      <MenuItem>
        Liquidação <span>(3)</span>
      </MenuItem>
      <MenuItem>Meu Perfil</MenuItem>
    </SidebarContainer>
  );
};
