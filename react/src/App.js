import React, { useState, useEffect } from 'react';

function App({ onMessageSend }) {
  const [inputValue, setInputValue] = useState('');
  const [messageFromHost, setMessageFromHost] = useState('');

  useEffect(() => {
    // Listen for messages from Angular host
    const handleHostMessage = (event) => {
      if (event.detail) {
        setMessageFromHost(event.detail);
        console.log('✅ React received from Host:', event.detail);
      }
    };

    window.addEventListener('hostToReact', handleHostMessage);

    return () => {
      window.removeEventListener('hostToReact', handleHostMessage);
    };
  }, []);

  const handleSend = () => {
    if (onMessageSend && inputValue.trim()) {
      onMessageSend(inputValue);
      setInputValue('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello World!</h1>
      <p>Welcome to React</p>
      
      {messageFromHost && (
        <div style={{
          margin: '20px auto',
          padding: '15px',
          background: '#e8f5e9',
          borderRadius: '8px',
          border: '2px solid #4caf50',
          maxWidth: '400px'
        }}>
          <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>📥 Message from Host:</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{messageFromHost}</p>
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a message for Angular"
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '2px solid #61dafb'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#000'
          }}
        >
          Send to Angular
        </button>
      </div>
    </div>
  );
}

export default App;
