import { Button } from "@/components/ui/button";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface IHeaderProps {
    client?: ClientInfo;
    onNewNetworkClick: () => void;
}

export default function Header(props: IHeaderProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-8 w-full flex-wrap">
                {/* Esquerda: botão de voltar + título */}
                <div className="flex items-start space-x-4">
                    <Link to="/clients">
                        <Button variant="ghost" className="text-gray-300 hover:bg-secondary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Clients
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{props.client?.name}</h1>
                        <p className="text-gray-400">
                            Manage this client's social networks here
                        </p>
                    </div>
                </div>

                {/* Direita: botão Novo Cliente */}
                <div>
                        <Button className="btn-gradient" onClick={(e) => {
                            e.preventDefault();
                            props.onNewNetworkClick();
                        }}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Social Network
                        </Button>
                </div>
            </div>
        </>
    );
}