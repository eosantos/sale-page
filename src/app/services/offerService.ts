import axios from 'axios';
import { Offer } from './api';

export const fetchOffers = async (): Promise<Offer[]> => {
  try {
    const response = await axios.get<Offer[]>(
      `${process.env.NEXT_PUBLIC_API_URL}`
    );

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios error: ${error.message}`);
    } else {
      throw new Error(`Unexpected error: ${error}`);
    }
  }
};
