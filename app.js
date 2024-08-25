const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Predefined user information
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API!');
});

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    console.log(data);

    // Input validation
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input: 'data' should be an array"
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [Math.max(...lowercaseAlphabets)] : [];

    res.json({
        is_success: true,
        user_id: userId,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
