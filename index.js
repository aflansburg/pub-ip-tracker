#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

const LOG_FILE = 'ip-log.txt';
const MAX_LOG_ENTRIES = 1000;

async function getPublicIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching the public IP address:', error);
  }
}

function readLogFile() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const data = fs.readFileSync(LOG_FILE, 'utf8');
      return data.trim().split('\n').map(line => {
        const [timestamp, ip] = line.split(' - IP: ');
        return { timestamp, ip };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error reading log file:', error);
    return [];
  }
}

function writeLogFile(entries) {
  try {
    const data = entries.map(entry => `${entry.timestamp} - IP: ${entry.ip}`).join('\n');
    fs.writeFileSync(LOG_FILE, data, 'utf8');
  } catch (error) {
    console.error('Error writing log file:', error);
  }
}

function notifyIPChange(newIP) {
  exec(`osascript -e 'display notification "IP address has changed to ${newIP}" with title "IP Tracker"'`);
  exec(`say "IP address has changed to ${newIP}"`, (error, stdout, _) => {
    if (error) {
      console.error(`Error with say command: ${error}`);
      return;
    }
  });
}

async function trackIP() {
  const currentIP = await getPublicIP();
  if (!currentIP) return;

  const logEntries = readLogFile();
  const lastEntry = logEntries[logEntries.length - 1];
  
  if (!lastEntry || lastEntry.ip !== currentIP) {
    if (logEntries.length >= MAX_LOG_ENTRIES) {
      logEntries.shift();
    }

    const timestamp = new Date().toISOString();
    logEntries.push({ timestamp, ip: currentIP });
    writeLogFile(logEntries);
    
    if (lastEntry) {
      console.log('IP address changed:', currentIP);
      notifyIPChange(currentIP);
    } else {
      console.log('Initial IP address logged:', currentIP);
    }
  }
}

// every n minutes
const n = 5;
setInterval(trackIP, n * 60 * 1000);
trackIP();
