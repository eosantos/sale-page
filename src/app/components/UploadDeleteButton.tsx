import React from 'react';
import styled from 'styled-components';

const StyledUploadDeleteButton = styled.button`
  background-color: #8c8c8c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 50px;
  margin-bottom: 10px;

  &:hover {
    background-color: #212121;
  }
`;

interface UploadDeleteButtonProps {
  onClick: () => void;
  children?: React.ReactNode; // Adicionando a propriedade 'children'
}

const UploadDeleteButton: React.FC<UploadDeleteButtonProps> = ({
  onClick,
  children
}) => {
  return (
    <StyledUploadDeleteButton onClick={onClick}>
      {children || 'Deletar'} {/* Renderizando os children ou texto padrão */}
    </StyledUploadDeleteButton>
  );
};

export default UploadDeleteButton;
