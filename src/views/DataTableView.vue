<template>
    <div class="card">
        <DataTable :value="customers"
            tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :globalFilterFields="['name', 'country.name', 'representative.name', 'status']" v-model:filters="filters"
            :loading="loading" dataKey="id" filterDisplay="row"
            :lazy="true" 
            paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
            @page="onPage" :totalRecords="totalRecords"
            @sort="onSort"
            :sortField="lazyParams.sortField"
            :sortOrder="lazyParams.sortOrder">
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Manage Products</h4>
                    <IconField>
                        <InputIcon>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No data found. </template>
            <template #loading> Loading data. Please wait. </template>
            <template #paginatorstart>
                <Button type="button" icon="fa-solid fa-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="fa-solid fa-download" text />
            </template>
            <Column field="name" header="Name" sortable style="width: 25%">
                <template #body="{ data }">
                    {{ data.name }}
                    <Skeleton></Skeleton>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="country.name" header="Country" sortable style="width: 25%">
                <template #body="{ data }">
                    {{ data.country.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Search by country name" />
                </template>
            </Column>
            <Column field="company" header="Company" sortable style="width: 25%">
            </Column>
            <Column field="representative.name" sortable header="Representative" style="width: 25%">
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { Button, Column, DataTable, IconField, InputIcon, InputText } from 'primevue';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { CustomerService } from '@/services/CustomerService';


onMounted(() => {
  loadLazyData();
});

const loadLazyData = async () => {
  loading.value = true;
  try {
    console.log(lazyParams.value)
    const offset = lazyParams.value.page * lazyParams.value.rows;
    const response = await CustomerService.getCustomersPage(offset, offset + lazyParams.value.rows);
    const responseCountData = await CustomerService.getCustomersXLarge();
    customers.value = response;
    totalRecords.value = responseCountData.length;
  } catch (error) {
    console.error("Failed to load data:", error);
    customers.value = [];
    totalRecords.value = 0;
  } finally {
    loading.value = false;
  }
};

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const loading = ref(true);

const totalRecords = ref(0);

const lazyParams = ref({
  first: 0,
  rows: 5,
  page: 0,
  sortField: null, // New
  sortOrder: null, // New
  filters: {},     // New
});

const onPage = (event) => {
  lazyParams.value.first = event.first;
  lazyParams.value.rows = event.rows;
  lazyParams.value.page = event.page;
  loadLazyData();
};
const onSort = (event) => {
  lazyParams.value.sortField = event.sortField;
  lazyParams.value.sortOrder = event.sortOrder;
  loadLazyData();
};
</script>

<style lang="scss" scoped></style>