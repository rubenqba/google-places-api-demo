import { cleanEnv, Spec, str, ValidatorSpec } from "envalid";

// ==========  environment definition and validation ==========

const isServer = typeof window === "undefined";
const envVars = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
};

type EnvKey = keyof typeof envVars;

const optionalVarOpts: Spec<string> = { default: undefined };
const serverVarOpts = isServer ? undefined : optionalVarOpts;

const envConfig: Record<EnvKey, ValidatorSpec<string>> = {
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: str(),
  GOOGLE_PLACES_API_KEY: str(serverVarOpts),
};
const env = cleanEnv(envVars, envConfig);

export default env;
