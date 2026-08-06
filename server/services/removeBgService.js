const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let bgDaemon = null;
let isDaemonReady = false;
let pendingRequests = [];
let activeRequests = [];
let currentPythonCommand = "python";
let triedFallback = false;

function startBgDaemon() {
  if (bgDaemon) return;

  const scriptPath = path.resolve(__dirname, "../python/bg_daemon.py");
  
  console.log(`Starting background removal daemon with: ${currentPythonCommand}`);
  
  bgDaemon = spawn(currentPythonCommand, [`"${scriptPath}"`], { shell: true });

  let buffer = "";

  bgDaemon.stdout.on("data", (data) => {
    buffer += data.toString();
    
    let lines = buffer.split("\n");
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      
      try {
        const msg = JSON.parse(line.trim());
        
        if (msg.status === "ready") {
          console.log("Background removal daemon is READY! Model loaded into memory.");
          isDaemonReady = true;
          pendingRequests.forEach(req => sendRequestToDaemon(req.inputPath, req.outputPath, req.resolve, req.reject));
          pendingRequests = [];
        } else if (msg.status === "ok" || msg.status === "error") {
          const req = activeRequests.shift();
          if (req) {
            if (msg.status === "ok") {
              req.resolve(msg.output);
            } else {
              req.reject(new Error(msg.message));
            }
          }
        }
      } catch (err) {
        console.log(`Daemon log: ${line}`);
      }
    }
  });

  bgDaemon.stderr.on("data", (data) => {
    console.error(`Daemon stderr: ${data.toString()}`);
  });

  bgDaemon.on("close", (code) => {
    console.log(`Background removal daemon exited with code ${code}`);
    isDaemonReady = false;
    bgDaemon = null;
    
    // If it crashed immediately and we haven't tried fallback yet, try python3!
    if (code !== 0 && !triedFallback && currentPythonCommand === "python") {
      console.log("Python failed, trying python3 fallback...");
      currentPythonCommand = "python3";
      triedFallback = true;
      startBgDaemon();
      return;
    }
    
    const error = new Error("Background daemon crashed or exited.");
    activeRequests.forEach(req => req.reject(error));
    pendingRequests.forEach(req => req.reject(error));
    activeRequests = [];
    pendingRequests = [];
    
    // Restart daemon after 3 seconds
    setTimeout(startBgDaemon, 3000);
  });
}

function sendRequestToDaemon(inputPath, outputPath, resolve, reject) {
  activeRequests.push({ inputPath, outputPath, resolve, reject });
  const payload = JSON.stringify({ input: inputPath, output: outputPath });
  bgDaemon.stdin.write(payload + "\n");
}

const removeBackground = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const absInputPath = path.resolve(inputPath);
    const absOutputPath = path.resolve(outputPath);

    if (!bgDaemon) {
      startBgDaemon();
    }

    if (!isDaemonReady) {
      console.log("Daemon is starting up. Request queued...");
      pendingRequests.push({ inputPath: absInputPath, outputPath: absOutputPath, resolve, reject });
    } else {
      sendRequestToDaemon(absInputPath, absOutputPath, resolve, reject);
    }
  });
};

// Auto-start the daemon when the service is required
startBgDaemon();

module.exports = removeBackground;
