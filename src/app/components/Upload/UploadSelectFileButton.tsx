import React from 'react';
import styled from 'styled-components';

const StyledUploadSelectFileButton = styled.label`
  margin-top: 20px;
  background-color: #f9f9f9;
  color: #015047;
  border: 1px solid #015047;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: #015047;
    color: #f9f9f9;
  }
`;

interface UploadSelectFileButtonProps {
  htmlFor: string;
  children: React.ReactNode; // Adicionando a propriedade 'children'
}

const UploadSelectFileButton: React.FC<UploadSelectFileButtonProps> = ({
  htmlFor,
  children
}) => {
  return (
    <StyledUploadSelectFileButton htmlFor={htmlFor}>
      {children} {/* Renderizando os children */}
    </StyledUploadSelectFileButton>
  );
};

export default UploadSelectFileButton;
