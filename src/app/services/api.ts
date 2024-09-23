// api.ts
export interface Offer {
  nome_oferta: string;
  slogan: string;
  status: string;
  valor_a_ser_liquidado: number;
  validade: string;
  chave_pix: string;
  nome_favorecido: string;
  banco: string;
  agencia: string;
  numero_conta_corrente: string;
  cnpj: string;
  imagem_qrcode: string;
}

export const fetchOffers = async (): Promise<Offer[]> => {
  const response = await fetch(
    'https://66d62a1ef5859a704268886b.mockapi.io/api/v1/oferta'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch offers');
  }
  return await response.json();
};
