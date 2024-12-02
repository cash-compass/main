const serverUrl = 'http://<VM-IP>:3000';

async function readFile() {
    const fileName = document.getElementById('readFileName').value;
    try {
            const response = await fetch(`${serverUrl}/read-file?fileName=${fileName}`);
        if (response.ok) {
            const data = await response.text();
            document.getElementById('fileContent').innerText = data;
        } else {
            alert('File not found or error occurred!');
        }
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

async function writeFile() {
    const fileName = document.getElementById('writeFileName').value;
    const content = document.getElementById('fileData').value;
    try {
        const response = await fetch(`${serverUrl}/write-file`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, content }),
        });
        if (response.ok) {
            alert('File written successfully');
        } else {
            alert('Error writing to file!');
        }
    } catch (error) {
        console.error('Error writing file:', error);
    }
}