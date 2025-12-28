import React, { useState, useEffect } from 'react';
import { useClients } from '../hooks/useClients';
import type { ClientInfo, SocialNetworkEnum } from '../types/bazzuca';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: ClientInfo;
  onSave?: (client: ClientInfo) => void;
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

export function ClientModal({ isOpen, onClose, client, onSave }: ClientModalProps) {
  const { createClient, updateClient } = useClients(false);
  const [name, setName] = useState('');
  const [selectedNetworks, setSelectedNetworks] = useState<SocialNetworkEnum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (client) {
      setName(client.name);
      setSelectedNetworks(client.socialNetworks);
    } else {
      setName('');
      setSelectedNetworks([]);
    }
    setError(null);
  }, [client, isOpen]);

  const handleNetworkToggle = (network: SocialNetworkEnum) => {
    setSelectedNetworks((prev) =>
      prev.includes(network)
        ? prev.filter((n) => n !== network)
        : [...prev, network]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Client name is required');
      return;
    }

    if (selectedNetworks.length === 0) {
      setError('Please select at least one social network');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: ClientInfo | undefined;

      if (client) {
        result = await updateClient({
          clientId: client.clientId,
          userId: client.userId,
          name: name.trim(),
          socialNetworks: selectedNetworks,
        });
      } else {
        result = await createClient({
          name: name.trim(),
          socialNetworks: selectedNetworks,
        });
      }

      if (result) {
        onSave?.(result);
        onClose();
      } else {
        setError('Failed to save client. Please try again.');
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
          <DialogTitle>{client ? 'Edit Client' : 'Create New Client'}</DialogTitle>
          <DialogDescription>
            {client
              ? 'Update the client information below.'
              : 'Enter the client name and select the social networks they use.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Social Networks</Label>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_NETWORKS.map((network) => (
                  <label
                    key={network.value}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={selectedNetworks.includes(network.value)}
                      onChange={() => handleNetworkToggle(network.value)}
                      disabled={loading}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{network.label}</span>
                  </label>
                ))}
              </div>
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
              {loading ? 'Saving...' : client ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
