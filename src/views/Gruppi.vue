<template>
  <div class="wrapper">
    <h1>{{ titoloPagina }}</h1>
    <div class="grid ">
      <div class="col-12">
        <DataTable ref="dt" :value="data" responsiveLayout="scroll" stripedRows :paginator="true" :rows="10"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" removableSort
          :loading="loading" v-model:filters="filters" filterDisplay="menu"
          :globalFilterFields="['nome', 'cognome', 'gruppo', 'email', 'codice']">
          <template #loading>
            <i class="pi pi-spin pi-spinner text-8xl text-purple-100"></i>
          </template>
          <template #header>
            <div class="flex justify-content-between">
              <div style="text-align:left">
                <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="field"
                  @update:modelValue="onToggle" placeholder="Select Columns" style="width: 20em" />
              </div>
              <div>
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                  @click="clearFilter()" />
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </span>
              </div>
              <div style="text-align: left">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" class="mr-2" />
                <Button icon="pi pi-plus-circle" label="Crea un Nuovo Gruppo" @click="showSidebarGruppo"></Button>
              </div>
            </div>
          </template>
          <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.field"
            :key="col.field + '_' + index" :sortable="true">
            <template #filter="{ filterModel }">
              <InputText
                v-if="col.field == 'nome' || col.field == 'cognome' || col.field == 'gruppo' || col.field == 'currentToken' || col.field == 'email' || col.field == 'codice' || col.field == 'uid'"
                type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
              <Calendar v-else-if="col.field == 'date_created' || col.field == 'date_updated' || col.field == 'nascita'"
                v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />
              <InputNumber v-else-if="col.field == 'id' || col.field == 'group_id' || col.field == 'livello'"
                v-model="filterModel.value" />
              <InputSwitch
                v-else-if="col.field == 'payment' || col.field == 'primo_appuntamento' || col.field == 'pubblico'"
                v-model="filterModel.value"></InputSwitch>
            </template>
            <template #body="colData">
              <span v-if="col.field == 'date_created' || col.field == 'date_updated' || col.field == 'start'">{{ new
                  Date(colData.data[col.field]).toLocaleDateString('it')
              }} - {{ new Date(colData.data[col.field]).toLocaleTimeString('it', {
    hour: '2-digit', minute: '2-digit'
  })
}}</span>
              <span v-else-if="col.field == 'payment' || col.field == 'primo_appuntamento' || col.field == 'pubblico'">
                <span><i v-if="colData.data[col.field]" class="pi pi-check-circle text-xl text-green-500"></i><i
                    v-if="!colData.data[col.field]" class="pi pi-times-circle text-xl text-red-400"></i></span>
              </span>
              <span v-else>{{ colData.data[col.field] }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="sidebarGruppoVisible" class="p-sidebar-md" position="right">

    <h1>Crea un Nuovo gruppo</h1>

    <div class="flex flex-column">

      <div class="flex flex-column mb-4">
        <label>Nome</label>
        <InputText v-model="sidebarGruppoData.nome"></InputText>
      </div>

      <div class="flex justify-content-end">
        <Button @click="salvaGruppo" :loading="loading" label="Salva"></Button>
      </div>
    </div>
  </Sidebar>

</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import AxiosService from '@/axiosService/AxiosService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const service = new AxiosService
const route = useRoute()
const loading = ref(false)

function getData() {
  loading.value = true
  service.leggiGruppi()
    .then(res => {
      data.value = res.data
      // selectedColumns.value = columns
    })
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
}

const dt = ref();
const titoloPagina = route.path.slice(1)
const data = ref([])

function onToggle(val) {
  selectedColumns.value = columns.value.filter(col => val.includes(col))
}
function populateSelectedColumns() {
  selectedColumns.value = columns.value
}
const selectedColumns = ref()
const columns = ref([
  { field: 'id' },
  { field: 'nome' },
  { field: 'date_created' },
  { field: 'date_updated' },
  { field: 'start' },
  { field: 'data' },
  { field: 'orario' },
  { field: 'link' }
])

function exportCSV() {
  dt.value.exportCSV()
}

function clearFilter() {
  initFilters();
}

const initFilters = () => {
  filters.value = {
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'date_created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'date_updated': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'data': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'orario': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'link': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  }
}

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'date_created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'date_updated': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'data': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'orario': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'link': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
});

const sidebarGruppoVisible = ref(false)
const sidebarGruppoData = ref({
  nome: ''
})
function showSidebarGruppo() {
  sidebarGruppoVisible.value = true
}

function salvaGruppo() {
  loading.value = true
  service.creaGruppi(sidebarGruppoData.value)
    .then(res => console.log('creaGruppi then => ', res))
    .catch(err => console.log('creaGruppi catch => ', err))
    .finally(() => {
      sidebarGruppoData.value = {}
      sidebarGruppoVisible.value = false
      loading.value = false
      getData()
    })
}

getData()
populateSelectedColumns()
</script>