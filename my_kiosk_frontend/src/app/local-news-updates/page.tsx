"use client";

import styles from './localNews.module.css';

const LocalNewsUpdates = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Local News and Updates</h1>
        
        <div className={styles.newsList}>
          <div className={styles.newsItem}>
            <h2>🏞️ New Park Opening in Downtown</h2>
            <p>After months of planning, the new Riverside Park will open this weekend. The park features playgrounds, jogging trails, and beautiful green spaces. The city is organizing a grand opening ceremony with food trucks, live music, and free activities for families!</p>
          </div>

          <div className={styles.newsItem}>
            <h2>🚧 Road Work on 5th Avenue</h2>
            <p>Starting next Monday, there will be road work on 5th Avenue. The street will be closed to through traffic for two weeks while crews work on resurfacing and adding new bike lanes. Drivers are advised to take alternate routes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalNewsUpdates;
