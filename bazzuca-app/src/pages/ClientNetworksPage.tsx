import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SocialNetworkList, SocialNetworkModal, useClients, useSocialNetworks } from 'bazzuca-react';
import type { SocialNetworkInfo } from 'bazzuca-react';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../lib/constants';

export default function ClientNetworksPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientId = id ? parseInt(id, 10) : 0;
  
  const { clients } = useClients();
  const client = clients.find(c => c.clientId === clientId);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetworkInfo | undefined>(undefined);
  const { refreshNetworks } = useSocialNetworks(clientId);

  const handleCreate = () => {
    setSelectedNetwork(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (network: SocialNetworkInfo) => {
    setSelectedNetwork(network);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    toast.success('Social network deleted successfully');
    refreshNetworks();
  };

  const handleSave = () => {
    toast.success(selectedNetwork ? 'Social network updated successfully' : 'Social network created successfully');
    setIsModalOpen(false);
    setSelectedNetwork(undefined);
    refreshNetworks();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedNetwork(undefined);
  };

  const handleBack = () => {
    navigate(ROUTES.CLIENTS);
  };

  if (!client) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </button>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Client not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {client.name} - Social Networks
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage social network accounts for this client
        </p>
      </div>

      <SocialNetworkList
        clientId={clientId}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        showCreateButton={true}
      />

      <SocialNetworkModal
        isOpen={isModalOpen}
        onClose={handleClose}
        clientId={clientId}
        network={selectedNetwork}
        onSave={handleSave}
      />
    </div>
  );
}
