"use client";
import React, { useState, useEffect } from 'react';
import styles from './feedbackForm.module.css';

const FeedbackForm: React.FC = () => {
  const [service, setService] = useState<string>(''); 
  const [serviceQuality, setServiceQuality] = useState<number>(0); 
  const [facilities, setFacilities] = useState<number>(0);
  const [staffInteraction, setStaffInteraction] = useState<number>(0);
  const [overallExperience, setOverallExperience] = useState<number>(0);

  const [focusedIndex, setFocusedIndex] = useState(0);

  // Form elements to be focused in sequence
  const formElements = [
    { id: 'service', type: 'select', setter: setService },
    { id: 'serviceQuality', type: 'star', setter: setServiceQuality, value: serviceQuality },
    { id: 'facilities', type: 'star', setter: setFacilities, value: facilities },
    { id: 'staffInteraction', type: 'star', setter: setStaffInteraction, value: staffInteraction },
    { id: 'overallExperience', type: 'star', setter: setOverallExperience, value: overallExperience },
    { id: 'submit', type: 'submit' }
  ];

  const handleStarKeyNavigation = (rating: number, setter: React.Dispatch<React.SetStateAction<number>>, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && rating < 5) {
      setter(rating + 1);
    } else if (e.key === 'ArrowLeft' && rating > 0) {
      setter(rating - 1);
    }
  };

  const handleArrowKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex + 1) % formElements.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex - 1 + formElements.length) % formElements.length);
    } else if (e.key === 'Enter' && focusedIndex === formElements.length - 1) {
      e.preventDefault();
      (document.getElementById('submit') as HTMLButtonElement)?.click();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeyNavigation);

    return () => {
      window.removeEventListener('keydown', handleArrowKeyNavigation);
    };
  }, [focusedIndex]);

  useEffect(() => {
    const currentElement = formElements[focusedIndex];
    if (currentElement.type === 'select' || currentElement.type === 'submit') {
      document.getElementById(currentElement.id)?.focus();
    }
  }, [focusedIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/thank-you";
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Feedback Form</h2>

        <label htmlFor="service" className={styles.label}>Service Used:</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={styles.formField}
          required
          tabIndex={focusedIndex === 0 ? 0 : -1}
        >
          <option value="">Select Service</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Road Maintenance">Road Maintenance</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage Collection">Garbage Collection</option>
        </select>

        <label className={styles.label}>Service Quality:</label>
        <div
          id="serviceQuality"
          className={styles.starContainer}
          tabIndex={focusedIndex === 1 ? 0 : -1}
          onKeyDown={(e) => handleStarKeyNavigation(serviceQuality, setServiceQuality, e as any)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={serviceQuality >= star ? styles.filledStar : styles.emptyStar}
            >
              ★
            </span>
          ))}
        </div>

        <label className={styles.label}>Facilities:</label>
        <div
          id="facilities"
          className={styles.starContainer}
          tabIndex={focusedIndex === 2 ? 0 : -1}
          onKeyDown={(e) => handleStarKeyNavigation(facilities, setFacilities, e as any)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={facilities >= star ? styles.filledStar : styles.emptyStar}
            >
              ★
            </span>
          ))}
        </div>

        <label className={styles.label}>Staff Interaction:</label>
        <div
          id="staffInteraction"
          className={styles.starContainer}
          tabIndex={focusedIndex === 3 ? 0 : -1}
          onKeyDown={(e) => handleStarKeyNavigation(staffInteraction, setStaffInteraction, e as any)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={staffInteraction >= star ? styles.filledStar : styles.emptyStar}
            >
              ★
            </span>
          ))}
        </div>

        <label className={styles.label}>Overall Experience:</label>
        <div
          id="overallExperience"
          className={styles.starContainer}
          tabIndex={focusedIndex === 4 ? 0 : -1}
          onKeyDown={(e) => handleStarKeyNavigation(overallExperience, setOverallExperience, e as any)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={overallExperience >= star ? styles.filledStar : styles.emptyStar}
            >
              ★
            </span>
          ))}
        </div>

        <button
          id="submit"
          type="submit"
          className={styles.submitButton}
          tabIndex={focusedIndex === 5 ? 0 : -1}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
