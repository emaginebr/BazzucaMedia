import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface IHeaderProps {
    onNewClientClick: () => void;
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
                        <h1 className="text-3xl font-bold text-white">Clients List</h1>
                        <p className="text-gray-400">
                            Schedule your content across social platforms
                        </p>
                    </div>
                </div>

                {/* Direita: botão Novo Cliente */}
                <div>
                        <Button className="btn-gradient" onClick={(e) => {
                            e.preventDefault();
                            props.onNewClientClick();
                        }}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Client
                        </Button>
                </div>
            </div>
        </>
    );
}