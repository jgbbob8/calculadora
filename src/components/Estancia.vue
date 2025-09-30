<script setup>
import { ref, watch, computed } from "vue";
import { datosReforma } from "@/data/costes.js";
import { datosEstancia } from "@/data/estancias.js";

// --- Props que el componente Estancia recibe del padre ---
const props = defineProps({
  clave: String, // Clave única de la estancia (ej: 'salon', 'dormitorio')
  nombre: String, // Nombre legible de la estancia (ej: 'Salón', 'Dormitorio')
  visible: Boolean, // Si la estancia está visible o no
});

// Función helper para formatear
const formatearEuros = (valor) => {
  return `${valor.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€`;
};

// --- Definición de eventos que este componente puede emitir ---
const emit = defineEmits(["update:totalEstancia"]);

// --- Estado local y computed properties de la estancia ---
const estancia = ref(props.clave);
const estancia_nombre = ref(props.nombre);

const estancia_descripcion = computed(() => {
  const estancia = datosEstancia.find((e) => e.estancia === props.clave);
  return estancia?.descricion || "";
});

const coste_base = computed(() => {
  const estancia = datosEstancia.find((e) => e.estancia === props.clave);
  return estancia?.costeBase || 0;
});

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
  cocina: "Elementos de Cocina",
  baño: "Elementos de Baño",
};

// Obtener elementos de ESTA estancia organizados por categorías
const elementosEstanciaOrganizados = obtenerElementosPorUbicacionOrganizados(
  estancia.value
);

// Estado para elementos seleccionados y cantidades de ESTA estancia
const elementosSeleccionados = ref({});
const cantidades = ref({});

// Función para inicializar estados
const inicializarEstados = () => {
  Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
    categoria.forEach((elemento) => {
      elementosSeleccionados.value[elemento.concepto] = false;
      cantidades.value[elemento.concepto] = 1;
    });
  });
};

// Función para resetear todos los valores
const resetearTodosLosValores = () => {
  inicializarEstados();
};

// Inicializar estados al montar el componente
inicializarEstados();

// Computed para calcular el total de ESTA estancia
const totalPresupuesto = computed(() => {
  let total = 0;
  Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
    categoria.forEach((elemento) => {
      if (elementosSeleccionados.value[elemento.concepto]) {
        const cantidad = cantidades.value[elemento.concepto];

        if (!isNaN(cantidad) && typeof elemento.precio === "number") {
          total += elemento.precio * cantidad;
        }
      }
    });
  });
  return total;
});

// Watch para enviar el total al padre
watch(
  totalPresupuesto,
  (newTotal) => {
    emit("update:totalEstancia", {
      id: props.clave,
      total: newTotal,
      coste_base: coste_base.value,
    });
  },
  { immediate: true }
);

// Watch simplificado para cuando la estancia se oculta
watch(
  () => props.visible,
  (nuevoValor, viejoValor) => {
    // Cuando la estancia se oculta, resetear todos los valores
    if (viejoValor && !nuevoValor) {
      resetearTodosLosValores();
    }
  }
);
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-if="visible"
      class="bg-surface-light mb-4 rounded mx-auto"
    >
      <template v-slot:title>
        <div
          class="d-flex flex-column align-center justify-space-between w-100"
        >
          <div class="d-flex align-center justify-space-between w-100">
            <h2 class="text-h6 text-sm-h6 text-grey">
              {{ nombre }}
            </h2>
            <p class="pl-4 pr-4 text-subtitle-1 text-grey">
              TOTAL: {{ formatearEuros(totalPresupuesto) }}
            </p>
          </div>
          <div class="w-100 text-left text-grey">
            <p>
              {{ estancia_descripcion }}
            </p>
          </div>
        </div>
      </template>
      <template v-slot:text>
        <div class="elementos-estancia pb-4">
          <div
            v-for="(elementos, nombreCategoria) in elementosEstanciaOrganizados"
            :key="nombreCategoria"
            class="categoria-section pt-4 pb-4"
          >
            <h6 class="text-orange text-uppercase text-subtitle-1 pb-2">
              {{ nombresCategorias[nombreCategoria] || nombreCategoria }}
            </h6>

            <v-row class="mb-4 align-content-lg-center">
              <v-col
                cols="12"
                lg="4"
                sm="6"
                v-for="elemento in elementos"
                :key="elemento.concepto"
              >
                <div class="flex justify-space-between items-center">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      v-model="elementosSeleccionados[elemento.concepto]"
                      class="checkbox-input"
                    />
                    <p class="elemento-nombre">
                      {{ elemento.concepto
                      }}<span class="text-orange opacity-80"> | </span
                      >{{ elemento.unidad }}
                    </p>
                  </label>
                </div>

                <!-- Input para cantidad (elementos que no son m2 ni m) -->
                <div
                  v-if="
                    elementosSeleccionados[elemento.concepto] &&
                    !elemento.unidad.includes('m2') &&
                    !elemento.unidad.includes('m')
                  "
                >
                  <v-text-field
                    density="compact"
                    label="Cantidad"
                    type="number"
                    min="0"
                    single-line
                    variant="outlined"
                    v-model="cantidades[elemento.concepto]"
                  ></v-text-field>
                </div>

                <!-- Input para superficie (elementos con m2) -->
                <div
                  v-if="
                    elementosSeleccionados[elemento.concepto] &&
                    elemento.unidad.includes('m2')
                  "
                >
                  <v-text-field
                    density="compact"
                    label="Superficie metros cuadrados"
                    variant="outlined"
                    type="number"
                    min="0"
                    single-line
                    v-model="cantidades[elemento.concepto]"
                  ></v-text-field>
                </div>

                <div
                  v-if="
                    elementosSeleccionados[elemento.concepto] &&
                    elemento.unidad.includes('m') &&
                    !elemento.unidad.includes('m2')
                  "
                >
                  <v-text-field
                    density="compact"
                    label="Longitud metros lineales"
                    variant="outlined"
                    type="number"
                    min="0"
                    single-line
                    placeholder="Longitud metros lineales"
                    v-model="cantidades[elemento.concepto]"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </div>
          <p class="w-100 text-right text-grey mt-4">
            Contenedor, demolición, subida/bajada materiales y limpieza final
            estancia
            <strong class="text-red">{{ formatearEuros(coste_base) }}</strong>
          </p>
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
.v-input__details {
  display: none !important;
}
.v-expansion-panel-title {
  padding-inline: 1em !important;
  padding-block: 0.75em !important;
}

.v-expansion-panel-text__wrapper {
  padding: 0px 24px !important;
}
</style>

<style scoped>
.v-input__details {
  display: none;
}

input[type="number"],
input[type="text"] {
  color: #333;
  background-color: #ccc;
  padding: 2px 5px;
  border-radius: 5px;
  /* border: none; */
}

.categoria-section {
  border-bottom: solid 1px #666;
}

.categoria-section:last-child {
  border-bottom: none;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  margin-top: 3px;
  cursor: pointer;
}

.cantidad-control,
.superficie-control,
.longitud-control {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-left: 24px;
}

.cantidad-input {
  max-width: 60px;
}
</style>
