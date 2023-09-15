<template>
  <div class="information-container">
    <NuxtLayout headerBg="rgba(0, 0, 0, .8)" :showFooter="false">
      <section class="center">
        <ClientOnly>
          <PdfViewer />
        </ClientOnly>
      </section>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import PdfViewer from "@/components/PdfViewer.vue";
</script>

<style lang="scss" scoped>
.information-container {
  width: 100%;
  background: rgba(0,0,0,.1);
  .center {
    min-height: calc(100vh - 100px);
  }
}
</style>
