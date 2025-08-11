import express from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import removeMarkdown from 'remove-markdown'

const app = express()
const port = process.env.PORT || 5174

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { originalname, mimetype, buffer } = req.file
    const lowerName = originalname.toLowerCase()

    let text = ''
    if (mimetype === 'application/pdf' || lowerName.endsWith('.pdf')) {
      const data = await pdfParse(buffer)
      text = data.text || ''
    } else if (
      mimetype === 'text/markdown' ||
      mimetype === 'text/plain' ||
      lowerName.endsWith('.md') ||
      lowerName.endsWith('.markdown')
    ) {
      const raw = buffer.toString('utf-8')
      text = removeMarkdown(raw, { stripListLeaders: true })
    } else {
      return res.status(415).json({ error: 'Unsupported file type' })
    }

    // Normalize whitespace
    text = text
      .replace(/\r\n/g, '\n')
      .replace(/\t/g, ' ')
      .replace(/[ \u00A0]+/g, ' ')
      .replace(/\n\s*\n+/g, '\n\n')
      .trim()

    return res.json({ text })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to process file' })
  }
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})



