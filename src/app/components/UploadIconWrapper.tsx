import React from 'react';
import styled from 'styled-components';

const StyledUploadIconWrapper = styled.span`
  font-size: 35px;
  color: #015047;
  margin-right: 20px;
`;

interface UploadIconWrapperProps {
  children: React.ReactNode;
}

const UploadIconWrapper: React.FC<UploadIconWrapperProps> = ({ children }) => {
  return <StyledUploadIconWrapper>{children}</StyledUploadIconWrapper>;
};

export default UploadIconWrapper;
