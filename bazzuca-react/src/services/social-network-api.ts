import type { AxiosInstance } from 'axios';
import type { SocialNetworkInfo, SocialNetworkInput, SocialNetworkUpdate } from '../types/bazzuca';

const SOCIAL_NETWORK_API_ENDPOINTS = {
  LIST_BY_CLIENT: (clientId: number) => `/SocialNetwork/listByClient/${clientId}`,
  GET_BY_ID: (networkId: number) => `/SocialNetwork/getById/${networkId}`,
  INSERT: '/SocialNetwork/insert',
  UPDATE: '/SocialNetwork/update',
  DELETE: (networkId: number) => `/SocialNetwork/delete/${networkId}`,
};

export class SocialNetworkAPI {
  constructor(private client: AxiosInstance) {}

  /**
   * List all social networks for a specific client
   */
  async listByClient(clientId: number): Promise<SocialNetworkInfo[]> {
    console.log('[SocialNetworkAPI] listByClient - Request:', { 
      url: SOCIAL_NETWORK_API_ENDPOINTS.LIST_BY_CLIENT(clientId), 
      clientId 
    });
    
    const response = await this.client.get<SocialNetworkInfo[]>(
      SOCIAL_NETWORK_API_ENDPOINTS.LIST_BY_CLIENT(clientId)
    );
    
    console.log('[SocialNetworkAPI] listByClient - Response:', response.data);
    return response.data;
  }

  /**
   * Get a single social network by ID
   */
  async getNetworkById(networkId: number): Promise<SocialNetworkInfo> {
    console.log('[SocialNetworkAPI] getNetworkById - Request:', { 
      url: SOCIAL_NETWORK_API_ENDPOINTS.GET_BY_ID(networkId), 
      networkId 
    });
    
    const response = await this.client.get<SocialNetworkInfo>(
      SOCIAL_NETWORK_API_ENDPOINTS.GET_BY_ID(networkId)
    );
    
    console.log('[SocialNetworkAPI] getNetworkById - Response:', response.data);
    return response.data;
  }

  /**
   * Create a new social network
   */
  async createNetwork(network: SocialNetworkInput): Promise<SocialNetworkInfo> {
    console.log('[SocialNetworkAPI] createNetwork - Request:', { 
      url: SOCIAL_NETWORK_API_ENDPOINTS.INSERT, 
      data: network 
    });
    
    const response = await this.client.post<SocialNetworkInfo>(
      SOCIAL_NETWORK_API_ENDPOINTS.INSERT,
      network
    );
    
    console.log('[SocialNetworkAPI] createNetwork - Response:', response.data);
    return response.data;
  }

  /**
   * Update an existing social network
   */
  async updateNetwork(network: SocialNetworkUpdate): Promise<SocialNetworkInfo> {
    console.log('[SocialNetworkAPI] updateNetwork - Request:', { 
      url: SOCIAL_NETWORK_API_ENDPOINTS.UPDATE, 
      data: network 
    });
    
    const response = await this.client.post<SocialNetworkInfo>(
      SOCIAL_NETWORK_API_ENDPOINTS.UPDATE,
      network
    );
    
    console.log('[SocialNetworkAPI] updateNetwork - Response:', response.data);
    return response.data;
  }

  /**
   * Delete a social network
   */
  async deleteNetwork(networkId: number): Promise<void> {
    console.log('[SocialNetworkAPI] deleteNetwork - Request:', { 
      url: SOCIAL_NETWORK_API_ENDPOINTS.DELETE(networkId), 
      networkId 
    });
    
    await this.client.delete(
      SOCIAL_NETWORK_API_ENDPOINTS.DELETE(networkId)
    );
    
    console.log('[SocialNetworkAPI] deleteNetwork - Success');
  }
}
