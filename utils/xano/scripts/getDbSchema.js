const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const cliProgress = require('cli-progress');

// Ensure you have these environment variables set in your .env.development file
const XANO_ACCESS_TOKEN = process.env.XANO_ACCESS_TOKEN;
const XANO_INSTANCE_URL = process.env.XANO_INSTANCE_URL; // Should be something like 'https://x8ki-letl-twmt.n7.xano.io'
const XANO_WORKSPACE_ID = process.env.XANO_WORKSPACE_ID; // Should be '76540' in this case

// Debug logs to check environment variables
console.log('XANO_INSTANCE_URL:', XANO_INSTANCE_URL);
console.log('XANO_WORKSPACE_ID:', XANO_WORKSPACE_ID);

if (!XANO_INSTANCE_URL || !XANO_ACCESS_TOKEN || !XANO_WORKSPACE_ID) {
  console.error('Error: Missing required environment variables. Please check your .env.development file.');
  process.exit(1);
}

const api = axios.create({
  baseURL: XANO_INSTANCE_URL,
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${XANO_ACCESS_TOKEN}`
  }
});

const rateLimiter = {
  queue: [],
  lastRequestTime: 0,
  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processQueue();
    });
  },
  async processQueue() {
    if (this.queue.length === 0) return;
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < 2000) {
      await new Promise(resolve => setTimeout(resolve, 2000 - timeSinceLastRequest));
    }
    const { fn, resolve, reject } = this.queue.shift();
    this.lastRequestTime = Date.now();
    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    this.processQueue();
  }
};

async function fetchAllTables() {
  console.log('Fetching all tables...');
  const tablesResponse = await rateLimiter.execute(() => api.get(`/api:meta/workspace/${XANO_WORKSPACE_ID}/table`));
  
  let tables = tablesResponse.data;
  
  if (!Array.isArray(tables)) {
    if (typeof tables === 'object') {
      tables = Object.values(tables);
    } else {
      throw new Error('Unexpected data structure for tables');
    }
  }

  console.log(`Retrieved ${tables[0].length} tables.`);

  // Save tables data to a file
  const dataDir = path.join(__dirname, '..', 'data');
  await fs.mkdir(dataDir, { recursive: true });
  const outputPath = path.join(dataDir, 'allTables.json');
  await fs.writeFile(outputPath, JSON.stringify(tables, null, 2));
  console.log(`All tables data saved to: ${outputPath}`);

  return tables[0];
}

async function fetchTableSchema(tableId, retries = 3, delay = 2000) {
  console.log(`Fetching schema for table ID: ${tableId}`);
  try {
    const schemaResponse = await rateLimiter.execute(() => 
      api.get(`/api:meta/workspace/${XANO_WORKSPACE_ID}/table/${tableId}/schema`, {
        headers: {
          'Authorization': `Bearer ${XANO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      })
    );
    return schemaResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log(`Rate limited for table ${tableId}. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchTableSchema(tableId, retries - 1, delay * 2);
    }
    console.error(`Error fetching schema for table ID ${tableId}:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

async function fetchAllTableSchemas() {
  try {
    const tables = await fetchAllTables();
    
    console.log('Fetching schema for each table...');
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(tables.length, 0);

    const dbSchema = [];
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const schema = await fetchTableSchema(table.id);
      dbSchema.push({ ...table, schema });
      progressBar.update(i + 1);
    }
    progressBar.stop();

    // Save the complete DB schema to a file
    const dataDir = path.join(__dirname, '..', 'data');
    const outputPath = path.join(dataDir, 'dbSchema.json');
    await fs.writeFile(outputPath, JSON.stringify(dbSchema, null, 2));
    console.log(`Complete DB schema saved to: ${outputPath}`);

    return dbSchema;
  } catch (error) {
    console.error('Error fetching all table schemas:', error.message);
    throw error;
  }
}

// Main function to execute the script
async function main() {
  try {
    console.log('Starting Xano DB schema retrieval process...');
    const startTime = Date.now();
    await fetchAllTableSchemas();
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // Convert to seconds
    console.log(`Xano DB schema retrieval process completed successfully in ${duration.toFixed(2)} seconds.`);
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

// Run the main function
main();
