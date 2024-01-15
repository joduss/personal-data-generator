import { useState, useCallback } from 'react';
import { generateFakeIbans } from './utils/ibanGenerator';
import IbanList from './components/IbanList';
import ActionButton from './components/ActionButton';
import './App.css';

export default function App() {
  const [ibans, setIbans] = useState(() => generateFakeIbans(8));

  const handleGenerate = useCallback(() => {
    setIbans(generateFakeIbans(8));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fake Personal Data</h1>
        <p>Fake Swiss IBAN generator</p>
      </header>
       <div className="ad-banner" style={{ display: 'none' }}>
        <span className="ad-label">Advertisement</span>
        {/* Criteo ad slot - replace with your Criteo tag */}
        <div id="criteo-ad-banner"></div>
      </div>
      <main>
        <IbanList ibans={ibans} />
        <ActionButton onClick={handleGenerate} />
      </main>
    </div>
  );
}
