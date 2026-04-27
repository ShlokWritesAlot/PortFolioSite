import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  { category: 'Languages', name: 'Python', level: 90 },
  { category: 'Languages', name: 'JavaScript', level: 60 },
  { category: 'Languages', name: 'C', level: 75 },
  { category: 'Languages', name: 'SQL', level: 80 },
  { category: 'Languages', name: 'HTML/CSS', level: 85 },
  
  { category: 'Frameworks', name: 'FastAPI', level: 85 },
  { category: 'Frameworks', name: 'React', level: 65 },
  { category: 'Frameworks', name: 'Flask', level: 70 },
  
  { category: 'Tools', name: 'Git', level: 80 },
  { category: 'Tools', name: 'Docker', level: 60 },
  { category: 'Tools', name: 'PostgreSQL', level: 75 },
  
  { category: 'Core', name: 'Data Structures', level: 85 },
  { category: 'Core', name: 'REST APIs', level: 90 },
  { category: 'Core', name: 'Networking', level: 75 },
  
  { category: 'Libraries', name: 'pandas', level: 80 },
  { category: 'Libraries', name: 'NumPy', level: 75 },
  { category: 'Libraries', name: 'scikit-learn', level: 60 },
];

const SkillMatrix = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Group by category
  const categories = [...new Set(skillsData.map(s => s.category))];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 font-code relative">
      <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-2">
        <h3 className="text-cyan-400 font-bold">SKILL_MATRIX_V1</h3>
        <div className="text-xs text-gray-500">Intensity = Proficiency</div>
      </div>

      <div className="grid gap-6">
        {categories.map(category => (
          <div key={category}>
            <div className="text-xs text-gray-500 mb-2 uppercase">{category}</div>
            <div className="flex flex-wrap gap-2">
              {skillsData.filter(s => s.category === category).map(skill => {
                // Calculate color intensity based on level
                const opacity = (skill.level / 100) * 0.8 + 0.2;
                const isHovered = hoveredSkill?.name === skill.name;
                
                return (
                  <motion.div
                    key={skill.name}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      relative cursor-crosshair px-3 py-1.5 rounded-sm border
                      ${isHovered ? 'border-cyan-400 z-10' : 'border-transparent'}
                    `}
                    style={{
                      backgroundColor: `rgba(0, 217, 255, ${opacity * 0.3})`,
                      boxShadow: isHovered ? '0 0 15px rgba(0,217,255,0.5)' : 'none'
                    }}
                  >
                    <span className={`text-sm ${isHovered ? 'text-white font-bold' : 'text-gray-300'}`}>
                      {skill.name}
                    </span>

                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black border border-cyan-400 rounded p-2 z-50">
                        <div className="text-xs text-cyan-400 mb-1">{skill.name}</div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-400" 
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-right mt-1 text-gray-400">{skill.level}% LVL</div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMatrix;
