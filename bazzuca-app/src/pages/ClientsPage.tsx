import { useState } from 'react';
import { ClientList, ClientModal, useClients } from 'bazzuca-react';
import type { ClientInfo } from 'bazzuca-react';
import { toast } from 'sonner';

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientInfo | undefined>(undefined);
  const { refreshClients } = useClients();

  const handleCreate = () => {
    setSelectedClient(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (client: ClientInfo) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    toast.success('Client deleted successfully');
    refreshClients();
  };

  const handleSave = () => {
    toast.success(selectedClient ? 'Client updated successfully' : 'Client created successfully');
    setIsModalOpen(false);
    setSelectedClient(undefined);
    refreshClients();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedClient(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your social media clients and their networks
        </p>
      </div>

      <ClientList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        showCreateButton={true}
      />

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleClose}
        client={selectedClient}
        onSave={handleSave}
      />
    </div>
  );
}
