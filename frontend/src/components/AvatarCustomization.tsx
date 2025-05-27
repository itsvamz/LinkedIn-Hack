
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Palette, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AvatarCustomization = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('/placeholder.svg');
  const [selectedBackground, setSelectedBackground] = useState('gradient1');

  const avatarOptions = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];

  const backgroundOptions = [
    { id: 'gradient1', name: 'Violet Gradient', class: 'bg-gradient-to-br from-violet-500 to-purple-600' },
    { id: 'gradient2', name: 'Blue Gradient', class: 'bg-gradient-to-br from-blue-500 to-cyan-600' },
    { id: 'gradient3', name: 'Green Gradient', class: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { id: 'gradient4', name: 'Pink Gradient', class: 'bg-gradient-to-br from-pink-500 to-rose-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Avatar Preview */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2 text-violet-600" />
            Avatar Preview
          </CardTitle>
          <CardDescription>
            See how your avatar will appear to recruiters
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-block p-8 rounded-2xl ${backgroundOptions.find(bg => bg.id === selectedBackground)?.class}`}
          >
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={selectedAvatar} alt="Profile" />
              <AvatarFallback className="text-2xl bg-white text-violet-600">SJ</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
            <p className="text-gray-600">Senior UX Designer</p>
          </div>
        </CardContent>
      </Card>

      {/* Upload Custom Avatar */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2 text-violet-600" />
            Upload Custom Photo
          </CardTitle>
          <CardDescription>
            Upload your own professional photo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-dashed border-violet-300 bg-violet-50 rounded-lg p-6 text-center hover:border-violet-400 transition-colors cursor-pointer"
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-violet-600" />
            <p className="text-violet-700 font-medium">Click to upload</p>
            <p className="text-sm text-violet-600">JPG, PNG up to 5MB</p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Avatar Templates */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-violet-600" />
            Generated Avatars
          </CardTitle>
          <CardDescription>
            Choose from AI-generated professional avatars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {avatarOptions.map((avatar, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAvatar(avatar)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  selectedAvatar === avatar
                    ? 'ring-2 ring-violet-500 bg-violet-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Avatar className="w-full aspect-square">
                  <AvatarImage src={avatar} alt={`Avatar ${index + 1}`} />
                  <AvatarFallback>A{index + 1}</AvatarFallback>
                </Avatar>
              </motion.div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            Generate More Avatars
          </Button>
        </CardContent>
      </Card>

      {/* Background Options */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2 text-violet-600" />
            Background Style
          </CardTitle>
          <CardDescription>
            Choose a background for your avatar display
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgroundOptions.map((bg) => (
              <motion.div
                key={bg.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBackground(bg.id)}
                className={`${bg.class} h-20 rounded-lg cursor-pointer border-2 transition-all ${
                  selectedBackground === bg.id
                    ? 'border-gray-900 shadow-lg'
                    : 'border-transparent hover:border-gray-300'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
        Save Avatar Settings
      </Button>
    </div>
  );
};

export default AvatarCustomization;
