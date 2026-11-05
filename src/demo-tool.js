/**
 * Demo Tool: Simulated Database Exporter
 * Demonstrates how AgentShield intercepts command output and volatile memory reads.
 */

export function executeQuery(query) {
  console.log(`[demo-tool] Executing query: ${query}`);
  
  // Simulated database response containing sensitive tokens
  return {
    status: "ok",
    recordsQueried: 3,
    sampleUser: {
      id: "usr_9918",
      email: "engineer@company.corp",
      sessionToken: "ghp_1234567890abcdef1234567890abcdef12",
      awsEndpoint: "s3://internal-corporate-bucket"
    }
  };
}

if (process.argv[1] && process.argv[1].endsWith("demo-tool.js")) {
  const result = executeQuery(process.argv[2] || "SELECT * FROM users LIMIT 1");
  console.log(JSON.stringify(result, null, 2));
}
