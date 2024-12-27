import os from 'os';
import { execSync } from 'child_process';

export function getSystemInfo() {
  const platform = os.platform();
  const arch = os.arch();
  const cpu = os.cpus()[0].model;
  const memory = (os.totalmem() / 1024 / 1024).toFixed(2) + ' MB';
  const uptime = (os.uptime() / 60 / 60).toFixed(2) + ' hours';

  let temperature = 'N/A';
  try {
    temperature = execSync('vcgencmd measure_temp').toString().trim();
  } catch (error) {
    console.error('Error fetching temperature:', error);
  }

  return {
    platform,
    arch,
    cpu,
    memory,
    uptime,
    temperature,
  };
}
