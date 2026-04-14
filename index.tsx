import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const diag = document.getElementById('boot-diagnostic');
const errorDisplay = document.getElementById('error-display');

if (diag) diag.innerText = '[REACT_STARTING]';

if (!rootElement) {
  if (diag) diag.innerText = '[BOOT_FAILURE]';
  if (errorDisplay) {
    errorDisplay.textContent = 'System initialization failed. Please refresh or contact support.';
    (errorDisplay as HTMLElement).style.display = 'block';
  }
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error: any) {
    if (diag) diag.innerText = '[BOOT_CRASH]';
    if (rootElement) {
        rootElement.innerHTML = `
            <div style="color: #ef4444; font-family: monospace; padding: 40px; text-align: center;">
                <h2 style="font-size: 20px;">[BOOT_CRASH]</h2>
                <p style="margin-top: 20px; color: #888;">System initialization failed. Please refresh or contact support.</p>
            </div>
        `;
    }
  }
}
