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
                  <code>{entry.bankCode}</code>
                </td>
                <td>
                  <code>{entry.accountFormatted}</code>
                </td>
                <td>
                  <code>{entry.ibanFormatted}</code>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
