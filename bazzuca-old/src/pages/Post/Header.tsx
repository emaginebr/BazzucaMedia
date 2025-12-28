import { Button } from "@/components/ui/button";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostStatusEnum from "@/DTO/Enum/PostStatusEnum";
import { ArrowLeft, Copy, Plus, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface IHeaderProps {
    insertMode: boolean;
    loading: boolean;
    postId: number;
    post: PostInfo;
    setPost: (post: PostInfo) => void;
    onPublishClick: () => void;
}

export default function Header(props: IHeaderProps) {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex items-center justify-between mb-8 w-full flex-wrap">
                {/* Esquerda: botão de voltar + título */}
                <div className="flex items-start space-x-4">
                    <Link to="/posts">
                        <Button variant="ghost" className="text-gray-300 hover:bg-secondary">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{props.postId > 0 ? "Edit Post" : "New Post"}</h1>
                        <p className="text-gray-400">
                            Schedule your content across social platforms
                        </p>
                    </div>
                </div>

                {!props.insertMode && (
                    <div>
                        <Button 
                            variant="outline" 
                            className="hover:bg-primary hover:text-black transition-colors mr-2"
                            onClick={(e) => {
                                e.preventDefault();
                                let post: PostInfo = {
                                    ...props.post,
                                    postId: 0,
                                    title: props.post.title + "(2)",
                                    scheduleDate: new Date().toISOString(),
                                    status: PostStatusEnum.Draft
                                };
                                props.setPost(post);

                                navigate("/posts/new");
                            }}
                        >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Post
                        </Button>
                        <Button className="btn-gradient" onClick={(e) => {
                            e.preventDefault();
                            props.onPublishClick();
                        }}>
                            <Upload className="w-4 h-4 mr-2" />
                            {props.loading ? "Publishing..." : "Publish Now"}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}