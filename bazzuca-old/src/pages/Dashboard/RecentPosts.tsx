import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentPosts() {

    const scheduledPosts = [
        {
            id: 1,
            title: "Summer Campaign Launch",
            platform: "Instagram",
            date: "2024-01-15",
            time: "10:00 AM",
            status: "scheduled"
        },
        {
            id: 2,
            title: "Weekly Newsletter",
            platform: "LinkedIn",
            date: "2024-01-16",
            time: "2:00 PM",
            status: "scheduled"
        },
        {
            id: 3,
            title: "Product Announcement",
            platform: "Twitter",
            date: "2024-01-17",
            time: "9:00 AM",
            status: "scheduled"
        }
    ];

    return (
        <Card className="bg-brand-dark border-brand-gray/30">
            <CardHeader>
                <CardTitle className="text-white">Scheduled Posts</CardTitle>
                <CardDescription className="text-gray-400">
                    Your upcoming social media posts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {scheduledPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 bg-brand-gray/30 rounded-lg">
                            <div>
                                <h4 className="text-white font-medium">{post.title}</h4>
                                <p className="text-gray-400 text-sm">{post.date} at {post.time}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-brand-blue/20 text-brand-blue border-brand-blue/30"
                                >
                                    {post.platform}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="text-green-400 border-green-400/30"
                                >
                                    {post.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}