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
            </tr>
          </thead>
          <tbody>
            {persons.map((entry, i) => (
              <tr key={i}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>
                  <code>{entry.dateOfBirth}</code>{" "}
                  <span className={`badge ${entry.isMinor ? "badge-minor" : "badge-adult"}`}>
                    {entry.isMinor ? "Minor" : "Adult"}
                  </span>
                </td>
                <td>
                  <code>{entry.ahv}</code>
                </td>
                <td>
                  <code>{entry.email}</code>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
