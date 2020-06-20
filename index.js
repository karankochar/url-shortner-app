const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
connectDB();

app.use(express.json({ extended:false }));
app.use(cors());    

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));