
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Image, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const socialNetworks = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
];

export function NewPostContent() {
  const [formData, setFormData] = useState({
    socialNetwork: "",
    title: "",
    caption: "",
    date: "",
    time: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Post scheduled successfully!");
      // Reset form
      setFormData({
        socialNetwork: "",
        title: "",
        caption: "",
        date: "",
        time: ""
      });
      setSelectedFile(null);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="text-gray-300 hover:text-white mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Post</h1>
          <p className="text-gray-400">Schedule your content across social platforms</p>
        </div>
      </div>

      <div className="max-w-2xl">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Network Selection */}
              <div>
                <Label htmlFor="socialNetwork" className="text-white">Social Network *</Label>
                <Select value={formData.socialNetwork} onValueChange={(value) => setFormData({...formData, socialNetwork: value})}>
                  <SelectTrigger className="bg-brand-gray border-brand-gray/50 text-white">
                    <SelectValue placeholder="Select a platform" />
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

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-white">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-brand-gray border-brand-gray/50 text-white"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Media Upload */}
              <div>
                <Label className="text-white">Media Upload</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="media-upload" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand-gray/50 border-dashed rounded-lg cursor-pointer bg-brand-gray/20 hover:bg-brand-gray/30 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedFile ? (
                          <>
                            <Image className="w-8 h-8 mb-2 text-brand-blue" />
                            <p className="text-sm text-white">{selectedFile.name}</p>
                            <p className="text-xs text-gray-400">Click to change</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">
                              <span className="font-semibold text-brand-blue">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG, MP4 up to 10MB</p>
                          </>
                        )}
                      </div>
                      <input 
                        id="media-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div>
                <Label htmlFor="caption" className="text-white">Caption *</Label>
                <Textarea
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  className="bg-brand-gray border-brand-gray/50 text-white min-h-[100px]"
                  placeholder="Write your post caption..."
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.caption.length}/280 characters
                </p>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-white">Schedule Date *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-brand-gray border-brand-gray/50 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-white">Schedule Time *</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-brand-gray border-brand-gray/50 text-white"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button type="submit" className="btn-gradient flex-1" disabled={isLoading}>
                  {isLoading ? "Scheduling..." : "Schedule Post"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-brand-gray text-gray-300 hover:bg-brand-gray/50"
                >
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
