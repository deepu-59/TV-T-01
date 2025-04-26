const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const PORT = 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is working! ✅');
});

// Route to verify Firebase token
app.post('/verify', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.status(200).send(decoded);
  } catch (err) {
    res.status(401).send({ error: 'Invalid Token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});