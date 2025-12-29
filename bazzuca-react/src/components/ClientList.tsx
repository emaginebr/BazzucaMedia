import { useState } from 'react';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import { useClients } from '../hooks/useClients';
import type { ClientInfo } from '../types/bazzuca';
import { getSocialNetworkName } from '../types/bazzuca';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ConfirmDialog } from './ConfirmDialog';
import { cn } from '../utils/cn';

export interface ClientListProps {
  onEdit?: (client: ClientInfo) => void;
  onDelete?: (clientId: number) => void;
  onCreate?: () => void;
  onView?: (client: ClientInfo) => void;
  showCreateButton?: boolean;
  className?: string;
}

export function ClientList({
  onEdit,
  onDelete,
  onCreate,
  onView,
  showCreateButton = true,
  className,
}: ClientListProps) {
  const { clients, loading, error, deleteClient } = useClients();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const handleDeleteClick = (clientId: number) => {
    setClientToDelete(clientId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (clientToDelete === null) return;
    
    setDeletingId(clientToDelete);
    const success = await deleteClient(clientToDelete);
    setDeletingId(null);
    setShowDeleteDialog(false);
    
    if (success && onDelete) {
      onDelete(clientToDelete);
    }
    
    setClientToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setClientToDelete(null);
  };

  if (error) {
    return (
      <Card className={cn('border-red-200 dark:border-red-800', className)}>
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Error loading clients: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Clients</CardTitle>
        {showCreateButton && (
          <Button onClick={onCreate} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {loading && clients.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading clients...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No clients found. Create your first client to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Social Networks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.clientId}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {client.socialNetworks.map((network) => (
                        <span
                          key={network}
                          className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        >
                          {getSocialNetworkName(network)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView?.(client)}
                        disabled={deletingId === client.clientId}
                        title="View networks"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(client)}
                        disabled={deletingId === client.clientId}
                        title="Edit client"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(client.clientId)}
                        disabled={deletingId === client.clientId}
                        title="Delete client"
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

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Client"
        description="Are you sure you want to delete this client? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deletingId !== null}
        variant="destructive"
      />
    </Card>
  );
}
