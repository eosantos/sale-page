import React from 'react';
import styled from 'styled-components';

const StyledUploadProgressBarContainer = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: #f3f3f3;
  border-radius: 5px;
  margin: 10px auto;
`;

const StyledUploadProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 10px;
  background-color: #015047;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

interface UploadProgressBarProps {
  progress: number;
}

export const UploadProgressBarContainer = StyledUploadProgressBarContainer;

export const UploadProgressBar: React.FC<UploadProgressBarProps> = ({
  progress
}) => {
  return (
    <StyledUploadProgressBarContainer>
      <StyledUploadProgressBar progress={progress} />
    </StyledUploadProgressBarContainer>
  );
};
