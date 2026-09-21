import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setResetToken("");
    setLoading(true);

    try {
      const response = await fetch(
       "https://ai-career-roadmap-75cr.vercel.app/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      if (data.success && data.resetToken) {
        setResetToken(data.resetToken);
      }
    } catch (error) {
      console.error(error);
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
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Forgot Password 🔐
        </h2>

        <p style={{ textAlign: "center", color: "#666" }}>
          Enter your registered email address.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Sending..." : "Reset Password"}
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

        {resetToken && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ fontWeight: "bold" }}>
              Reset Token:
            </p>

            <textarea
              value={resetToken}
              readOnly
              style={{
                width: "100%",
                height: "100px",
                boxSizing: "border-box",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />

           <p style={{ textAlign: "center", marginTop: "10px" }}>
  <a
    href={`/reset-password?token=${encodeURIComponent(resetToken)}`}
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Go to Reset Password →
  </a>
</p>
          </div>
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

export default ForgotPassword;