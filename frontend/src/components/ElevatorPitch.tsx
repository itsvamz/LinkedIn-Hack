import React, { useState } from 'react';
import { Wand2, RotateCcw, Save, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ElevatorPitch = () => {
  const [aiPitchText, setAiPitchText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoGenerated, setVideoGenerated] = useState(false);

  const handleGenerateAI = () => {
    const generated = "Hi, I'm Alex Roy, a software engineer passionate about building scalable web systems. I've led teams to ship 10+ projects across fintech and e-commerce, focusing on performance and UX. I'm looking for roles where I can solve real-world problems using AI and cloud technology.";
    setAiPitchText(generated);
    setIsEditing(false);
    setVideoGenerated(false);
    setVideoUrl('');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleGenerateVideo = () => {
    setTimeout(() => {
      setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4'); // Placeholder, replace with real video
      setVideoGenerated(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* AI Pitch Box */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center text-violet-700">
            <Wand2 className="w-5 h-5 mr-2 text-violet-600" />
            Generate Your AI Pitch
          </CardTitle>
          <CardDescription>
            Instantly get a professional pitch and customize it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!aiPitchText ? (
            <Button
              onClick={handleGenerateAI}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
          ) : (
            <>
              <textarea
                value={aiPitchText}
                onChange={(e) => setAiPitchText(e.target.value)}
                readOnly={!isEditing}
                className="w-full h-32 p-4 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleGenerateVideo}
                  className="bg-violet-600 text-white hover:bg-violet-700"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Generate Pitch Video
                </Button>
              </div>
            </>
          )}

          {videoGenerated && videoUrl && (
            <div className="mt-4">
              <video controls className="w-full rounded-lg shadow-md border">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optionally, original recording/mic section can go below */}
    </div>
  );
};

export default ElevatorPitch;
