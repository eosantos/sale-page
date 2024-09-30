import React from 'react';
import styled from 'styled-components';

const StyledUploadedFilesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  color: #015047;
`;

interface UploadedFilesListProps {
  children: React.ReactNode; // Adicionando a propriedade 'children'
}

const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ children }) => {
  return <StyledUploadedFilesList>{children}</StyledUploadedFilesList>;
};

export default UploadedFilesList;
