<template>
    <div>
        <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
</template>
  
<script lang="ts" setup>
import {onMounted, ref } from 'vue';

import * as pdfjs from 'pdfjs-dist';
import PDFJSWorker from "pdfjs-dist/build/pdf.worker?url";


const props = defineProps({
    url: {
        type: String,
        required: true,
    },
},)
const canvas = ref<any>(null);
let ctx: CanvasRenderingContext2D | null = null;

onMounted(() => {
    loadPdf()
});

async function loadPdf() {
    try {

        ctx = canvas.value.getContext('2d');

        pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker
        const loadingTask = pdfjs.getDocument(props.url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1 });

        const renderContext: any = {
            canvasContext: ctx,
            viewport: viewport,
        };

        page.render(renderContext);
    } catch (error) {
        console.error(error);
    }
};


</script>