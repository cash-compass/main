const express = require('express');
const os = require('os');
const app = express();

function getServerIP() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const serverIP = getServerIP();

// Endpoint to provide the server IP
app.get('/get-server-ip', (req, res) => {
    console.log('Sending server IP:', serverIP); // Debugging
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ serverIP }));
});

// Endpoint to read a file
app.get('/read-file', (req, res) => {
    const fileName = req.query.fileName; // Get file name from query params
    const filePath = `./files/${fileName}`;
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file');
            } else {
                res.send(data);
            }
        });
    } else {
        res.status(404).send('File not found');
    }
});

// Endpoint to write to a file
app.post('/write-file', (req, res) => {
    const { fileName, content } = req.body;
    const filePath = `./files/${fileName}`;
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            res.status(500).send('Error writing to file');
        } else {
            res.send('File updated successfully');
        }
    });
});

// Serve the static HTML file
app.use(express.static('.'));

app.listen(3000, () => {
    console.log(`Server is running at http://${serverIP}:3000`);
});