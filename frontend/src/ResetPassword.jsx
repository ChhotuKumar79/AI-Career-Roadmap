import { useState } from "react";

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-career-roadmap-75cr.vercel.app/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken: tokenFromUrl,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Server se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Reset Password 🔐
        </h2>

        {!tokenFromUrl && (
          <p style={{ color: "red", textAlign: "center" }}>
            Reset token missing.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="6"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading || !tokenFromUrl}
            style={buttonStyle}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          <a
            href="/login"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default ResetPassword;