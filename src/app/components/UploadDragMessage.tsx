import React from 'react';
import styled from 'styled-components';

const StyledUploadDragMessage = styled.p`
  font-size: 18px;
  color: #015047;
  margin-top: 10px;
`;

interface UploadDragMessageProps {
  children?: React.ReactNode; // Adicionando a propriedade 'children'
  isDragging: boolean;
}

const UploadDragMessage: React.FC<UploadDragMessageProps> = ({
  children,
  isDragging
}) => {
  return (
    <StyledUploadDragMessage>
      {children ||
        (isDragging
          ? 'Solte aqui seus arquivos'
          : 'Arraste seus arquivos aqui')}
    </StyledUploadDragMessage>
  );
};

export default UploadDragMessage;
