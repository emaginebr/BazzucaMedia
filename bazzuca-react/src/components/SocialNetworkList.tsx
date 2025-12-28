import { useState } from 'react';
import { Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';
import { useSocialNetworks } from '../hooks/useSocialNetworks';
import type { SocialNetworkInfo } from '../types/bazzuca';
import { getSocialNetworkName } from '../types/bazzuca';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '../utils/cn';

export interface SocialNetworkListProps {
  clientId: number;
  onEdit?: (network: SocialNetworkInfo) => void;
  onDelete?: (networkId: number) => void;
  onCreate?: () => void;
  showCreateButton?: boolean;
  className?: string;
}

export function SocialNetworkList({
  clientId,
  onEdit,
  onDelete,
  onCreate,
  showCreateButton = true,
  className,
}: SocialNetworkListProps) {
  const { networks, loading, error, deleteNetwork } = useSocialNetworks(clientId);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (networkId: number) => {
    if (window.confirm('Are you sure you want to delete this social network?')) {
      setDeletingId(networkId);
      const success = await deleteNetwork(networkId);
      setDeletingId(null);
      
      if (success && onDelete) {
        onDelete(networkId);
      }
    }
  };

  if (!clientId) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-gray-500 dark:text-gray-400">Please select a client to view social networks.</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('border-red-200 dark:border-red-800', className)}>
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Error loading social networks: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Social Networks</CardTitle>
        {showCreateButton && (
          <Button onClick={onCreate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Network
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading && networks.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading social networks...</p>
          </div>
        ) : networks.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No social networks found. Add one to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Network</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networks.map((network) => (
                <TableRow key={network.networkId}>
                  <TableCell className="font-medium">
                    <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {getSocialNetworkName(network.network)}
                    </span>
                  </TableCell>
                  <TableCell>{network.user}</TableCell>
                  <TableCell>
                    <a
                      href={network.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span className="truncate max-w-xs">{network.url}</span>
                      <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(network)}
                        disabled={deletingId === network.networkId}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(network.networkId)}
                        disabled={deletingId === network.networkId}
                      >
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
