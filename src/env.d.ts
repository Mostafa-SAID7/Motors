interface ImportMetaEnv {
  readonly VITE_INSFORGE_API_KEY: string;
  readonly VITE_INSFORGE_API_BASE_URL: string;
  readonly VITE_ENV: string;
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
