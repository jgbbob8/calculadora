const datosReforma = {
  // Instalaciones eléctricas
  instalacionElectrica: [
    {
      concepto: "Enchufes",
      precio: 54,
      unidad: "€/ud",
      ubicaciones: ["salon", "cocina", "habitacion", "bano"],
    },
    {
      concepto: "Interruptores luz",
      precio: 54,
      unidad: "€/ud",
      ubicaciones: ["salon", "cocina", "habitacion", "bano"],
    },
    {
      concepto: "Ojito de buey LED 7W",
      precio: 45,
      unidad: "€/ud",
      ubicaciones: ["salon", "cocina", "habitacion"],
    },
  ],

  // Carpintería y ventanas
  carpinteria: [
    {
      concepto: "Incremento PRT en aluminio",
      precio: 200,
      unidad: "€/m2",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Motorizar persiana",
      precio: 180,
      unidad: "€/ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Puerta balconera aluminio/PVC 2 hojas corredera",
      precio: 1400,
      unidad: "€/ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Puerta de paso blanca",
      precio: 490,
      unidad: "€/ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Ventanas aluminio/PVC 140x120 más persiana tirador",
      precio: 850,
      unidad: "€/ud",
      ubicaciones: ["salon", "habitacion"],
    },
  ],

  // Climatización y ventilación
  climatizacion: [
    {
      concepto: "Ventilador con luz a techo",
      precio: 250,
      unidad: "€/ud",
      ubicaciones: ["salon", "habitacion"],
    },
  ],

  // Pintura y acabados
  pintura: [
    {
      concepto: "Pintura paredes",
      precio: 9,
      unidad: "€/m2",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Pintura techo",
      precio: 9,
      unidad: "€/m2",
      ubicaciones: ["salon", "habitacion", "cocina", "bano"],
    },
  ],

  // Revestimientos y pavimentos
  revestimientos: [
    {
      concepto: "Alicatado formato 120x60",
      precio: 80,
      unidad: "€/m2",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Laminado PVC",
      precio: 48,
      unidad: "€/m2",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Solado gres 90x90",
      precio: 80,
      unidad: "€/m2",
      ubicaciones: ["cocina", "bano"],
    },
  ],

  // Instalaciones de agua
  fontaneria: [
    {
      concepto: "Fontanería",
      precio: 235,
      unidad: "€/toma",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Saneamiento (desagües)",
      precio: 550,
      unidad: "€/ud",
      ubicaciones: ["cocina", "bano"],
    },
  ],

  // Elementos específicos de cocina
  cocina: [
    {
      concepto: "Bancada Compac Plomo 2cm",
      precio: 250,
      unidad: "€/ml",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Caceroleros",
      precio: 150,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Columnas",
      precio: 1000,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Cubertero",
      precio: 115,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Fregadero bajo encimera acero",
      precio: 350,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Frente bancada en Compac Plomo 2cm",
      precio: 250,
      unidad: "€/ml",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Grifo caño alto",
      precio: 120,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Grifo caño flexible muelle",
      precio: 225,
      unidad: "€/ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Metros lineales muebles de cocina (bajos o altos)",
      precio: 400,
      unidad: "€/ml",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Tiras LED (incluye parte proporcional de driver)",
      precio: 100,
      unidad: "€/ml",
      ubicaciones: ["cocina"],
    },
  ],

  // Elementos específicos de bano
  bano: [
    {
      concepto: "Bañera ROCA Contesa",
      precio: 400,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Conjunto de ducha IMEX Nassau",
      precio: 250,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería ducha empotrada",
      precio: 490,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX empotrada lavabo",
      precio: 250,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX Nassau lavabo",
      precio: 90,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX Nassau bidé",
      precio: 90,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifo bidé empotrado pared",
      precio: 250,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro gama básica (Roca Victoria)",
      precio: 300,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro gama media (Roca The Gap)",
      precio: 550,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro suspendido (Geberit / Roca)",
      precio: 800,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Plato de ducha 120x80x3 resina",
      precio: 490,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Plato de ducha 80x80x3 resina",
      precio: 380,
      unidad: "€/ud",
      ubicaciones: ["bano"],
    },
  ],
};

function obtenerElementosPorUbicacion(ubicacion) {
  const elementos = [];
  Object.values(datosReforma).forEach((categoria) => {
    categoria.forEach((elemento) => {
      if (elemento.ubicaciones.includes(ubicacion)) {
        elementos.push(elemento);
      }
    });
  });
  return elementos;
}

// Exportar
export { datosReforma, obtenerElementosPorUbicacion };
