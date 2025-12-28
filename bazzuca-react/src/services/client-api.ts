import type { AxiosInstance } from 'axios';
import type { ClientInfo, ClientInput, ClientUpdate } from '../types/bazzuca';

const CLIENT_API_ENDPOINTS = {
  LIST_BY_USER: '/Client/listByUser',
  GET_BY_ID: (clientId: number) => `/Client/getById/${clientId}`,
  INSERT: '/Client/insert',
  UPDATE: '/Client/update',
  DELETE: (clientId: number) => `/Client/delete/${clientId}`,
};

export class ClientAPI {
  constructor(private client: AxiosInstance) {}

  /**
   * List all clients for the authenticated user
   */
  async listClients(): Promise<ClientInfo[]> {
    console.log('[ClientAPI] listClients - Request:', { url: CLIENT_API_ENDPOINTS.LIST_BY_USER });
    
    const response = await this.client.get<ClientInfo[]>(
      CLIENT_API_ENDPOINTS.LIST_BY_USER
    );
    
    console.log('[ClientAPI] listClients - Response:', response.data);
    return response.data;
  }

  /**
   * Get a single client by ID
   */
  async getClientById(clientId: number): Promise<ClientInfo> {
    console.log('[ClientAPI] getClientById - Request:', { url: CLIENT_API_ENDPOINTS.GET_BY_ID(clientId), clientId });
    
    const response = await this.client.get<ClientInfo>(
      CLIENT_API_ENDPOINTS.GET_BY_ID(clientId)
    );
    
    console.log('[ClientAPI] getClientById - Response:', response.data);
    return response.data;
  }

  /**
   * Create a new client
   */
  async createClient(client: ClientInput): Promise<ClientInfo> {
    console.log('[ClientAPI] createClient - Request:', { url: CLIENT_API_ENDPOINTS.INSERT, data: client });
    
    const response = await this.client.post<ClientInfo>(
      CLIENT_API_ENDPOINTS.INSERT,
      client
    );
    
    console.log('[ClientAPI] createClient - Response:', response.data);
    return response.data;
  }

  /**
   * Update an existing client
   */
  async updateClient(client: ClientUpdate): Promise<ClientInfo> {
    console.log('[ClientAPI] updateClient - Request:', { url: CLIENT_API_ENDPOINTS.UPDATE, data: client });
    
    const response = await this.client.post<ClientInfo>(
      CLIENT_API_ENDPOINTS.UPDATE,
      client
    );
    
    console.log('[ClientAPI] updateClient - Response:', response.data);
    return response.data;
  }

  /**
   * Delete a client
   */
  async deleteClient(clientId: number): Promise<void> {
    console.log('[ClientAPI] deleteClient - Request:', { url: CLIENT_API_ENDPOINTS.DELETE(clientId), clientId });
    
    await this.client.delete(
      CLIENT_API_ENDPOINTS.DELETE(clientId)
    );
    
    console.log('[ClientAPI] deleteClient - Success');
  }
}
