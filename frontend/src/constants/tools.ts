export interface ConversionType {
  id: string;
  slug: string;
  label: string;
  icon: string;
  category: string;
  description: string;
  metaDescription: string;
  longDescription: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

export const CONVERSION_TYPES: ConversionType[] = [
  // Image Conversions
  {
    id: 'jpg-to-png',
    slug: 'jpg-to-png',
    label: 'JPG to PNG',
    icon: 'JPG',
    category: 'Image',
    description: 'Convert JPG images to high-quality PNG format with transparency support.',
    metaDescription: 'Convert JPG to PNG free online. Get lossless PNG images with transparency support, sharper edges, and no quality loss. No sign-up, files up to 50MB.',
    longDescription: 'Our JPG to PNG converter turns lossy JPEG photos into lossless PNG files in your browser. PNG is the format designers reach for when they need crisp edges, clean text, and the option of a transparent background, so it is a natural next step once a JPG has done its job of keeping a photo small.',
    sections: [
      {
        heading: 'Why people convert JPG to PNG',
        body: 'JPG is a brilliant format for photographs because it squeezes file size down hard, but that compression is exactly why it struggles with graphics. The moment you put text, a logo, a screenshot, or a sharp diagram inside a JPG, you start to see faint smudges and coloured halos around the edges. Converting that image to PNG locks in a clean, lossless copy so no further detail is thrown away. People most often make this switch when they want to edit a graphic repeatedly, place an image on a coloured website background, or hand artwork to a printer or developer who has asked for PNG specifically.',
      },
      {
        heading: 'What happens to quality and transparency',
        body: 'PNG uses lossless compression, which means every pixel that exists in your JPG is preserved exactly when it becomes a PNG. It is important to understand that converting cannot add back detail the JPG already discarded — if the original was blurry or full of compression artifacts, those stay. What PNG does guarantee is that no new damage is introduced, so the file is safe to open, edit, and re-save as many times as you like. JPG has no transparency at all, so the converted PNG will start with a solid background; you can later erase or replace that background in an editor because PNG fully supports an alpha channel.',
      },
      {
        heading: 'JPG vs PNG: how the two formats compare',
        body: 'JPG (also written JPEG) supports millions of colours and tiny file sizes, which makes it ideal for camera photos and social posts where bandwidth matters. PNG also supports millions of colours but adds transparency and lossless quality, at the cost of a larger file. As a rule of thumb, choose JPG when the image is a photograph and size is the priority, and choose PNG when the image contains text, line art, screenshots, or needs a see-through background. Because PNG files are bigger, many people keep a PNG master for editing and export a JPG or WebP copy only when they publish.',
      },
      {
        heading: 'Common use cases',
        body: 'Typical reasons to run a JPG to PNG conversion include preparing a product photo for an online store that requires PNG uploads, cleaning up a screenshot before adding it to documentation, exporting a logo so it can sit on different background colours, and creating editable source art for thumbnails or banners. Marketers and students also convert JPG to PNG when a platform rejects compressed images or when they want a sharper version of a chart pasted into a slideshow.',
      },
    ],
    faqs: [
      { question: 'Is the JPG to PNG conversion free?', answer: 'Yes, our JPG to PNG converter is 100% free and requires no registration. You can convert as many files as you need, with each upload allowed up to 50MB.' },
      { question: 'Will my image lose quality when converting JPG to PNG?', answer: 'No new quality is lost. PNG is a lossless format, so it preserves every pixel of the JPG exactly. It cannot restore detail the original JPG already compressed away, but it will not add further artifacts.' },
      { question: 'Does the PNG get a transparent background automatically?', answer: 'No. JPG has no transparency, so the converted PNG keeps the original solid background. PNG supports transparency, so you can erase or replace that background afterwards in any image editor.' },
      { question: 'Why is my PNG file larger than the JPG?', answer: 'PNG uses lossless compression, which stores far more detail than JPG\'s lossy compression. A bigger file is the normal trade-off for sharper edges and no compression artifacts.' },
      { question: 'When should I use PNG instead of JPG?', answer: 'Use PNG for logos, screenshots, text-heavy images, line art, and anything needing transparency. Keep JPG for photographs where a small file size matters more than perfect edges.' },
      { question: 'Can I convert JPG to PNG on my phone?', answer: 'Yes. The converter runs in any mobile browser, so you can upload a JPG from your phone, convert it, and download the PNG without installing an app.' },
    ],
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    label: 'JPG to WebP',
    icon: 'WEBP',
    category: 'Image',
    description: 'Convert JPG to WebP for modern web performance and smaller file sizes.',
    metaDescription: 'Convert JPG to WebP free online to shrink image size by up to 30% with no visible quality loss. Faster pages, better Core Web Vitals. No sign-up, up to 50MB.',
    longDescription: 'WebP is the image format Google built for the modern web, and converting your JPG photos to WebP is one of the easiest ways to make a site load faster. Our JPG to WebP converter produces a smaller file that looks the same to the eye, which helps your pages score better in PageSpeed Insights and Core Web Vitals.',
    sections: [
      {
        heading: 'Why convert JPG to WebP',
        body: 'Every image on a web page costs bytes, and bytes cost loading time. JPG already compresses photos well, but WebP compresses them further — typically 25 to 35 percent smaller for the same visual quality. For a content-heavy page with a dozen photos, that saving adds up to a noticeably quicker first paint, especially on mobile data. Faster pages keep visitors engaged and are rewarded by search engines, so site owners, bloggers, and store managers convert JPG to WebP as a standard optimisation step before publishing.',
      },
      {
        heading: 'What happens to image quality',
        body: 'WebP supports both lossy and lossless modes. When you convert a JPG, the practical goal is a smaller file that still looks identical, so a high-quality lossy WebP is the usual result. Because your source is already a lossy JPG, the conversion will not magically sharpen it, but a well-tuned WebP holds detail far better than re-saving a JPG at the same size would. The format handles gradients and skin tones smoothly, which is why it has largely replaced JPG for hero images and photo galleries on performance-focused sites.',
      },
      {
        heading: 'JPG vs WebP: the practical differences',
        body: 'JPG is universally supported by every device, editor, and printer ever made, which is its great strength. WebP is now supported by all current browsers — Chrome, Firefox, Safari, Edge, and Opera — but a few very old apps and some print workflows still do not read it. The decision is therefore about destination: use WebP when the image will live on a website or web app, and keep or convert back to JPG when you need to email a photo, open it in legacy software, or send it to a print shop. Many teams store JPG masters and serve WebP copies to browsers.',
      },
      {
        heading: 'Common use cases',
        body: 'Developers convert JPG to WebP to pass Core Web Vitals audits and reduce hosting bandwidth. E-commerce managers convert product photography so category pages load instantly. Bloggers convert article images to keep posts snappy on phones. If your content management system or theme accepts WebP, swapping in WebP versions of large JPG banners and thumbnails is one of the highest-impact, lowest-effort speed improvements available.',
      },
    ],
    faqs: [
      { question: 'What is WebP format?', answer: 'WebP is a modern image format developed by Google that supports both lossy and lossless compression. It produces smaller files than JPG and PNG while keeping excellent visual quality, which is why it is recommended for the web.' },
      { question: 'How much smaller are WebP files than JPG?', answer: 'WebP images are typically 25-35% smaller than an equivalent JPG with no visible loss of quality, which directly speeds up page loading.' },
      { question: 'Do all browsers support WebP?', answer: 'Yes. Chrome, Firefox, Safari, Edge, and Opera all fully support WebP. Only very old browser versions and some legacy desktop apps lack support.' },
      { question: 'Will converting to WebP improve my SEO?', answer: 'Indirectly, yes. Smaller images load faster, and page speed is part of Google\'s Core Web Vitals ranking signals, so faster pages tend to perform better in search.' },
      { question: 'Can I convert WebP back to JPG later?', answer: 'Yes. If you need a JPG for an app or printer that does not read WebP, you can use our WebP to JPG tool to convert it back.' },
      { question: 'Is there a file size limit?', answer: 'You can upload images up to 50MB per file, which comfortably covers high-resolution photos and banners.' },
    ],
  },
  {
    id: 'image-resize',
    slug: 'image-resize',
    label: 'Image Resize',
    icon: 'SIZE',
    category: 'Image',
    description: 'Resize JPG, PNG, and WebP images to exact dimensions while keeping them crisp.',
    metaDescription: 'Resize images online free. Set exact width and height for JPG, PNG, or WebP with crop, pad, or stretch modes. Keep aspect ratio. No sign-up, files up to 50MB.',
    longDescription: 'Resize JPG, PNG, and WebP images to the exact dimensions you need without installing photo software. Set a width, a height, a fit mode, and an output format, and the tool returns a clean, correctly sized image ready for a website, marketplace listing, document, or social post.',
    sections: [
      {
        heading: 'Why resize an image online',
        body: 'Most images come straight out of a camera or phone far larger than any web page or upload form actually needs. A 6000-pixel photo wastes bandwidth and may be rejected by sites that cap dimensions. Resizing brings the image down to a sensible size so it uploads quickly, displays correctly, and stops slowing pages down. People also resize to meet exact platform requirements — a 1200x630 social preview, a square avatar, a fixed-width blog header — without opening a heavy desktop editor just to crop and export.',
      },
      {
        heading: 'How the fit modes affect your image',
        body: 'The default "keep aspect ratio" mode resizes the image to sit inside your chosen width and height without distorting it, so photos, logos, and screenshots never look stretched. When you need an image at an exact size, the other modes help: crop fills the frame and trims the overflow, pad adds a border to reach the target size, and stretch forces the image to the exact dimensions even if proportions change. Choosing the right mode is the difference between a professional thumbnail and a squashed one, so pick crop for fixed grids and keep-aspect for general resizing.',
      },
      {
        heading: 'Quality and output format',
        body: 'Reducing an image\'s dimensions is a clean operation — smaller versions stay sharp because you are removing pixels, not inventing them. Enlarging is different: if you ask for a size bigger than the original, the tool must stretch existing pixels, which can soften detail, so enlargement is off by default and only happens when you tick the box. You can also export to PNG for lossless graphics, JPG for small photo files, or WebP for the lightest web-ready result, which lets you resize and change format in a single step.',
      },
      {
        heading: 'Common use cases',
        body: 'Online sellers resize product photos to the exact pixel size their marketplace demands. Bloggers resize featured images so pages load fast. Job seekers resize a profile photo to fit an application form. Teams resize screenshots before dropping them into documentation or a slide deck. Because the tool keeps proportions by default and supports three output formats, it works equally well for one-off fixes and for prepping a whole batch of images to a consistent size.',
      },
    ],
    faqs: [
      { question: 'Can I keep the original aspect ratio?', answer: 'Yes. The default fit mode keeps the aspect ratio and resizes the image to fit inside your chosen width and height, so nothing looks stretched.' },
      { question: 'Can I resize to an exact width and height?', answer: 'Yes. Use crop, pad, or stretch mode when you need precise dimensions. Crop trims the overflow, pad adds a border, and stretch forces the exact size.' },
      { question: 'Which image formats can I upload and export?', answer: 'You can upload JPG, PNG, or WebP and export the result as PNG, JPG, or WebP, so you can resize and change format at the same time.' },
      { question: 'Will resizing reduce image quality?', answer: 'Making an image smaller keeps it sharp because pixels are removed cleanly. Enlarging can soften detail, so the "allow enlargement" option is off unless you choose it.' },
      { question: 'Is there a maximum file size?', answer: 'Yes, each image can be up to 50MB, which easily covers high-resolution photos from modern cameras and phones.' },
      { question: 'Does resizing work on mobile?', answer: 'Yes. The resizer runs entirely in the browser, so you can resize images from a phone or tablet without any app.' },
    ],
  },
  {
    id: 'pdf-to-text',
    slug: 'pdf-to-text',
    label: 'PDF to Text',
    icon: 'PDF',
    category: 'PDF',
    description: 'Extract raw text from PDF documents instantly and accurately.',
    metaDescription: 'Convert PDF to text free online. Extract clean, editable plain text from digital PDFs instantly for notes, copy, and data. No sign-up, files up to 50MB.',
    longDescription: 'Our PDF to Text extractor reads the words inside a digital PDF and hands them back as clean, editable plain text. It is built for anyone who needs to reuse the content of a document — for notes, quoting, translation, or data work — without retyping a single line.',
    sections: [
      {
        heading: 'Why extract text from a PDF',
        body: 'PDFs are designed to look the same everywhere, which is great for sharing but frustrating when you actually need the words. Copying page by page is slow and often pastes broken line breaks and page furniture. Extracting the text in one pass gives you the whole document as a plain string you can drop into a notes app, a content management system, a translator, or a spreadsheet. Researchers pull quotes, students build study notes, and marketers lift copy from old brochures, all without the formatting getting in the way.',
      },
      {
        heading: 'What happens to formatting',
        body: 'Plain text has no styling, so anything visual in the original — bold, italics, columns, tables, headers, and images — is stripped away during extraction. That is by design: the goal is the raw words, not the layout. The benefit is a clean, lightweight result you can search, edit, and reformat however you like. If you need the look of the document preserved instead, a format like Word or an image export is the better choice; PDF to Text is specifically for when you want only the content.',
      },
      {
        heading: 'Digital PDFs versus scanned PDFs',
        body: 'This tool works best with text-based, or "digital", PDFs — the kind where you can already highlight and select words on screen. In those files the characters are stored as real text, so extraction is fast and accurate. A scanned PDF is different: it is essentially a photograph of a page, so there is no selectable text to pull, only an image. Turning a scan into editable text requires OCR (Optical Character Recognition), which reads the shapes of letters. If your file is a scan, run it through an OCR step first, then extract.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert PDF to text to harvest quotes and citations from journal articles, to migrate copy from a legacy PDF into a new website, to feed document content into a translation or summarisation tool, and to turn handouts and reports into searchable notes. It is also handy for accessibility, since plain text is easy for screen readers and note apps to process. After extracting, a quick clean-up to remove repeated headers and page numbers gives you a tidy, reusable document.',
      },
    ],
    faqs: [
      { question: 'Can it convert scanned PDFs?', answer: 'It works best with text-based (digital) PDFs where the text is already selectable. Scanned PDFs are images of pages and need OCR first, which is a feature we plan to add.' },
      { question: 'Is there a file size limit?', answer: 'Yes, each PDF can be up to 50MB. That covers the vast majority of standard documents, reports, and ebooks.' },
      { question: 'Will the formatting be preserved?', answer: 'No. The output is plain text, so bold, italics, tables, and columns are removed. The tool focuses on extracting the raw text content accurately.' },
      { question: 'Can I extract text from a password-protected PDF?', answer: 'No. Password-protected PDFs must be unlocked before uploading, because the tool cannot bypass PDF security restrictions.' },
      { question: 'How accurate is the extracted text?', answer: 'For digital PDFs the extraction is highly accurate because it reads real stored characters rather than guessing from an image. Unusual fonts or heavy multi-column layouts may need light clean-up.' },
      { question: 'Can I copy the result into Word or Google Docs?', answer: 'Yes. The plain text pastes cleanly into any editor, note app, spreadsheet, or CMS so you can reformat it as needed.' },
    ],
  },
  {
    id: 'jpg-to-gif',
    slug: 'jpg-to-gif',
    label: 'JPG to GIF',
    icon: 'GIF',
    category: 'Image',
    description: 'Convert JPG images to GIF format easily and quickly.',
    metaDescription: 'Convert JPG to GIF free online. Turn a JPEG photo into a static GIF for legacy apps, email, or simple web graphics. No sign-up, files up to 50MB.',
    longDescription: 'Our JPG to GIF converter changes a static JPEG into the widely compatible GIF format. While GIF is famous for animation, it is also used for simple graphics and for software, email systems, and platforms that specifically expect a GIF file.',
    sections: [
      {
        heading: 'Why convert JPG to GIF',
        body: 'Most people reach for this conversion because something on the other end demands a GIF. Older content management systems, certain email signature builders, some forum and chat platforms, and a handful of legacy desktop tools accept GIF but balk at other formats. Converting a JPG to GIF satisfies those requirements without any redesign. GIF is also a sensible choice for very simple graphics — flat icons, basic banners, low-colour illustrations — where its small palette is enough and broad compatibility is the priority.',
      },
      {
        heading: 'What happens to colour and quality',
        body: 'The biggest thing to understand is that GIF supports a maximum of 256 colours, while a JPG photo can contain millions. When a full-colour photograph is converted to GIF, the tool must map all those shades onto a limited palette, which can introduce visible banding in skies, gradients, and skin tones. Simple, flat images survive the trip well; detailed photos generally do not. If photographic quality matters, PNG or WebP is a far better target than GIF, and GIF should be reserved for graphics or for cases where the format is explicitly required.',
      },
      {
        heading: 'Static versus animated GIF',
        body: 'A GIF can hold a single frame or many frames played in sequence. Converting one JPG produces a single-frame, completely static GIF — it will not move, because there is only one image to show. To build an animated GIF you need multiple source frames or a short video, which is a different kind of tool. So if you upload one photo here, expect a still image in a GIF container, which is exactly what most "needs to be a GIF" requirements are actually asking for.',
      },
      {
        heading: 'Common use cases',
        body: 'Typical reasons to convert JPG to GIF include uploading to a system that only accepts GIF, embedding a small graphic in an HTML email where GIF support is universal, preparing a simple icon for a legacy application, or matching a strict asset specification handed down by a platform. For everyday photo sharing, JPG, PNG, or WebP will almost always look better — GIF is the right answer mainly when the destination insists on it.',
      },
    ],
    faqs: [
      { question: 'Will my image become animated?', answer: 'No. Converting a single JPG produces a static, single-frame GIF. Building an animated GIF requires multiple frames or a video source.' },
      { question: 'Is GIF better than JPG for photos?', answer: 'No. GIF supports only 256 colours, so photographs can show banding. JPG handles photos far better thanks to millions of colours and stronger compression.' },
      { question: 'Why does my photo look posterized after conversion?', answer: 'That is the 256-colour GIF palette at work. Smooth gradients in photos get mapped to fewer colours, which causes visible bands. Simple, flat graphics avoid this.' },
      { question: 'Does GIF support transparency?', answer: 'GIF supports basic single-colour transparency, but not the smooth alpha transparency that PNG offers. A JPG has no transparency to begin with, so the result will be opaque.' },
      { question: 'When should I actually use GIF?', answer: 'Use GIF when a platform, email tool, or legacy app specifically requires it, or for very simple low-colour graphics. For photos, prefer JPG, PNG, or WebP.' },
      { question: 'Is the converter free and is there a size limit?', answer: 'Yes, it is completely free with no registration, and each upload can be up to 50MB.' },
    ],
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    label: 'PNG to JPG',
    icon: 'PNG',
    category: 'Image',
    description: 'Convert PNG images to JPG for better compatibility and smaller file sizes.',
    metaDescription: 'Convert PNG to JPG free online to shrink file size and boost compatibility for sharing, email, and uploads. Output at 90% quality. No sign-up, up to 50MB.',
    longDescription: 'Our PNG to JPG converter shrinks heavy PNG files into compact, universally accepted JPEGs. It is the right tool when a PNG is simply too large to email or upload, or when a platform prefers JPG, and you are happy to trade transparency for a much smaller file.',
    sections: [
      {
        heading: 'Why convert PNG to JPG',
        body: 'PNG is wonderful for quality but its lossless compression makes photographic images large — often several times the size of an equivalent JPG. When you need to email a batch of images, attach a screenshot to a ticket, or upload to a site with a tight size cap, that bulk becomes a problem. Converting to JPG can cut the file size by 50 to 80 percent for photos while staying visually clean. JPG is also the most universally accepted image format, so it sidesteps the occasional upload form or app that does not handle PNG.',
      },
      {
        heading: 'What happens to transparency and quality',
        body: 'The key trade-off is transparency. JPG cannot store a transparent background, so any see-through areas in your PNG are filled with a solid colour — typically white — during conversion. If your PNG is a photo or a fully opaque graphic, you lose nothing visible. If it is a logo cut out on a transparent background, the cut-out look disappears, so keep a PNG master for those. Quality-wise, JPG uses lossy compression; we export at 90 percent quality, a setting that keeps images looking sharp while still delivering a big size reduction.',
      },
      {
        heading: 'PNG vs JPG: which to keep',
        body: 'PNG wins on quality, transparency, and crisp edges; JPG wins on file size and compatibility. The smart workflow is to treat PNG as your editable master and JPG as the delivery copy. Convert to JPG when the image is a photo, when size matters more than perfect edges, and when the destination does not need transparency. Stay with PNG for logos, screenshots full of text, and any graphic that must sit on different backgrounds. Converting back and forth repeatedly is best avoided, since each JPG save discards a little more detail.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert PNG to JPG to make photo galleries lighter, to fit inside email attachment limits, to satisfy upload forms that reject large or transparent images, and to prepare pictures for printing where JPG is the expected format. It is also a quick way to flatten a screenshot before sharing it. Whenever the priority is "small and works everywhere" rather than "perfect and editable", JPG is the better delivery format.',
      },
    ],
    faqs: [
      { question: 'Will I lose the transparent background?', answer: 'Yes. JPG does not support transparency, so any transparent areas in your PNG are filled with a solid white background during conversion.' },
      { question: 'When should I use JPG over PNG?', answer: 'Use JPG for photos and when file size matters. JPG files are typically 50-80% smaller than PNG for photographs without an obvious loss in quality.' },
      { question: 'What quality is the JPG output?', answer: 'We convert at 90% quality by default, which gives an excellent balance between small file size and sharp visual quality for most images.' },
      { question: 'How much smaller will the JPG be?', answer: 'For photographic images, expect the JPG to be roughly half to a fifth of the PNG size. Simple flat graphics may compress less dramatically.' },
      { question: 'Will repeated PNG-to-JPG conversions hurt quality?', answer: 'Each JPG save is lossy, so converting the same image many times slowly degrades it. Keep the PNG original and convert from that when you need a fresh JPG.' },
      { question: 'Is the tool free with a size limit?', answer: 'Yes, it is free with no sign-up, and you can upload PNG files up to 50MB each.' },
    ],
  },
  {
    id: 'png-to-webp',
    slug: 'png-to-webp',
    label: 'PNG to WebP',
    icon: 'WEBP',
    category: 'Image',
    description: 'Convert PNG to WebP to maintain transparency with much smaller file sizes.',
    metaDescription: 'Convert PNG to WebP free online. Keep full transparency while cutting file size 25-50% for faster pages and better Core Web Vitals. No sign-up, up to 50MB.',
    longDescription: 'Our PNG to WebP converter gives web builders the best of both worlds: the transparency of PNG with a fraction of the file size. WebP keeps the alpha channel intact, so your cut-out logos and UI graphics stay see-through while loading far faster.',
    sections: [
      {
        heading: 'Why convert PNG to WebP',
        body: 'PNG is the go-to format for graphics that need a transparent background, but those files can be heavy, and heavy images are the number one cause of slow web pages. WebP solves this by compressing PNG-style graphics much more efficiently while still supporting full transparency. For a site that uses transparent logos, icons, illustrations, or product cut-outs, converting PNG to WebP can dramatically reduce total page weight, which improves load time, Core Web Vitals, and the experience for visitors on slower connections.',
      },
      {
        heading: 'Transparency and quality preserved',
        body: 'Unlike JPG, WebP fully supports the alpha channel, so the transparent areas in your PNG carry over perfectly — there is no white box appearing behind your logo. WebP offers a lossless mode that reproduces the PNG exactly at a smaller size, and a lossy mode that shrinks it even more with negligible visible change. For sharp UI graphics and line art, lossless WebP keeps edges crisp; for richer images you can lean on lossy WebP to save the most space. Either way the transparency is retained.',
      },
      {
        heading: 'PNG vs WebP on the web',
        body: 'PNG is supported absolutely everywhere, which is why it is still a safe master format and a good fallback. WebP is supported by every modern browser but is primarily a web-delivery format, so it is less suited to print workflows or older desktop software. The recommended pattern is to author and store your graphics as PNG, then serve WebP copies to browsers. Because WebP keeps transparency, it is a true drop-in replacement for PNG on the web rather than a compromise.',
      },
      {
        heading: 'Common use cases',
        body: 'Front-end developers convert PNG icon sets and logos to WebP to trim page weight. Designers export transparent illustrations as WebP for landing pages. Store owners convert product images with transparent backgrounds so category grids load instantly. Anyone chasing a better PageSpeed score who is currently shipping large transparent PNGs will see one of the biggest, easiest wins by moving those assets to WebP.',
      },
    ],
    faqs: [
      { question: 'Does WebP support transparency like PNG?', answer: 'Yes. WebP fully supports alpha-channel transparency, so transparent areas in your PNG are preserved exactly, making it a true replacement for PNG on the web.' },
      { question: 'How much smaller will my files be?', answer: 'Lossless WebP is typically around 26% smaller than PNG, and lossy WebP can be far smaller still while looking visually identical.' },
      { question: 'Is WebP supported in all modern browsers?', answer: 'Yes. Chrome, Firefox, Safari, Edge, and Opera all support WebP, including its transparency, so it is safe for production websites.' },
      { question: 'Will sharp edges and text stay crisp?', answer: 'Yes, especially in lossless mode, which reproduces the PNG exactly. For UI graphics and line art, lossless WebP keeps edges clean.' },
      { question: 'Should I keep my original PNG files?', answer: 'Yes. Keep PNG as your editable master and use WebP as the web-delivery copy, since WebP is less suited to print and some legacy desktop tools.' },
      { question: 'Is there a file size limit?', answer: 'Each PNG can be up to 50MB, which is more than enough for icons, logos, and high-resolution graphics.' },
    ],
  },
  {
    id: 'png-to-gif',
    slug: 'png-to-gif',
    label: 'PNG to GIF',
    icon: 'GIF',
    category: 'Image',
    description: 'Convert PNG to GIF format for graphics and simple web images.',
    metaDescription: 'Convert PNG to GIF free online for legacy apps, email, and simple low-colour graphics. Static single-frame output. No sign-up, files up to 50MB.',
    longDescription: 'Our PNG to GIF converter turns a PNG into the long-established GIF format. GIF caps out at 256 colours, which makes it best for simple logos, icons, and flat graphics, and for any system that specifically expects a GIF file.',
    sections: [
      {
        heading: 'Why convert PNG to GIF',
        body: 'The usual driver is compatibility. Some older email platforms, content systems, forums, and legacy desktop applications were built around GIF and accept it more reliably than newer formats. Converting a PNG to GIF lets you satisfy those requirements without redesigning your asset. GIF is also a reasonable container for genuinely simple graphics — a two-colour icon or a flat badge — where 256 colours is plenty and you want maximum reach across old and new software alike.',
      },
      {
        heading: 'The 256-colour trade-off',
        body: 'PNG can store millions of colours and full alpha transparency, while GIF is limited to a 256-colour palette and only basic single-colour transparency. When the PNG is a flat graphic, the conversion is nearly invisible. When the PNG contains gradients, soft shadows, or photographic detail, GIF must reduce those smooth transitions to a small set of colours, producing visible banding, and soft transparent edges can turn jagged. If your PNG is rich or semi-transparent, GIF is rarely the best home for it; WebP or keeping the PNG will look much better.',
      },
      {
        heading: 'Static output and transparency',
        body: 'Converting a single PNG produces a static, single-frame GIF — there is no animation because there is only one image. On transparency, GIF supports a single fully transparent colour rather than the smooth, partial transparency PNG offers. That means hard-edged cut-outs can survive, but anti-aliased or feathered edges may show a rough fringe. For logos that must sit cleanly on any background with soft edges, PNG or WebP remains the stronger choice.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert PNG to GIF mainly to meet a strict format requirement: an email builder that wants GIF, a legacy CMS field, an old application asset slot, or a platform spec that lists GIF. It is also occasionally used for tiny, flat web graphics where the format simply does not matter much. For everything visually rich, PNG and WebP will give a cleaner result, so reach for GIF when something downstream genuinely insists on it.',
      },
    ],
    faqs: [
      { question: 'Will the quality change when converting PNG to GIF?', answer: 'It can. GIF supports only 256 colours, so photos or gradient-rich PNGs may show banding. Simple graphics, logos, and icons convert cleanly.' },
      { question: 'Does GIF keep the transparency from PNG?', answer: 'Only partly. GIF supports a single transparent colour, not the smooth alpha transparency of PNG, so soft or semi-transparent edges can appear jagged.' },
      { question: 'Will the GIF be animated?', answer: 'No. A single PNG converts to a static, single-frame GIF. Animation needs multiple frames or a video source.' },
      { question: 'When is GIF a good choice over PNG?', answer: 'Choose GIF when a legacy app, email tool, or platform specifically requires it, or for very simple low-colour graphics. Otherwise PNG or WebP looks better.' },
      { question: 'Why does my converted GIF look grainy?', answer: 'That grain is colour banding from the 256-colour limit. Reducing a detailed PNG to so few colours forces the banding; a flatter source avoids it.' },
      { question: 'Is the converter free with a size limit?', answer: 'Yes, it is free with no registration, and you can upload PNG files up to 50MB.' },
    ],
  },
  {
    id: 'gif-to-jpg',
    slug: 'gif-to-jpg',
    label: 'GIF to JPG',
    icon: 'JPG',
    category: 'Image',
    description: 'Convert GIF frames to high-quality JPG format instantly.',
    metaDescription: 'Convert GIF to JPG free online. Save a GIF as a compact, widely compatible JPEG at 90% quality for documents and sharing. No sign-up, up to 50MB.',
    longDescription: 'Our GIF to JPG converter captures your GIF as a high-quality JPEG image. It is ideal when you need a single still picture from a GIF, or a small, universally supported file for documents, printing, and everyday sharing.',
    sections: [
      {
        heading: 'Why convert GIF to JPG',
        body: 'GIF is an awkward format outside the web: it is limited in colour, often larger than it should be for a still image, and not always accepted by document tools and print services. Converting to JPG produces a compact, universally compatible photo file that opens cleanly in Word, slide decks, photo apps, and print pipelines. People also convert when they want to lift one still frame out of a GIF — a product shot, a meme caption, a diagram — and reuse it as a normal image instead of an animation.',
      },
      {
        heading: 'How frames are handled',
        body: 'A GIF can contain many frames, but a JPG is a single still image, so the conversion captures the first frame and saves it as JPG. If your GIF is already static, that single frame is simply the whole picture. If it is animated, you get the opening frame as a clean photo. This is exactly what most people want when they say "save this GIF as an image", and it keeps the result predictable rather than trying to merge motion into one frame.',
      },
      {
        heading: 'Quality and colour',
        body: 'JPG supports millions of colours, which is actually more than the GIF\'s 256-colour palette can hold, so the conversion never loses colour range — the source simply had fewer colours to begin with. We export at 90 percent JPG quality, which keeps the frame sharp while producing a small file. Because JPG has no transparency, any transparent area in the GIF is filled with a solid background. For a still image destined for documents or print, that trade is almost always worth it.',
      },
      {
        heading: 'Common use cases',
        body: 'Typical uses include pulling a single frame from an animation to use as a thumbnail, converting a static GIF so it can be embedded in a Word document or PDF, preparing an image for printing where JPG is expected, and shrinking a bulky GIF into a lightweight JPEG for email. Whenever you need "just a normal picture" from a GIF that works everywhere, JPG is the natural target.',
      },
    ],
    faqs: [
      { question: 'Which frame of my animated GIF will be converted?', answer: 'The tool captures the first frame of the GIF and saves it as a JPG. If the GIF is static, the entire image is converted.' },
      { question: 'Will the image quality be good?', answer: 'Yes. We export at 90% JPEG quality, which keeps the frame sharp and clean while producing a compact file.' },
      { question: 'Will transparency be preserved?', answer: 'No. JPG has no transparency, so any transparent areas in the GIF are filled with a solid background colour during conversion.' },
      { question: 'Why convert GIF to JPG at all?', answer: 'JPG is smaller and far more widely accepted by document tools, printers, and apps than GIF, and it is ideal when you only need a single still image.' },
      { question: 'Can I convert an animated GIF into multiple JPGs?', answer: 'Not with this tool — it produces a single JPG from the first frame. Extracting every frame separately would require a dedicated frame-splitter.' },
      { question: 'Is it free and is there a size limit?', answer: 'Yes, it is completely free with no sign-up, and each GIF can be up to 50MB.' },
    ],
  },
  {
    id: 'gif-to-png',
    slug: 'gif-to-png',
    label: 'GIF to PNG',
    icon: 'PNG',
    category: 'Image',
    description: 'Convert GIF to PNG for lossless quality and better transparency.',
    metaDescription: 'Convert GIF to PNG free online for lossless quality and cleaner transparency. Ideal for editing GIF frames as crisp PNG graphics. No sign-up, files up to 50MB.',
    longDescription: 'Our GIF to PNG converter saves a GIF frame as a lossless PNG, giving you cleaner quality, better transparency handling, and an image that is easy to edit in any graphics program. It is the right choice when you want to refine or reuse a GIF as a proper graphic.',
    sections: [
      {
        heading: 'Why convert GIF to PNG',
        body: 'GIF is constrained by its 256-colour palette and its rough, single-colour transparency, which makes it a poor base for editing. PNG removes those limits: it is lossless, supports millions of colours, and offers smooth alpha transparency. Converting GIF to PNG is the move when you want to open a frame in an editor, place it on a coloured background without ugly fringing, or keep a clean master copy that will not degrade as you re-save it. It is also useful when a platform prefers PNG over GIF for static graphics.',
      },
      {
        heading: 'Quality and transparency gains',
        body: 'Because PNG is lossless, the frame it captures from your GIF is preserved exactly with no new compression damage. PNG cannot add colours the GIF never had — the source is still limited to 256 — but it stops any further loss and stores the image cleanly for editing. On transparency, PNG\'s alpha channel is far more capable than GIF\'s single transparent colour, so when you later edit the image you can build smooth, anti-aliased edges instead of the hard, jagged cut-outs GIF tends to produce.',
      },
      {
        heading: 'GIF vs PNG for static graphics',
        body: 'For anything that is not animated, PNG is almost always the better container than GIF. It handles colour and transparency more gracefully, integrates with every image editor, and is widely supported across browsers and apps. GIF\'s one unique strength is animation; strip that away and a static GIF has little advantage over a PNG. So if you have a still GIF graphic you intend to keep, display, or edit, converting it to PNG gives you a cleaner, more flexible file with no real downside.',
      },
      {
        heading: 'Common use cases',
        body: 'Designers convert GIF to PNG to edit a frame with proper transparency, developers convert static GIF assets to PNG for a more modern pipeline, and content creators convert when a CMS or marketplace prefers PNG. It is also handy for archiving a clean, lossless copy of a graphic you pulled from an older GIF, ready to be edited, recoloured, or exported to other formats like WebP later on.',
      },
    ],
    faqs: [
      { question: 'Will PNG have better quality than GIF?', answer: 'PNG is lossless and supports millions of colours, so it preserves the frame exactly and adds no new damage. Quality is still capped by the original GIF\'s 256-colour palette.' },
      { question: 'Is transparency preserved?', answer: 'Yes. If the GIF had transparency, the PNG keeps it, and PNG\'s alpha channel lets you create smoother, cleaner edges when editing afterwards.' },
      { question: 'Does the GIF animation carry over?', answer: 'No. PNG is a still image, so the converter captures a single frame. Animation cannot be stored in a standard PNG.' },
      { question: 'Why convert GIF to PNG instead of keeping the GIF?', answer: 'PNG is lossless, edits cleanly, and handles transparency far better, which makes it superior for any static graphic you plan to display or modify.' },
      { question: 'Can I edit the PNG in Photoshop or other editors?', answer: 'Yes. PNG is supported by every major editor, including Photoshop, GIMP, and Paint.NET, with full transparency support.' },
      { question: 'Is the converter free with a size limit?', answer: 'Yes, it is free with no registration, and you can upload GIF files up to 50MB each.' },
    ],
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    label: 'WebP to JPG',
    icon: 'JPG',
    category: 'Image',
    description: 'Convert modern WebP images back to standard JPG format.',
    metaDescription: 'Convert WebP to JPG free online for universal compatibility with editors, apps, printers, and upload forms that do not accept WebP. No sign-up, up to 50MB.',
    longDescription: 'Our WebP to JPG converter turns modern WebP images back into the universally supported JPEG format. It is the fix for the common frustration of downloading a WebP image only to find your editor, app, or upload form will not accept it.',
    sections: [
      {
        heading: 'Why convert WebP to JPG',
        body: 'WebP is excellent for the web, but it appears in places where it causes friction. Many images saved from websites arrive as WebP, and then a photo editor, an older phone gallery, a print service, or a job-application upload form refuses to open them. Converting WebP to JPG removes that barrier instantly, because JPG is understood by virtually every device, program, and platform ever built. If you have hit a "file type not supported" message after saving an image from a site, this conversion is almost always the answer.',
      },
      {
        heading: 'What happens to quality',
        body: 'JPG and WebP are both lossy formats, so converting between them re-encodes the picture. We export at high quality to keep the result visually clean, and for ordinary photos the difference is not noticeable. WebP can support transparency, but JPG cannot, so any transparent areas are filled with a solid background during conversion. If your WebP is a normal photograph, expect an essentially identical-looking JPG; if it is a transparent graphic, consider WebP to PNG instead to keep the see-through areas.',
      },
      {
        heading: 'WebP vs JPG: where each belongs',
        body: 'WebP wins on file size and is the right format for serving images on a website. JPG wins on universal compatibility and is the right format for editing, printing, emailing, and uploading to systems that have not adopted WebP. The two are not rivals so much as tools for different stages: keep WebP for web delivery, and convert to JPG whenever an image needs to leave the browser and work inside other software. This conversion is essentially a compatibility bridge.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert WebP to JPG to open a downloaded image in Photoshop or a basic photo viewer, to attach a picture to an email that some recipients open in older clients, to satisfy an upload form that only lists JPG and PNG, and to send an image to a print shop. It is also common after saving product or stock images from websites that serve WebP by default, so the picture can be reused like any normal photo.',
      },
    ],
    faqs: [
      { question: 'Why convert WebP to JPG?', answer: 'Some editors, older apps, printers, and upload forms do not support WebP. JPG is compatible with virtually all software and devices, so converting removes those barriers.' },
      { question: 'Will the file size increase?', answer: 'Usually a little, since JPG is generally larger than WebP for the same quality. The trade-off is universal compatibility.' },
      { question: 'What happens to transparency?', answer: 'JPG cannot store transparency, so transparent areas in the WebP are filled with a solid background. To keep transparency, convert WebP to PNG instead.' },
      { question: 'Will I lose quality converting WebP to JPG?', answer: 'Both formats are lossy, so the image is re-encoded, but we export at high quality and the difference is not noticeable for typical photos.' },
      { question: 'I saved an image from a website and it is WebP — can I fix that?', answer: 'Yes. That is the most common reason people use this tool. Upload the WebP and download a standard JPG that works everywhere.' },
      { question: 'Is it free with a size limit?', answer: 'Yes, the converter is free with no sign-up, and each WebP can be up to 50MB.' },
    ],
  },
  {
    id: 'webp-to-png',
    slug: 'webp-to-png',
    label: 'WebP to PNG',
    icon: 'PNG',
    category: 'Image',
    description: 'Convert WebP to PNG to maintain high quality and transparency.',
    metaDescription: 'Convert WebP to PNG free online with full transparency and lossless quality. Ideal for editing WebP graphics in any image editor. No sign-up, up to 50MB.',
    longDescription: 'Our WebP to PNG converter turns WebP files into lossless PNG images while keeping their transparency intact. It is the best choice when you need to edit a WebP graphic, preserve a transparent background, or use an image in software that does not read WebP.',
    sections: [
      {
        heading: 'Why convert WebP to PNG',
        body: 'WebP is built for fast web delivery, but it is awkward to edit and not accepted by every program. When you download a WebP graphic — especially a logo or icon with a transparent background — and want to open it in an older editor or place it in a tool that expects PNG, converting is the clean solution. Unlike converting to JPG, going to PNG keeps the transparency, so cut-out images stay cut out. This makes WebP to PNG the right pick whenever the see-through areas matter.',
      },
      {
        heading: 'Lossless quality and transparency',
        body: 'PNG is a lossless format, so the conversion captures the WebP exactly without introducing new compression artifacts, which is important if you plan to edit and re-save the image several times. Both WebP and PNG support a full alpha channel, so transparent and semi-transparent areas carry over faithfully — no white box appears behind your graphic. The result is a clean, editable master that behaves predictably in every image editor, which is exactly what you want before doing detailed work on a graphic.',
      },
      {
        heading: 'WebP vs PNG: choosing the target',
        body: 'WebP is smaller and ideal for shipping images to browsers, while PNG is larger but universally editable and supported across all desktop software. If your goal is to keep file size down for a website, WebP stays the better delivery format. If your goal is to edit the image, preserve transparency, or use it in legacy software, PNG is the right destination. Choosing PNG over JPG specifically protects the transparency, which is the main reason to pick this conversion rather than WebP to JPG.',
      },
      {
        heading: 'Common use cases',
        body: 'Designers convert WebP to PNG to edit downloaded graphics with full transparency, developers convert when a build tool or legacy system requires PNG assets, and content creators convert transparent logos and icons so they can be placed on any background. It is also useful for archiving a clean, lossless copy of a WebP image that you intend to recolour, crop, or composite later in a proper editor.',
      },
    ],
    faqs: [
      { question: 'Is transparency preserved from WebP to PNG?', answer: 'Yes. Both WebP and PNG support full alpha transparency, so transparent and semi-transparent areas are preserved exactly during conversion.' },
      { question: 'Will the image lose quality?', answer: 'No new quality is lost. PNG is lossless, so it captures the WebP exactly without adding compression artifacts, which is ideal for editing.' },
      { question: 'Why choose PNG over JPG for my WebP?', answer: 'Choose PNG when you need to keep transparency or edit the image losslessly. JPG would flatten transparent areas onto a solid background.' },
      { question: 'Can I edit the PNG in Photoshop or other editors?', answer: 'Yes. PNG is supported by all image editors including Photoshop, GIMP, and Paint.NET, with full transparency support.' },
      { question: 'Will the PNG be larger than the WebP?', answer: 'Usually yes, because PNG is lossless and WebP is highly compressed. The trade-off is universal editing support and exact quality.' },
      { question: 'Is the tool free with a size limit?', answer: 'Yes, it is free with no registration, and you can upload WebP files up to 50MB each.' },
    ],
  },
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    label: 'PDF to Word',
    icon: 'DOCX',
    category: 'PDF',
    description: 'Convert PDF files to Microsoft Word (.docx) while preserving the original page layout.',
    metaDescription: 'Convert PDF to Word (.docx) free online while preserving the original page layout. Works in Word, Google Docs, and LibreOffice. No sign-up, files up to 50MB.',
    longDescription: 'Our PDF to Word converter creates a .docx file that keeps your PDF looking the same. Each page is placed into the Word document with its original visual layout, which is ideal for sharing, archiving, and keeping resumes, forms, invoices, and reports from shifting during conversion.',
    sections: [
      {
        heading: 'Why convert PDF to Word',
        body: 'PDFs are easy to read but hard to change, and there are countless moments when you need an editable copy: updating a contract, tweaking a resume, correcting a typo in a report you no longer have the source file for, or reusing the layout of an old document. Converting to Word gives you a .docx you can open in the software you already use. The priority for most people is that the converted document still looks like the original, so it can be shared or printed without surprises.',
      },
      {
        heading: 'How layout and formatting are handled',
        body: 'To keep the visual appearance faithful, the converter places each PDF page into the Word document so the look — spacing, positioning, and overall layout — is preserved. This visual-accuracy approach means the page in Word matches the page in the PDF closely, which is exactly what you want for documents where appearance matters. The trade-off is that text rendered this way may not be freely re-typeable line by line; the converter optimises for keeping the document looking right rather than rebuilding every paragraph as flowing, editable text.',
      },
      {
        heading: 'Digital versus scanned PDFs',
        body: 'The cleanest conversions come from standard, text-based PDFs — files where the content was generated digitally rather than scanned from paper. A scanned PDF is really a photo of each page, so without OCR there is no underlying text to work with. Our tool handles standard PDFs well; scanned documents would need an OCR step, which is on the roadmap. Before converting, it also helps to make sure the PDF is not password-protected, since locked files must be unlocked first.',
      },
      {
        heading: 'Common use cases and compatibility',
        body: 'People convert PDF to Word to edit resumes and cover letters, to update invoices and quotes, to repurpose report layouts, and to make small corrections to documents whose original source files are long gone. The resulting .docx opens in Microsoft Word, Google Docs, and LibreOffice Writer, so colleagues and clients can work with it regardless of their software. There is no page limit on the document itself; the main constraint is the 50MB upload size, which comfortably covers typical multi-page files.',
      },
    ],
    faqs: [
      { question: 'Will the formatting be preserved?', answer: 'Yes. For the best visual accuracy, the converter keeps each PDF page as a full-page layout inside the Word document, which preserves the look. As a result, the text may not be directly re-typeable line by line.' },
      { question: 'Does it work with any PDF?', answer: 'It works with standard, text-based PDFs. Scanned PDFs are images of pages and would need OCR, which is a feature we plan to add.' },
      { question: 'Can I open the .docx file in Google Docs?', answer: 'Yes. The output .docx is fully compatible with Microsoft Word, Google Docs, LibreOffice Writer, and other word processors.' },
      { question: 'Is there a page or file size limit?', answer: 'There is no page limit, but each upload must be under 50MB. Most standard PDF documents fall well within that limit.' },
      { question: 'Can I convert a password-protected PDF?', answer: 'No. You must remove the password and unlock the PDF before uploading, because the converter cannot bypass PDF security.' },
      { question: 'Why can\'t I edit the text freely after conversion?', answer: 'To keep the page looking identical to the original, the converter preserves the visual layout rather than reflowing the text. This is the trade-off for accurate appearance; a future OCR option will improve text editability for scanned files.' },
    ],
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    label: 'PDF to JPG',
    icon: 'JPG',
    category: 'PDF',
    description: 'Turn your PDF pages into high-resolution JPG images.',
    metaDescription: 'Convert PDF to JPG free online. Turn a PDF page into a high-resolution JPEG image for sharing, social media, and presentations. No sign-up, files up to 50MB.',
    longDescription: 'Our PDF to JPG converter renders your PDF page as a crisp JPEG image. It is perfect when you want to share a document as a picture, drop a page into a presentation, or display PDF content somewhere a PDF viewer is not available.',
    sections: [
      {
        heading: 'Why convert PDF to JPG',
        body: 'A PDF needs a reader, but an image shows up instantly anywhere — in a chat, a social post, a slide, or a web page. Converting a PDF page to JPG turns your document into a picture that previews automatically without anyone needing to download and open a file. This is handy for sharing a flyer or certificate, posting a one-page document to social media, embedding a page into a presentation, or generating a quick thumbnail to represent a document in a list or gallery.',
      },
      {
        heading: 'Quality and resolution',
        body: 'The converter renders the page at a high resolution suitable for viewing, sharing, and light printing, with the exact pixel dimensions depending on the original page size. JPG uses lossy compression, which keeps the file small and easy to send, and works beautifully for pages that contain photos, colour, or mixed visual content. For pages that are mostly small text or fine line art, the lossless PDF to PNG option will hold the sharpest edges, but for general sharing JPG hits the right balance of clarity and size.',
      },
      {
        heading: 'PDF to JPG vs PDF to PNG',
        body: 'Both tools turn a PDF page into an image, but they suit different content. JPG produces smaller files and is ideal for pages with photographs, posters, and rich colour where a tiny amount of compression is invisible. PNG is lossless and keeps text and charts razor-sharp, at the cost of a larger file. A simple rule: choose JPG when the page is visual and you want a light, shareable file, and choose PNG when crisp readability of text and lines is the priority.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert PDF to JPG to post a document page on social media, to attach a page image to a message without sending the whole PDF, to insert a page into a slideshow, and to create preview thumbnails for a document library. It is also useful for quickly showing someone a single page of a longer document. Currently the tool captures the first page as a JPG, with multi-page export planned, so it is best suited to single-page sharing tasks.',
      },
    ],
    faqs: [
      { question: 'What resolution is the output image?', answer: 'The page is rendered at a high resolution suitable for viewing, sharing, and light printing. The exact dimensions depend on the original PDF page size.' },
      { question: 'Does it convert all pages?', answer: 'Currently the tool captures the first page of the PDF as a JPG. Multi-page export is planned for a future update.' },
      { question: 'Should I use JPG or PNG for my PDF page?', answer: 'Use JPG for pages with photos and colour where you want a small, shareable file. Use PDF to PNG when the page is full of text or charts and sharpness matters most.' },
      { question: 'Will the text be readable in the JPG?', answer: 'Yes for normal viewing. Because JPG is lossy, very small text can soften slightly; for the crispest text use the PDF to PNG tool instead.' },
      { question: 'Can I convert a password-protected PDF?', answer: 'No. Unlock the PDF and remove its password before uploading, since the converter cannot bypass PDF security.' },
      { question: 'Is it free with a size limit?', answer: 'Yes, it is free with no registration, and each PDF can be up to 50MB.' },
    ],
  },
  {
    id: 'pdf-to-png',
    slug: 'pdf-to-png',
    label: 'PDF to PNG',
    icon: 'PNG',
    category: 'PDF',
    description: 'Convert PDF pages to high-quality, lossless PNG images.',
    metaDescription: 'Convert PDF to PNG free online. Render PDF pages as lossless, razor-sharp PNG images ideal for text, charts, and web embedding. No sign-up, files up to 50MB.',
    longDescription: 'Our PDF to PNG converter renders your PDF page as a lossless PNG image with perfectly crisp text and graphics. When readability matters more than file size, PNG captures every line and character with no compression smudging.',
    sections: [
      {
        heading: 'Why convert PDF to PNG',
        body: 'Sometimes you need a PDF page as an image, but the page is full of text, tables, charts, or fine line art that has to stay sharp. JPG\'s lossy compression can soften those edges, whereas PNG is lossless and keeps everything crisp. Converting PDF to PNG is the right choice for embedding a document page on a website, sharing a page where small text must remain legible, or producing a clean image of a diagram or invoice that will be read closely rather than just glanced at.',
      },
      {
        heading: 'Lossless quality explained',
        body: 'PNG stores the rendered page exactly, pixel for pixel, with no lossy compression. That means the text edges, table borders, and thin lines that JPG might blur stay perfectly defined. The trade-off is a larger file, because preserving every detail takes more data than JPG\'s aggressive compression. For pages dominated by smooth photographs the extra size buys little, but for text-heavy or graphic pages the clarity gain is obvious and well worth it, which is exactly when PNG should be preferred.',
      },
      {
        heading: 'PDF to PNG vs PDF to JPG',
        body: 'Choose PNG when the page contains text, screenshots, charts, or line art and you want it razor-sharp; choose JPG when the page is mostly photographic and you want the smallest, most shareable file. PNG\'s lossless quality also makes it the safer option when the image might be zoomed into or printed, since there are no compression artifacts to magnify. If you are unsure, PNG is the more conservative pick for readability, and JPG is the lighter pick for casual sharing.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert PDF to PNG to embed clean document pages in websites and emails, to capture invoices and forms as sharp images, to display charts and diagrams without blur, and to prepare page images that may be enlarged or printed. It is also a good fit for documentation and knowledge-base articles where a legible screenshot of a PDF page adds clarity. The tool currently renders the first page, so it is ideal for single-page, high-clarity needs.',
      },
    ],
    faqs: [
      { question: 'Why choose PNG over JPG for PDF conversion?', answer: 'PNG is lossless, so it produces sharper text and cleaner lines. Choose PNG when readability matters; choose JPG when a smaller file size matters more.' },
      { question: 'Is the output suitable for web use?', answer: 'Yes. PNG is supported by all browsers and devices, making it an excellent format for embedding crisp document images on websites and in emails.' },
      { question: 'Will the PNG file be larger than a JPG?', answer: 'Usually yes, because lossless PNG preserves every detail. The larger size is the trade-off for sharp text and artifact-free graphics.' },
      { question: 'Does it convert every page of the PDF?', answer: 'Currently the tool renders the first page as a PNG. Multi-page export is planned for a future update.' },
      { question: 'Can I convert a password-protected PDF?', answer: 'No. Remove the password and unlock the PDF before uploading, as the converter cannot bypass PDF security.' },
      { question: 'Is it free and is there a size limit?', answer: 'Yes, the converter is free with no sign-up, and each PDF can be up to 50MB.' },
    ],
  },
  {
    id: 'word-to-text',
    slug: 'word-to-text',
    label: 'Word to Text',
    icon: 'TXT',
    category: 'Document',
    description: 'Extract clean, raw text from your Word documents instantly.',
    metaDescription: 'Convert Word to plain text (.txt) free online. Strip styles, fonts, and images to get clean raw text for CMS, code, and data work. No sign-up, files up to 50MB.',
    longDescription: 'Our Word to Text converter pulls the raw words out of a .docx file and hands them back as a clean plain-text file. It strips every hidden Word style, font, and layout instruction, leaving just the content you can drop into any editor, CMS, or data pipeline.',
    sections: [
      {
        heading: 'Why convert Word to plain text',
        body: 'Word documents carry a surprising amount of invisible baggage: style definitions, font records, tracked-change history, and layout metadata. When you paste that into a website editor, a code project, or a data tool, the hidden formatting often causes messy spacing, broken markup, or import errors. Converting to plain text gives you nothing but the words, which is exactly what content systems and scripts want. Writers, developers, and data teams use it to get clean copy that behaves predictably wherever it lands.',
      },
      {
        heading: 'What is kept and what is removed',
        body: 'Plain text has no concept of styling, so bold, italics, headings, colours, fonts, tables, and embedded images are all removed during conversion. What survives is the textual content itself, including the line breaks between paragraphs, so the document stays readable as a sequence of plain lines. This is a deliberate simplification: the output is lightweight, universal, and free of the formatting noise that causes problems downstream. If you need the styling preserved, a format like HTML or PDF is the right target instead.',
      },
      {
        heading: 'Why plain text is so useful',
        body: 'A .txt file is the most portable document format there is. It opens in every text editor, imports cleanly into spreadsheets and databases, feeds neatly into translation and analysis tools, and pastes into content management systems without dragging Word styles along. It is also tiny, easy to version-control, and perfectly suited to automated processing. Stripping a document down to plain text is often the first step in migrating content, preparing data, or cleaning up copy before reformatting it the way you actually want.',
      },
      {
        heading: 'Common use cases',
        body: 'People convert Word to text to migrate article copy into a CMS without messy markup, to prepare clean source text for developers and scripts, to feed documents into translation or summarisation tools, and to extract content for spreadsheets and data analysis. It is also handy for quickly grabbing the readable content of a document for an email or note where formatting would only get in the way. Whenever you want the words and nothing else, this is the conversion to reach for.',
      },
    ],
    faqs: [
      { question: 'Will images be included in the text output?', answer: 'No. Images and other embedded media are stripped during conversion. Only the raw text content is extracted.' },
      { question: 'Are headings and formatting preserved?', answer: 'No. The output is plain text, so visual formatting such as bold, italics, and headings is removed. The text itself, including paragraph line breaks, is kept.' },
      { question: 'What file types can I upload?', answer: 'You can upload .docx (and .doc) Word documents, and the converter returns a clean .txt plain-text file.' },
      { question: 'Why would I want plain text instead of keeping Word formatting?', answer: 'Plain text avoids hidden Word styles that cause messy pasting into websites, code, and data tools. It is portable, lightweight, and predictable everywhere.' },
      { question: 'Will tables survive the conversion?', answer: 'Table styling and grid lines are removed, but the text inside the cells is extracted. You would need to re-structure it manually if you want a table again.' },
      { question: 'Is it free with a size limit?', answer: 'Yes, it is free with no registration, and each Word document can be up to 50MB.' },
    ],
  },
  {
    id: 'word-to-html',
    slug: 'word-to-html',
    label: 'Word to HTML',
    icon: 'HTML',
    category: 'Document',
    description: 'Convert Word documents to clean, semantic HTML code.',
    metaDescription: 'Convert Word to HTML free online. Get clean, semantic HTML5 from .docx without bloated copy-paste styles. Great for blogs and CMS. No sign-up, up to 50MB.',
    longDescription: 'Our Word to HTML converter turns a .docx file into clean, modern HTML that is ready for the web. Instead of the bloated markup you get from copy-pasting out of Word, it produces tidy HTML5 that preserves your headings, lists, links, and basic formatting.',
    sections: [
      {
        heading: 'Why convert Word to HTML',
        body: 'Publishing Word content on the web is a common need — blog posts, documentation, newsletters, and CMS pages often start life in Word. The problem is that copying directly from Word into a web editor drags along hundreds of inline styles and junk tags that bloat the page, break your site\'s design, and are painful to maintain. Converting to clean HTML gives you a sensible starting point: structured, readable markup you can paste into a CMS or hand to a developer without first stripping out a mess of Microsoft-specific formatting.',
      },
      {
        heading: 'What clean HTML output means',
        body: 'The converter generates semantic HTML5, meaning your headings become real heading tags, your lists become proper list elements, and your links and basic emphasis are preserved as standard markup. It deliberately avoids the heavy inline styling that Word\'s own "Save as Web Page" and clipboard exports produce. The result is lighter, easier to read, and far simpler to restyle with your site\'s CSS, so the content inherits your design instead of fighting it. The focus is on text structure rather than reproducing every visual detail.',
      },
      {
        heading: 'Preparing your document for the best result',
        body: 'Clean input produces clean output. Before converting, use Word\'s real heading styles rather than manually enlarged bold text, use the built-in list buttons instead of typing dashes, and avoid creating columns or alignment with rows of spaces and tabs. Documents built with proper structure convert into well-formed HTML, while documents formatted by eye tend to need tidying afterwards. Embedded images focus less well in the HTML output, so plan to add important images separately once the markup is in place.',
      },
      {
        heading: 'Common use cases',
        body: 'Bloggers convert Word drafts to HTML so posts paste cleanly into their CMS. Content teams convert documentation and knowledge-base articles for the web. Email marketers convert copy into a clean HTML starting point. Developers convert client-supplied Word files into structured markup they can style and integrate. Anyone who regularly moves written content from Word onto a website will save time and avoid layout headaches by converting to clean HTML first.',
      },
    ],
    faqs: [
      { question: 'Is the HTML output clean?', answer: 'Yes. The converter generates semantic HTML5 without the bloated inline styles that copy-pasting from Word typically produces.' },
      { question: 'Are images included in the HTML?', answer: 'The HTML output focuses on text content, headings, lists, and links. Embedded images may need to be added to the HTML separately.' },
      { question: 'Will my headings and lists be preserved?', answer: 'Yes, as long as you used Word\'s real heading styles and list buttons. Those convert to proper HTML heading and list tags.' },
      { question: 'Why not just copy and paste from Word?', answer: 'Pasting from Word brings hundreds of inline styles and junk tags that bloat the page and break your design. Converting gives clean, maintainable markup instead.' },
      { question: 'How do I get the cleanest result?', answer: 'Use real heading styles, the built-in list buttons, and normal paragraphs. Avoid building columns or alignment with spaces and tabs before converting.' },
      { question: 'Is it free with a size limit?', answer: 'Yes, the converter is free with no sign-up, and each Word document can be up to 50MB.' },
    ],
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    label: 'Word to PDF',
    icon: 'PDF',
    category: 'Document',
    description: 'Convert Word documents to professional, fixed-layout PDF files.',
    metaDescription: 'Convert Word to PDF free online. Lock your .docx layout into a professional, fixed-format PDF that looks identical everywhere. No sign-up, files up to 50MB.',
    longDescription: 'Our Word to PDF converter turns a .docx file into a polished, fixed-layout PDF that looks the same on every device. PDF is the universal standard for sharing professional documents, and converting locks your formatting so resumes, reports, contracts, and proposals always arrive looking right.',
    sections: [
      {
        heading: 'Why convert Word to PDF',
        body: 'A Word document can look different on someone else\'s computer if their fonts, margins, or app version differ from yours, which is risky for anything that needs to look professional. PDF removes that uncertainty by freezing the layout into a fixed format that renders identically everywhere and on any device, with no copy of Word required. That reliability is why resumes, contracts, invoices, school assignments, and business proposals are almost always shared as PDFs rather than editable Word files.',
      },
      {
        heading: 'What happens to your formatting',
        body: 'The converter renders your document and preserves its structure — headings, paragraphs, lists, and basic formatting — into the PDF so the result reflects your intended layout. Once it is a PDF, the content is fixed: recipients see exactly what you exported, and they cannot accidentally nudge your spacing or reflow your pages while reading. For the most faithful result, build the document with standard fonts and clean structure, since unusual fonts and hand-tuned spacing are the things most likely to shift in any Word-to-PDF process.',
      },
      {
        heading: 'Why PDF protects your document',
        body: 'Beyond consistent appearance, PDF offers a degree of integrity. Because it is not freely editable in the way a .docx is, casual recipients cannot easily alter your layout, reorder your content, or change your figures, which matters for contracts, quotes, and official paperwork. It also prints predictably, so what you see on screen is what comes out of the printer. This combination of fixed layout, broad compatibility, and resistance to accidental edits is what makes PDF the default format for sharing finished documents.',
      },
      {
        heading: 'Common use cases',
        body: 'Job seekers convert Word resumes and cover letters to PDF so recruiters see clean, stable formatting. Businesses convert quotes, invoices, and proposals before sending them to clients. Students convert assignments to meet submission requirements. Freelancers convert contracts so the terms cannot be casually altered. Whenever a document is finished and about to be shared, printed, or archived, converting it from Word to PDF is the standard final step.',
      },
    ],
    faqs: [
      { question: 'Why convert Word to PDF?', answer: 'PDFs are readable on any device without Word, look identical everywhere, and resist accidental edits, which keeps professional documents stable and consistent.' },
      { question: 'Is my data safe during conversion?', answer: 'Yes. Files are transferred over encrypted connections and removed after conversion, so your document does not linger on the server.' },
      { question: 'Will images and formatting be preserved?', answer: 'Yes. The converter preserves headings, paragraphs, lists, and basic formatting so the PDF reflects your document\'s intended layout.' },
      { question: 'Can the recipient edit my PDF?', answer: 'Not easily. PDF is a fixed format, so casual recipients cannot reflow or alter the layout the way they could with an editable .docx file.' },
      { question: 'How do I get the most faithful PDF?', answer: 'Use standard fonts and clean structure in your Word document. Unusual fonts and spacing created by hand are the most likely things to shift during any conversion.' },
      { question: 'Is it free with a size limit?', answer: 'Yes, the converter is free with no registration, and each Word document can be up to 50MB.' },
    ],
  },
];

export const CATEGORIES = ['Image', 'PDF', 'Document'];
