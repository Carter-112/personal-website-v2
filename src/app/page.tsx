'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

// Import components
import EditableSection from '@/components/EditableSection';
import LavaBackground from '@/components/LavaBackground';
import EmberParticles from '@/components/EmberParticles';

// Import shared types
import { Section, BaseSection, HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection } from '@/types/section';

export default function Home() {
  // Use client-side only rendering to prevent hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'hero',
      type: 'hero',
      title: 'Carter Moyer',
      subtitle: 'Web Developer & Designer',
      content: 'Creating stunning digital experiences with a passion for innovation and creativity.',
      order: 1,
    },
    {
      id: 'about',
      type: 'about',
      title: 'About Me',
      content: 'I am a passionate web developer with expertise in creating modern, responsive websites. With a background in design and programming, I bring a unique perspective to every project I work on.',
      order: 2,
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'My Skills',
      skills: [
        { name: 'Web Development', level: 90 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'React', level: 75 },
      ],
      order: 3,
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Projects',
      projects: [
        { 
          title: 'Project One', 
          description: 'A stunning website with modern design and functionality.',
          image: '/placeholder-project.jpg'
        },
        { 
          title: 'Project Two', 
          description: 'An interactive web application with advanced features.',
          image: '/placeholder-project.jpg'
        },
        { 
          title: 'Project Three', 
          description: 'A responsive mobile-first design with smooth animations.',
          image: '/placeholder-project.jpg'
        },
      ],
      order: 4,
    },
    {
      id: 'contact',
      type: 'contact',
      title: 'Contact Me',
      email: 'example@email.com',
      phone: '(123) 456-7890',
      content: 'Feel free to reach out for collaborations or inquiries. I\'m always open to discussing new projects and opportunities.',
      order: 5,
    },
  ]);

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Update section content with type safety
  const updateSection = (id: string, newData: Partial<Section>) => {
    setSections(sections.map(section => {
      if (section.id !== id) return section;
      
      // Type-safe update based on section type
      switch (section.type) {
        case 'hero':
          return { ...section, ...newData } as HeroSection;
        case 'about':
          return { ...section, ...newData } as AboutSection;
        case 'skills':
          return { ...section, ...newData } as SkillsSection;
        case 'projects':
          return { ...section, ...newData } as ProjectsSection;
        case 'contact':
          return { ...section, ...newData } as ContactSection;
        default:
          return section;
      }
    }));
  };

  // Handle section reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    setSections((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      const reordered = arrayMove(items, oldIndex, newIndex);
      
      // Update order property
      return reordered.map((item, index) => ({
        ...item,
        order: index + 1
      }));
    });
  };

  // Add new section
  const addSection = (type: string) => {
    const baseSection: BaseSection = {
      id: `section-${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      content: 'Edit this content to customize your section.',
      order: sections.length + 1,
    };
    
    let newSection: Section;
    
    if (type === 'skills') {
      newSection = {
        ...baseSection,
        type: 'skills' as const,
        skills: [
          { name: 'New Skill', level: 75 },
          { name: 'Another Skill', level: 60 }
        ]
      };
    } else if (type === 'projects') {
      newSection = {
        ...baseSection,
        type: 'projects' as const,
        projects: [
          { 
            title: 'New Project', 
            description: 'Edit this description to showcase your project.',
            image: '/placeholder-project.jpg'
          }
        ]
      };
    } else if (type === 'hero') {
      newSection = {
        ...baseSection,
        type: 'hero' as const,
        subtitle: 'Subtitle',
        content: 'Edit this content to customize your section.'
      };
    } else if (type === 'contact') {
      newSection = {
        ...baseSection,
        type: 'contact' as const,
        content: 'Edit this content to customize your section.',
        email: 'example@email.com',
        phone: '(123) 456-7890'
      };
    } else {
      newSection = {
        ...baseSection,
        type: 'about' as const,
        content: 'Edit this content to customize your section.'
      };
    }
    
    setSections([...sections, newSection]);
  };

  // Remove section
  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  // Render a simple loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-ember-500">Loading Portfolio...</h1>
          <p className="text-lg">Please wait while we prepare your experience</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${isEditing ? 'editing' : ''}`}>
      <LavaBackground />
      <EmberParticles count={15} />
      
      {/* Sections */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="relative z-10">
          <SortableContext
            items={sortedSections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
            disabled={!isEditing}
          >
            {sortedSections.map((section) => (
              <EditableSection
                key={section.id}
                section={section}
                isEditing={isEditing}
                updateSection={updateSection}
                removeSection={removeSection}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      
      {/* Add new section button (visible only in editing mode) */}
      {isEditing && (
        <div className="fixed left-5 bottom-20 z-50 flex flex-col gap-2">
          <motion.button
            className="fire-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addSection('content')}
          >
            Add Content Section
          </motion.button>
          <motion.button
            className="fire-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addSection('skills')}
          >
            Add Skills Section
          </motion.button>
          <motion.button
            className="fire-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addSection('projects')}
          >
            Add Projects Section
          </motion.button>
        </div>
      )}
      
      {/* Edit/Lock button */}
      <motion.button
        className="lock-button fire-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleEditing}
      >
        {isEditing ? 'Lock Layout' : 'Edit Layout'}
      </motion.button>
    </main>
  );
}
