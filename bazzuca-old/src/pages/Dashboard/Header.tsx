import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    const sidebar = useSidebar();
    return (
        <div className="flex items-center justify-between mb-8 w-full flex-wrap">
            <div className="flex items-start space-x-4">
                {!sidebar.open &&
                    <div>
                        <Button
                            variant="ghost"
                            className="text-gray-300 hover:bg-secondary"
                            onClick={() => sidebar.toggleSidebar()}
                        >
                            <Menu className="w-4 h-4" />
                        </Button>
                    </div>
                }
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400">Manage your social media presence</p>
                </div>
            </div>
            <div>
                <Link to="/new-post">
                    <Button className="btn-gradient">
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                    </Button>
                </Link>
            </div>
        </div>
    );
}