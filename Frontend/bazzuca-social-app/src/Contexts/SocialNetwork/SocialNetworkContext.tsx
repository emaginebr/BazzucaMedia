import React from 'react';
import ISocialNetworkProvider from './ISocialNetworkProvider';

const SocialNetworkContext = React.createContext<ISocialNetworkProvider>(null);

export default SocialNetworkContext;