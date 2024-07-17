const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const files = fs.readdirSync(__dirname);

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        const entries = files.map((entry) => {
            const fullPath = path.join(__dirname, entry);
            const isDirectory = fs.statSync(fullPath).isDirectory();
            const icon = isDirectory ? "&#128193" : "&#128462";
            return `<a href="${entry}"><li>${icon} ${entry}</li></a>`;
        });
        res.write(entries.join(""));
        res.end();
    } else {
        const reqPath = path.join(__dirname, req.url);
        if (fs.existsSync(reqPath)) {
            if (fs.statSync(reqPath).isDirectory()) {
                // Handle directory navigation here
                // You can list files and subdirectories within this directory
                // Similar to the root URL handling
            } else {
                // Serve file content
                fs.readFile(reqPath, (err, data) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("Internal Server Error");
                    } else {
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end(data);
                    }
                });
            }
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
