import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Manage your social media presence</p>
            </div>
            <Link to="/new-post">
                <Button className="btn-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                </Button>
            </Link>
        </div>
    );
}