const datosReforma = {
  // Elementos específicos de cocina
  cocina: [
    {
      concepto: "Bancada Compac Plomo 2cm",
      precio: 250,
      unidad: "m",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Caceroleros",
      precio: 150,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Columnas",
      precio: 1000,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Cubertero",
      precio: 115,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Fregadero bajo encimera acero",
      precio: 350,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Frente bancada en Compac Plomo 2cm",
      precio: 250,
      unidad: "m",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Grifo caño alto",
      precio: 120,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Grifo caño flexible muelle",
      precio: 225,
      unidad: "Ud",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Muebles de cocina (bajos o altos)",
      precio: 400,
      unidad: "m",
      ubicaciones: ["cocina"],
    },
    {
      concepto: "Tiras LED (incluye parte proporcional de driver)",
      precio: 100,
      unidad: "m",
      ubicaciones: ["cocina"],
    },
  ],

  // Elementos específicos de bano
  bano: [
    {
      concepto: "Bañera ROCA Contesa",
      precio: 400,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Conjunto de ducha IMEX Nassau",
      precio: 250,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería ducha empotrada",
      precio: 490,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX empotrada lavabo",
      precio: 250,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX Nassau lavabo",
      precio: 90,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifería IMEX Nassau bidé",
      precio: 90,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Grifo bidé empotrado pared",
      precio: 250,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro gama básica (Roca Victoria)",
      precio: 300,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro gama media (Roca The Gap)",
      precio: 550,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Inodoro suspendido (Geberit / Roca)",
      precio: 800,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Plato de ducha 120x80x3 resina",
      precio: 490,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
    {
      concepto: "Plato de ducha 80x80x3 resina",
      precio: 380,
      unidad: "Ud",
      ubicaciones: ["bano"],
    },
  ],

  // Pintura y acabados
  pintura: [
    {
      concepto: "Pintura paredes",
      precio: 9,
      unidad: "m2",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Pintura techo",
      precio: 9,
      unidad: "m2",
      ubicaciones: ["salon", "habitacion", "cocina", "bano"],
    },
  ],

  // Revestimientos y pavimentos
  revestimientos: [
    {
      concepto: "Alicatado formato 120x60",
      precio: 80,
      unidad: "m2",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Laminado PVC",
      precio: 48,
      unidad: "m2",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Solado gres 90x90",
      precio: 80,
      unidad: "m2",
      ubicaciones: ["cocina", "bano"],
    },
  ],

  // Instalaciones de agua
  fontaneria: [
    {
      concepto: "Fontanería",
      precio: 235,
      unidad: "toma",
      ubicaciones: ["cocina", "bano"],
    },
    {
      concepto: "Saneamiento (desagües)",
      precio: 550,
      unidad: "Ud",
      ubicaciones: ["cocina", "bano"],
    },
  ],
  // Instalaciones eléctricas
  instalacionElectrica: [
    {
      concepto: "Enchufes",
      precio: 54,
      unidad: "Ud",
      ubicaciones: ["salon", "cocina", "habitacion", "bano"],
    },
    {
      concepto: "Interruptores luz",
      precio: 54,
      unidad: "Ud",
      ubicaciones: ["salon", "cocina", "habitacion", "bano"],
    },
    {
      concepto: "Ojito de buey LED 7W",
      precio: 45,
      unidad: "Ud",
      ubicaciones: ["salon", "cocina", "habitacion"],
    },
  ],

  // Carpintería y ventanas
  carpinteria: [
    {
      concepto: "Incremento PRT en aluminio",
      precio: 200,
      unidad: "m2",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Motorizar persiana",
      precio: 180,
      unidad: "Ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Puerta balconera aluminio/PVC 2 hojas corredera",
      precio: 1400,
      unidad: "Ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Puerta de paso blanca",
      precio: 490,
      unidad: "Ud",
      ubicaciones: ["salon", "habitacion"],
    },
    {
      concepto: "Ventanas aluminio/PVC 140x120 más persiana tirador",
      precio: 850,
      unidad: "Ud",
      ubicaciones: ["salon", "habitacion"],
    },
  ],

  // Climatización y ventilación
  climatizacion: [
    {
      concepto: "Ventilador con luz a techo",
      precio: 250,
      unidad: "Ud",
      ubicaciones: ["salon", "habitacion"],
    },
  ],
};

function obtenerElementosPorUbicacion(ubicacion) {
  const elementos = [];
  Object.values(datosReforma).forEach((categoria) => {
    categoria.forEach((elemento) => {
      if (elemento.ubicaciones.inclUdes(ubicacion)) {
        elementos.push(elemento);
      }
    });
  });
  return elementos;
}

// Exportar
export { datosReforma, obtenerElementosPorUbicacion };
