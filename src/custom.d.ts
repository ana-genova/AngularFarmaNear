declare namespace NodeJS {
  interface ProcessEnv {
    googleMapsApiKey: string;
    googleMapId: string;
    baseUrl: string;
  }
}

interface Process {
  env: NodeJS.ProcessEnv;
}

declare var process: Process;
