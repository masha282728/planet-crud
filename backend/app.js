const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const planetRoutes = require('./routes/planetRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/planets', planetRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🌍 Server działa: http://localhost:${PORT}`));