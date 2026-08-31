import CopyField from './CopyField';

export default function PersonList({ persons }) {
  return (
    <div className="iban-list">
      <h2>Generated Persons</h2>
      <table className="iban-table">
        <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>AHV Number</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((entry, i) => (
              <tr key={i}>
                <td><CopyField value={entry.firstName} label="first name" /></td>
                <td><CopyField value={entry.lastName} label="last name" /></td>
                <td>
                  <CopyField value={entry.dateOfBirth} label="date of birth"><code>{entry.dateOfBirth}</code></CopyField>{" "}
                  <span className={`badge ${entry.isMinor ? "badge-minor" : "badge-adult"}`}>
                    {entry.isMinor ? "Minor" : "Adult"}
                  </span>
                </td>
                <td>
                  <CopyField value={entry.ahv} label="AHV number"><code>{entry.ahv}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.email} label="email"><code>{entry.email}</code></CopyField>
                </td>
                <td>
                  <CopyField value={entry.phone} label="phone number"><code>{entry.phone}</code></CopyField>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
