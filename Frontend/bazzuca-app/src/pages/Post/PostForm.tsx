
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Image as ImageIcon, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getNetworkName, socialNetworks } from "@/components/functions";
import ClientContext from "@/Contexts/Client/ClientContext";
import SocialNetworkContext from "@/Contexts/SocialNetwork/SocialNetworkContext";
import PostContext from "@/Contexts/Post/PostContext";
import DateTimePicker from 'react-datetime-picker';
import PostTypeEnum from "@/DTO/Enum/PostTypeEnum";
import PostStatusEnum from "@/DTO/Enum/PostStatusEnum";
import PostInfo from "@/DTO/Domain/PostInfo";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { ShortLink } from "@/components/ShortLink";

interface IPostProps {
  insertMode: boolean;
  loading: boolean;
  post?: PostInfo;
  setPost: (post: PostInfo) => void;
  onSave: (post: PostInfo) => void;
}

export function PostForm(props: IPostProps) {

  const clientContext = useContext(ClientContext);
  const networkContext = useContext(SocialNetworkContext);
  const postContext = useContext(PostContext);

  const postSaveHandler = async (status: PostStatusEnum) => {
    let post: PostInfo = {
      ...props.post,
      postType: PostTypeEnum.Post,
      mediaUrl: postContext.imageUrl,
      status: status
    };
    props.onSave(post);
  };

  /*
  const postSaveHandler = async (status: PostStatusEnum) => {

    const localDate = new Date(props.post.scheduleDate); // Date from picker
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    let post: PostInfo = {
      ...props.post,
      scheduleDate: utcDate.toISOString(),
      postType: PostTypeEnum.Post, // Assuming default type
      mediaUrl: postContext.imageUrl,
      status: PostStatusEnum.Draft
    };
    if (postContext.post.postId > 0) {
      let ret = await postContext.update(post);
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        return;
      }
    }
    else {
      let ret = await postContext.insert(post);
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        return;
      }
    }
    toast.success("Post scheduled successfully!");
  };
  */

  useEffect(() => {
    clientContext.listByUser().then((ret) => {
      if (!ret.sucesso) {
        toast.error(ret.mensagemErro);
        return;
      }
    });
  }, [clientContext.client]);

  const isImage = (url: string) => /\.(jpe?g|png|gif|webp)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <Card className="bg-brand-dark border-brand-gray/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Post Details
        </CardTitle>
        <CardDescription className="text-gray-400">
          Fill in the details for your social media post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault();
          let post: PostInfo = {
            ...props.post,
            postType: PostTypeEnum.Post,
            mediaUrl: postContext.imageUrl,
            status: PostStatusEnum.Draft
          };
          props.onSave(post);
        }} className="space-y-6 md:flex md:space-y-0 md:space-x-6">
          <div className="md:w-2/3 space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-white">Title *</Label>
              <Input
                id="title"
                name="title"
                value={props.post?.title}
                onChange={(e) => props.setPost({ ...props.post, title: e.target.value })}
                className="bg-brand-gray border-brand-gray/50 text-white"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientId" className="text-white">Client *</Label>
              <Select
                value={props.post?.clientId?.toString()}
                onValueChange={async (value) => {
                  let _clientId = parseInt(value);
                  if (!isNaN(_clientId) && _clientId > 0) {
                    props.setPost({ ...props.post, clientId: _clientId });

                    let ret = await networkContext.listByClient(_clientId);
                    if (!ret.sucesso) {
                      toast.error(ret.mensagemErro);
                      return;
                    }
                  }
                }}
              >
                <SelectTrigger className="bg-brand-gray border-brand-gray/50 text-white">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent className="bg-brand-gray border-brand-gray/50">
                  {clientContext.clients?.map((client) => (
                    <SelectItem key={client.clientId} value={client.clientId.toString()} className="text-white hover:bg-brand-blue/20">
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Social Network Selection */}
            <div>
              <Label htmlFor="networkId" className="text-white">Social Network *</Label>
              <Select
                value={props.post?.networkId?.toString()}
                onValueChange={(value) => {
                  let _networkId = parseInt(value);
                  props.setPost({ ...props.post, networkId: _networkId });
                }}
              >
                <SelectTrigger className="bg-brand-gray border-brand-gray/50 text-white">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent className="bg-brand-gray border-brand-gray/50">
                  {networkContext.networks.map((network) => (
                    <SelectItem key={network.networkId} value={network.networkId.toString()} className="text-white hover:bg-brand-blue/20">
                      {getNetworkName(network.network)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Caption */}
            <div>
              <Label htmlFor="caption" className="text-white">Description *</Label>
              <Textarea
                id="caption"
                name="caption"
                value={props.post?.description}
                onChange={(e) => props.setPost({ ...props.post, description: e.target.value })}
                className="bg-brand-gray border-brand-gray/50 text-white min-h-[300px]"
                placeholder="Write your post caption..."
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {props.post?.description?.length || 0}/280 characters
              </p>
            </div>

            <div>
              <Label htmlFor="scheduleDate" className="text-white">Schedule Date *</Label>
              <DateTimePicker
                id="scheduleDate"
                value={props.post?.scheduleDate}
                className="bg-brand-gray border-brand-gray/50 text-white"
                format="dd/MM/yyyy HH:mm"
                onChange={(e) => { props.setPost({ ...props.post, scheduleDate: e.toISOString() }) }}
              />
            </div>


            {props.post?.status != PostStatusEnum.Posted && (
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  className="btn-gradient flex-1"
                  disabled={postContext.loadingUpdate}
                  onClick={(e) => {
                    e.preventDefault();
                    postSaveHandler(PostStatusEnum.Scheduled);
                  }}
                >
                  {postContext.loadingUpdate ? "Scheduling..." : "Schedule Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-brand-gray text-gray-300 hover:bg-secondary hover:text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    postSaveHandler(PostStatusEnum.Draft);
                  }}
                >
                  {postContext.loadingUpdate ? "Saving..." : "Save as Draft"}
                </Button>
              </div>
            )}
          </div>
          <div className="md:w-1/3">
            <Label className="text-white">Media Upload</Label>
            <div className="mt-2">
              <label
                htmlFor="media-upload"
                className="relative block w-full aspect-[9/16] overflow-hidden border-2 border-brand-gray/50 border-dashed rounded-lg cursor-pointer bg-brand-gray/20 hover:bg-brand-gray/30 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {postContext.imageUrl ? (
                    <>
                      <p className="text-xs text-white mt-2 truncate">
                        <ShortLink url={postContext.imageUrl} />
                      </p>
                      <p className="text-xs text-gray-400">Click to change</p>
                      {isImage(postContext.imageUrl) ? (
                        <img
                          src={postContext.imageUrl}
                          alt="Uploaded file"
                          className="object-cover w-full h-full"
                        />
                      ) : isVideo(postContext.imageUrl) ? (
                        <video
                          src={postContext.imageUrl}
                          controls
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ImageIcon className="w-8 h-8 mb-2 text-brand-blue" />
                      )}
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold text-brand-blue">
                          Click to upload
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, MP4 up to 50MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="media-upload"
                  type="file"
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      let ret = await postContext.uploadImage(
                        e.target.files[0],
                        e.target.files[0].name
                      );
                      if (!ret.sucesso) {
                        toast.error(ret.mensagemErro);
                        return;
                      }
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
