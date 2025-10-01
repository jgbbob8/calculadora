<script setup>
import { ref, watch, computed } from "vue";
import { datosReforma } from "@/data/costes.js"; // Asegúrate de que la ruta sea correcta
import { datosEstancia } from "@/data/estancias.js"; // Asumo que esta ruta también es correcta

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

// Nombres más legibles para las categorías
const nombresCategorias = {
  instalacionElectrica: "Instalación Eléctrica",
  carpinteria: "Carpintería y Ventanas",
  climatizacion: "Climatización y Ventilación",
  pintura: "Pintura y Acabados",
  revestimientos: "Revestimientos y Pavimentos",
  fontaneria: "Instalaciones de Agua",
  cocina: "Elementos de Cocina",
  bano: "Elementos de Baño",
};

// --- Datos para la lógica de sustitutos ---
// Aplanamos todos los elementos de datosReforma para facilitar la búsqueda
const todosLosElementos = computed(() => {
  const all = [];
  Object.values(datosReforma).forEach((categoria) => {
    all.push(...categoria);
  });
  return all;
});

// Obtener elementos de ESTA estancia organizados por categorías
const elementosEstanciaOrganizados = computed(() => {
  const elementosOrganizados = {};
  Object.entries(datosReforma).forEach(([nombreCategoria, categoria]) => {
    const elementosDeCategoria = categoria.filter((elemento) =>
      elemento.ubicaciones.includes(estancia.value)
    );
    if (elementosDeCategoria.length > 0) {
      elementosOrganizados[nombreCategoria] = elementosDeCategoria;
    }
  });
  return elementosOrganizados;
});

// Estado para elementos seleccionados y cantidades de ESTA estancia
const elementosSeleccionados = ref({});
const cantidades = ref({});
const elementosDeshabilitados = ref({}); // NUEVO: Para controlar qué elementos están deshabilitados

// Función para inicializar estados
const inicializarEstados = () => {
  // Reinicia los objetos completos para evitar problemas de reactividad con $set
  elementosSeleccionados.value = {};
  cantidades.value = {};
  elementosDeshabilitados.value = {};

  Object.values(elementosEstanciaOrganizados.value).forEach((categoria) => {
    categoria.forEach((elemento) => {
      elementosSeleccionados.value[elemento.concepto] = false;
      cantidades.value[elemento.concepto] = 1;
      elementosDeshabilitados.value[elemento.concepto] = false; // Inicialmente, ningún elemento está deshabilitado
    });
  });
};

// NUEVO: Método para manejar el cambio del checkbox y la lógica de sustitución
const manejarCambioSeleccion = (elementoActual) => {
  const isSelected = elementosSeleccionados.value[elementoActual.concepto];

  // 1. Manejar sustitutos del elemento actual
  if (elementoActual.sustitutivo && elementoActual.sustitutivo.length > 0) {
    elementoActual.sustitutivo.forEach((sustitutoConcepto) => {
      // Si el elemento actual es seleccionado, deshabilitar y deseleccionar sus sustitutos
      if (isSelected) {
        elementosDeshabilitados.value[sustitutoConcepto] = true;
        if (elementosSeleccionados.value[sustitutoConcepto]) {
          elementosSeleccionados.value[sustitutoConcepto] = false;
          cantidades.value[sustitutoConcepto] = 1; // Resetear cantidad
        }
      } else {
        // Si el elemento actual es deseleccionado, habilitar sus sustitutos
        elementosDeshabilitados.value[sustitutoConcepto] = false;
      }
    });
  }

  // 2. Manejar si el elemento actual es un sustituto de otros elementos
  // Itera sobre todos los elementos para ver si alguno tiene a 'elementoActual' como sustituto
  todosLosElementos.value.forEach((item) => {
    if (
      item.sustitutivo &&
      item.sustitutivo.includes(elementoActual.concepto)
    ) {
      // Si el elemento actual (que es un sustituto) es seleccionado, deshabilitar el elemento 'base'
      if (isSelected) {
        elementosDeshabilitados.value[item.concepto] = true;
        if (elementosSeleccionados.value[item.concepto]) {
          elementosSeleccionados.value[item.concepto] = false;
          cantidades.value[item.concepto] = 1; // Resetear cantidad
        }
      } else {
        // Si el elemento actual (sustituto) es deseleccionado, el elemento 'base'
        // debería habilitarse SOLO SI NINGUNO de sus otros sustitutos está seleccionado.
        // Esto evita que se habilite si otro sustituto sigue activo.

        // Obtenemos todos los elementos que son sustitutos del 'item'
        const otrosSustitutosActivos = item.sustitutivo.some(
          (otroSustitutoConcepto) =>
            otroSustitutoConcepto !== elementoActual.concepto &&
            elementosSeleccionados.value[otroSustitutoConcepto]
        );

        if (!otrosSustitutosActivos) {
          elementosDeshabilitados.value[item.concepto] = false;
        }
      }
    }
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
  Object.values(elementosEstanciaOrganizados.value).forEach((categoria) => {
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
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex flex-column align-left justify-space-between">
            <h2 class="text-subtitle-1 text-sm-h6">
              {{ nombre }}
            </h2>
          </div>
          <div class="w-fit text-left">
            <p class="whitespace-nowrap pl-2 pr-2 text-subtitle-1 text-sm-h6">
              TOTAL: {{ formatearEuros(totalPresupuesto) }}
            </p>
          </div>
        </div>
      </template>
      <div class="pt-2 pb-2 pl-4 pr-4" v-if="estancia_descripcion">
        <p class="text-grey">
          {{ estancia_descripcion }}
        </p>
      </div>
      <template v-slot:text>
        <div class="elementos-estancia pb-4">
          <p class="w-100 text-right text-grey mt-4 pr-9">
            Contenedor, demolición, subida/bajada materiales y limpieza final
            estancia
            <strong class="text-red">{{ formatearEuros(coste_base) }}</strong>
          </p>
          <div
            v-for="(elementos, nombreCategoria) in elementosEstanciaOrganizados"
            :key="nombreCategoria"
            class="categoria-section pt-4 pb-4"
          >
            <h6 class="text-orange text-uppercase text-subtitle-1">
              {{ nombresCategorias[nombreCategoria] || nombreCategoria }}
            </h6>

            <v-row class="mb-4 pl-sm-2 align-content-lg-center">
              <v-col
                cols="12"
                lg="4"
                sm="6"
                v-for="elemento in elementos"
                :key="elemento.concepto"
                class="d-flex ga-2"
              >
                <div class="elemento flex justify-space-between w-100">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      v-model="elementosSeleccionados[elemento.concepto]"
                      :disabled="elementosDeshabilitados[elemento.concepto]"
                      @change="manejarCambioSeleccion(elemento)"
                      class="checkbox-input"
                    />
                    <p class="elemento-nombre">
                      {{ elemento.concepto
                      }}<span class="text-orange opacity-80"> | </span
                      >{{ elemento.unidad }}
                    </p>
                  </label>
                </div>

                <div v-if="elementosSeleccionados[elemento.concepto]">
                  <!-- <v-text-field
                    variant="outlined"
                    type="number"
                    min="0"
                    single-line
                    v-model="cantidades[elemento.concepto]"
                  ></v-text-field> -->
                  <input
                    type="number"
                    min="0"
                    v-model="cantidades[elemento.concepto]"
                  />
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>
.elemento-nombre {
  min-height: 25px;
}

.v-expansion-panel-title {
  padding-inline: 1.25em !important;
  padding-block: 0.75em !important;
}

.v-expansion-panel-text__wrapper {
  padding: 0 1.25em !important;
}

button.v-expansion-panel-title.v-expansion-panel-title--active {
  background-color: rgb(var(--v-theme-surface)) !important;
}
</style>

<style scoped>
input[type="number"],
input[type="text"] {
  padding: 1px 0 0 4px;
  border-radius: 4px;
  width: 50px;
  height: 24px;
  border: solid 1px rgb(var(--v-border-color));
  line-height: 0;
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

/* Opcional: Estilo para checkboxes deshabilitados */
.checkbox-input:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Opcional: Estilo para el texto de elementos deshabilitados */
.checkbox-input:disabled + p.elemento-nombre {
  opacity: 0.6;
  color: #999;
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
</style>
