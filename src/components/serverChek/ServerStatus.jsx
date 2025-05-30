import React, { useState, useEffect } from 'react';

const ServerStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkServer = async () => {
      try {
        setLoading(true);

        const response = await fetch('/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache',
        });

        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkServer();

    const interval = setInterval(checkServer, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return null;
  }

  if (!isOnline) {
    return (
      <div style={styles.overlay}>
        <div style={styles.messageBox}>
          <h2 style={styles.title}>Сервер недоступен</h2>
          <p style={styles.text}>Пытаемся подключиться к серверу...</p>
          <div style={styles.loader}></div>
        </div>
      </div>
    );
  }

  return null;
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  messageBox: {
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  loader: {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '4px solid white',
    width: '40px',
    height: '40px',
    margin: '0 auto',
    animation: 'spin 1s linear infinite',
  },
};

// Добавляем стили анимации в документ
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,
  styleSheet.cssRules.length
);

export default ServerStatus;
