import CopyField from './CopyField';

export default function AhvList({ ahvNumbers }) {
  return (
    <div className="iban-list">
      <h2>Generated AHV Numbers</h2>
      <table className="iban-table">
        <thead>
            <tr>
              <th>AHV Number</th>
            </tr>
          </thead>
          <tbody>
            {ahvNumbers.map((entry, i) => (
              <tr key={i}>
                <td>
                  <CopyField value={entry.ahvFormatted} label="AHV number"><code>{entry.ahvFormatted}</code></CopyField>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
