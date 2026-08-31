import { useEffect, useRef, useState } from 'react';

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();

  if (!copied) throw new Error('Copy failed');
}

export default function CopyField({ value, children, label = 'value' }) {
  const [status, setStatus] = useState('idle');
  const resetTimer = useRef();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(String(value));
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 1600);
  };

  const buttonLabel = status === 'copied'
    ? `Copied ${label}`
    : status === 'error'
      ? `Could not copy ${label}`
      : `Copy ${label}`;

  return (
    <button
      type="button"
      className="copy-field"
      onClick={handleCopy}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      <span className="copy-field-value">{children ?? value}</span>
      <span
        className={`copy-button ${status}`}
        aria-hidden="true"
      >
        {status === 'copied' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </span>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? `${label} copied to clipboard` : status === 'error' ? `Could not copy ${label}` : ''}
      </span>
    </button>
  );
}
