'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mic, Square } from 'lucide-react';

interface VoiceAnimationProps {
  onSwitchToChat: () => void;
  stopSession: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

const VoiceAnimation: React.FC<VoiceAnimationProps> = ({
  onSwitchToChat,
  stopSession,
  isRecording,
  startRecording,
  stopRecording
}) => {
  // Generate random heights for voice bars
  const [barHeights, setBarHeights] = useState<number[]>(Array(16).fill(10));
  
  // Update bar heights periodically when recording
  useEffect(() => {
    if (!isRecording) return;
    
    const interval = setInterval(() => {
      setBarHeights(Array(16).fill(0).map(() => 
        isRecording ? 10 + Math.random() * 70 : 10
      ));
    }, 100);
    
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Voice visualization animation */}
      <motion.div 
        className="relative mb-8 mt-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-72 h-72 relative">
          {/* Multiple pulsing circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={`pulse-${i}`}
              className={`absolute inset-0 bg-gradient-to-r ${
                isRecording 
                  ? 'from-red-400/30 to-red-500/30' 
                  : 'from-[#3CBFAE]/20 to-[#D94B87]/20'
              } rounded-full`}
              animate={{ 
                scale: isRecording 
                  ? [1, 1.1 + (i * 0.1), 1] 
                  : [1, 1.05 + (i * 0.05), 1],
                opacity: isRecording 
                  ? [0.7 - (i * 0.2), 1 - (i * 0.2), 0.7 - (i * 0.2)] 
                  : [0.7 - (i * 0.2), 0.9 - (i * 0.2), 0.7 - (i * 0.2)]
              }}
              transition={{ 
                duration: isRecording ? 1.2 - (i * 0.2) : 3 - (i * 0.5),
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.3
              }}
            />
          ))}
          
          {/* Rotating outer ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              isRecording ? 'border-red-400' : 'border-[#3CBFAE]'
            } opacity-30`}
            animate={{
              rotate: 360,
              borderWidth: isRecording ? [2, 4, 2] : 2
            }}
            transition={{
              rotate: {
                duration: isRecording ? 8 : 20,
                repeat: Infinity,
                ease: "linear"
              },
              borderWidth: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          
          {/* Voice wave animation - more bars with dynamic heights */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={`bar-${i}`}
                className={`absolute w-1 ${isRecording ? 'bg-red-500' : 'bg-[#3CBFAE]'}`}
                style={{
                  height: `${barHeights[i % 16]}%`,
                  transformOrigin: 'bottom',
                  rotate: `${i * (360 / 24)}deg`,
                  bottom: '50%',
                  left: 'calc(50% - 1px)',
                }}
                animate={isRecording ? { 
                  opacity: [0.3, 0.8, 0.3]
                } : {
                  height: '10%',
                  opacity: 0.3
                }}
                transition={{ 
                  opacity: {
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div>
          
          {/* Animated particles when recording */}
          {isRecording && (
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute w-${1 + Math.floor(Math.random() * 2)} h-${1 + Math.floor(Math.random() * 2)} 
                    ${Math.random() > 0.5 ? 'bg-red-400' : 'bg-red-500'} rounded-full`}
                  initial={{ 
                    x: '50%', 
                    y: '50%',
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: `${50 + (Math.random() * 80 - 40)}%`,
                    y: `${50 + (Math.random() * 80 - 40)}%`,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1 + Math.random(), 0]
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Center circle with enhanced animations */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`w-36 h-36 ${
                isRecording ? 'bg-gradient-to-br from-red-50 to-red-100' : 'bg-white'
              } rounded-full shadow-xl flex items-center justify-center overflow-hidden`}
              animate={{
                boxShadow: isRecording 
                  ? [
                      '0 4px 6px rgba(0,0,0,0.1)', 
                      '0 10px 25px rgba(239,68,68,0.3)', 
                      '0 4px 6px rgba(0,0,0,0.1)'
                    ]
                  : '0 4px 6px rgba(0,0,0,0.1)'
              }}
              transition={{
                duration: 1.5,
                repeat: isRecording ? Infinity : 0,
                repeatType: "reverse"
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Ripple effect inside button when recording */}
              {isRecording && (
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`ripple-${i}`}
                      className="absolute inset-0 rounded-full border border-red-300"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ 
                        scale: [0.6, 1.2], 
                        opacity: [0.8, 0] 
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              )}
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="w-full h-full rounded-full flex items-center justify-center focus:outline-none relative z-10"
              >
                {isRecording ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                    transition={{ 
                      scale: { duration: 0.2 },
                      rotate: { 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "loop"
                      }
                    }}
                  >
                    <Square className="w-14 h-14 text-red-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mic className="w-14 h-14 text-[#3CBFAE]" />
                  </motion.div>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced status text with animations */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h2 
          className={`text-2xl font-bold mb-2 ${isRecording ? 'text-red-500' : 'text-gray-800'}`}
          animate={isRecording ? {
            scale: [1, 1.05, 1]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isRecording ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {isRecording ? "Listening..." : "Tap to speak"}
        </motion.h2>
        <p className="text-gray-600">
          {isRecording 
            ? "I'm listening to your question" 
            : "Ask me anything about pharmacy benefits"}
        </p>
        
        {/* Enhanced animated dots when recording */}
        {isRecording && (
          <div className="flex justify-center mt-3 space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`indicator-${i}`}
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Button to switch to chat interface with enhanced animations */}
      <motion.div
        className="flex space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="bg-gradient-to-r from-[#3CBFAE] to-[#35a99a] text-white px-6 py-3 rounded-lg font-medium text-lg shadow-md flex items-center space-x-2 relative overflow-hidden"
          onClick={onSwitchToChat}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(60, 191, 174, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Subtle background animation */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-10"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <MessageCircle size={20} />
          <span>Switch to Chat</span>
        </motion.button>
        
        <motion.button
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium text-lg shadow-md"
          onClick={stopSession}
          whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
          whileTap={{ scale: 0.95 }}
        >
          <span>End Session</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VoiceAnimation; 