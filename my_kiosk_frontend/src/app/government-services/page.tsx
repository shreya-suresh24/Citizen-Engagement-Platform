"use client";

import { useEffect, useState } from "react";
import styles from "./governmentServices.module.css";

type Service = {
  name: string;
  icon: string;
  link: string;
  description: string; // Add description for each service
};

const GovernmentServices = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const services: Service[] = [
    {
      name: "Apply for Documents",
      icon: "📄",
      link: "/apply-documents",
      description: "Get all necessary documents easily.",
    },
    {
      name: "Pay Utility Bills",
      icon: "💡",
      link: "/pay-utility-bills",
      description: "Manage your utility bills with ease.",
    },
    {
      name: "Explore Government Schemes",
      icon: "📝",
      link: "/explore-schemes",
      description: "Discover various schemes available.",
    },
    {
      name: "Schedule Appointments",
      icon: "📅",
      link: "/schedule-appointments",
      description: "Book appointments effortlessly.",
    },
    {
      name: "Public Transport Information",
      icon: "🚌",
      link: "/public-transport",
      description: "Stay updated with public transport info.",
    },
  ];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setFocusedIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    } else if (event.key === "ArrowLeft") {
      setFocusedIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    } else if (event.key === "Enter") {
      window.location.href = services[focusedIndex].link;
    }
  };

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => handleKeyDown(event);
    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, [focusedIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Government Services</h1>
        <p className={styles.subtitle}>
          Explore a variety of services provided by the government.
        </p>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.box} ${
                focusedIndex === index ? styles.focused : ""
              }`}
              tabIndex={0} // Make box focusable
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = service.link;
                }
              }}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h2>{service.name}</h2>
              <p className={styles.description}>{service.description}</p> {/* Description */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentServices;
