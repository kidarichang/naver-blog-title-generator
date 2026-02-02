
export interface GenerationResult {
  districtOrDong: string;
  titlePrepaidPhone: string;
  titlePrepaidUSIM: string;
}

export interface AppState {
  city: string;
  dongs: string;
  isGenerating: boolean;
  results: GenerationResult[];
  error: string | null;
}
