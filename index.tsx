import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("[BOOT] Initializing React Application...");

const rootElement = document.getElementById('root');
const diag = document.getElementById('boot-diagnostic');

if (diag) diag.innerText = '[REACT_STARTING]';

if (!rootElement) {
  console.error("[BOOT] Fatal: Root element not found");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log("[BOOT] Root created, rendering...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[BOOT] Initial render call complete.");
  } catch (error: any) {
    console.error("[BOOT] Render crash:", error);
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
