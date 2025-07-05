
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import IPostProvider from "@/Contexts/Post/IPostProvider";
import PostContext from "@/Contexts/Post/PostContext";
import { toast } from "sonner";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostStatusEnum from "@/DTO/Enum/PostStatusEnum";
import PostTypeEnum from "@/DTO/Enum/PostTypeEnum";
import Header from "./Header";
import ISocialNetworkProvider from "@/Contexts/SocialNetwork/ISocialNetworkProvider";
import SocialNetworkContext from "@/Contexts/SocialNetwork/SocialNetworkContext";
import logo from "@/assets/images/logo.png";


export default function Post() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const { postId } = useParams<"postId">();

  const authContext = useContext<IAuthProvider>(AuthContext);
  const networkContext = useContext<ISocialNetworkProvider>(SocialNetworkContext);
  const postContext = useContext<IPostProvider>(PostContext);

  const loadPost = async () => {
    setLoading(true);
    if (!authContext.sessionInfo) {
      setLoading(false);
      navigate("/login");
      return;
    }
    let post: PostInfo = {
      postId: parseInt(postId || "0"),
      networkId: 0,
      clientId: 0,
      title: "",
      description: "",
      mediaUrl: "",
      scheduleDate: new Date().toISOString(),
      postType: PostTypeEnum.Post,
      status: PostStatusEnum.Draft
    };
    postContext.setPost(post);
    postContext.setImageUrl("");
    let postIdNum: number = parseInt(postId || "0");
    if (postIdNum > 0) {
      let retPost = await postContext.getById(postIdNum);
      if (!retPost.sucesso) {
        toast.error(retPost.mensagemErro);
        setLoading(false);
        return;
      }
      let ret = await networkContext.listByClient(retPost.post.clientId);
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            {/* Header */}
            <Header
              insertMode={parseInt(postId || "0") > 0 ? false : true}
              loading={postContext.loadingUpdate}
              postId={parseInt(postId || "0")}
              post={postContext.post}
              setPost={postContext.setPost}
              onPublishClick={async () => {
                let postIdNum: number = parseInt(postId || "0");
                let ret = await postContext.publish(postIdNum);
                if (!ret.sucesso) {
                  toast.error(ret.mensagemErro);
                  return;
                }
                toast.success("Post published successfully!");
              }}
            />
            <PostForm
              loading={postContext.loading}
              insertMode={parseInt(postId || "0") > 0 ? true : false}
              post={postContext.post}
              setPost={postContext.setPost}
              onSave={async (postData: PostInfo) => {

                const localDate = new Date(postData.scheduleDate); // Date from picker
                const utcDate = new Date(
                  localDate.getTime() - localDate.getTimezoneOffset() * 60000
                );
                postData = {
                  ...postData,
                  scheduleDate: utcDate.toISOString(),
                  postType: PostTypeEnum.Post,
                }

                if (postData.postId > 0) {
                  let ret = await postContext.update(postData);
                  if (!ret.sucesso) {
                    toast.error(ret.mensagemErro);
                    return;
                  }
                }
                else {
                  let ret = await postContext.insert(postData);
                  if (!ret.sucesso) {
                    toast.error(ret.mensagemErro);
                    return;
                  }
                }
                toast.success("Post scheduled successfully!");
              }}
            />
          </div>
        </main>
      </div >
    </SidebarProvider >
  );
};
