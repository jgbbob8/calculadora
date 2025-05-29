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
const superficie = ref("");
const longitud = ref("");

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
      cantidades.value[elemento.concepto] =
        elemento.unidad.includes("m2") || elemento.unidad.includes("ml")
          ? 0
          : 1;
    });
  });
};

// Función para resetear todos los valores
const resetearTodosLosValores = () => {
  superficie.value = "";
  longitud.value = "";
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
        let cantidad;
        if (
          elemento.unidad.includes("m2") &&
          superficie.value !== null &&
          superficie.value !== ""
        ) {
          cantidad = parseFloat(superficie.value);
        } else if (
          elemento.unidad.includes("ml") &&
          longitud.value !== null &&
          longitud.value !== ""
        ) {
          cantidad = parseFloat(longitud.value);
        } else {
          cantidad = cantidades.value[elemento.concepto];
        }

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

// Watch para la superficie (para elementos que dependen de m2)
watch(superficie, (newVal) => {
  if (newVal) {
    Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
      categoria.forEach((elemento) => {
        if (elemento.unidad.includes("m2")) {
          cantidades.value[elemento.concepto] = parseFloat(newVal) || 0;
        }
      });
    });
  } else {
    Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
      categoria.forEach((elemento) => {
        if (elemento.unidad.includes("m2")) {
          cantidades.value[elemento.concepto] = 0;
        }
      });
    });
  }
});

// Watch para la longitud (para elementos que dependen de ml)
watch(longitud, (newVal) => {
  if (newVal) {
    Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
      categoria.forEach((elemento) => {
        if (elemento.unidad.includes("ml")) {
          cantidades.value[elemento.concepto] = parseFloat(newVal) || 0;
        }
      });
    });
  } else {
    Object.values(elementosEstanciaOrganizados).forEach((categoria) => {
      categoria.forEach((elemento) => {
        if (elemento.unidad.includes("ml")) {
          cantidades.value[elemento.concepto] = 0;
        }
      });
    });
  }
});

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

    <div class="flex">
      <div class="datos">
        <label>Superficie<span class="divisor"> | </span>m2</label>
        <input
          type="number"
          v-model="superficie"
          :id="`superficie-${nombre}`"
        />
      </div>
      <div class="datos">
        <label>Longitud<span class="divisor"> | </span>ml</label>
        <input type="number" v-model="longitud" :id="`longitud-${nombre}`" />
      </div>
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

            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                elemento.unidad.includes('m2')
              "
              class="superficie-info"
            >
              <span class="text-caption"
                >Superficie: {{ superficie || 0 }} m²</span
              >
            </div>
            <div
              v-if="
                elementosSeleccionados[elemento.concepto] &&
                elemento.unidad.includes('ml')
              "
              class="longitud-info"
            >
              <span class="text-caption">Longitud: {{ longitud || 0 }} ml</span>
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
  margin-bottom: 2em;
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
  margin: auto;
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

.flex {
  display: flex;
  flex-direction: row;
  column-gap: 2em;
  row-gap: 1em;
  flex-wrap: wrap;
}

.datos {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

input[type="number"],
input[type="text"] {
  color: #333;
  background-color: #ccc;
  padding: 3px 8px;
  border-radius: 5px;
  max-width: 150px;
  border: none;
}

.categoria-section {
  padding-block: 1em;
  border-bottom: 1px solid #ffffff13;
}
.categoria-section:last-child {
  border-bottom: none;
}

.categoria-titulo {
  /* background: linear-gradient(90deg, #f39200, #999, #2aa8e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
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

.elemento-precio {
  color: #2e7d32;
  font-weight: bold;
}

.cantidad-control {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-left: 24px;
}

.cantidad-input {
  max-width: 80px;
}

.superficie-info {
  color: #666;
  font-style: italic;
}

@media (width < 427px) {
  .categoria-elementos {
    grid-template-columns: repeat(auto-fill, minmax(244px, 1fr));
  }
  input[type="number"],
  input[type="text"] {
    max-width: 100%;
  }
  .datos {
    width: 100%;
  }
}
</style>
