
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accessibility, X, Volume2, Mic, Contrast } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setHighContrast(savedHighContrast);
    
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    localStorage.setItem('highContrast', newHighContrast.toString());
    
    if (newHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleSpeechSynthesis = () => {
    const newSpeechSynthesis = !speechSynthesis;
    setSpeechSynthesis(newSpeechSynthesis);
    
    if (newSpeechSynthesis) {
      // Enable text-to-speech for page content
      speakText("Text to speech enabled. Click on any text to hear it read aloud.");
    } else {
      // Disable text-to-speech
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeechRecognition = () => {
    const newSpeechRecognition = !speechRecognition;
    setSpeechRecognition(newSpeechRecognition);
    
    if (newSpeechRecognition) {
      // Enable speech-to-text (basic implementation)
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          console.log('Speech recognized:', transcript);
        };
        
        recognition.start();
        speakText("Speech to text enabled. Start speaking and your words will be recognized.");
      } else {
        speakText("Speech recognition is not supported in this browser.");
      }
    }
  };

  useEffect(() => {
    // Add click listeners for text-to-speech when enabled
    if (speechSynthesis) {
      const handleTextClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const text = target.textContent || target.innerText;
        if (text && text.trim().length > 0) {
          speakText(text);
        }
      };

      document.addEventListener('click', handleTextClick);
      return () => document.removeEventListener('click', handleTextClick);
    }
  }, [speechSynthesis]);

  return (
    <>
      {/* Floating Accessibility Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Open Accessibility Panel"
        >
          <Accessibility className="w-6 h-6" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-80 shadow-2xl border-gray-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-lg font-semibold text-blue-800">Accessibility Options</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Contrast className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">High Contrast</p>
                      <p className="text-sm text-gray-600">Enhance visibility</p>
                    </div>
                  </div>
                  <Button
                    variant={highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={toggleHighContrast}
                    className={highContrast ? "bg-blue-600 text-white" : ""}
                  >
                    {highContrast ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Text to Speech */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Text to Speech</p>
                      <p className="text-sm text-gray-600">Click text to hear it</p>
                    </div>
                  </div>
                  <Button
                    variant={speechSynthesis ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeechSynthesis}
                    className={speechSynthesis ? "bg-blue-600 text-white" : ""}
                  >
                    {speechSynthesis ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Speech to Text */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Speech to Text</p>
                      <p className="text-sm text-gray-600">Voice input support</p>
                    </div>
                  </div>
                  <Button
                    variant={speechRecognition ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeechRecognition}
                    className={speechRecognition ? "bg-blue-600 text-white" : ""}
                  >
                    {speechRecognition ? 'On' : 'Off'}
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Accessibility features help make AVIRI more inclusive for everyone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;
