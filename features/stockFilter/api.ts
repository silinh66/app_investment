import axiosClient from '../../api/request';
import type { FilterPayload, FilterResponse } from './types';

const API_BASE_URL = 'https://api.dautubenvung.vn';

/**
 * Call filter-data API with payload
 */
export async function filterData(payload: FilterPayload): Promise<FilterResponse> {
  try {
    console.log('Filter data payload:', payload);
    
    const response = await axiosClient.post<FilterResponse['data']>(
      `${API_BASE_URL}/filter-data`,
      payload
    );

    if (!response.data) {
      throw new Error('No data returned from API');
    }

    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error('Filter data API error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to filter data');
  }
}

/**
 * Get industry/sector info for given symbols
 */
export async function getNhomNganh(symbols: string[]): Promise<any> {
  try {
    const response = await axiosClient.post(`${API_BASE_URL}/nhom-nganh`, {
      symbols,
    });

    return response.data;
  } catch (error: any) {
    console.error('Get nhom nganh API error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get nhom nganh');
  }
}
