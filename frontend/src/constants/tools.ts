export interface ConversionType {
  id: string;
  slug: string;
  label: string;
  icon: string;
  category: string;
  description: string;
  longDescription: string;
  faqs: { question: string; answer: string }[];
}

export const CONVERSION_TYPES: ConversionType[] = [
  // Image Conversions
  { 
    id: 'jpg-to-png', 
    slug: 'jpg-to-png',
    label: 'JPG to PNG', 
    icon: '🖼️', 
    category: 'Image',
    description: 'Convert JPG images to high-quality PNG format with transparency support.',
    longDescription: 'Our JPG to PNG converter is the perfect tool for designers, photographers, and content creators who need to convert their lossy JPEG files into lossless PNG format. PNG files support transparency (alpha channels) and are ideal for web use, logos, digital art, and any scenario where detail preservation is critical. Unlike JPG, PNG uses lossless compression, meaning your image retains every pixel of quality during conversion. This makes PNG the preferred format for graphics, screenshots, and images that require sharp edges and text clarity.',
    faqs: [
      { question: 'Is the JPG to PNG conversion free?', answer: 'Yes, our JPG to PNG converter is 100% free and requires no registration. You can convert unlimited files.' },
      { question: 'Will my image lose quality when converting JPG to PNG?', answer: 'No, PNG is a lossless format, so the quality will remain as high as the original JPG. In fact, the PNG output preserves every detail without further compression artifacts.' },
      { question: 'Does PNG support transparency?', answer: 'Yes, PNG supports full alpha transparency. However, if your original JPG has no transparent areas (JPG does not support transparency), the result will have a solid background.' },
      { question: 'When should I use PNG instead of JPG?', answer: 'Use PNG for logos, graphics, screenshots, text-heavy images, and any image needing transparency. Use JPG for photographs where smaller file size is more important.' },
    ]
  },
  { 
    id: 'jpg-to-webp', 
    slug: 'jpg-to-webp',
    label: 'JPG to WebP', 
    icon: '🎨', 
    category: 'Image',
    description: 'Convert JPG to WebP for modern web performance and smaller file sizes.',
    longDescription: 'WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. Converting your JPGs to WebP can reduce file sizes by up to 30% compared to JPEG without any visible loss in quality, significantly improving page load times, Core Web Vitals scores, and overall SEO performance for your website. WebP is now supported by all major browsers and is the recommended format by Google PageSpeed Insights.',
    faqs: [
      { question: 'What is WebP format?', answer: 'WebP is a modern image format developed by Google that offers both lossy and lossless compression. It produces smaller files than JPG and PNG while maintaining excellent visual quality.' },
      { question: 'Are WebP files smaller than JPG?', answer: 'Generally, yes. WebP files can be 25-35% smaller than equivalent JPEGs without losing visible quality, making them ideal for web use.' },
      { question: 'Do all browsers support WebP?', answer: 'Yes, all modern browsers including Chrome, Firefox, Safari, Edge, and Opera fully support WebP images. Only very old browser versions lack support.' },
      { question: 'Why should I convert to WebP for my website?', answer: 'Google recommends WebP for better Core Web Vitals scores. Smaller image files mean faster page loads, which directly improves your SEO rankings and user experience.' },
    ]
  },
  { 
    id: 'pdf-to-text', 
    slug: 'pdf-to-text',
    label: 'PDF to Text', 
    icon: '📄', 
    category: 'PDF',
    description: 'Extract raw text from PDF documents instantly and accurately.',
    longDescription: 'Our PDF to Text extractor uses advanced parsing technology to pull every character from your PDF and deliver it in a clean, editable plain text format. This is perfect for researchers, students, marketers, and data entry professionals who need to quickly extract content from locked or formatted PDF documents. The extracted text can be easily copied, edited, and used in any application — from word processors to spreadsheets to content management systems.',
    faqs: [
      { question: 'Can it convert scanned PDFs?', answer: 'Currently, our tool works best with text-based (digital) PDFs. Scanned PDFs containing images of text require OCR (Optical Character Recognition) which is a feature we plan to add soon.' },
      { question: 'Is there a file size limit?', answer: 'Yes, the current limit is 10MB per file. This covers the vast majority of standard PDF documents.' },
      { question: 'Will the formatting be preserved?', answer: 'The output is plain text, so formatting like bold, italic, tables, and columns will be stripped. We focus on extracting the raw text content accurately.' },
      { question: 'Can I extract text from a password-protected PDF?', answer: 'No, password-protected PDFs need to be unlocked before uploading. We cannot bypass PDF security restrictions.' },
    ]
  },
  { 
    id: 'jpg-to-gif', 
    slug: 'jpg-to-gif',
    label: 'JPG to GIF', 
    icon: '🎬', 
    category: 'Image',
    description: 'Convert JPG images to GIF format easily and quickly.',
    longDescription: 'Our JPG to GIF converter allows you to transform static JPEG images into the widely supported GIF format. While GIF is historically known for animated images, it is also commonly used for simple graphics, icons, and small web images. This tool is perfect for users who need a specific format for legacy software, email clients, or web requirements that specifically call for GIF files. The conversion is fast and maintains the visual integrity of your original image.',
    faqs: [
      { question: 'Will my image become animated?', answer: 'No, converting a single JPG to GIF produces a static GIF image. To create an animated GIF, you would need multiple frames or a video source.' },
      { question: 'Is GIF better than JPG for photos?', answer: 'Generally, no. GIF supports only 256 colors and is best for simple graphics. JPG is superior for photographs due to its support for millions of colors and better compression.' },
      { question: 'Does GIF support transparency?', answer: 'GIF supports simple transparency (a single transparent color), but not the full alpha transparency that PNG offers.' },
    ]
  },
  { 
    id: 'png-to-jpg', 
    slug: 'png-to-jpg',
    label: 'PNG to JPG', 
    icon: '📷', 
    category: 'Image',
    description: 'Convert PNG images to JPG for better compatibility and smaller file sizes.',
    longDescription: 'The PNG to JPG converter is ideal for reducing the file size of your high-quality PNG images, making them easier to share, upload, and use in various applications. JPEGs are universally supported across all devices, platforms, and software, and usually offer much smaller file sizes for photographs and complex images. This conversion is particularly useful when you need to upload photos to social media, send via email, or optimize images for web pages where smaller file size is more important than lossless quality.',
    faqs: [
      { question: 'Will I lose the transparent background?', answer: 'Yes, JPG does not support transparency. Any transparent areas in your PNG will be filled with a white background during conversion.' },
      { question: 'When should I use JPG over PNG?', answer: 'Use JPG for photos, complex images, and when file size matters. JPG files are typically 50-80% smaller than PNG for photographs without a noticeable loss in quality.' },
      { question: 'What quality is the JPG output?', answer: 'We convert at 90% quality by default, which provides an excellent balance between file size and visual quality for most use cases.' },
    ]
  },
  { 
    id: 'png-to-webp', 
    slug: 'png-to-webp',
    label: 'PNG to WebP', 
    icon: '⚡', 
    category: 'Image',
    description: 'Convert PNG to WebP to maintain transparency with much smaller file sizes.',
    longDescription: 'Our PNG to WebP converter is perfect for web developers and site owners looking to optimize their websites for speed and SEO. WebP supports transparency (alpha channel) just like PNG but at a significantly smaller file size — often 25-50% smaller. This means you can keep the transparency your design requires while dramatically improving your page load times, which directly impacts your Google ranking and Core Web Vitals scores.',
    faqs: [
      { question: 'Does WebP support transparency like PNG?', answer: 'Yes, WebP fully supports alpha channel transparency, making it a perfect replacement for PNG images on the web.' },
      { question: 'How much smaller will my files be?', answer: 'WebP lossless images are typically 26% smaller than PNGs. Lossy WebP can be even smaller while maintaining visually identical quality.' },
      { question: 'Is WebP supported in all modern browsers?', answer: 'Yes, all modern browsers (Chrome, Firefox, Safari, Edge, Opera) fully support WebP images as of 2023.' },
    ]
  },
  { 
    id: 'png-to-gif', 
    slug: 'png-to-gif',
    label: 'PNG to GIF', 
    icon: '🎭', 
    category: 'Image',
    description: 'Convert PNG to GIF format for graphics and simple web images.',
    longDescription: 'Easily convert your PNG files to GIF format with our online converter. While GIFs have a limited color palette of 256 colors, they are perfect for simple web graphics, logos, icons, and small illustrations. GIF is also supported virtually everywhere, including older email clients and legacy systems that may not handle PNG files well.',
    faqs: [
      { question: 'Will the quality change when converting PNG to GIF?', answer: 'GIF supports a maximum of 256 colors, so photographs or complex images may show color banding. Simple graphics and logos will convert well.' },
      { question: 'Does GIF keep the transparency from PNG?', answer: 'GIF supports basic transparency (one transparent color), but not the smooth alpha transparency that PNG offers. Semi-transparent areas may appear jagged.' },
    ]
  },
  { 
    id: 'gif-to-jpg', 
    slug: 'gif-to-jpg',
    label: 'GIF to JPG', 
    icon: '🎞️', 
    category: 'Image',
    description: 'Convert GIF frames to high-quality JPG format instantly.',
    longDescription: 'Transform your GIF images into high-quality JPEGs with our free online converter. This tool extracts the first frame of your GIF and converts it into a widely compatible JPEG image. Perfect for saving a specific frame from an animation, converting static GIFs for use in documents, or when you need a universally supported image format for printing or sharing.',
    faqs: [
      { question: 'Which frame of my animated GIF will be converted?', answer: 'Our tool converts the first frame of an animated GIF to JPG. If your GIF is static, the entire image is converted.' },
      { question: 'Will the image quality be good?', answer: 'Yes, we convert at 90% JPEG quality which provides excellent visual fidelity for most purposes.' },
    ]
  },
  { 
    id: 'gif-to-png', 
    slug: 'gif-to-png',
    label: 'GIF to PNG', 
    icon: '🌅', 
    category: 'Image',
    description: 'Convert GIF to PNG for lossless quality and better transparency.',
    longDescription: 'Our GIF to PNG converter turns your GIF images into high-quality, lossless PNG files. This is ideal when you need better image quality, full alpha transparency support, or want to edit the image without compression artifacts. PNG preserves every pixel of detail and supports millions of colors compared to GIF\'s 256-color limit.',
    faqs: [
      { question: 'Will PNG have better quality than GIF?', answer: 'PNG supports millions of colors and lossless compression, so the image will be preserved exactly. However, the quality is limited by the original GIF\'s 256-color palette.' },
      { question: 'Is transparency preserved?', answer: 'Yes, if the original GIF had transparency, the PNG output will also have transparency — and with better quality (full alpha channel support).' },
    ]
  },
  { 
    id: 'webp-to-jpg', 
    slug: 'webp-to-jpg',
    label: 'WebP to JPG', 
    icon: '💾', 
    category: 'Image',
    description: 'Convert modern WebP images back to standard JPG format.',
    longDescription: 'Need to use a WebP image in a tool or application that only supports JPG? Our WebP to JPG converter is the perfect solution. While WebP is an excellent modern format, many image editors, document tools, and older systems still do not support it. Converting to JPG ensures maximum compatibility across all devices, software, and platforms.',
    faqs: [
      { question: 'Why convert WebP to JPG?', answer: 'Some image editors, social media platforms, and older systems don\'t support WebP. JPG is universally compatible with virtually all software and devices.' },
      { question: 'Will the file size increase?', answer: 'Generally, yes. JPG files are typically larger than WebP equivalents for similar quality. However, they are universally supported.' },
    ]
  },
  { 
    id: 'webp-to-png', 
    slug: 'webp-to-png',
    label: 'WebP to PNG', 
    icon: '📥', 
    category: 'Image',
    description: 'Convert WebP to PNG to maintain high quality and transparency.',
    longDescription: 'Turn your WebP files into high-quality PNG images with ease. This is particularly useful if you need to edit an image in a legacy editor that doesn\'t support WebP, or when you need full transparency support in an environment where WebP isn\'t accepted. PNG provides lossless compression, ensuring no quality loss during conversion.',
    faqs: [
      { question: 'Is transparency preserved from WebP to PNG?', answer: 'Yes, both WebP and PNG support full alpha transparency. Your transparent areas will be perfectly preserved during conversion.' },
      { question: 'Can I edit the PNG in Photoshop or other editors?', answer: 'Absolutely. PNG is universally supported in all image editing software including Photoshop, GIMP, Paint.NET, and more.' },
    ]
  },
  { 
    id: 'pdf-to-word', 
    slug: 'pdf-to-word',
    label: 'PDF to Word', 
    icon: '📝', 
    category: 'PDF',
    description: 'Convert PDF files to editable Microsoft Word (.docx) documents.',
    longDescription: 'Need to edit a PDF? Our PDF to Word converter transforms your static PDF files into fully editable Microsoft Word (.docx) documents. We extract the text content and recreate it as a properly formatted Word document that you can open, edit, and save in Microsoft Word, Google Docs, LibreOffice, or any other word processor. This is perfect for editing contracts, updating resumes, and modifying reports without having to retype everything from scratch.',
    faqs: [
      { question: 'Will the formatting be preserved?', answer: 'We preserve the text content and basic paragraph structure. Complex layouts, columns, and embedded graphics may require minor manual adjustment in the output Word document.' },
      { question: 'Does it work with any PDF?', answer: 'Yes, our tool works with any standard text-based PDF. Scanned PDFs (which are essentially images) will require OCR — a feature coming soon.' },
      { question: 'Can I open the .docx file in Google Docs?', answer: 'Yes, the output .docx file is fully compatible with Microsoft Word, Google Docs, LibreOffice Writer, and other word processors.' },
      { question: 'Is there a page limit?', answer: 'There is no page limit, but the file size must be under 10MB. Most standard PDF documents fall well within this limit.' },
    ]
  },
  { 
    id: 'pdf-to-jpg', 
    slug: 'pdf-to-jpg',
    label: 'PDF to JPG', 
    icon: '📸', 
    category: 'PDF',
    description: 'Turn your PDF pages into high-resolution JPG images.',
    longDescription: 'Our PDF to JPG converter takes your PDF document and renders it as a crisp, high-resolution JPEG image. This is perfect for sharing document pages on social media, embedding in presentations, creating thumbnails for document management systems, or simply viewing PDF content as an image without needing a PDF reader.',
    faqs: [
      { question: 'What resolution is the output image?', answer: 'The output JPG is rendered at a high resolution suitable for viewing, sharing, and printing. The exact dimensions depend on the original PDF page size.' },
      { question: 'Does it convert all pages?', answer: 'Currently, our tool captures the first page of the PDF as a JPG image. Multi-page support is planned for a future update.' },
    ]
  },
  { 
    id: 'pdf-to-png', 
    slug: 'pdf-to-png',
    label: 'PDF to PNG', 
    icon: '🖥️', 
    category: 'PDF',
    description: 'Convert PDF pages to high-quality, lossless PNG images.',
    longDescription: 'Extract PDF pages as lossless PNG files with our free converter. Unlike JPG, PNG uses lossless compression so your document pages are captured with perfect clarity — every line of text, every graphic element is razor-sharp. This is the best choice for sharing document pages where text readability is critical, or when you need to embed document content in websites, emails, or digital presentations.',
    faqs: [
      { question: 'Why choose PNG over JPG for PDF conversion?', answer: 'PNG produces sharper text and cleaner graphics because it uses lossless compression. Choose PNG when text clarity matters; choose JPG when smaller file size matters.' },
      { question: 'Is the output suitable for web use?', answer: 'Yes, PNG is widely supported on all browsers and devices. It is an excellent format for embedding document images in websites.' },
    ]
  },
  { 
    id: 'word-to-text', 
    slug: 'word-to-text',
    label: 'Word to Text', 
    icon: '✍️', 
    category: 'Document',
    description: 'Extract clean, raw text from your Word documents instantly.',
    longDescription: 'Need to strip all formatting from a Word document? Our Word to Text converter pulls out the raw text content from .docx files, removing all hidden Word styles, fonts, images, and layout information. The result is a clean plain text file that you can use in any text editor, code editor, CMS, or data processing pipeline. This is essential for content migration, text analysis, and preparing clean copy for websites.',
    faqs: [
      { question: 'Will images be included in the text output?', answer: 'No, images and other embedded media are stripped. Only the raw text content is extracted.' },
      { question: 'Are headings and formatting preserved?', answer: 'The output is plain text, so visual formatting like bold, italic, and headings is removed. The text itself, including line breaks, is preserved.' },
    ]
  },
  { 
    id: 'word-to-html', 
    slug: 'word-to-html',
    label: 'Word to HTML', 
    icon: '🌐', 
    category: 'Document',
    description: 'Convert Word documents to clean, semantic HTML code.',
    longDescription: 'Easily turn your Word (.docx) files into web-ready HTML with our free converter. Unlike copy-pasting from Word (which produces messy HTML with hundreds of unnecessary styles), our tool generates clean, modern HTML5 code that preserves your headings, links, lists, and basic formatting. This is perfect for bloggers, content managers, and web developers who need to publish Word content on the web.',
    faqs: [
      { question: 'Is the HTML output clean?', answer: 'Yes, we generate clean HTML5 code without the bloated inline styles that copy-pasting from Word typically produces.' },
      { question: 'Are images included in the HTML?', answer: 'Currently, the HTML output focuses on text content, headings, lists, and links. Embedded images may need to be added separately to the HTML.' },
    ]
  },
  { 
    id: 'word-to-pdf', 
    slug: 'word-to-pdf',
    label: 'Word to PDF', 
    icon: '📕', 
    category: 'Document',
    description: 'Convert Word documents to professional, fixed-layout PDF files.',
    longDescription: 'Ensure your documents look exactly the same on every device by converting Word (.docx) files to PDF with our free online converter. PDF is the universal standard for sharing professional documents — from resumes and reports to contracts and proposals. PDFs preserve your layout, fonts, and formatting exactly as intended, and they cannot be easily edited by recipients, ensuring document integrity.',
    faqs: [
      { question: 'Why convert Word to PDF?', answer: 'PDFs are universally readable on any device without needing Microsoft Word. They ensure your document looks exactly the same everywhere and prevent accidental editing of your layout.' },
      { question: 'Is my data safe during conversion?', answer: 'Absolutely. We use SSL encryption for all file transfers and delete your files immediately after conversion. Your document never leaves our secure processing pipeline.' },
      { question: 'Will images and formatting be preserved?', answer: 'Yes, our converter maintains the HTML-rendered version of your Word document, preserving headings, paragraphs, lists, and basic formatting in the PDF output.' },
    ]
  },
];

export const CATEGORIES = ['Image', 'PDF', 'Document'];
