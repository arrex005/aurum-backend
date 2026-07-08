const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.articulo.createMany({
    data: [
      {
        titulo: '¿Por qué el oro sube en tiempos de crisis?',
        resumen: 'Analizamos el comportamiento histórico del oro durante las principales crisis económicas y geopolíticas de los últimos 50 años.',
        contenido: 'El oro ha sido considerado durante siglos como el activo refugio por excelencia. En momentos de incertidumbre económica, política o social, los inversores tienden a mover su capital hacia activos seguros, y el oro encabeza esa lista.\n\nDurante la crisis financiera de 2008, el precio del oro pasó de aproximadamente 800 dólares por onza a superar los 1.900 dólares en 2011. Una revalorización de más del 130% en apenas tres años.\n\nLa pandemia de COVID-19 en 2020 fue otro ejemplo claro. Mientras los mercados de renta variable caían en picado en marzo de 2020, el oro alcanzó máximos históricos superando los 2.000 dólares por onza por primera vez en la historia.\n\nLos factores que impulsan el precio del oro en tiempos de crisis son múltiples: la huida hacia la seguridad, la caída de los tipos de interés reales, la debilidad del dólar y el aumento de la demanda de los bancos centrales.\n\nEn conclusión, el oro no solo conserva su valor en tiempos de crisis, sino que históricamente ha demostrado revalorizarse significativamente, convirtiéndose en una herramienta fundamental de diversificación de cartera.',
        categoria: 'Análisis',
        imagen: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'Oro vs Plata: ¿En qué metal deberías invertir?',
        resumen: 'Comparamos las características, ventajas e inconvenientes de invertir en oro y plata.',
        contenido: 'La eterna pregunta entre los inversores en metales preciosos: ¿oro o plata? Ambos metales tienen sus ventajas e inconvenientes, y la respuesta depende en gran medida del perfil del inversor.\n\nEl oro es el metal refugio por excelencia. Su precio es más estable, está exento de IVA en España y es el preferido por los grandes inversores institucionales y los bancos centrales. Sin embargo, su precio elevado puede ser una barrera de entrada para pequeños inversores.\n\nLa plata, por otro lado, es más accesible en precio pero tributa al 21% de IVA en España, lo que encarece significativamente la inversión. Su precio es más volátil que el del oro, lo que puede suponer tanto una oportunidad como un riesgo.\n\nEl ratio oro/plata, que mide cuántas onzas de plata se necesitan para comprar una onza de oro, es una herramienta muy útil para decidir en qué metal invertir en cada momento.\n\nNuestra recomendación: si buscas estabilidad y seguridad, el oro es tu metal. Si buscas mayor potencial de revalorización y puedes asumir más volatilidad, la plata puede ser una opción interesante como complemento.',
        categoria: 'Guías',
        imagen: 'https://images.unsplash.com/photo-1637073849667-9b4519721f27?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'Cómo almacenar tus metales preciosos de forma segura',
        resumen: 'Desde cajas de seguridad hasta almacenamiento profesional, te explicamos todas las opciones disponibles.',
        contenido: 'Una vez que has tomado la decisión de invertir en metales preciosos, surge una pregunta fundamental: ¿dónde y cómo los guardo de forma segura?\n\nExisten varias opciones, cada una con sus ventajas e inconvenientes.\n\nEn casa: La opción más accesible pero también la más arriesgada. Si decides guardar tus metales en casa, es imprescindible contar con una caja fuerte de calidad anclada a la pared o al suelo. Nunca comentescon nadie que tienes metales en casa.\n\nCaja de seguridad bancaria: Una opción más segura que el almacenamiento doméstico. El banco te alquila un compartimento en su cámara acorazada. El coste anual suele ser moderado y la seguridad es alta.\n\nAlmacenamiento profesional: Empresas especializadas ofrecen bóvedas de máxima seguridad con seguros incluidos. Es la opción preferida por grandes inversores y tiene la ventaja de que los metales están asegurados por su valor total.\n\nAlmacenamiento en el extranjero: Suiza es el destino preferido por muchos inversores para almacenar metales preciosos fuera de su país de residencia.',
        categoria: 'Consejos',
        imagen: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'El ratio oro/plata: qué es y cómo usarlo para invertir',
        resumen: 'El ratio oro/plata es una de las métricas más utilizadas por los inversores en metales preciosos.',
        contenido: 'El ratio oro/plata es simplemente el número de onzas de plata que se necesitan para comprar una onza de oro. Si el oro cotiza a 3.000 euros y la plata a 30 euros, el ratio es de 100.\n\nHistóricamente, este ratio ha oscilado entre 15 y 100. En la antigüedad, cuando el ratio era fijado por los gobiernos, se situaba en torno a 15. En la actualidad, el ratio promedio histórico está alrededor de 60.\n\nCómo usar el ratio para invertir: Cuando el ratio es alto (por encima de 80), significa que la plata está barata en relación al oro, por lo que podría ser un buen momento para comprar plata. Cuando el ratio es bajo (por debajo de 40), la plata está cara en relación al oro.\n\nEs importante recordar que el ratio es solo una herramienta más y no debe usarse de forma aislada. Las condiciones del mercado, la situación económica global y otros factores también deben tenerse en cuenta.',
        categoria: 'Análisis',
        imagen: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'IVA en metales preciosos: guía completa para España',
        resumen: 'Todo lo que necesitas saber sobre la fiscalidad de los metales preciosos en España.',
        contenido: 'La fiscalidad de los metales preciosos en España es un tema que genera mucha confusión entre los inversores. Vamos a aclararlo de forma sencilla.\n\nOro de inversión: El oro en forma de lingotes o monedas con una pureza mínima del 995‰ está exento de IVA en España y en toda la Unión Europea. Esto lo convierte en uno de los activos de inversión más eficientes desde el punto de vista fiscal.\n\nPlata: La plata física tributa al 21% de IVA en España. Esto significa que si compras un lingote de plata por 100 euros, pagarás 21 euros adicionales en concepto de IVA, lo que eleva el coste total a 121 euros.\n\nPlatino y Paladio: Al igual que la plata, el platino y el paladio tributan al 21% de IVA en España.\n\nGanancias patrimoniales: Las ganancias obtenidas por la venta de metales preciosos se consideran ganancias patrimoniales y deben declararse en el IRPF. El tipo impositivo varía entre el 19% y el 28% dependiendo del importe de la ganancia.',
        categoria: 'Fiscal',
        imagen: 'https://images.unsplash.com/photo-1589787168842-04f6a0534c41?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'Las 10 monedas de oro más populares para invertir',
        resumen: 'Krugerrand, Maple Leaf, American Eagle... Analizamos las monedas de oro más demandadas.',
        contenido: 'Las monedas de oro son una de las formas más populares de invertir en oro físico. Son fáciles de almacenar, transportar y vender, y tienen un alto grado de reconocimiento internacional.\n\n1. Krugerrand (Sudáfrica): La moneda de oro de inversión más vendida del mundo. Acuñada desde 1967, contiene exactamente 1 onza troy de oro con una pureza del 91,67%.\n\n2. Maple Leaf (Canadá): Considerada una de las monedas más puras del mercado, con una pureza del 99,99%. Es muy apreciada por su calidad de acabado.\n\n3. American Eagle (EE.UU.): La moneda oficial de oro de los Estados Unidos. Contiene 1 onza de oro con una pureza del 91,67%.\n\n4. Filarmónica de Viena (Austria): La moneda de oro más vendida de Europa. Tiene una pureza del 99,99% y está denominada en euros.\n\n5. Nugget/Canguro (Australia): Acuñada por la Casa de la Moneda de Perth, cambia su diseño cada año, lo que la hace especialmente atractiva para los coleccionistas.\n\nTodas estas monedas tienen una prima sobre el precio spot del oro, pero su alta liquidez y reconocimiento internacional las convierten en una excelente opción de inversión.',
        categoria: 'Guías',
        imagen: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800',
        autor: 'Equipo Aurum',
      },
    ]
  })

  await prisma.testimonio.createMany({
    data: [
      { nombre: 'Carlos M.', ciudad: 'Madrid', texto: 'Llevo 3 años invirtiendo en oro a través de Aurum y la experiencia ha sido excelente. Precios transparentes, envío rápido y el equipo siempre disponible para resolver dudas.', estrellas: 5, producto: 'Lingote de oro 100g' },
      { nombre: 'Laura P.', ciudad: 'Barcelona', texto: 'Compré mis primeras monedas Maple Leaf aquí y quedé encantada. El proceso fue muy sencillo y llegaron perfectamente embaladas con su certificado de autenticidad.', estrellas: 5, producto: 'Moneda Maple Leaf 1oz' },
      { nombre: 'Antonio R.', ciudad: 'Valencia', texto: 'La calculadora de rentabilidad me convenció para dar el paso. Ver cómo habría crecido mi inversión en los últimos años fue muy esclarecedor. Muy recomendable.', estrellas: 5, producto: 'Lingote de plata 1kg' },
      { nombre: 'María S.', ciudad: 'Sevilla', texto: 'Excelente atención al cliente. Tenía muchas dudas sobre el IVA de la plata y me lo explicaron todo con mucha claridad. Sin duda volveré a comprar.', estrellas: 5, producto: 'Lingote de plata 500g' },
      { nombre: 'Roberto K.', ciudad: 'Bilbao', texto: 'Los precios en tiempo real del header son muy útiles para decidir cuándo comprar. La web es muy profesional y da mucha confianza. Totalmente recomendado.', estrellas: 5, producto: 'Lingote de oro 1oz' },
      { nombre: 'Isabel G.', ciudad: 'Zaragoza', texto: 'Primera vez que invierto en metales preciosos y Aurum me lo puso muy fácil. La sección de FAQ resolvió todas mis dudas antes de comprar.', estrellas: 5, producto: 'Moneda Krugerrand 1oz' },
    ]
  })

  await prisma.fAQ.createMany({
    data: [
      { pregunta: '¿Qué es el oro de inversión?', respuesta: 'El oro de inversión es oro en forma de lingotes o monedas con una pureza mínima del 995‰. En España está exento de IVA, lo que lo hace especialmente atractivo como activo de inversión.', orden: 1 },
      { pregunta: '¿Cómo se determina el precio del oro?', respuesta: 'El precio del oro se fija en los mercados internacionales, principalmente en Londres y Nueva York. Se expresa en dólares por onza troy y fluctúa según la oferta, la demanda, la inflación y la situación geopolítica mundial.', orden: 2 },
      { pregunta: '¿Qué diferencia hay entre un lingote y una moneda?', respuesta: 'Los lingotes son barras de metal puro producidas por refinerías certificadas. Las monedas son acuñadas por cecas oficiales de gobiernos y suelen tener un valor nominal legal.', orden: 3 },
      { pregunta: '¿Tiene IVA la compra de plata?', respuesta: 'Sí, la plata física tributa al 21% de IVA en España, a diferencia del oro de inversión que está exento.', orden: 4 },
      { pregunta: '¿Cómo se envían los productos?', respuesta: 'Todos los envíos se realizan de forma discreta y completamente asegurada por el valor total del contenido. Se entregan con seguimiento en tiempo real y requieren firma en el momento de la entrega.', orden: 5 },
      { pregunta: '¿Puedo vender mis metales de vuelta?', respuesta: 'Sí, recompramos cualquier producto adquirido con nosotros al precio de mercado en el momento de la venta.', orden: 6 },
      { pregunta: '¿Qué pureza tienen los productos?', respuesta: 'Nuestros lingotes de oro tienen una pureza de 999,9‰. Las monedas de oro varían entre 916,7‰ y 999,9‰. Los lingotes de plata tienen una pureza de 999‰ y los de platino de 999,5‰.', orden: 7 },
      { pregunta: '¿Es seguro invertir en metales preciosos?', respuesta: 'Los metales preciosos son considerados uno de los activos más seguros a largo plazo. Sin embargo, como cualquier inversión, su precio puede fluctuar a corto plazo.', orden: 8 },
    ]
  })

  console.log('Contenido poblado correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())