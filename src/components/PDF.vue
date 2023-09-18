<template>
    <div>
        <canvas class="w-full h-full" v-for="index in pageCount" :key="index" :ref="canvasRefs[index - 1]"/>
    </div>
</template>
  
<script lang="ts" setup>
import {onMounted, ref, Ref } from 'vue';

import * as pdfjs from 'pdfjs-dist';
import PDFJSWorker from "pdfjs-dist/build/pdf.worker?url";


const props = defineProps({
    url: { type: String, required: true,},
},)


let pageCount = ref(0)

const canvasRefs = ref<Array<Ref<Array<HTMLCanvasElement>>>>([]);
let dpr = 1

onMounted(() => {
    dpr = window.devicePixelRatio || 1;
    loadPdf()
});


async function loadPdf() {
    try {
        pdfjs.GlobalWorkerOptions.workerSrc = PDFJSWorker

        const loadingTask = pdfjs.getDocument(props.url);
        
        const pdf = await loadingTask.promise;

        const refs = [];
        for (let i = 0; i < pdf.numPages; i++) {
            refs.push(ref() as Ref<Array<HTMLCanvasElement>>);
        }

        canvasRefs.value = refs;
        pageCount.value = pdf.numPages;

        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);

            const viewport = page.getViewport({ scale: 1 });

            const canvas = canvasRefs.value[i].value[0];

            const ctx = canvas.getContext('2d');

            var scale = (canvas.parentNode as HTMLDivElement).clientWidth / viewport.width;

            const scaledViewport = page.getViewport({ scale: scale * dpr });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            const renderContext: any = {
                canvasContext: ctx,
                viewport: scaledViewport,
            };

            page.render(renderContext);
        }
    } catch (error) {
        console.error(error);
    }
};


</script>