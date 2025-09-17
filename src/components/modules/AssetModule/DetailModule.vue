<script setup lang="ts">
import AssetServices from '@/components/services/api.service';
import { Member } from '@/types/member.type';
import { Image } from '@fewangsit/wangsvue';
import { FetchResponse, QueryParams } from '@fewangsit/wangsvue/datatable';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailProp from './DetailProp.vue';

const route = useRoute();
const { id } = route.params;
const allData = ref<Member[]>([]);
const dataById = ref<Member | null>(null);
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

const getDataById = async (
  params: QueryParams,
): Promise<Member | undefined> => {
  try {
    const { data }: { data: { data: Member } } =
      await AssetServices.getAssetById(id, params);

    dataById.value = data.data;
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

const detailList = computed(() => {
  if (!dataById.value) return [];
  return [
    { title: 'Brand', desc: dataById.value.brand },
    { title: 'Model/Type', desc: dataById.value.model },
    { title: 'Category', desc: dataById.value.category },
    { title: 'Group', desc: dataById.value.group },
  ];
});

onMounted(async () => {
  await getAllData({});
});
onMounted(async () => {
  await getDataById({});
});
</script>

<template>
  <div class="px-6">
    <p class="pt-3 pb-[10.5px]">Asset Detail</p>
    <div class="rounded-[7px] bg-white p-6 flex flex-col gap-[10px]">
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
          <h3>General Information</h3>
          <div class="grid grid-cols-2 gap-7">
            <DetailProp
              :key="index"
              v-for="(detail, index) in detailList"
              :desc="detail.desc"
              :title="detail.title"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
