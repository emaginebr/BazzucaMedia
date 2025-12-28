import React from 'react';
import IClientProvider from './IClientProvider';

const ClientContext = React.createContext<IClientProvider>(null);

export default ClientContext;