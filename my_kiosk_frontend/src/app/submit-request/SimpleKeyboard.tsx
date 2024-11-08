import React, { useEffect, useState } from 'react';
import styles from './simpleKeyboard.module.css';

interface SimpleKeyboardProps {
  onKeyPress: (key: string) => void;
  visible: boolean;
  setIsKeyboardActive: (active: boolean) => void;
}

const keyboardRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['Space', 'Backspace', 'Leave']
];

const SimpleKeyboard: React.FC<SimpleKeyboardProps> = ({ onKeyPress, visible, setIsKeyboardActive }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [selectedKeyIndex, setSelectedKeyIndex] = useState<number>(0);

  useEffect(() => {
    if (visible) {
      setIsKeyboardActive(true);
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowLeft':
            setSelectedKeyIndex((prev) => (prev > 0 ? prev - 1 : 0));
            break;
          case 'ArrowRight':
            setSelectedKeyIndex((prev) => (prev < keyboardRows[selectedRowIndex].length - 1 ? prev + 1 : prev));
            break;
          case 'ArrowUp':
            setSelectedRowIndex((prev) => (prev > 0 ? prev - 1 : prev));
            setSelectedKeyIndex(0);
            break;
          case 'ArrowDown':
            setSelectedRowIndex((prev) => (prev < keyboardRows.length - 1 ? prev + 1 : prev));
            setSelectedKeyIndex(0);
            break;
          case 'Enter':
            const key = keyboardRows[selectedRowIndex][selectedKeyIndex];
            if (key === 'Leave') {
              alert('Leave button pressed');
              setIsKeyboardActive(false);
              const belowField = document.getElementById('belowField');
              if (belowField) {
                belowField.focus();
              }
            } else {
              onKeyPress(key);
            }
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setIsKeyboardActive(false);
    }
  }, [visible, selectedRowIndex, selectedKeyIndex, onKeyPress, setIsKeyboardActive]);

  return visible ? (
    <div className={styles.keyboard}>
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.keyboardRow}>
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`${styles.key} ${rowIndex === selectedRowIndex && keyIndex === selectedKeyIndex ? styles.selected : ''}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  ) : null;
};

export default SimpleKeyboard;
