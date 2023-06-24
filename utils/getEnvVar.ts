export default function getEnvVar(envVarName: string) {
  const envVarVal = process.env[envVarName];
  if (!envVarVal) {
    throw new Error(`${envVarName} environment variable is not defined`);
  }

  return envVarVal;
}
