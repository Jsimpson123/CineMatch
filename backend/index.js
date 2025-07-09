const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Finds urls starting with '/api/movies', searching movieRoutes
app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
    res.send('CineMatch API is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
