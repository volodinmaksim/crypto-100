import { useEffect, useState } from 'react';
import '../styles/Cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseEnterDocument = () => setIsVisible(true);
    const handleMouseLeaveDocument = () => setIsVisible(false);

    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], [tabindex]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Track mouse movement and document enter/leave
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnterDocument);
    document.addEventListener('mouseleave', handleMouseLeaveDocument);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnterDocument);
      document.removeEventListener('mouseleave', handleMouseLeaveDocument);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't show custom cursor on touch devices
  }

  return (
    <>
      <div 
        className={`cursor-dot ${isHovering ? 'hover' : ''}`} 
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: isVisible ? 'opacity 0.3s ease' : 'opacity 0.3s ease 1s'
        }}
      />
      <div 
        className={`cursor-outline ${isHovering ? 'hover' : ''}`} 
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
          transition: isVisible ? 'opacity 0.3s ease' : 'opacity 0.3s ease 1s'
        }}
      />
    </>
  );
};

export default CustomCursor;
