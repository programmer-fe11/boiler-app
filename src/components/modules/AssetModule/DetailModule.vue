<script setup lang="ts">
import AssetServices from '@/components/services/asset.service';
import { Asset } from '@/types/asset.type';
import { Image } from '@fewangsit/wangsvue';
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
</script>

<template>
  <div class="px-6">
    <div class="rounded-[7px] bg-white flex flex-col gap-[10px]">
      <div class="flex justify-between">
        <h2>{{ dataById?.name }}</h2>
        <div class="text-[10px]">
          <p class="text-general-400 leading-4">Last modified</p>
          <p class="leading-[14px]">{{ dataById?.createdAt }}</p>
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
              class="min-w-80 flex flex-col gap-1"
            >
              <p class="text-[10px] leading-4 text-general-500">
                {{ detail.title }}
              </p>
              <p class="text-xs leading-4 text-grayscale-900 font-medium">
                {{ detail.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
