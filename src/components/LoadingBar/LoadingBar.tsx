import React, { useState, useEffect } from 'react';
import styles from './LoadingBar.module.css';

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 90) {
            return oldProgress + 2;
          }
          return oldProgress;
        });
      }, 100);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingBar}>
        <div
          className={styles.loadingBall}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
