const app = require('./app')

require('dotenv').config()
const port = process.env.PORT || 5000

// server configuratio

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})