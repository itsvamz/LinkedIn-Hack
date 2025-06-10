import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VoiceRecorderProps {
  onRecordingComplete?: (audioBlob: Blob) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        onRecordingComplete?.(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer (max 60 seconds)
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadRecording = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pitch-recording-${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetRecording = () => {
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioUrl('');
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="text-lg font-semibold">
            Voice Recorder
          </div>
          
          <div className="text-2xl font-mono">
            {formatTime(recordingTime)} / 1:00
          </div>

          <div className="flex justify-center space-x-2">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="lg"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                className="bg-gray-600 hover:bg-gray-700 text-white"
                size="lg"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop Recording
              </Button>
            )}

            {audioBlob && !isRecording && (
              <>
                <Button
                  onClick={resetRecording}
                  variant="outline"
                >
                  Record Again
                </Button>
                <Button
                  onClick={downloadRecording}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </>
            )}
          </div>

          {audioUrl && (
            <div className="mt-4">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {isRecording && (
            <div className="text-sm text-gray-600">
              Recording... Maximum duration is 1 minute
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
