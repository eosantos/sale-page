import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Offer } from '../services/api'; // Assumindo que você tenha o tipo Offer definido em services/api.ts

interface QRCodeGeneratorProps {
  offer: Offer;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ offer }) => {
  return (
    <div className="qr-code-container">
      <QRCodeSVG
        value={JSON.stringify({
          chave_pix: offer.chave_pix,
          nome_favorecido: offer.nome_favorecido,
          valor: offer.valor_a_ser_liquidado,
          cnpj: offer.cnpj
        })}
        size={128}
      />
    </div>
  );
};

export default QRCodeGenerator;
