import React, { useState } from 'react';

function App({ onMessageSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (onMessageSend && inputValue.trim()) {
      onMessageSend(inputValue);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello World!</h1>
      <p>Welcome to React</p>
      
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
