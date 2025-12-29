import React, { useState, useEffect } from 'react';
import { useSocialNetworks } from '../hooks/useSocialNetworks';
import type { SocialNetworkInfo, SocialNetworkEnum } from '../types/bazzuca';

export interface SocialNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  network?: SocialNetworkInfo;
  onSave?: (network: SocialNetworkInfo) => void;
}

const SOCIAL_NETWORKS: { value: SocialNetworkEnum; label: string }[] = [
  { value: 1, label: 'X (Twitter)' },
  { value: 2, label: 'Instagram' },
  { value: 3, label: 'Facebook' },
  { value: 4, label: 'LinkedIn' },
  { value: 5, label: 'TikTok' },
  { value: 6, label: 'YouTube' },
  { value: 7, label: 'WhatsApp' },
  { value: 8, label: 'SMS' },
  { value: 9, label: 'Email' },
];

export function SocialNetworkModal({
  isOpen,
  onClose,
  clientId,
  network,
  onSave,
}: SocialNetworkModalProps) {
  const { createNetwork, updateNetwork } = useSocialNetworks(clientId, false);
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetworkEnum>(1);
  const [url, setUrl] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (network) {
      setSelectedNetwork(network.network);
      setUrl(network.url);
      setUser(network.user);
      setPassword(''); // Don't show existing password
    } else {
      setSelectedNetwork(1);
      setUrl('');
      setUser('');
      setPassword('');
    }
    setError(null);
  }, [network, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    if (!user.trim()) {
      setError('Username is required');
      return;
    }

    if (!network && !password.trim()) {
      setError('Password is required for new social networks');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: SocialNetworkInfo | undefined;

      if (network) {
        result = await updateNetwork({
          networkId: network.networkId,
          clientId,
          network: selectedNetwork,
          url: url.trim(),
          user: user.trim(),
          password: password.trim() || network.password, // Keep existing password if not changed
        });
      } else {
        result = await createNetwork({
          clientId,
          network: selectedNetwork,
          url: url.trim(),
          user: user.trim(),
          password: password.trim(),
        });
      }

      if (result) {
        onSave?.(result);
        onClose();
      } else {
        setError('Failed to save social network. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {network ? 'Edit Social Network' : 'Add Social Network'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="network" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Network Type
            </label>
            <select
              id="network"
              value={selectedNetwork.toString()}
              onChange={(e) => setSelectedNetwork(Number(e.target.value) as SocialNetworkEnum)}
              disabled={loading}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {SOCIAL_NETWORKS.map((net) => (
                <option key={net.value} value={net.value.toString()}>
                  {net.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              disabled={loading}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="user"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="username"
              disabled={loading}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password {network && <span className="text-sm text-gray-500 dark:text-gray-400">(leave blank to keep current)</span>}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required={!network}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : network ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
