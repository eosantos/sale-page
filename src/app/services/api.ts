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

// Função para buscar ofertas da API
export const fetchOffers = async (): Promise<Offer[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL || '');

  if (!response.ok) {
    throw new Error('Failed to fetch offers');
  }

  return await response.json();
};
