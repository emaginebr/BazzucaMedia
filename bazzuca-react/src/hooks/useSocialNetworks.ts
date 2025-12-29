import { useState, useCallback, useEffect } from 'react';
import { useBazzucaMedia } from '../contexts/BazzucaContext';
import type { SocialNetworkInfo, SocialNetworkInput, SocialNetworkUpdate } from '../types/bazzuca';

export interface UseSocialNetworksReturn {
  networks: SocialNetworkInfo[];
  loading: boolean;
  error: Error | null;
  fetchNetworks: () => Promise<void>;
  getNetworkById: (networkId: number) => Promise<SocialNetworkInfo | undefined>;
  createNetwork: (network: SocialNetworkInput) => Promise<SocialNetworkInfo | undefined>;
  updateNetwork: (network: SocialNetworkUpdate) => Promise<SocialNetworkInfo | undefined>;
  deleteNetwork: (networkId: number) => Promise<boolean>;
  refreshNetworks: () => Promise<void>;
}

export function useSocialNetworks(clientId: number, autoFetch: boolean = true): UseSocialNetworksReturn {
  const { socialNetworkApi } = useBazzucaMedia();
  const [networks, setNetworks] = useState<SocialNetworkInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNetworks = useCallback(async () => {
    if (!clientId) {
      setNetworks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await socialNetworkApi.listByClient(clientId);
      setNetworks(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch social networks');
      setError(error);
      console.error('[useSocialNetworks] fetchNetworks error:', error);
    } finally {
      setLoading(false);
    }
  }, [socialNetworkApi, clientId]);

  const getNetworkById = useCallback(async (networkId: number): Promise<SocialNetworkInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const data = await socialNetworkApi.getNetworkById(networkId);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get social network');
      setError(error);
      console.error('[useSocialNetworks] getNetworkById error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [socialNetworkApi]);

  const createNetwork = useCallback(async (network: SocialNetworkInput): Promise<SocialNetworkInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const newNetwork = await socialNetworkApi.createNetwork(network);
      setNetworks(prev => [...prev, newNetwork]);
      return newNetwork;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create social network');
      setError(error);
      console.error('[useSocialNetworks] createNetwork error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [socialNetworkApi]);

  const updateNetwork = useCallback(async (network: SocialNetworkUpdate): Promise<SocialNetworkInfo | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const updatedNetwork = await socialNetworkApi.updateNetwork(network);
      setNetworks(prev => 
        prev.map(n => n.networkId === updatedNetwork.networkId ? updatedNetwork : n)
      );
      return updatedNetwork;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update social network');
      setError(error);
      console.error('[useSocialNetworks] updateNetwork error:', error);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [socialNetworkApi]);

  const deleteNetwork = useCallback(async (networkId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await socialNetworkApi.deleteNetwork(networkId);
      setNetworks(prev => prev.filter(n => n.networkId !== networkId));
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete social network');
      setError(error);
      console.error('[useSocialNetworks] deleteNetwork error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [socialNetworkApi]);

  const refreshNetworks = useCallback(async () => {
    await fetchNetworks();
  }, [fetchNetworks]);

  useEffect(() => {
    if (autoFetch && clientId) {
      fetchNetworks();
    }
  }, [autoFetch, clientId, fetchNetworks]);

  return {
    networks,
    loading,
    error,
    fetchNetworks,
    getNetworkById,
    createNetwork,
    updateNetwork,
    deleteNetwork,
    refreshNetworks,
  };
}
