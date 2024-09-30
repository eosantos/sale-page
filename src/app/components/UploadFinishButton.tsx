import React from 'react';
import styled from 'styled-components';

const StyledUploadFinishButton = styled.button`
  margin-top: 20px;
  background-color: #015047;
  color: white;
  padding: 10px 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #015049;
  }
`;

interface UploadFinishButtonProps {
  onClick: () => void;
  children?: React.ReactNode; // Adicionando a propriedade 'children'
}

const UploadFinishButton: React.FC<UploadFinishButtonProps> = ({
  onClick,
  children
}) => {
  return (
    <StyledUploadFinishButton onClick={onClick}>
      {children || 'Finalizar Upload'}{' '}
      {/* Renderizando os children ou texto padrão */}
    </StyledUploadFinishButton>
  );
};

export default UploadFinishButton;
