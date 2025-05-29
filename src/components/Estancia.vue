<script setup>
import { ref, watch, computed } from "vue";
import { datosReforma } from "@/data/costes.js";

// --- Props que el componente Estancia recibe del padre ---
const props = defineProps({
  clave: String, // Clave única de la estancia (ej: 'salon', 'dormitorio')
  nombre: String, // Nombre legible de la estancia (ej: 'Salón', 'Dormitorio')
  visible: Boolean, // Si la estancia está visible o no
});

// --- Definición de eventos que este componente puede emitir ---
const emit = defineEmits(["update:totalEstancia"]);

// --- Estado local y computed properties de la estancia ---
const estancia = ref(props.clave);
const estancia_nombre = ref(props.nombre);

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
    emit("update:totalEstancia", { id: props.clave, total: newTotal });
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

const formatoMoneda = (valor) => {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
};
</script>

<template>
  <v-sheet
    v-if="visible"
    class="bg-surface-light pa-6 mb-6 ga-4 rounded mx-auto"
  >
    <div class="titular">
      <span class="titulo">{{ nombre }}</span>
      <span class="total-presupuesto">
        Total: {{ formatoMoneda(totalPresupuesto) }}€
      </span>
    </div>

    <div class="elementos-estancia mt-4">
      <div
        v-for="(elementos, nombreCategoria) in elementosEstanciaOrganizados"
        :key="nombreCategoria"
        class="categoria-section"
      >
        <h6 class="categoria-titulo">
          {{ nombresCategorias[nombreCategoria] || nombreCategoria }}
        </h6>

        <div class="categoria-elementos">
          <div
            v-for="elemento in elementos"
            :key="elemento.concepto"
            class="elemento-item"
          >
            <div class="elemento-header">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="elementosSeleccionados[elemento.concepto]"
                  class="checkbox-input"
                />
                <p class="elemento-nombre">
                  {{ elemento.concepto }}<span class="divisor"> | </span
                  >{{ elemento.unidad }}
                </p>
              </label>
            </div>

            <!-- Input para cantidad (elementos que no son m2 ni ml) -->
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                !elemento.unidad.includes('m2') &&
                !elemento.unidad.includes('ml')
              "
              class="cantidad-control"
            >
              <label>Cantidad:</label>
              <input
                type="number"
                v-model.number="cantidades[elemento.concepto]"
                min="1"
                class="cantidad-input"
              />
            </div>

            <!-- Input para superficie (elementos con m2) -->
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                elemento.unidad.includes('m2')
              "
              class="superficie-control"
            >
              <label>Superficie (m²):</label>
              <input
                type="number"
                v-model.number="cantidades[elemento.concepto]"
                min="0"
                step="0.01"
                class="cantidad-input"
                :placeholder="'Introduce m²'"
              />
            </div>

            <!-- Input para longitud (elementos con ml) -->
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                elemento.unidad.includes('ml')
              "
              class="longitud-control"
            >
              <label>Longitud (ml):</label>
              <input
                type="number"
                v-model.number="cantidades[elemento.concepto]"
                min="0"
                step="0.01"
                class="cantidad-input"
                :placeholder="'Introduce ml'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-sheet>
</template>
<style scoped>
.titular {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 1em;
}

.titulo {
  text-transform: uppercase;
  font-size: clamp(1rem, 2.294vw + 0.541rem, 2.5rem);
  font-weight: bold;
  color: #2aa8e0;
  /* background: linear-gradient(90deg, #f39200, #999, #2aa8e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  /* margin: auto; */
}

span.total-presupuesto {
  padding: 0.25em clamp(1rem, 1.53vw + 0.694rem, 2rem);
  background: #ffffff20;
  border-radius: 5px;
}
.total-presupuesto {
  font-size: clamp(1.1rem, 0.612vw + 0.978rem, 1.5rem);
  margin-left: auto;
}

.v-row {
  margin: 0;
}

input[type="number"],
input[type="text"] {
  color: #333;
  background-color: #ccc;
  padding: 3px 8px;
  border-radius: 5px;

  border: none;
}

.categoria-section {
  padding-block: 1em;
  border-bottom: 1px solid #ffffff20;
}
.categoria-section:last-child {
  border-bottom: none;
}

.categoria-titulo {
  color: #f39200;
  padding-bottom: 4px;
  text-transform: uppercase;
  font-size: 1em;
  margin-bottom: 0.75em;
}

.categoria-elementos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 2em;
}

.elemento-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.divisor {
  color: #f39200;
  opacity: 0.75;
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

.superficie-info {
  color: #ccc;
  font-style: italic;
  margin-left: 24px;
}

@media (width < 400px) {
  .categoria-elementos {
    grid-template-columns: repeat(auto-fill, minmax(244px, 1fr));
  }
}
</style>
