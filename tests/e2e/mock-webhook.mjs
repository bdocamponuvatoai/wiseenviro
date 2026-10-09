// Stand-in for LEAD_WEBHOOK_URL during e2e tests. Records submissions in memory.
import { createServer } from "node:http";

const port = Number(process.argv[2] ?? 3199);
const leads = [];

createServer((req, res) => {
  if (req.method === "POST" && req.url === "/lead") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      leads.push(JSON.parse(body));
      res.writeHead(200, { "content-type": "application/json" }).end('{"ok":true}');
    });
    return;
  }
  if (req.url === "/leads") {
    res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(leads));
    return;
  }
  res.writeHead(req.url === "/health" ? 200 : 404).end();
}).listen(port, "127.0.0.1");
