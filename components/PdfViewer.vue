<template>
  <div class="pdf-view-warp">
    <div ref="pdfContainerRef" class="pdfjs-container">
      <div ref="pdfViewerRef" class="pdfViewer"></div>
    </div>
    <div class="controls-outside">
      <div class="zoom-buttons">
        <Button type="text" icon="md-arrow-round-down" @click="zoomOut">缩 小</Button>
        <span class="value-span">{{ Math.floor(zoomValue * 100) }}%</span>
        <Button type="text" icon="md-arrow-round-up" @click="zoomIn">放 大</Button>
      </div>
      <div class="page-jump">
        <div>跳至</div>
        <Input v-model="pageValue" @keyup.enter="jump" style="width: 60px; margin: 0 10px" />
        <div>页</div>
      </div>
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
import * as ViewUIPlus from "view-ui-plus";
import {Notice} from "view-ui-plus";

const nuxtApp = useNuxtApp()

const SANDBOX_BUNDLE_SRC = pdfjsSandbox;

pdfjsLib.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;

const CMAP_URL = "/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
const STANDARD_FONT_DATA_URL = "/pdfjs-dist/standard_fonts/";

const pdfUrl = "/Vincent_wu_for_five_year.pdf";

let pdfViewer: pdfjsViewer.PDFViewer | null = null;
let pdfDocument: PDFDocumentProxy | null = null;
const pdfContainerRef = ref<HTMLElement | null>(null);
const pdfViewerRef = ref<HTMLElement | null>(null);
const zoomValue = ref<number>(1);
const pageValue = ref<number>(null);

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

const zoomIn = () => {
  if (pdfViewer) {
    zoomValue.value += 0.05;
    pdfViewer.currentScaleValue = `${zoomValue.value}`;
  }
};

const zoomOut = () => {
  if (pdfViewer) {
    zoomValue.value -= 0.05;
    pdfViewer.currentScaleValue = `${zoomValue.value}`;
  }
};

const jump = () => {
  if (!pageValue.value) {
    return ViewUIPlus.Notice.error({
      title: "错误提示",
      desc: "请输入对应页码后再跳转"
    });
  }
  if (pdfViewer) {
    const totalPage = pdfViewer.pagesCount;

    pageValue.value = pageValue.value > totalPage ? totalPage : pageValue.value < 1 ? 1 : pageValue.value

    const pdfViewTop = pdfViewer.getPageView(pageValue.value - 1).div;

    pdfContainerRef.value.scrollTo({ top: pdfViewTop.offsetTop, behavior: "smooth" });
  }
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
  background: #515a6e;
  position: relative;
  .pdfjs-container {
    z-index: 1;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - 100px);
  }
  .controls-outside {
    z-index: 2;
    position: fixed;
    right: 50px;
    bottom: 50px;
    background: #e1a87a;
    padding: 10px;
    border-radius: 8px;
    .zoom-buttons {
      display: flex;
      .value-span {
        width: 80px;
        text-align: center;
        line-height: 32px;
      }
    }
    .page-jump {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
    }
  }
}
</style>
