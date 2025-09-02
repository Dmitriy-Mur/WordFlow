export interface UploadResponse {
  success: boolean;
  message?: string;
  filename?: string;
  originalName?: string;
  error?: string;
}

export interface FileContentResponse {
  success: boolean;
  content?: string;
  type?: 'pdf' | 'markdown';
  error?: string;
}

export interface FilesListResponse {
  success: boolean;
  files?: string[];
  error?: string;
}

export interface DeleteResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface FileInfo {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
}