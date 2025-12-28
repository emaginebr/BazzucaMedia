import React, { useState, useEffect } from 'react';
import { useSocialNetworks } from '../hooks/useSocialNetworks';
import type { SocialNetworkInfo, SocialNetworkEnum } from '../types/bazzuca';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {network ? 'Edit Social Network' : 'Add Social Network'}
          </DialogTitle>
          <DialogDescription>
            {network
              ? 'Update the social network information below.'
              : 'Enter the social network details.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="network">Network Type</Label>
              <Select
                value={selectedNetwork.toString()}
                onValueChange={(value) => setSelectedNetwork(Number(value) as SocialNetworkEnum)}
                disabled={loading}
              >
                <SelectTrigger id="network">
                  <SelectValue placeholder="Select a network" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_NETWORKS.map((net) => (
                    <SelectItem key={net.value} value={net.value.toString()}>
                      {net.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://instagram.com/username"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user">Username</Label>
              <Input
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="username"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password {network && <span className="text-sm text-gray-500">(leave blank to keep current)</span>}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required={!network}
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : network ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
