export interface EnvironmentConfig {
  webBaseUrl: string;
  notesApiBaseUrl: string;
}

function normalizeHttpUrl(value: string, variableName: string): string {
  const url = new URL(value);

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`${variableName} must use http or https`);
  }

  return url.toString().replace(/\/$/, '');
}

export function loadEnvironment(source: NodeJS.ProcessEnv = process.env): EnvironmentConfig {
  return {
    webBaseUrl: normalizeHttpUrl(
      source.WEB_BASE_URL ?? 'https://practice.expandtesting.com',
      'WEB_BASE_URL',
    ),
    notesApiBaseUrl: normalizeHttpUrl(
      source.NOTES_API_BASE_URL ?? 'https://practice.expandtesting.com/notes/api',
      'NOTES_API_BASE_URL',
    ),
  };
}
