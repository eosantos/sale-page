import React from 'react';
import styled from 'styled-components';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        <h2>Erro</h2>
        <p>{message}</p>
        <CloseButton onClick={onClose}>OK</CloseButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default ErrorPopup;
