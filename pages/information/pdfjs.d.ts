declare module 'pdfjs-dist/build/pdf.sandbox.js'
declare module 'pdfjs-dist/legacy/build/pdf.sandbox.js'
declare interface Window {
    pdfjsWorker: any
    pdfjsLib: any
    pdfjsViewer: any
    pdfDocument: any
    pdfViewer: any
}