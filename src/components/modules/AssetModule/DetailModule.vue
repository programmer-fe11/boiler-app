<script setup lang="ts">
import AssetServices from '@/components/services/asset.service';
import { Asset } from '@/types/asset.type';
import { formatDate, Image } from '@fewangsit/wangsvue';
import { computed, onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

onMounted(async () => {
  await getDataById();
});

const route = useRoute();

interface DetailList {
  title: string;
  desc?: string;
}

// TODO: Ingat lagi computed harusnya ada dimana, liat coding guide
const detailList = computed<DetailList[]>(() => {
  return [
    { title: 'Brand', desc: dataById.value?.brand },
    { title: 'Model/Type', desc: dataById.value?.model },
    { title: 'Category', desc: dataById.value?.category },
    { title: 'Group', desc: dataById.value?.group },
  ];
});

const dataById = shallowRef<Asset>();

const getDataById = async (): Promise<Asset | undefined> => {
  try {
    const { data }: { data: { data: Asset } } =
      await AssetServices.getAssetById(route.params.id as string);

    dataById.value = data.data;
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const date = computed<string>(() => {
  return dataById.value?.createdAt
    ? formatDate(new Date(dataById.value.createdAt), {
        dateFormat: 'dd/mm/yy',
        timeFormat: 'HH:mm:ss',
        showTime: true,
      })
    : '-';
});
</script>

<template>
  <!-- TODO: Masih ada yang enggak sesuai, misalnya padding, text align, font weight, tinggi elemen -->
  <div class="px-6">
    <div class="rounded-[7px] bg-white flex flex-col gap-2.5">
      <div class="flex justify-between">
        <h2 class="!text-xl font-semibold text-grayscale-900 !leading-[100%]">
          {{ dataById?.name }}
        </h2>
        <div class="text-[10px] flex flex-col">
          <!-- TODO: Untuk `by ...` diganti jadi `by {{ dataById?.userFirstName }}` -->
          <span class="text-general-400 leading-4">Last modified</span>
          <span class="leading-[14px] font-medium">{{ date }} by ....</span>
        </div>
      </div>
      <div class="flex gap-6">
        <Image :src="dataById?.assetImage" />
        <div class="flex flex-col gap-2">
          <h3 class="font-semibold text-sm">General Information</h3>
          <div class="grid grid-cols-2 gap-1">
            <div
              :key="index"
              v-for="(detail, index) in detailList"
              class="w-[324px] flex flex-col gap-1"
            >
              <span class="text-[10px] leading-4 text-general-500">
                {{ detail.title }}
              </span>
              <span class="text-xs leading-4 text-grayscale-900 font-medium">
                {{ detail.desc }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
