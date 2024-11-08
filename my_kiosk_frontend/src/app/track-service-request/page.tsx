"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./trackRequest.module.css";

const TrackServiceRequestForm: React.FC = () => {
  const [referenceID, setReferenceID] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const [isKeyboardActive, setIsKeyboardActive] = useState<boolean>(false);

  const referenceIDRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (referenceIDRef.current) {
      referenceIDRef.current.focus();
    }
  }, []);

  const handleKeyboardOpen = () => {
    setShowKeyboard(true);
    setIsKeyboardActive(true);
  };

  const handleKeyboardClose = () => {
    setShowKeyboard(false);
    setIsKeyboardActive(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prepare the request to track service by reference ID
    try {
      const response = await fetch(`http://127.0.0.1:8000/track-service?refID=${referenceID}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch status");
      }

      const data = await response.json();
      setStatusMessage(`Status: ${data.status}`);
    } catch (error) {
      console.error("Error tracking request:", error);
      setStatusMessage("Error: Unable to track your request. Please try again.");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKeyboardActive) return;
    if (e.key === "Enter") {
      submitButtonRef.current?.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isKeyboardActive]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Track Service Request</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="referenceID">
            Reference ID:
          </label>
          <input
            type="text"
            id="referenceID"
            ref={referenceIDRef}
            className={styles.formField}
            value={referenceID}
            onChange={(e) => setReferenceID(e.target.value)}
            onFocus={handleKeyboardOpen}
            onBlur={handleKeyboardClose}
            required
          />
          <button type="submit" ref={submitButtonRef} className={styles.btn}>
            Track Request
          </button>
        </form>

        {statusMessage && (
          <div className={styles.statusMessage}>
            <h3>{statusMessage}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackServiceRequestForm;
