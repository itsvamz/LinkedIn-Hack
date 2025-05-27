
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, Pause, RotateCcw, Wand2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ElevatorPitch = () => {
  const [pitchText, setPitchText] = useState(
    "Hi, I'm Sarah Johnson, a Senior UX Designer with over 5 years of experience creating user-centered digital experiences. I specialize in transforming complex problems into intuitive solutions, having led design projects that increased user engagement by 40% at my current company. I'm passionate about accessibility and inclusive design, and I'm looking for opportunities to drive innovation in a forward-thinking tech company."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual recording logic
    if (!isRecording) {
      console.log('Starting recording...');
    } else {
      console.log('Stopping recording...');
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement audio playback
    console.log(isPlaying ? 'Pausing...' : 'Playing...');
  };

  const generatePitch = () => {
    // TODO: Implement AI pitch generation
    console.log('Generating AI pitch...');
    // Simulate AI generation with a different pitch
    setPitchText(
      "Hello! I'm Sarah Johnson, a creative UX Designer with 5+ years of experience building intuitive digital products. I've successfully launched 15+ projects that improved user satisfaction by an average of 35%. My expertise spans user research, prototyping, and design systems. I'm excited about joining a team where I can blend creativity with data-driven insights to create meaningful user experiences."
    );
  };

  return (
    <div className="space-y-6">
      {/* Written Pitch */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-violet-600" />
            Your Elevator Pitch
          </CardTitle>
          <CardDescription>
            Write or generate your perfect 30-second introduction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <textarea
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              placeholder="Write your elevator pitch here..."
              className="w-full h-32 p-4 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {pitchText.length}/300 characters
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={generatePitch}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
            <Button variant="outline" className="border-violet-200 text-violet-600 hover:bg-violet-50">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video/Audio Recording */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mic className="w-5 h-5 mr-2 text-violet-600" />
            Record Your Pitch
          </CardTitle>
          <CardDescription>
            Record a 30-second video or audio pitch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recording Interface */}
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 cursor-pointer transition-all ${
                isRecording
                  ? 'bg-red-500 border-red-600 text-white animate-pulse'
                  : 'bg-violet-50 border-violet-300 text-violet-600 hover:bg-violet-100'
              }`}
              onClick={handleRecord}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </motion.div>
            
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-900">
                {isRecording ? 'Recording...' : 'Click to Record'}
              </p>
              {isRecording && (
                <p className="text-red-600">
                  {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </div>

          {/* Recording Options */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              Audio Only
            </Button>
            <Button
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              Video + Audio
            </Button>
          </div>

          {/* Playback Controls */}
          <div className="border border-violet-200 rounded-lg p-4 bg-violet-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  onClick={handlePlay}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <span className="text-sm text-gray-600">
                  {isPlaying ? 'Playing...' : 'Ready to play'}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 text-gray-600"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Re-record
              </Button>
            </div>
            
            {/* Waveform Placeholder */}
            <div className="mt-3 h-8 bg-white rounded flex items-center px-2">
              <div className="flex space-x-1 w-full">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-violet-300 w-1"
                    style={{
                      height: `${Math.random() * 24 + 4}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            Save Pitch Recording
          </Button>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-violet-100">
        <CardHeader>
          <CardTitle>💡 Pitch Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Keep it to 30 seconds or less</li>
            <li>• Start with your name and current role</li>
            <li>• Highlight your key achievements with numbers</li>
            <li>• End with what you're looking for</li>
            <li>• Practice until it feels natural</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElevatorPitch;
