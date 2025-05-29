<script setup>
import { ref, watch, computed } from "vue";
import { datosReforma } from "@/data/costes.js";

const props = defineProps({
  nombre: String,
  visible: Boolean,
});

const superficie = ref("");
const showAlert = ref(false);

// Función para obtener elementos por ubicación organizados por categoría
const obtenerElementosPorUbicacionOrganizados = (ubicacion) => {
  const elementosOrganizados = {};

  Object.entries(datosReforma).forEach(([nombreCategoria, categoria]) => {
    const elementosDeCategoria = categoria.filter((elemento) =>
      elemento.ubicaciones.includes(ubicacion)
    );

    if (elementosDeCategoria.length > 0) {
      elementosOrganizados[nombreCategoria] = elementosDeCategoria;
    }
  });

  return elementosOrganizados;
};

// Nombres más legibles para las categorías
const nombresCategorias = {
  instalacionElectrica: "Instalación Eléctrica",
  carpinteria: "Carpintería y Ventanas",
  climatizacion: "Climatización y Ventilación",
  pintura: "Pintura y Acabados",
  revestimientos: "Revestimientos y Pavimentos",
  fontaneria: "Instalaciones de Agua",
  bano: "Elementos de Bano",
  baño: "Elementos de Baño",
};

// Obtener elementos del salón organizados por categorías
const elementosBanoOrganizados =
  obtenerElementosPorUbicacionOrganizados("bano");

// Estado para elementos seleccionados y cantidades
const elementosSeleccionados = ref({});
const cantidades = ref({});

// Inicializar estados
Object.values(elementosBanoOrganizados).forEach((categoria) => {
  categoria.forEach((elemento) => {
    elementosSeleccionados.value[elemento.concepto] = false;
    cantidades.value[elemento.concepto] = elemento.unidad.includes("m2")
      ? 0
      : 1;
  });
});

// Computed para calcular el total
const totalPresupuesto = computed(() => {
  let total = 0;
  Object.values(elementosBanoOrganizados).forEach((categoria) => {
    categoria.forEach((elemento) => {
      if (elementosSeleccionados.value[elemento.concepto]) {
        const cantidad =
          elemento.unidad.includes("m2") && superficie.value
            ? parseFloat(superficie.value)
            : cantidades.value[elemento.concepto];
        total += elemento.precio * cantidad;
      }
    });
  });
  return total;
});

// Watch para la superficie (para elementos que dependen de m2)
watch(superficie, (newVal) => {
  if (newVal) {
    Object.values(elementosBanoOrganizados).forEach((categoria) => {
      categoria.forEach((elemento) => {
        if (elemento.unidad.includes("m2")) {
          cantidades.value[elemento.concepto] = parseFloat(newVal) || 0;
        }
      });
    });
  }
});

watch(
  () => props.visible,
  (nuevoValor, viejoValor) => {
    if (viejoValor && !nuevoValor && superficie.value) {
      showAlert.value = true;
      superficie.value = "";
    }
  }
);

const closeAlert = () => {
  showAlert.value = false;
};
</script>

<template>
  <v-sheet
    v-if="visible"
    class="bg-surface-light pa-6 mb-6 ga-4 rounded mx-auto"
  >
    <h4 class="text-h5 font-weight-bold mb-4 text-center text-green-lighten-2">
      {{ nombre }}
    </h4>

    <div class="datos">
      <label>Superficie / m2</label>
      <input type="number" v-model="superficie" :id="`superficie-${nombre}`" />
    </div>

    <!-- Elementos del salón organizados por categorías -->
    <div class="elementos-bano mt-4">
      <h5 class="text-h6 mb-3">Elementos disponibles:</h5>

      <!-- Iteramos por cada categoría -->
      <div
        v-for="(elementos, nombreCategoria) in elementosBanoOrganizados"
        :key="nombreCategoria"
        class="categoria-section mb-4"
      >
        <!-- Título de la categoría -->
        <h6
          class="categoria-titulo text-subtitle-1 font-weight-bold mb-2 text-blue-darken-2"
        >
          {{ nombresCategorias[nombreCategoria] || nombreCategoria }}
        </h6>

        <!-- Elementos de la categoría -->
        <div class="categoria-elementos ml-3">
          <div
            v-for="elemento in elementos"
            :key="elemento.concepto"
            class="elemento-item mb-2 pa-3 bg-grey-lighten-5 rounded"
          >
            <div class="elemento-header">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="elementosSeleccionados[elemento.concepto]"
                  class="checkbox-input"
                />
                <span class="elemento-nombre">{{ elemento.concepto }}</span>
              </label>
              <span class="elemento-precio"
                >{{ elemento.precio }}{{ elemento.unidad }}</span
              >
            </div>

            <!-- Cantidad (solo si no depende de superficie) -->
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                !elemento.unidad.includes('m2')
              "
              class="cantidad-control mt-2"
            >
              <label>Cantidad:</label>
              <input
                type="number"
                v-model.number="cantidades[elemento.concepto]"
                min="1"
                class="cantidad-input"
              />
            </div>

            <!-- Mostrar superficie usada para elementos por m2 -->
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                elemento.unidad.includes('m2')
              "
              class="superficie-info mt-2"
            >
              <span class="text-caption"
                >Superficie: {{ superficie || 0 }} m²</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Total del presupuesto -->
    <div class="total-presupuesto mt-4 pa-3 bg-green-lighten-5 rounded">
      <h6 class="text-h6 font-weight-bold">
        Total presupuesto {{ nombre }}: {{ totalPresupuesto.toFixed(2) }}€
      </h6>
    </div>
  </v-sheet>
</template>

<style scoped>
.v-row {
  margin: 0;
}

.datos {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

input[type="number"],
input[type="text"] {
  color: #333;
  background-color: #999;
  padding: 3px 8px;
  border-radius: 5px;
  max-width: 150px;
  border: none;
}

.elementos-bano {
  max-height: 400px;
  overflow-y: auto;
}

.categoria-section {
  border-left: 3px solid #1976d2;
  padding-left: 12px;
  margin-bottom: 20px;
}

.categoria-titulo {
  color: #1976d2;
  border-bottom: 1px solid #e3f2fd;
  padding-bottom: 4px;
}

.categoria-elementos {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 8px;
}

.elemento-item {
  border: 1px solid #e0e0e0;
  background-color: white !important;
}

.elemento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.elemento-nombre {
  font-weight: 500;
  flex: 1;
}

.elemento-precio {
  color: #2e7d32;
  font-weight: bold;
}

.cantidad-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cantidad-input {
  max-width: 80px;
}

.superficie-info {
  color: #666;
  font-style: italic;
}

.total-presupuesto {
  text-align: center;
  border: 2px solid #4caf50;
}
</style>
