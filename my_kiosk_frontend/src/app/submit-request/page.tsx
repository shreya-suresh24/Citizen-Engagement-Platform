"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './submitRequest.module.css';
import SimpleKeyboard from './SimpleKeyboard';

const SubmitRequestForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>(''); 
  const [locality, setLocality] = useState<string>(''); 
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [referenceNumber, setReferenceNumber] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const localityRef = useRef<HTMLSelectElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const formFields = [categoryRef, descriptionRef, localityRef, submitButtonRef];

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
    setSuccessMessage('Request has been successfully logged! We will get back to you in 2-3 working days.');

    // Prepare the data to send to the backend
    const requestData = {
      reference_number: refNum,
      status: 'Pending',  // Set initial status
      description,
      category,
      locality,
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
      setCategory('');
      setDescription('');
      setLocality('');
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
        if (currentFocus === 3) {
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
        <h2 className={styles.title}>Submit a Request</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="category">Service Category:</label>
          <select
            id="category"
            ref={categoryRef}
            className={styles.formField}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Road Maintenance">Road Maintenance</option>
            <option value="Electricity Issues">Electricity Issues</option>
            <option value="Garbage Collection">Garbage Collection</option>
          </select>

          <label className={styles.label} htmlFor="description">Problem Description:</label>
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

          <label className={styles.label} htmlFor="locality">Locality:</label>
          <select
            id="locality"
            ref={localityRef}
            className={styles.formField}
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            required
          >
            <option value="">Select Locality</option>
            <option value="Ward 1">Ward 1</option>
            <option value="Ward 2">Ward 2</option>
            <option value="Municipality A">Municipality A</option>
            <option value="Municipality B">Municipality B</option>
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
