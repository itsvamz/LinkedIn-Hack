
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AvatarChatModeProps {
  candidate: any;
}

const AvatarChatMode: React.FC<AvatarChatModeProps> = ({ candidate }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: "Hi! I'm here to answer any questions about my background and experience. What would you like to know?", timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const quickQuestions = [
    "Tell me about your experience with React",
    "What's your availability?",
    "Describe your recent projects",
    "What are your salary expectations?",
    "Why are you looking for a new role?",
    "What's your preferred work style?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I have 5+ years of experience with React, including building large-scale applications with Redux and TypeScript. I've also worked extensively with React hooks and modern development practices.",
        "I'm available to start immediately and open to both full-time and contract opportunities. I prefer hybrid work arrangements but am flexible based on team needs.",
        "My recent project involved building a real-time collaboration platform using React, Node.js, and WebSocket technology. It supports 10,000+ concurrent users.",
        "I'm looking for a role in the $120-150K range, depending on the benefits package and growth opportunities.",
        "I'm seeking new challenges and opportunities to work with cutting-edge technologies while contributing to meaningful products that impact users.",
        "I thrive in collaborative environments and prefer agile methodologies. I enjoy mentoring junior developers and contributing to technical decisions."
      ];
      
      const response = {
        id: messages.length + 2,
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  if (!candidate) {
    return (
      <Card className="border-violet-100 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="text-gray-500 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Candidate Selected</h3>
            <p>Select a candidate from the pitch carousel to start an interactive chat session.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Avatar Section */}
      <div className="lg:col-span-1">
        <Card className="border-violet-100 shadow-lg">
          <CardContent className="p-6 text-center">
            <motion.div
              className="relative mb-6"
              animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
            >
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-violet-200 shadow-lg"
              />
              {isSpeaking && (
                <motion.div
                  className="absolute inset-0 border-4 border-violet-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
            <p className="text-violet-600 font-medium mb-4">{candidate.role}</p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {candidate.skills.slice(0, 3).map((skill: string) => (
                <Badge key={skill} className="bg-violet-100 text-violet-700 text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Audio Controls */}
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                variant={isAudioEnabled ? "default" : "outline"}
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="bg-gradient-to-r from-violet-600 to-purple-600"
              >
                {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant={isListening ? "destructive" : "outline"}
                onClick={() => setIsListening(!isListening)}
                className={isListening ? "bg-red-500" : "border-violet-200 text-violet-600"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card className="border-violet-100 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start border-violet-200 text-violet-600 hover:bg-violet-50 text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Section */}
      <div className="lg:col-span-2">
        <Card className="border-violet-100 shadow-lg h-[600px] flex flex-col">
          <CardHeader className="border-b border-violet-100">
            <CardTitle className="flex items-center justify-between">
              <span>Chat with {candidate.name}</span>
              <Badge className="bg-emerald-100 text-emerald-700">Online</Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-violet-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="border-t border-violet-100 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about experience, availability, projects..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-violet-600 to-purple-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AvatarChatMode;
