import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import apiPrivate from "../api/apiPrivate";
import { useSelector } from "react-redux";

const RequestAuthorAccess = () => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      return setError("Please explain why you want to become an author.");
    }

    try {
      setLoading(true);
      setError("");

      await apiPrivate.post("/home/author-request", { reason });

      setSuccess("Your request has been sent to admin for approval.");
      setReason("");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to submit request. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Request Author Access
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Become an author and start sharing your knowledge with the community.
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} mt={2}>
            <TextField
              label="Full Name"
              value={user?.name || ""}
              fullWidth
              disabled
              margin="normal"
            />

            <TextField
              label="Email"
              value={user?.email || ""}
              fullWidth
              disabled
              margin="normal"
            />

            <TextField
              label="Why do you want to become an author?"
              placeholder="Share your motivation or experience..."
              multiline
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? "Submitting..." : "Request Access"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RequestAuthorAccess;
