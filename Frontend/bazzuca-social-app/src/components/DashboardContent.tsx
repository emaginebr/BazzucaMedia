
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

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

export function DashboardContent() {
  const [currentDate] = useState(new Date());
  
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Scheduled Posts
            </CardTitle>
            <Calendar className="h-4 w-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-gray-400">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Reach
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-brand-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.4K</div>
            <p className="text-xs text-gray-400">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Engagement Rate
            </CardTitle>
            <Users className="h-4 w-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8.2%</div>
            <p className="text-xs text-gray-400">
              +0.5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card className="bg-brand-dark border-brand-gray/30">
          <CardHeader>
            <CardTitle className="text-white">{formatMonthYear()}</CardTitle>
            <CardDescription className="text-gray-400">
              View your scheduled posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth().map((day, index) => (
                <div 
                  key={index} 
                  className={`text-center p-2 text-sm ${
                    day 
                      ? 'text-white hover:bg-brand-gray/50 rounded cursor-pointer' 
                      : ''
                  } ${
                    day === 15 || day === 16 || day === 17 
                      ? 'bg-brand-blue/20 text-brand-blue rounded' 
                      : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
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
      </div>
    </div>
  );
}
