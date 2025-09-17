<script setup lang="ts">
import AssetServices from '@/components/services/api.service';
import { Member } from '@/types/member.type';
import { Image } from '@fewangsit/wangsvue';
import { FetchResponse, QueryParams } from '@fewangsit/wangsvue/datatable';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

/*
 * TODO: Cara pake id dari useRoute() itu kayak gini:
 * const route = useRoute()
 * ...(kode yang lain)
 * getDataById(route.params.id as string)
 */
const { id } = useRoute().params;
const allData = ref<Member[]>([]);
const filteredData = ref<Member[]>([]);
const getAllData = async (
  params: QueryParams,
): Promise<FetchResponse<Member> | undefined> => {
  try {
    const { data }: { data: FetchResponse<Member> } =
      await AssetServices.getAsset(params);
    allData.value = data.data.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getAllData({
    _id: id,
  });
});
watchEffect(() => {
  if (allData.value.length > 0) {
    filteredData.value = allData.value.filter((data) => {
      return data._id === id;
    });
  }
});

// TODO: Kode jangan dikomentarin, nanti kebiasaan dan resiko lupa dihapus. Dipindahin aja misalnya ke notepad

/*
 * WatchEffect(() => {
 *   If (filteredData.value[0]) {
 *     Console.log(filteredData.value[0].name);
 *   }
 * });
 */
</script>

<template>
  <div class="px-6">
    <p class="pt-3 pb-[10.5px]">Asset Detail</p>
    <div class="rounded-[7px] bg-white p-6 flex flex-col gap-[10px]">
      <div class="flex justify-between">
        <h2>{{ filteredData[0]?.name }}</h2>
        <div class="text-[10px]">
          <p class="text-general-400 leading-4">Last modified</p>
          <p class="leading-[14px]">{{ filteredData[0]?.createdAt }}</p>
        </div>
      </div>
      <div class="flex gap-6">
        <Image :src="filteredData[0]?.assetImage" />
        <!--
          TODO: Ini banyak div yang sama dipake berkali-kali, pake v-for
          biar cuma perlu buat satu aja. Pake computed juga untuk nyimpan
          detail yang perlu ditampilin, cara nulisnya ada di Coding Style Guide 6.3.4
        -->
        <div class="flex flex-col gap-2">
          <h3>General Information</h3>
          <div class="grid grid-cols-2 gap-7">
            <div class="min-w-80 flex flex-col gap-1">
              <p class="text-[10px] text-general-500">Brand</p>
              <p class="text-xs text-grayscale-900 font-medium">
                {{ filteredData[0]?.brand }}
              </p>
            </div>
            <div class="min-w-80 flex flex-col gap-1">
              <p class="text-[10px] text-general-500">Model/Type</p>
              <p class="text-xs text-grayscale-900 font-medium">
                {{ filteredData[0]?.model }}
              </p>
            </div>
            <div class="min-w-80 flex flex-col gap-1">
              <p class="text-[10px] text-general-500">Category</p>
              <p class="text-xs text-grayscale-900 font-medium">
                {{ filteredData[0]?.category }}
              </p>
            </div>
            <div class="min-w-80 flex flex-col gap-1">
              <p class="text-[10px] text-general-500">Group</p>
              <p class="text-xs text-grayscale-900 font-medium">
                {{ filteredData[0]?.group }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
