<template>
  <div class="pdf-view-warp">
    <div ref="pdfContainerRef" class="pdfjs-container">
      <div ref="pdfViewerRef" class="pdfViewer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "pdfjs-dist/web/pdf_viewer.css";
import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/build/pdf.worker.entry";
import * as pdfjsSandbox from "pdfjs-dist/build/pdf.sandbox.js";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

const SANDBOX_BUNDLE_SRC = pdfjsSandbox;

pdfjsLib.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;

const CMAP_URL = "/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
const STANDARD_FONT_DATA_URL = "/pdfjs-dist/standard_fonts/";


const pdfUrl = "/test.pdf";

let pdfViewer: pdfjsViewer.PDFViewer | null = null;
let pdfDocument: PDFDocumentProxy | null = null;
const pdfContainerRef = ref<HTMLElement | null>(null);

const initPdf = async (pdfjsViewer: any) => {
  if (!pdfUrl) return;

  window.pdfjsLib = pdfjsLib;
  window.pdfjsViewer = pdfjsViewer;

  const pdfEventBus = new pdfjsViewer.EventBus();

  const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
    eventBus: pdfEventBus,
    sandboxBundleSrc: SANDBOX_BUNDLE_SRC
  });
  const pdfLinkService = new pdfjsViewer.PDFLinkService({
    eventBus: pdfEventBus
  });

  const pdfFindController = new pdfjsViewer.PDFFindController({
    eventBus: pdfEventBus,
    linkService: pdfLinkService
  });

  pdfDocument = await pdfjsLib.getDocument({
    url: pdfUrl as unknown as URL,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    standardFontDataUrl: STANDARD_FONT_DATA_URL
  }).promise;

  pdfViewer = new pdfjsViewer.PDFViewer({
    container: pdfContainerRef.value,
    eventBus: pdfEventBus,
    annotationMode: 0,
    annotationEditorMode: 0,
    scriptingManager: pdfScriptingManager,
    linkService: pdfLinkService,
    findController: pdfFindController
  });

  pdfScriptingManager.setDocument(pdfDocument);
  pdfScriptingManager.setViewer(pdfViewer);
  pdfLinkService.setDocument(pdfDocument);
  pdfLinkService.setViewer(pdfViewer);

  pdfViewer.setDocument(pdfDocument);

  pdfEventBus.on("pagesinit", () => {
    if (pdfViewer) {
      console.log("init");
    }
  });
};

onMounted(() => {
  if (process.client) {
    import(/* webpackChunkName: "pdfjsViewer" */ "pdfjs-dist/web/pdf_viewer")
      .then(pdfjsViewer => {
        initPdf(pdfjsViewer);
      })
      .catch(error => {
        console.error("Failed to import pdfjsViewer", error);
      });
  }
});
</script>

<style scoped lang="scss">
.pdf-view-warp {
  width: 100%;
  min-height: calc(100vh - 100px);
  overflow: auto;
  border: 1px solid;
  position: relative;
  .pdfjs-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
