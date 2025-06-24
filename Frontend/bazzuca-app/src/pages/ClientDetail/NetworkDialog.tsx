import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SocialNetworkEnum from '@/DTO/Enum/SocialNetworkEnum';
import { getNetworkName, socialNetworkFromEnum, socialNetworks, socialNetworkToEnum } from '@/components/functions';
import SocialNetworkInfo from '@/DTO/Domain/SocialNetworkInfo';

interface INetworkDialogProps {
    isOpen: boolean;
    loading: boolean;
    title: string;
    network?: SocialNetworkInfo;
    setNetwork: (network: SocialNetworkInfo) => void;
    setIsOpen: (isOpen: boolean) => void;
    onSave: (network: SocialNetworkInfo) => void;
}


export default function NetworkDialog(props: INetworkDialogProps) {

    return (
        <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <div>
                        <label htmlFor="network" className="block text-sm font-medium mb-1">Social Network</label>
                        <Select
                            name="network"
                            value={socialNetworkFromEnum(props.network?.network)}
                            onValueChange={(value) => props.setNetwork({
                                ...props.network,
                                network: socialNetworkToEnum(value)
                            })}
                        >
                            <SelectTrigger className="bg-brand-gray border-brand-gray/50 text-white">
                                <SelectValue placeholder="Select a Social Network" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-gray border-brand-gray/50">
                                {socialNetworks.map((network) => (
                                    <SelectItem key={network.value} value={network.value} className="text-white hover:bg-brand-blue/20">
                                        {network.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium mb-1">Url</label>
                        <Input
                            id="url"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter Social Network Url..."
                            value={props.network?.url}
                            onChange={(e) => props.setNetwork({
                                ...props.network,
                                url: e.target.value
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="user" className="block text-sm font-medium mb-1">User</label>
                        <Input
                            id="user"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter your user on Social Network..."
                            value={props.network?.user}
                            onChange={(e) => props.setNetwork({
                                ...props.network,
                                user: e.target.value
                            })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="off"
                            placeholder="Enter your password on Social Network..."
                            value={props.network?.password}
                            onChange={(e) => props.setNetwork({
                                ...props.network,
                                password: e.target.value
                            })}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => props.setIsOpen(false)}>Cancel</Button>
                    <Button variant="default" onClick={(e) => {
                        e.preventDefault();
                        props.onSave(props.network);
                    }}>{props.loading ? 'Saving...' : 'Save'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
