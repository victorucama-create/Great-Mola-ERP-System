const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Rota principal - servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota de health check para o Render
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Great Mola ERP System is running',
        timestamp: new Date().toISOString()
    });
});

// Rota para servir outros arquivos estáticos se necessário
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Great Mola ERP System running on port ${PORT}`);
    console.log(`📊 Access the system: http://localhost:${PORT}`);
    console.log(`💡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
