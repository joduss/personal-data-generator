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
                  <code>{entry.iid}</code>
                </td>
                <td>
                  <code>{entry.accountFormatted}</code>
                </td>
                <td>
                  <code>{entry.ibanFormatted}</code>
                </td>
                <td>
                  <code>{entry.referenceFormatted}</code>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
