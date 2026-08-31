import CopyField from './CopyField';

export default function QrIbanList({ ibans }) {
  return (
    <div className="iban-list">
      <h2>Generated QR-IBANs</h2>
      <table className="iban-table">
        <thead>
            <tr>
              <th>QR-IID</th>
              <th>Account</th>
              <th>QR-IBAN</th>
              <th>QR-Reference</th>
            </tr>
          </thead>
          <tbody>
            {ibans.map((entry, i) => (
              <tr key={i}>
                <td>
                  <CopyField value={entry.iid} label="QR-IID"><code>{entry.iid}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.accountFormatted} label="account"><code>{entry.accountFormatted}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.ibanFormatted} label="QR-IBAN"><code>{entry.ibanFormatted}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.referenceFormatted} label="QR reference"><code>{entry.referenceFormatted}</code></CopyField>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
