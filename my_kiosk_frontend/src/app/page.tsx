"use client"; // This marks the component as a Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation in the App Router
import styles from './page.module.css';

const HomePage = () => {
  const [focusedIndex, setFocusedIndex] = useState(0); // Track which button is focused
  const router = useRouter();

  // List of paths for the navigation links
  const links = [
    { text: 'SUBMIT A REQUEST', path: '/submit-request' },
    { text: 'LEAVE FEEDBACK', path: '/leave-feedback' },
    { text: 'TRACK SERVICE REQUEST', path: '/track-service-request' },
    { text: 'LOCAL NEWS AND UPDATES', path: '/local-news-updates' },
    { text: 'EMERGENCY SERVICES', path: '/emergency-services' },
    { text: 'EXPLORE GOVERNMENT SERVICES', path: '/government-services' },
  ];

  // Keyboard event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      // Move focus up (wrap around if necessary)
      setFocusedIndex((prev) => (prev === 0 ? links.length - 1 : prev - 1));
    } else if (event.key === 'ArrowDown') {
      // Move focus down (wrap around if necessary)
      setFocusedIndex((prev) => (prev === links.length - 1 ? 0 : prev + 1));
    } else if (event.key === 'Enter') {
      // On Enter key, navigate to the focused link
      router.push(links[focusedIndex].path);
    }
  };

  // Attach keydown event listener when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]); // Re-run effect if focusedIndex changes

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to the Citizen Engagement Platform</h1>
        <p className={styles.subtitle}>Engage with your community and access services easily.</p>
        
        <div className={styles.buttons}>
          {links.map((link, index) => (
            <div
              key={link.text}
              className={`${styles.btn} ${focusedIndex === index ? styles.focused : ''}`}
            >
              {link.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
