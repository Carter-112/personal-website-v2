'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

// Import shared types
import { Section, SkillsSection, ProjectsSection } from '@/types/section';

interface EditableSectionProps {
  section: Section;
  isEditing: boolean;
  updateSection: (id: string, newData: Partial<Section>) => void;
  removeSection: (id: string) => void;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  section,
  isEditing,
  updateSection,
  removeSection,
}) => {
  // Removed unused state
  
  // Set up sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    disabled: !isEditing,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 10,
    opacity: isDragging ? 0.8 : 1,
  };

  // Handle content edit
  const handleContentEdit = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isEditing) {
      updateSection(section.id, { content: e.target.innerText });
    }
  };

  // Handle title edit
  const handleTitleEdit = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (isEditing) {
      updateSection(section.id, { title: e.target.innerText });
    }
  };

  // Handle subtitle edit
  const handleSubtitleEdit = (e: React.FocusEvent<HTMLHeadingElement>) => {
    if (isEditing && 'subtitle' in section) {
      updateSection(section.id, { subtitle: e.target.innerText });
    }
  };

  // Render different section types with exhaustive type checking
  const renderSectionContent = () => {
    // Use type assertion with a type guard to ensure TypeScript knows the exact type
    if (section.type === 'hero') {
      const heroSection = section as { 
        id: string; 
        type: 'hero'; 
        title: string; 
        subtitle: string; 
        content: string; 
        order: number;
      };
      
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 glow-text"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={handleTitleEdit}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroSection.title}
          </motion.h1>
          
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl mb-6 text-ember-400"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={handleSubtitleEdit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroSection.subtitle}
          </motion.h2>
          
          <motion.div
            className="max-w-2xl text-base sm:text-lg editable-content"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={handleContentEdit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSection.content}
          </motion.div>
        </div>
      );
    }
    
    else if (section.type === 'about') {
      const aboutSection = section as {
        id: string;
        type: 'about';
        title: string;
        content: string;
        order: number;
      };
      
      return (
        <div className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 glow-text text-center"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleTitleEdit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {aboutSection.title}
            </motion.h2>
            
            <motion.div
              className="text-base sm:text-lg editable-content bg-black/30 p-4 sm:p-6 rounded-lg backdrop-blur-sm"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleContentEdit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {aboutSection.content}
            </motion.div>
          </div>
        </div>
      );
    }
    
    else if (section.type === 'skills') {
      const skillsSection = section as SkillsSection;
      return (
        <div className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 glow-text text-center"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleTitleEdit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {skillsSection.title}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsSection.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 p-4 rounded-lg backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="flex justify-between mb-2">
                    <h3
                      className="text-lg font-medium"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isEditing) {
                          const updatedSkills = [...skillsSection.skills];
                          updatedSkills[index] = {
                            ...updatedSkills[index],
                            name: e.target.innerText,
                          };
                          updateSection(section.id, { skills: updatedSkills });
                        }
                      }}
                    >
                      {skill.name}
                    </h3>
                    <span>{skill.level}%</span>
                  </div>
                  
                  <div className="h-2 bg-ash-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-lava-600 to-ember-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + 0.1 * index }}
                    />
                  </div>
                  
                  {isEditing && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => {
                        const updatedSkills = [...skillsSection.skills];
                        updatedSkills[index] = {
                          ...updatedSkills[index],
                          level: parseInt(e.target.value),
                        };
                        updateSection(section.id, { skills: updatedSkills });
                      }}
                      className="w-full mt-2"
                    />
                  )}
                </motion.div>
              ))}
              
              {isEditing && (
                <motion.button
                  className="bg-black/30 p-4 rounded-lg backdrop-blur-sm border-2 border-dashed border-ash-600 flex items-center justify-center text-ash-400 hover:text-white hover:border-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const updatedSkills = [
                      ...skillsSection.skills,
                      { name: 'New Skill', level: 50 },
                    ];
                    updateSection(section.id, { skills: updatedSkills });
                  }}
                >
                  + Add Skill
                </motion.button>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    else if (section.type === 'projects') {
      const projectsSection = section as ProjectsSection;
      return (
        <div className="py-16 sm:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-12 glow-text text-center"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleTitleEdit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {projectsSection.title}
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projectsSection.projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-black/30 rounded-lg overflow-hidden backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 56, 56, 0.4)' }}
                >
                  <div className="h-48 bg-ash-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-ash-500">
                      {isEditing ? 'Project Image Placeholder' : ''}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2 text-ember-300"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isEditing) {
                          const updatedProjects = [...projectsSection.projects];
                          updatedProjects[index] = {
                            ...updatedProjects[index],
                            title: e.target.innerText,
                          };
                          updateSection(section.id, { projects: updatedProjects });
                        }
                      }}
                    >
                      {project.title}
                    </h3>
                    
                    <p
                      className="editable-content"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isEditing) {
                          const updatedProjects = [...projectsSection.projects];
                          updatedProjects[index] = {
                            ...updatedProjects[index],
                            description: e.target.innerText,
                          };
                          updateSection(section.id, { projects: updatedProjects });
                        }
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isEditing && (
                <motion.button
                  className="bg-black/30 rounded-lg border-2 border-dashed border-ash-600 flex items-center justify-center text-ash-400 hover:text-white hover:border-white transition-colors h-full min-h-[250px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const updatedProjects = [
                      ...projectsSection.projects,
                      {
                        title: 'New Project',
                        description: 'Edit this description',
                        image: '/placeholder-project.jpg',
                      },
                    ];
                    updateSection(section.id, { projects: updatedProjects });
                  }}
                >
                  + Add Project
                </motion.button>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    else if (section.type === 'contact') {
      const contactSection = section as {
        id: string;
        type: 'contact';
        title: string;
        content: string;
        email: string;
        phone: string;
        order: number;
      };
      
      return (
        <div className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 glow-text text-center"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleTitleEdit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {contactSection.title}
            </motion.h2>
            
            <div className="bg-black/30 p-6 sm:p-8 rounded-lg backdrop-blur-sm">
              <motion.div
                className="text-base sm:text-lg mb-6 editable-content"
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={handleContentEdit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {contactSection.content}
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full bg-lava-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-ash-400">Email</p>
                    <p
                      className="editable-content"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isEditing) {
                          updateSection(section.id, { email: e.target.innerText });
                        }
                      }}
                    >
                      {contactSection.email}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-full bg-lava-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-ash-400">Phone</p>
                    <p
                      className="editable-content"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        if (isEditing) {
                          updateSection(section.id, { phone: e.target.innerText });
                        }
                      }}
                    >
                      {contactSection.phone}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    else if (section.type === 'content') {
      const contentSection = section as {
        id: string;
        type: 'content';
        title: string;
        content: string;
        order: number;
      };
      
      return (
        <div className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 glow-text text-center"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleTitleEdit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {contentSection.title}
            </motion.h2>
            
            <motion.div
              className="text-base sm:text-lg editable-content bg-black/30 p-6 rounded-lg backdrop-blur-sm"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={handleContentEdit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contentSection.content}
            </motion.div>
          </div>
        </div>
      );
    }
    
    // Fallback for unknown section types
    return (
      <div className="py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Unknown Section Type</h2>
          <p>This section type cannot be displayed.</p>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={setNodeRef}
      id={section.id}
      className={`editable-section relative ${
        isDragging ? 'z-50' : 'z-10'
      }`}
      style={style}
      {...attributes}
    >
      {/* Section controls (visible only when editing) */}
      {isEditing && (
        <div className="section-controls">
          <motion.button
            className="p-2 bg-ash-800 hover:bg-ash-700 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeSection(section.id)}
            aria-label="Remove section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <motion.button
            className="p-2 bg-ash-800 hover:bg-ash-700 rounded cursor-grab"
            whileHover={{ scale: 1.1 }}
            {...listeners}
            aria-label="Drag to reorder section"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      )}
      
      {renderSectionContent()}
    </section>
  );
};

export default EditableSection;
