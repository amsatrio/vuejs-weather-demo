<template>
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update data.</span>
        <div class="flex items-center gap-4 mb-8">
            <label for="id" class="font-semibold w-24">ID</label>
            <InputText id="id" class="flex-auto" autocomplete="off" v-model="recordForm.id" disabled />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="fullname" class="font-semibold w-24">Fullname</label>
            <InputText id="fullname" class="flex-auto" autocomplete="off" v-model="recordForm.fullname" required autofocus />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="mobile_phone" class="font-semibold w-24">Mobile Phone</label>
            <InputText id="mobile_phone" class="flex-auto" autocomplete="off" v-model="recordForm.mobile_phone" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="created_on" class="font-semibold w-24">Created On</label>
            <InputText id="created_on" class="flex-auto" autocomplete="off" v-model="recordForm.created_on" disabled />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="modified_on" class="font-semibold w-24">Created On</label>
            <InputText id="modified_on" class="flex-auto" autocomplete="off" v-model="recordForm.modified_on" disabled />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="mobile_phone" class="font-semibold w-24">Mobile Phone</label>
            <InputText id="mobile_phone" class="flex-auto" autocomplete="off" v-model="recordForm.mobile_phone" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>
    </Dialog>

    <div class="card">
        <DataTable :value="list_of_data" tableStyle="min-width: 50rem"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            :globalFilterFields="['fullname', 'mobile_phone']" v-model:filters="filters" :loading="loading" dataKey="id"
            filterDisplay="row" :lazy="true" paginator :rows="lazyParams.rows" :rowsPerPageOptions="[2, 5, 10, 20, 50]"
            @page="onPage" :totalRecords="totalRecords" @sort="onSort" :sortField="lazyParams.sortField"
            :sortOrder="lazyParams.sortOrder">
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Manage Biodata</h4>
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
            <Column field="fullname" header="Name" sortable style="width: 25%">
                <template #body="{ data }">
                    {{ data.fullname }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Search by name" />
                </template>
            </Column>
            <Column field="mobile_phone" header="Mobile Phone" sortable style="width: 25%">
                <template #body="{ data }">
                    {{ data.mobile_phone }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Search by mobile phone" />
                </template>
            </Column>
            <Column field="created_on" header="Created On" sortable style="width: 25%">
            </Column>
            <Column field="modified_on" sortable header="Modified On" style="width: 25%">
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button icon="fa-solid fa-info" @click="onDetail(slotProps.data)"
                            class="p-button-rounded p-button-info" />
                        <Button icon="fa-solid fa-pencil" @click="openUpdateDialog(slotProps.data)"
                            class="p-button-rounded p-button-info" />
                        <Button icon="fa-solid fa-trash" @click="onDelete(slotProps.data)"
                            class="p-button-rounded p-button-danger" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { Button, Column, DataTable, Dialog, IconField, InputIcon, InputText } from 'primevue';
import { ref, onMounted, reactive } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { MBiodataService } from '@/services/MBiodataService';


onMounted(() => {
    loadLazyData();
});

const loadLazyData = async () => {
    loading.value = true;
    try {
        console.log(lazyParams.value)
        const response = await MBiodataService.pagination(lazyParams.value.page, lazyParams.value.rows);
        list_of_data.value = response.content;
        totalRecords.value = response.totalElements;
    } catch (error) {
        console.error("Failed to load data:", error);
        list_of_data.value = [];
        totalRecords.value = 0;
    } finally {
        loading.value = false;
    }
};

const list_of_data = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mobile_phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    created_on: { value: null, matchMode: FilterMatchMode.EQUALS },
    modified_on: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const loading = ref(true);

const totalRecords = ref(0);

const lazyParams = ref({
    first: 0,
    rows: 2,
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


const onEdit = (data) => {
    console.log(JSON.stringify(data))
    visible.value = true
}
const onDelete = (data) => { }
const onDetail = (data) => { }




// State management
const visible = ref(false); // Controls the visibility of the dialog
const dialogMode = ref('create'); // 'create' or 'update'
const record = ref({}); // The main record object displayed on the page
const recordForm = reactive({}); // The form data for the dialog

// Function to open the dialog for creating a new record
const openCreateDialog = () => {
  dialogMode.value = 'create';
  // Clear the form for a new entry
  Object.assign(recordForm, {
    fullname: '',
    mobile_phone: '',
    id: null,
    created_on: null,
    modified_on: null,
    is_delete: false,
    image: null
  });
  visible.value = true;
};
// Function to open the dialog for updating an existing record
const openUpdateDialog = (data) => {
  dialogMode.value = 'update';
  // Populate the form with the data from the existing record
  Object.assign(recordForm, data);
  visible.value = true;
};
</script>

<style lang="scss" scoped></style>