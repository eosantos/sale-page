import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  color: #015047;
`;

const TextChat = styled.h3`
  text-align: left;
  width: 100%;
  color: #fff;
  margin: 15px 0 20px 15px;
`;

const TextMail = styled.h3`
  text-align: left;
  width: 100%;
  color: #015047;
  margin: 15px 0 20px 15px;
`;

const RectangleContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;

  @media (max-width: 780px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RectangleChat = styled.div`
  flex: 1;
  height: 140px;
  border-radius: 15px;
  background-color: #015047;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: white;
  padding: 10px;
`;

const RectangleMail = styled.div`
  flex: 1;
  height: 140px;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #d6dadc;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: start;
  color: white;
  padding: 10px;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: #f2f6f6;
  opacity: 70%;
  color: #015047;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 0 0 10px;

  &:hover {
    background-color: #f2f6f6;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Title>DÚVIDAS E SUGESTÕES</Title>
      <RectangleContainer>
        <RectangleChat>
          <Button>CHAT</Button>
          <TextChat>Whatsapp</TextChat>
        </RectangleChat>
        <RectangleMail>
          <Button>E-MAIL</Button>
          <TextMail>investidores@equssed.com</TextMail>
        </RectangleMail>
      </RectangleContainer>
    </FooterContainer>
  );
};

export default Footer;
