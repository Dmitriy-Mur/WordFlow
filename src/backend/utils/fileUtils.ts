import fs from 'fs/promises'
import path from 'path'

export class FileUtils {
  static async ensureUploadDir(): Promise<void> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads')
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }
  }

  static isValidFilename(filename: string): boolean {
    return !filename.includes('..') && !filename.includes('/') && !filename.includes('\\')
  }

  static isAllowedFileType(filename: string, mimetype: string): boolean {
    const allowedTypes = ['application/pdf', 'text/markdown', 'text/x-markdown']
    const allowedExtensions = ['.pdf', '.md', '.markdown']
    const fileExtension = path.extname(filename).toLowerCase()

    return allowedTypes.includes(mimetype) || allowedExtensions.includes(fileExtension)
  }

  static getUploadPath(filename: string): string {
    return path.join(__dirname, '..', '..', 'uploads', filename)
  }

  static async listUploadFiles(): Promise<string[]> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads')
    try {
      await fs.access(uploadDir)
    } catch {
      return []
    }
    const files = await fs.readdir(uploadDir)
    return files.filter((file) => file.match(/\.(pdf|md|markdown)$/i))
  }
}
