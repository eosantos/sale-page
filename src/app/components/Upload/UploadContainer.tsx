import React from 'react';
import styled from 'styled-components';

const StyledUploadContainer = styled.div<{ $isDragging: boolean }>`
  margin: 20px 0 0 20px;
  padding: 60px;
  border: 2px ${({ $isDragging }) => ($isDragging ? 'dashed' : 'solid')} #015047;
  border-radius: 10px;
  text-align: center;
  background-color: ${({ $isDragging }) =>
    $isDragging ? '#e0f7fa' : '#f9f9f9'};
  transition:
    background-color 0.3s,
    border-color 0.3s;

  @media (max-width: 775px) {
    margin: 10px;
  }
`;

interface UploadContainerProps {
  $isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode; // Adicione esta linha se não estiver presente
}

const UploadContainer: React.FC<UploadContainerProps> = ({
  $isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  children
}) => {
  return (
    <StyledUploadContainer
      $isDragging={$isDragging}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </StyledUploadContainer>
  );
};

export default UploadContainer;
