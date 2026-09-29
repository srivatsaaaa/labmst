import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const role = event.nativeEvent.submitter?.value;
    const trimmedName = username.trim();
    const credentials = {
      admin: { username: "admin", password: "admin123" },
      viewer: { username: "viewer", password: "viewer123" },
    };
    const selectedCredentials = credentials[role];

    if (
      !selectedCredentials ||
      trimmedName !== selectedCredentials.username ||
      password !== selectedCredentials.password
    ) {
      setLoginError("Username or password is incorrect for the selected role.");
      return;
    }

    setLoginError("");
    setUser({ username: trimmedName, role });
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    setLoginError("");
  };

  if (user) {
    return (
      <div className="container">
        <div className="card welcome-card">
          <h1>
            Welcome, {user.username} ({user.role === "admin" ? "Admin" : "Viewer"})
          </h1>

          {user.role === "admin" ? (
            <button type="button" className="danger-btn">Delete Post</button>
          ) : (
            <p className="read-only">Read-only access</p>
          )}

          <button type="button" className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card login-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginError && <p className="error" role="alert">{loginError}</p>}

          <div className="button-row">
            <button type="submit" value="admin" className="primary-btn">
              Login as Admin
            </button>
            <button type="submit" value="viewer" className="secondary-btn">
              Login as Viewer
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default App;