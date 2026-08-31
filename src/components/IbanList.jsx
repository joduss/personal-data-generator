import CopyField from './CopyField';

export default function IbanList({ ibans }) {
  return (
    <div className="iban-list">
      <h2>Generated IBANs</h2>
      <table className="iban-table">
        <thead>
            <tr>
              <th>Bank Code</th>
              <th>Account</th>
              <th>IBAN</th>
            </tr>
          </thead>
          <tbody>
            {ibans.map((entry, i) => (
              <tr key={i}>
                <td>
                  <CopyField value={entry.bankCode} label="bank code"><code>{entry.bankCode}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.accountFormatted} label="account"><code>{entry.accountFormatted}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.ibanFormatted} label="IBAN"><code>{entry.ibanFormatted}</code></CopyField>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
