const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        const files = fs.readdirSync("./", "utf-8");

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<ul>");

        files.forEach((entry) => {
            const entryPath = path.join(__dirname, entry);
            const isDirectory = fs.statSync(entryPath).isDirectory();
            const icon = isDirectory ? "📂" : "📃";

            res.write(`<li>${icon} <a href="${entry}">${entry}</a></li>`);
        });
        
        res.write("</ul>");
        res.end();
    } else if (req.url !== "/favicon.ico") {
        const filePath = `.${req.url}`;
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            res.end(data);
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("404 Not Found");
        }
    }
});

server.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
