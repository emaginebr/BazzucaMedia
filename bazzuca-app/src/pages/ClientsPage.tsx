import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientList, ClientModal, useClients } from 'bazzuca-react';
import type { ClientInfo } from 'bazzuca-react';
import { toast } from 'sonner';
import { ROUTES } from '../lib/constants';

export default function ClientsPage() {
  const navigate = useNavigate();
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

  const handleView = (client: ClientInfo) => {
    navigate(ROUTES.CLIENT_NETWORKS(client.clientId));
  };

  const handleDelete = async () => {
    toast.success('Client deleted successfully');
    await refreshClients();
  };

  const handleSave = async () => {
    toast.success(selectedClient ? 'Client updated successfully' : 'Client created successfully');
    setIsModalOpen(false);
    setSelectedClient(undefined);
    await refreshClients();
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
        onView={handleView}
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
