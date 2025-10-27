const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models/planet');
const planetRoutes = require('./routes/planetRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api/planets', planetRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('✅ Database synced');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.log('❌ Database error:', err));
