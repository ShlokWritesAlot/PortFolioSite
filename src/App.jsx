import React, { useState, useEffect } from 'react';
import { useGame } from './contexts/GameContext';
import { playSound } from './lib/sounds';
import { achievements } from './lib/achievements';
import Home from './pages/Home';

// Toast Notification Component
const AchievementToast = ({ achievement, onDismiss }) => {
  if (!achievement) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-900 border border-green-400 p-4 rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.4)] flex items-center gap-4 animate-[slideInRight_0.3s_ease-out]">
      <div className="text-3xl">{achievement.icon}</div>
      <div>
        <h4 className="text-green-400 font-bold font-code text-sm">ACHIEVEMENT UNLOCKED</h4>
        <p className="text-white font-body text-md">{achievement.name}</p>
      </div>
    </div>
  );
};

function App() {
  const { state } = useGame();
  const [recentAchievement, setRecentAchievement] = useState(null);
  const [prevUnlockedLength, setPrevUnlockedLength] = useState(state.unlockedAchievements.length);

  // Watch for new achievements to show toast
  useEffect(() => {
    if (state.unlockedAchievements.length > prevUnlockedLength) {
      const newId = state.unlockedAchievements[state.unlockedAchievements.length - 1];
      const achievement = achievements.find(a => a.id === newId);
      
      if (achievement) {
        setRecentAchievement(achievement);
        setTimeout(() => setRecentAchievement(null), 4000);
      }
      setPrevUnlockedLength(state.unlockedAchievements.length);
    }
  }, [state.unlockedAchievements, prevUnlockedLength]);

  return (
    <div className="min-h-screen bg-navy text-primary selection:bg-cyan selection:text-navy">
      <Home />
      <AchievementToast achievement={recentAchievement} />
      
      {/* Persistent Score Display */}
      <div className="fixed bottom-4 left-4 z-40 bg-gray-800/80 backdrop-blur text-green-400 font-code text-xs px-3 py-1 rounded border border-gray-600">
        SYS.SCORE: {state.score.toString().padStart(5, '0')}
      </div>
    </div>
  );
}

export default App;
