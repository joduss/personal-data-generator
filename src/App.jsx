import { useState, useCallback } from 'react';
import { generateFakeIbans, generateFakeQrIbans } from './utils/ibanGenerator';
import { generateFakeAhvNumbers } from './utils/ahvGenerator';
import { generateFakePersons } from './utils/personGenerator';
import IbanList from './components/IbanList';
import QrIbanList from './components/QrIbanList';
import AhvList from './components/AhvList';
import PersonList from './components/PersonList';
import ActionButton from './components/ActionButton';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('standard');
  const [ibans, setIbans] = useState(() => generateFakeIbans(8));
  const [qrIbans, setQrIbans] = useState(() => generateFakeQrIbans(8));
  const [ahvNumbers, setAhvNumbers] = useState(() => generateFakeAhvNumbers(8));
  const [persons, setPersons] = useState(() => generateFakePersons(8));

  const handleGenerate = useCallback(() => {
    if (mode === 'standard') {
      setIbans(generateFakeIbans(8));
    } else if (mode === 'qr') {
      setQrIbans(generateFakeQrIbans(8));
    } else if (mode === 'ahv') {
      setAhvNumbers(generateFakeAhvNumbers(8));
    } else {
      setPersons(generateFakePersons(8));
    }
  }, [mode]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fake Personal Data</h1>
        <p>Fake Swiss IBAN, QR-IBAN, AHV number &amp; person generator</p>
      </header>
       <div className="ad-banner" style={{ display: 'none' }}>
        <span className="ad-label">Advertisement</span>
        {/* Criteo ad slot - replace with your Criteo tag */}
        <div id="criteo-ad-banner"></div>
      </div>
      <main>
        <div className="tab-bar">
          <button
            className={`tab-button${mode === 'standard' ? ' active' : ''}`}
            onClick={() => setMode('standard')}
          >
            Standard IBAN
          </button>
          <button
            className={`tab-button${mode === 'qr' ? ' active' : ''}`}
            onClick={() => setMode('qr')}
          >
            QR-IBAN
          </button>
          <button
            className={`tab-button${mode === 'ahv' ? ' active' : ''}`}
            onClick={() => setMode('ahv')}
          >
            AHV Number
          </button>
          <button
            className={`tab-button${mode === 'person' ? ' active' : ''}`}
            onClick={() => setMode('person')}
          >
            Person
          </button>
        </div>
        {mode === 'standard' && <IbanList ibans={ibans} />}
        {mode === 'qr' && <QrIbanList ibans={qrIbans} />}
        {mode === 'ahv' && <AhvList ahvNumbers={ahvNumbers} />}
        {mode === 'person' && <PersonList persons={persons} />}
        <ActionButton onClick={handleGenerate} />
      </main>
    </div>
  );
}
