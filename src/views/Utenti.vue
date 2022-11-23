<template>
  <div class="wrapper">
    <h1>{{ titoloPagina }}</h1>
    <div class="grid ">
      <div class="col-3 ">
        <h2>Partecipanti selezionati</h2>
        <div class="flex flex-wrap justify-content-between ">
          <Card v-for="partecipante in selectedItems" :key="partecipante.id"
            class="w-5 h-8rem mb-4 m-0 p-0 bg-gray-700 ">
            <template #content>
              <h4 class="m-0 text-white">{{ partecipante.nome }} {{ partecipante.cognome }}</h4>
              <p class="m-0 mb-2 text-xs text-gray-300">{{ partecipante.email }}</p>
              <p class="m-0 text-gray-300">{{ new Date(partecipante.date_created).toLocaleDateString('it-IT') }}</p>
            </template>
          </Card>
        </div>
        <div v-for="partecipante in selectedItems" :key="partecipante.id">
          <div v-if="partecipante.gruppo" class="bg-yellow-500 text-gray-100 py-1 px-2 mb-2">
            <span>{{ partecipante.nome }} ha gia un gruppo!</span>
          </div>
        </div>
        <Card v-if="selectedItems.length >= 4" class="bg-gray-700 mt-4">
          <template #content>
            <div class="flex flex-column">
              <div class="flex flex-column"><label class="text-gray-100">Seleziona un gruppo</label>
                <Dropdown :options="gruppoOptions" optionLabel="nome" v-model="gruppoSelected">
                </Dropdown>>
              </div>
              <div class="flex justify-content-end">
                <Button @click="assegnaAGruppo" :loading="loading" label="Assegna al Gruppo"></Button>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-9">
        <DataTable ref="dt" :value="data" responsiveLayout="scroll" stripedRows :paginator="true" :rows="10"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" removableSort
          :loading="loading" v-model:filters="filters" filterDisplay="menu"
          :globalFilterFields="['nome', 'cognome', 'gruppo', 'email', 'codice']" v-model:selection="selectedItems">
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
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
              </div>
            </div>
          </template>
          <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
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
              <span v-if="col.field == 'date_created' || col.field == 'date_updated'">{{ new
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
  service.leggiUtenti()
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
  { field: 'cognome' },
  { field: 'gruppo' },
  { field: 'currentToken' },
  { field: 'date_created' },
  { field: 'date_updated' },
  { field: 'email' },
  { field: 'group_id' },
  { field: 'codice' },
  { field: 'livello' },
  { field: 'nascita' },
  { field: 'payment' },
  { field: 'primo_appuntamento' },
  { field: 'pubblico' },
  { field: 'uid' }
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
    'cognome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'gruppo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'currentToken': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'date_created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'date_updated': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'email': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'group_id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'codice': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'livello': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'nascita': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'payment': { value: null, matchMode: FilterMatchMode.EQUALS },
    'primo_appuntamento': { value: null, matchMode: FilterMatchMode.EQUALS },
    'pubblico': { value: null, matchMode: FilterMatchMode.EQUALS },
    'uid': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
  }
}

const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'cognome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'gruppo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'currentToken': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'date_created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'date_updated': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'email': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'group_id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  'codice': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  'livello': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
  'nascita': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  'payment': { value: null, matchMode: FilterMatchMode.EQUALS },
  'primo_appuntamento': { value: null, matchMode: FilterMatchMode.EQUALS },
  'pubblico': { value: null, matchMode: FilterMatchMode.EQUALS },
  'uid': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
});


const selectedItems = ref([])

const gruppoOptions = ref([])
const gruppoSelected = ref()
function getGruppi() {
  service.leggiGruppi().then(res => gruppoOptions.value = res.data)
}

function assegnaAGruppo() {
  loading.value = true
  selectedItems.value.forEach(partecipante => {
    partecipante.gruppo = gruppoSelected.value.nome
    partecipante.group_id = gruppoSelected.value.id
    service.modificaUtenti(partecipante)
      .then(res => console.log('modificaUtenti then => ', res))
      .catch(err => console.log('modificaUtenti catch => ', err))
      .finally(() => {
        loading.value = false
        selectedItems.value.splice(0)
        getData()
        populateSelectedColumns()
      })
  })
}

getGruppi()

getData()
populateSelectedColumns()
</script>