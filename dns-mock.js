const http = require("http");

let currentTarget = "127.0.0.1:4001";
let lastUpdated = Date.now();
const TTL = 5000;

function switchToDC2() {
  currentTarget = "127.0.0.1:4002";
  lastUpdated = Date.now();
  console.log("DNS switched to DC2: http://localhost:4002");
}

function resolveDNS(domain, callback) {
  const now = Date.now();

  if (domain === "loadbalancer.example") {
    if (now - lastUpdated > TTL) {
      console.log("TTL expired; resolving domain again...");
      callback(new Error(`TTL expired for domain: ${domain}`));
    } else {
      callback(null, currentTarget);
    }
  } else {
    callback(new Error(`Unknown domain: ${domain}`));
  }
}

// HTTP server to serve as a mock DNS service
const server = http.createServer((req, res) => {
  if (req.url === "/switch-to-dc2") {
    switchToDC2();
    res.end("DNS now points to DC2");
  } else if (req.url === "/current") {
    res.end(`Current DNS target: ${currentTarget}`);
  } else {
    res.end(`Unknown request`);
  }
});

server.listen(5050, () =>
  console.log("Mock DNS server running on http://localhost:5050")
);

module.exports = { resolveDNS };
