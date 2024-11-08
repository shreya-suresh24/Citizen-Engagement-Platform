"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './emergencyRequestForm.module.css';
import SimpleKeyboard from './SimpleKeyboard';

const SubmitRequestForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [emergencyType, setEmergencyType] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [urgency, setUrgency] = useState<string>(''); 
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const emergencyTypeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const urgencyRef = useRef<HTMLSelectElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const formFields = [nameRef, emergencyTypeRef, descriptionRef, urgencyRef, submitButtonRef];

  useEffect(() => {
    formFields[currentFocus].current?.focus();
  }, [currentFocus]);

  const handleKeyboardOpen = () => {
    setShowKeyboard(true);
    setIsKeyboardActive(true);
  };

  const handleKeyboardClose = () => {
    setShowKeyboard(false);
    setIsKeyboardActive(false);
  };

  const handleKeyPress = (key: string) => {
    setDescription((prev: string) => {
      if (key === 'Backspace') {
        return prev.slice(0, -1);
      }
      if (key === 'Space') {
        return prev + ' ';
      }
      return prev + key;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Generate a reference number
    const refNum = 'REF' + Math.floor(Math.random() * 1000000);
    setReferenceNumber(refNum);
    setSuccessMessage('Emergency request has been successfully logged! We will respond shortly.');

    // Prepare the data to send to the backend
    const requestData = {
      reference_number: refNum,
      status: 'Pending',  // Set initial status
      name,
      emergencyType,
      description,
      urgency,
    };

    try {
      // Make an API call to your Django backend
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Reset the form fields
      setName('');
      setEmergencyType('');
      setDescription('');
      setUrgency('');
      setCurrentFocus(0); // Reset focus to the first field

    } catch (error) {
      console.error('Error submitting request:', error);
      setSuccessMessage('An error occurred while submitting your request. Please try again.');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKeyboardActive) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault(); 
        setCurrentFocus((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'ArrowDown':
        e.preventDefault(); 
        setCurrentFocus((prev) => (prev < formFields.length - 1 ? prev + 1 : prev));
        break;
      case 'Enter':
        if (currentFocus === 4) {
          submitButtonRef.current?.click();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFocus, isKeyboardActive]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Submit an Emergency Request</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">Name:</label>
          <input
            id="name"
            ref={nameRef}
            className={styles.formField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className={styles.label} htmlFor="emergencyType">Type of Emergency:</label>
          <select
            id="emergencyType"
            ref={emergencyTypeRef}
            className={styles.formField}
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
            required
          >
            <option value="">Select a Type</option>
            <option value="Fire">Fire</option>
            <option value="Medical">Medical</option>
            <option value="Crime/Police">Crime/Police</option>
            <option value="Others">Others</option>
          </select>

          <label className={styles.label} htmlFor="description">Describe Issue:</label>
          <textarea
            id="description"
            ref={descriptionRef}
            className={`${styles.formField} ${styles.textarea}`}
            rows={4}
            value={description}
            onFocus={handleKeyboardOpen}
            onBlur={handleKeyboardClose}
            readOnly  
            required
          />

          <label className={styles.label} htmlFor="urgency">Urgency Level:</label>
          <select
            id="urgency"
            ref={urgencyRef}
            className={styles.formField}
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button type="submit" ref={submitButtonRef} className={styles.btn}>Submit</button>
        </form>

        {successMessage && (
          <div className={styles.successMessage}>
            <h3>{successMessage}</h3>
            <p>Reference Number: <strong>{referenceNumber}</strong></p>
          </div>
        )}

        {showKeyboard && (
          <SimpleKeyboard
            onKeyPress={handleKeyPress}
            visible={showKeyboard}
            setIsKeyboardActive={setIsKeyboardActive}
          />
        )}
      </div>
    </div>
  );
};

export default SubmitRequestForm;
