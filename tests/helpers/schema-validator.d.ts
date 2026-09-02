export function extractKeyPaths(obj: unknown, prefix?: string): string[];

export function compareDictionarySymmetry(dict1: unknown, dict2: unknown): {
  symmetric: boolean;
  missingInDict2: string[];
  extraInDict2: string[];
  typeMismatches: string[];
};

export function validateTranslationDictionarySchema(dict: unknown): {
  valid: boolean;
  errors: string[];
};
