import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { playSound } from '../lib/sounds';
import { achievements } from '../lib/achievements';

const initialState = {
  unlockedAchievements: [],
  score: 0,
  visitedSections: [],
  viewedProjects: [],
  viewedPapers: [],
  isMasterHacker: false
};

// Load from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cybersec_game_state');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const GameContext = createContext();

function gameReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'UNLOCK_ACHIEVEMENT':
      if (state.unlockedAchievements.includes(action.payload)) {
        return state;
      }
      playSound('unlock');
      newState = {
        ...state,
        unlockedAchievements: [...state.unlockedAchievements, action.payload],
        score: state.score + 100
      };
      
      // Check for master hacker
      if (newState.unlockedAchievements.length === achievements.length - 1 && !newState.unlockedAchievements.includes('master_hacker')) {
         newState.unlockedAchievements.push('master_hacker');
         newState.isMasterHacker = true;
         newState.score += 500;
         setTimeout(() => playSound('unlock'), 1000);
      }
      break;
    case 'VISIT_SECTION':
      if (state.visitedSections.includes(action.payload)) {
        return state;
      }
      newState = {
        ...state,
        visitedSections: [...state.visitedSections, action.payload],
        score: state.score + 10
      };
      break;
    case 'VIEW_PROJECT':
      if (state.viewedProjects.includes(action.payload)) {
        return state;
      }
      newState = {
        ...state,
        viewedProjects: [...state.viewedProjects, action.payload],
        score: state.score + 25
      };
      break;
    case 'VIEW_PAPER':
      if (state.viewedPapers.includes(action.payload)) {
        return state;
      }
      newState = {
        ...state,
        viewedPapers: [...state.viewedPapers, action.payload],
        score: state.score + 25
      };
      break;
    case 'ADD_SCORE':
      newState = {
        ...state,
        score: state.score + action.payload
      };
      break;
    case 'RESET':
      newState = initialState;
      break;
    default:
      return state;
  }
  
  // Save to local storage
  try {
    localStorage.setItem('cybersec_game_state', JSON.stringify(newState));
  } catch (e) {
    console.error("Could not save state", e);
  }
  
  return newState;
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadState);

  // Check First Contact and Night Owl on load
  useEffect(() => {
    dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'first_contact' });
    
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 6) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'night_owl' });
    }
  }, []);

  // Check Explorer
  useEffect(() => {
    if (state.visitedSections.length >= 5 && !state.unlockedAchievements.includes('explorer')) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: 'explorer' });
    }
  }, [state.visitedSections, state.unlockedAchievements]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
