declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_MAPS_API_KEY: string;
    GOOGLE_MAP_ID: string;
    BASE_URL: string;
  }
}

interface Process {
  env: NodeJS.ProcessEnv;
}

declare var process: Process;
