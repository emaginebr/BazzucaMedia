import React, { createContext, useContext, useMemo, useState } from 'react';
import axios, { type AxiosInstance } from 'axios';
import { ClientAPI } from '../services/client-api';
import { SocialNetworkAPI } from '../services/social-network-api';
import { PostAPI } from '../services/post-api';
import type { BazzucaConfig, ClientInfo } from '../types/bazzuca';

export interface BazzucaContextValue {
  config: BazzucaConfig;
  apiClient: AxiosInstance;
  clientApi: ClientAPI;
  socialNetworkApi: SocialNetworkAPI;
  postApi: PostAPI;
  isLoading: boolean;
  error: Error | null;
  setError: (error: Error | null) => void;
  selectedClient?: ClientInfo;
  setSelectedClient: (client?: ClientInfo) => void;
}

const BazzucaContext = createContext<BazzucaContextValue | undefined>(undefined);

export interface BazzucaProviderProps {
  config: BazzucaConfig;
  children: React.ReactNode;
}

export function BazzucaProvider({ config, children }: BazzucaProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientInfo | undefined>(undefined);

  // Create API client only when config changes
  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL: config.apiUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Add request interceptor for loading state
    client.interceptors.request.use(
      (config) => {
        setIsLoading(true);
        return config;
      },
      (error) => {
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for loading state and error handling
    client.interceptors.response.use(
      (response) => {
        setIsLoading(false);
        return response;
      },
      (error) => {
        setIsLoading(false);
        const errorObj = error.response?.data?.message 
          ? new Error(error.response.data.message)
          : new Error(error.message || 'An error occurred');
        
        setError(errorObj);
        
        if (config.onError) {
          config.onError(errorObj);
        }
        
        return Promise.reject(error);
      }
    );

    return client;
  }, [config]);

  // Create API instances - they only change when apiClient changes
  const clientApi = useMemo(() => new ClientAPI(apiClient), [apiClient]);
  const socialNetworkApi = useMemo(() => new SocialNetworkAPI(apiClient), [apiClient]);
  const postApi = useMemo(() => new PostAPI(apiClient), [apiClient]);

  // Context value - now with separate memo for stable references
  const contextValue = useMemo(() => ({
    config,
    apiClient,
    clientApi,
    socialNetworkApi,
    postApi,
    isLoading,
    error,
    setError,
    selectedClient,
    setSelectedClient,
  }), [config, apiClient, clientApi, socialNetworkApi, postApi, isLoading, error, selectedClient]);

  return (
    <BazzucaContext.Provider value={contextValue}>
      {children}
    </BazzucaContext.Provider>
  );
}

export function useBazzuca(): BazzucaContextValue {
  const context = useContext(BazzucaContext);
  
  if (!context) {
    throw new Error('useBazzuca must be used within a BazzucaProvider');
  }
  
  return context;
}
