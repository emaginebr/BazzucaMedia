import { useState, useCallback, useEffect } from 'react';
import { useBazzucaMedia } from '../contexts/BazzucaMediaContext';
import type { ClientInfo, ClientInput, ClientUpdate } from '../types/bazzuca';

export interface UseClientsReturn {
  clients: ClientInfo[];
  loading: boolean;
  error: Error | null;
  fetchClients: () => Promise<void>;
  getClientById: (clientId: number) => Promise<ClientInfo | undefined>;
  createClient: (client: ClientInput) => Promise<ClientInfo | undefined>;
  updateClient: (client: ClientUpdate) => Promise<ClientInfo | undefined>;
  deleteClient: (clientId: number) => Promise<boolean>;
  refreshClients: () => Promise<void>;
}

export function useClients(autoFetch: boolean = true): UseClientsReturn {
  const { clientApi } = useBazzucaMedia();
  const [clients, setClients] = useState<ClientInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientApi.listClients();
      setClients(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch clients');
      setError(error);
      console.error('[useClients] fetchClients error:', error);
    } finally {
      setLoading(false);
    }
  }, [clientApi]);

  const getClientById = useCallback(async (clientId: number): Promise<ClientInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientApi.getClientById(clientId);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get client');
      setError(error);
      console.error('[useClients] getClientById error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [clientApi]);

  const createClient = useCallback(async (client: ClientInput): Promise<ClientInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const newClient = await clientApi.createClient(client);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create client');
      setError(error);
      console.error('[useClients] createClient error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [clientApi]);

  const updateClient = useCallback(async (client: ClientUpdate): Promise<ClientInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const updatedClient = await clientApi.updateClient(client);
      setClients(prev => 
        prev.map(c => c.clientId === updatedClient.clientId ? updatedClient : c)
      );
      return updatedClient;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update client');
      setError(error);
      console.error('[useClients] updateClient error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [clientApi]);

  const deleteClient = useCallback(async (clientId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await clientApi.deleteClient(clientId);
      setClients(prev => prev.filter(c => c.clientId !== clientId));
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete client');
      setError(error);
      console.error('[useClients] deleteClient error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [clientApi]);

  const refreshClients = useCallback(async () => {
    await fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    if (autoFetch) {
      fetchClients();
    }
  }, [autoFetch, fetchClients]);

  return {
    clients,
    loading,
    error,
    fetchClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    refreshClients,
  };
}
