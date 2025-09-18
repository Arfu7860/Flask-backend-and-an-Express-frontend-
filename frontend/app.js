    const express = require('express');
    const path = require('path');
    const app = express();
    const port = 3000;

    app.use(express.urlencoded({ extended: true })); // For parsing form data
    app.set('view engine', 'ejs'); // If using EJS for templating
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', (req, res) => {
        res.render('form'); // Renders your form.ejs (or sendFile for .html)
    });

    app.post('/submit', async (req, res) => {
        try {
            const formData = req.body;
            // Send data to Flask backend
            const response = await fetch('http://backend:5000/process_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            res.send(`Data processed by Flask: ${JSON.stringify(result)}`);
        } catch (error) {
            console.error('Error sending data to backend:', error);
            res.status(500).send('Error processing form data.');
        }
    });

    app.listen(port, () => {
        console.log(`Frontend listening at http://localhost:${port}`);
    });