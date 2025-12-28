import React from 'react';
import IPostProvider from './IPostProvider';

const PostContext = React.createContext<IPostProvider>(null);

export default PostContext;