import React from "react";
import { motion } from "framer-motion";
import { Eye, Play, Bookmark, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileAnalytics = ({ user }) => {
  const metrics = [
    {
      title: "Profile Views",
      value: user?.profileViews ?? 0,
      icon: Eye,
    },
    {
      title: "Profile Clicks",
      value: user?.profileClicks ?? 0,
      icon: Play,
    },
    {
      title: "Profile Likes",
      value: user?.profileLikes ?? 0,
      icon: TrendingUp,
    },
    {
      title: "Bookmarks",
      value: user?.profileBookmarks ?? 0,
      icon: Bookmark,
    },
    {
      title: "Pitch Views",
      value: user?.pitchViews ?? 0,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 transition-colors hover:border-blue-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {metric.value}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProfileAnalytics;
