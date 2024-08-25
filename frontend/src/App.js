import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(input); // Validate JSON format

            const result = await axios.post('http://localhost:3001/bfhl', { data: parsedInput.data });
            setResponse(result.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input or server error');
        }
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setSelectedFilters(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;

        const filteredData = {
            Alphabets: selectedFilters.includes('Alphabets') ? alphabets : [],
            Numbers: selectedFilters.includes('Numbers') ? numbers : [],
            HighestLowercaseAlphabet: selectedFilters.includes('Highest lowercase alphabet') ? highest_lowercase_alphabet : []
        };

        return Object.entries(filteredData).map(([key, value]) =>
            value.length > 0 && <div key={key}><strong>{key}:</strong> {value.join(', ')}</div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea
                rows="10"
                cols="50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Alphabets"
                        onChange={handleFilterChange}
                    /> Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Numbers"
                        onChange={handleFilterChange}
                    /> Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Highest lowercase alphabet"
                        onChange={handleFilterChange}
                    /> Highest lowercase alphabet
                </label>
            </div>
            <div>
                {renderResponse()}
            </div>
        </div>
    );
}

export default App;
