const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Borramos los artículos actuales
  await prisma.articulo.deleteMany()

  await prisma.articulo.createMany({
    data: [
      {
        titulo: 'El oro en las civilizaciones antiguas',
        resumen: 'Desde el Antiguo Egipto hasta Mesopotamia, descubre cómo el oro se convirtió en el metal más codiciado de la historia.',
        contenido: 'El oro ha fascinado a la humanidad desde hace más de 6.000 años. Las primeras civilizaciones que trabajaron el oro fueron las de Mesopotamia y Egipto, donde este metal precioso estaba reservado para faraones, reyes y dioses.\n\nEn el Antiguo Egipto, el oro se consideraba la carne de los dioses y la piel del sol. Los faraones eran enterrados con máscaras y objetos de oro, como demuestra el famoso tesoro de Tutankamón, descubierto en 1922. Para los egipcios, el oro simbolizaba la vida eterna y el poder divino.\n\nEn Mesopotamia, los sumerios y babilonios usaban el oro como símbolo de estatus y para el comercio. Ya en el año 2600 a.C. existían joyas de oro de una sofisticación asombrosa.\n\nLos griegos y romanos también valoraban enormemente el oro. Fue precisamente en la antigua Lidia, en el siglo VII a.C., donde se acuñaron las primeras monedas de oro y plata de la historia, revolucionando para siempre el comercio mundial.\n\nEste metal no solo era bello e inalterable, sino que su escasez lo convertía en el vehículo perfecto para almacenar y transmitir riqueza, una función que sigue cumpliendo hasta nuestros días.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'El patrón oro y el sistema monetario',
        resumen: 'Cómo el oro respaldó las monedas del mundo durante siglos y por qué se abandonó el patrón oro en 1971.',
        contenido: 'Durante gran parte de la historia moderna, el valor del dinero estuvo directamente ligado al oro a través del llamado patrón oro.\n\nBajo este sistema, cada billete emitido por un país estaba respaldado por una cantidad equivalente de oro almacenado en las reservas nacionales. Esto significaba que, en teoría, cualquier persona podía cambiar sus billetes por oro físico en el banco central.\n\nEl patrón oro se consolidó en el siglo XIX, con el Reino Unido a la cabeza, y proporcionó estabilidad a los precios y confianza al comercio internacional durante décadas.\n\nSin embargo, el sistema tenía limitaciones. Durante las guerras mundiales y la Gran Depresión, muchos países suspendieron el patrón oro para poder imprimir más dinero y financiar sus gastos.\n\nEl momento decisivo llegó en 1971, cuando el presidente estadounidense Richard Nixon suspendió la convertibilidad del dólar en oro, poniendo fin definitivamente al patrón oro. Desde entonces, vivimos en un sistema de dinero fiduciario, cuyo valor no está respaldado por ningún metal, sino por la confianza en los gobiernos que lo emiten.\n\nEsta es una de las razones por las que muchos inversores siguen considerando el oro como un refugio de valor: a diferencia del dinero fiduciario, no se puede imprimir ni devaluar arbitrariamente.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'La fiebre del oro: California y el Klondike',
        resumen: 'Las grandes fiebres del oro del siglo XIX que cambiaron la historia de América y movilizaron a millones de personas.',
        contenido: 'Pocas cosas han despertado tanta pasión y aventura como las fiebres del oro del siglo XIX.\n\nLa más famosa comenzó en 1848, cuando se descubrió oro en Sutter\'s Mill, California. La noticia se extendió como la pólvora y desató la llamada fiebre del oro de California. En apenas unos años, más de 300.000 personas llegaron desde todos los rincones del mundo buscando fortuna. San Francisco pasó de ser un pequeño asentamiento a una ciudad bulliciosa.\n\nLos buscadores, conocidos como los forty-niners (por el año 1849), soportaron condiciones durísimas. Aunque pocos se hicieron ricos, la fiebre del oro transformó California y aceleró su incorporación como estado de Estados Unidos.\n\nDécadas después, en 1896, se descubrió oro en la región del Klondike, en Canadá, cerca de la frontera con Alaska. Esto desató otra fiebre del oro que atrajo a unos 100.000 aventureros, quienes tuvieron que atravesar montañas heladas y ríos peligrosos para llegar a los yacimientos.\n\nEstas fiebres del oro no solo movilizaron a millones de personas, sino que impulsaron el desarrollo de ferrocarriles, ciudades y economías enteras. También dejaron un legado cultural inmenso, presente en la literatura, el cine y el imaginario colectivo sobre la búsqueda de fortuna.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1589787168842-04f6a0534c41?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'La plata a lo largo de la historia',
        resumen: 'El papel de la plata como moneda y símbolo de riqueza desde la antigüedad hasta la era moderna.',
        contenido: 'Aunque el oro suele llevarse toda la atención, la plata ha jugado un papel igualmente fundamental en la historia de la humanidad.\n\nLa plata se ha utilizado como moneda durante más de 4.000 años. De hecho, en muchas culturas fue incluso más importante que el oro para el comercio cotidiano, ya que su menor valor la hacía más práctica para transacciones pequeñas.\n\nEl Imperio Romano dependía enormemente de la plata. El denario, una moneda de plata, fue la base del sistema monetario romano durante siglos. La palabra española dinero deriva precisamente de denario.\n\nDurante la época del Imperio Español, las minas de plata de Potosí, en la actual Bolivia, y las de México, produjeron cantidades colosales de plata que inundaron los mercados mundiales. Esta plata financió imperios y transformó la economía global, conectando por primera vez a Europa, América y Asia en una red comercial.\n\nLa plata también tiene la particularidad de ser un metal industrial además de precioso. Hoy en día se utiliza en electrónica, paneles solares, medicina y multitud de aplicaciones tecnológicas, lo que le da una demanda dual única entre los metales preciosos.\n\nPor eso, invertir en plata es apostar tanto por un metal refugio como por un material esencial para la industria del futuro.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1637073849667-9b4519721f27?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'El platino, el metal de los reyes',
        resumen: 'La fascinante historia del platino, desde su descubrimiento hasta convertirse en uno de los metales más valiosos.',
        contenido: 'El platino es uno de los metales preciosos más fascinantes y, curiosamente, uno de los últimos en ser valorados por la humanidad.\n\nAunque los pueblos precolombinos de América del Sur ya trabajaban el platino, los europeos no lo conocieron hasta el siglo XVI. Los conquistadores españoles lo encontraron en las minas de Colombia y, al principio, lo consideraron una molestia. Lo llamaron platina, que significa plata pequeña o plata de menor valor, porque se parecía a la plata pero era más difícil de fundir.\n\nDurante mucho tiempo, el platino fue despreciado. Incluso se llegó a tirar al río porque no sabían qué hacer con él. Sin embargo, con el avance de la ciencia y la tecnología, se descubrieron sus extraordinarias propiedades: es extremadamente resistente a la corrosión, tiene un punto de fusión altísimo y es muy denso.\n\nEn el siglo XIX, el platino comenzó a ser apreciado por la realeza europea. Su rareza, mucho mayor que la del oro, lo convirtió en un símbolo de exclusividad. De hecho, se estima que todo el platino extraído en la historia cabría en una habitación pequeña.\n\nHoy, el platino es esencial en la industria, especialmente en catalizadores de automóviles, y sigue siendo uno de los metales más valorados en joyería de alta gama y como inversión.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800',
        autor: 'Equipo Aurum',
      },
      {
        titulo: 'El oro como refugio en tiempos de crisis',
        resumen: 'Por qué el oro ha sido siempre el activo al que acuden los inversores cuando la economía se tambalea.',
        contenido: 'A lo largo de la historia, el oro ha demostrado una y otra vez su papel como refugio de valor en momentos de incertidumbre.\n\nCuando estallan guerras, crisis económicas o periodos de alta inflación, los inversores tienden a refugiarse en el oro. La razón es sencilla: mientras que las monedas pueden devaluarse y las empresas pueden quebrar, el oro mantiene su valor intrínseco a lo largo del tiempo.\n\nDurante la Gran Depresión de 1929, el oro fue uno de los pocos activos que conservó su valor. En la crisis financiera de 2008, el precio del oro se disparó mientras los mercados bursátiles se hundían. Y durante la pandemia de 2020, el oro alcanzó máximos históricos.\n\nEsta característica del oro se debe a varios factores. Primero, su oferta es limitada: no se puede crear oro de la nada, a diferencia del dinero fiduciario. Segundo, es universalmente aceptado y reconocido. Tercero, no depende de ningún gobierno ni institución para tener valor.\n\nLos expertos en finanzas suelen recomendar mantener una parte de la cartera de inversión en oro, precisamente por su capacidad de proteger el patrimonio frente a las turbulencias económicas.\n\nComo dice el refrán entre inversores: el oro no da intereses, pero nunca vale cero. En un mundo de incertidumbre, esa seguridad tiene un valor incalculable.',
        categoria: 'Historia',
        imagen: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
        autor: 'Equipo Aurum',
      },
    ]
  })

  console.log('Artículos de historia creados correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())