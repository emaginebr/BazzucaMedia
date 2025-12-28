import { getNetworkIcon, getNetworkName, socialNetworkFromEnum, socialNetworks, socialNetworkToEnum } from "@/components/functions";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import SocialNetworkEnum from "@/DTO/Enum/SocialNetworkEnum";
import { ArrowLeft, ChevronDown, Filter, LockIcon, Plus, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IHeaderProps {
    clients: ClientInfo[];
    clientId?: number;
    clientName?: string;
    network?: SocialNetworkEnum;
    setClientId: (clientId: number) => void;
    setClientName: (clientName: string) => void;
    setNetwork: (network: SocialNetworkEnum) => void;
    filter: (clientId?: number, network?: SocialNetworkEnum) => void;
}

export default function Header(props: IHeaderProps) {

    return (
        <>
            <div className="flex items-center justify-between mb-8 w-full flex-wrap">
                {/* Esquerda: botão de voltar + título */}
                <div className="flex items-start space-x-4">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-gray-300 hover:bg-secondary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Posts List</h1>
                        <p className="text-gray-400">
                            Schedule your content across social platforms
                        </p>
                    </div>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="text-black mr-2">
                                <User className="h-5 w-5" />
                                <span>{props.clientName ? props.clientName : 'All Clients'}</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                props.setClientId(null);
                                props.setClientName(null);
                                props.filter(null, props.network);
                            }}>
                                <User className="h-4 w-4 mr-2" />
                                All Clients
                            </DropdownMenuItem>
                            {props.clients.map((client) => (
                                <DropdownMenuItem onClick={() => {
                                    props.setClientId(client.clientId);
                                    props.setClientName(client.name);
                                    props.filter(client.clientId, props.network);
                                }}>
                                    <User className="h-4 w-4 mr-2" />
                                    {client.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="text-black mr-2">
                                {props.network ? (
                                    <>
                                        {getNetworkIcon(props.network)}
                                        {getNetworkName(props.network)}
                                    </>
                                ) : (
                                    <>
                                        <Filter className="h-5 w-5" />
                                        <span>All Networks</span>
                                    </>
                                )}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                                props.setNetwork(null);
                                props.filter(props.clientId, null);
                            }}>
                                <Filter className="h-4 w-4 mr-2" />
                                All Networks
                            </DropdownMenuItem>
                            {socialNetworks.map((value) => {
                                let network: SocialNetworkEnum = socialNetworkToEnum(value.value);
                                return (
                                    <DropdownMenuItem onClick={() => {
                                        props.setNetwork(network);
                                        props.filter(props.clientId, socialNetworkToEnum(value.value));
                                    }}>
                                        {getNetworkIcon(network)}
                                        {getNetworkName(network)}
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to="/posts/new">
                        <Button className="btn-gradient">
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}