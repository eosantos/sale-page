import React from 'react';
import styled from 'styled-components';

const StyledUploadButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

interface UploadButtonProps {
  children: React.ReactNode;
}

const UploadButton: React.FC<UploadButtonProps> = ({ children }) => {
  return <StyledUploadButton>{children}</StyledUploadButton>;
};

export default UploadButton;
