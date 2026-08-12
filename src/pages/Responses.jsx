import React, { useEffect, useState } from "react";
import { getWaitlistEntries } from "../firebase";
import "./Responses.css";

export default function Responses() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWaitlistEntries()
      .then(setEntries)
      .catch((err) => {
        console.error(err);
        setError("Couldn't load responses.");
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (ts) => {
    if (!ts?.toDate) return "—";
    return ts.toDate().toLocaleString();
  };

  return (
    <div className="responses-page">
      <div className="responses-header">
        <h1>Waitlist Responses</h1>
        <span className="responses-count">{entries.length} total</span>
      </div>

      {loading && <p className="responses-status">Loading…</p>}
      {error && <p className="responses-status error">{error}</p>}

      {!loading && !error && entries.length === 0 && (
        <p className="responses-status">No responses yet.</p>
      )}

      {!loading && entries.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Institution</th>
                <th>Department</th>
                <th>Courses</th>
                <th>Class Size</th>
                <th>Biggest Challenge</th>
                <th>Wanted Features</th>
                <th>Would Use?</th>
                <th>Other Features</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td>{formatDate(e.createdAt)}</td>
                  <td>{e.fullName || "—"}</td>
                  <td>{e.email}</td>
                  <td>{e.institution || "—"}</td>
                  <td>{e.department || "—"}</td>
                  <td>{e.courses || "—"}</td>
                  <td>{e.classSize || "—"}</td>
                  <td className="wrap-cell">{e.challenge || "—"}</td>
                  <td>{(e.wantedFeatures || []).join(", ") || "—"}</td>
                  <td>{e.wouldUse || "—"}</td>
                  <td className="wrap-cell">{e.otherFeatures || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}