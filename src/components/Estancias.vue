<script setup>
import { ref, computed } from "vue"; // Importa ref y computed
import Estancia from "./Estancia.vue";

// --- PROPS DEL PADRE (EXISTENTES) ---
defineProps({
  state: Object, // Propiedad que controla la visibilidad de las estancias
});

// --- VARIABLES GLOBALES NECESARIAS PARA LOS CÁLCULOS DE LOS HIJOS ---
// **IMPORTANTE**: Asegúrate de que estas variables estén definidas en el SCOPE
// de este componente padre y que sean REACTIVAS (usando ref o reactive).
// Si vienen de un store (Pinia/Vuex), adáptalas en consecuencia.

// Ejemplo de cómo podrían estar definidas (ADAPTA ESTO A TU CÓDIGO REAL)
// Estas son las "fuentes de la verdad" para todos los cálculos.
const elementosEstanciaOrganizados = ref({
  /* ... tu estructura de datos completa aquí ... */
});
const elementosSeleccionados = ref({
  /* ... tu objeto de selecciones aquí ... */
});
const superficie = ref(0); // Valor global de superficie para m2
const longitud = ref(0); // Valor global de longitud para ml
const cantidades = ref({
  /* ... tus cantidades por defecto aquí ... */
});

// --- ESTADO PARA ALMACENAR LOS TOTALES INDIVIDUALES DE CADA ESTANCIA ---
// Este objeto guardará el total de cada estancia, identificado por su 'clave'.
// Por ejemplo: { 'salon': 1200, 'cocina': 800, 'bano_1': 300, ... }
const totalesEstancias = ref({});

// --- FUNCIÓN PARA MANEJAR EL EVENTO 'update:totalEstancia' ---
// Esta función se ejecutará cada vez que un componente Estancia hijo emita su total.
// Recibe un objeto con { id: 'clave_estancia', total: valor_total }.
const handleUpdateTotalEstancia = ({ id, total }) => {
  totalesEstancias.value[id] = total; // Almacena el total recibido en nuestro objeto
  // console.log(`[Padre] Total actualizado para ${id}: ${total}`); // Para depuración
  // console.log('[Padre] Totales acumulados:', totalesEstancias.value); // Para depuración
};

// --- COMPUTED PROPERTY PARA EL TOTAL GLOBAL DEL PRESUPUESTO ---
// Suma todos los valores almacenados en 'totalesEstancias'.
const totalGlobalPresupuesto = computed(() => {
  let granTotal = 0;
  // Itera sobre los valores del objeto reactivo totalesEstancias.value
  for (const id in totalesEstancias.value) {
    granTotal += totalesEstancias.value[id];
  }
  return granTotal;
});

// --- FUNCIÓN DE FORMATO DE MONEDA (reutilizable) ---
// Puedes mover esta función a un archivo de utilidades si la usas en muchos lugares.
const formatoMoneda = (valor) => {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
};
</script>

<template>
  <div class="total-presupuesto">
    <p>TOTAL GLOBAL: {{ formatoMoneda(totalGlobalPresupuesto) }}€</p>
  </div>

  <Estancia
    :clave="`salon`"
    :nombre="`Comedor / Salón`"
    :visible="state.comedor"
    :elementosEstancia="elementosEstanciaOrganizados.salon"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    :clave="`cocina`"
    :nombre="`Cocina`"
    :visible="state.cocina"
    :elementosEstancia="elementosEstanciaOrganizados.cocina"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    v-for="n in 3"
    :clave="`bano`"
    :nombre="`Baño ${n}`"
    :visible="state.bano >= n"
    :elementosEstancia="elementosEstanciaOrganizados.bano"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
  <Estancia
    v-for="n in 5"
    :clave="`habitacion`"
    :nombre="`Habitación ${n}`"
    :visible="state.habit >= n"
    :elementosEstancia="elementosEstanciaOrganizados.habitacion"
    :elementosSeleccionados="elementosSeleccionados"
    :superficie="superficie.value"
    :longitud="longitud.value"
    :cantidades="cantidades"
    @update:totalEstancia="handleUpdateTotalEstancia"
  />
</template>

<style scoped>
/* Añade algunos estilos si quieres */
.total-presupuesto {
  font-size: clamp(1.1rem, 0.612vw + 0.978rem, 1.5rem);
  text-align: right;
  margin: 1em 2em;
  opacity: 0.5;
}
</style>
