import React, { useState, useEffect } from 'react';
import { useCheckConnection } from '../../queries/chekServer';
import { useNavigate } from 'react-router-dom';

const ServerStatus = ({ children }) => {
  const connection = useCheckConnection();
  const navigate = useNavigate();

  useEffect(() => {
    if (connection.data?.status === 200 && !connection.isFetching) navigate(`/`);
  }, [connection.data, navigate]);

  return (
    <div style={styles.overlay}>
      <div style={styles.messageBox}>
        <h2 style={styles.title}>Сервер недоступен</h2>
        <p style={styles.text}>Пытаемся подключиться к серверу...</p>
        <div style={styles.loader}></div>
      </div>
    </div>
  );
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    marginBottom: '1.5rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

// Добавляем стили анимации в документ
const addAnimationStyles = () => {
  if (typeof document === 'undefined') return; // Для SSR

  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
};

addAnimationStyles();

export default ServerStatus;
