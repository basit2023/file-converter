# FastFileConvert

A premium, stateless, full-stack file conversion application built with Next.js and Node.js.

## ⚙️ Features

- **Multi-format Conversion**:
  - PDF to Text
  - PDF to Word (Basic HTML fallback)
  - Word to PDF (using Mammoth & Puppeteer)
  - JPG to PNG
  - PNG to JPG
- **Premium UI**: Glassmorphism, smooth animations (Framer Motion), and responsive design.
- **Dark/Light Mode**: Native support with theme switcher.
- **Privacy First**: Files are deleted immediately after conversion. No registration required.
- **SEO Optimized**: Meta tags and landing page content included.
- **AdSense Ready**: Pre-defined placeholders for ads.

## 🚀 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Multer, Sharp, Puppeteer, PDF-parse, Mammoth.

## 🛠️ Installation & Run

### Prerequisites
- Node.js (v18+)
- npm

### 1. Setup Backend
```bash
cd backend
npm install
npm start
```
*Port: 5000*

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
*Port: 3000*

## 📁 Project Structure

```text
/backend
  ├── server.js      # Main Express server & conversion logic
  └── .env           # Environment configs
/frontend
  ├── src/app        # Next.js App Router
  ├── src/components # React UI components
  └── src/lib        # Utility functions
/uploads             # Temporary storage for uploads
/outputs             # Temporary storage for converted files
```

## 📝 Usage
1. Drag & drop your file into the converter box.
2. Select the desired conversion type from the dropdown.
3. Click "Convert Now".
4. Download your converted file once processing is complete.

---
*Built with ❤️ for FastFileConvert*
