import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Users } from "lucide-react";

export default function StatCards() {
    return (
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
    );
}