<template>
  <div class="wrapper">
    <h1>{{ titoloPagina }}</h1>
    <div class="grid ">
      <div class="col-12">
        <DataTable ref="dt" :value="data" responsiveLayout="scroll" stripedRows :paginator="true" :rows="10"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" removableSort
          :loading="loading">
          <template #loading>
            <i class="pi pi-spin pi-spinner text-8xl text-purple-100"></i>
          </template>
          <template #header>
            <div class="flex justify-content-between">
              <div style="text-align:left">
                <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="field"
                  @update:modelValue="onToggle" placeholder="Select Columns" style="width: 20em" />
              </div>
              <div style="text-align: left">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
              </div>
            </div>
          </template>
          <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.field"
            :key="col.field + '_' + index" :sortable="true">
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

getData()
populateSelectedColumns()
</script>