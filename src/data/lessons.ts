export interface Lesson {
  id: string
  week: 1 | 2 | 3 | 4
  title: string
  content: string
  hasCodeExample: boolean
}

export const lessons: Lesson[] = [
  // SEMANA 1: Fundamentos de Computación y Lógica Algorítmica
  {
    id: '1.1',
    week: 1,
    title: '¿Qué es una computadora?',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a descubrir qué es una computadora, cuáles son sus partes principales y para qué sirve cada una. Al final vas a poder explicarle a otra persona cómo funciona, con palabras simples.

Una computadora es una máquina electrónica que recibe datos, los procesa y produce información útil.

**Componentes básicos:**

| Componente | Función | Ejemplo |
|---|---|---|
| **Entrada (Input)** | Ingresar datos al sistema | Teclado, mouse, micrófono |
| **Procesamiento** | Realizar cálculos y operaciones | CPU (procesador) |
| **Almacenamiento** | Guardar datos e información | Disco duro, memoria RAM |
| **Salida (Output)** | Mostrar resultados | Monitor, parlantes, impresora |

**Analogía para explicar a la comunidad:**
> Una computadora es como una cocina: los ingredientes (datos) entran, el cocinero (CPU) los procesa siguiendo una receta (programa), y obtenemos un plato preparado (resultado).

**¿Por qué importa entender esto?**
Porque cuando programes vas a estar decidiendo **qué entra** (datos), **qué se hace** (procesamiento) y **qué sale** (resultado). Todo programa es eso, ni más ni menos.

**🏪 Ejemplo de tu comunidad:**
> En la bodega del barrio, la cajera:
> 1. **Entra** el precio de lo que comprás (teclado/caja).
> 2. **Procesa** la suma de todos los productos (la caja registradora).
> 3. **Almacena** el total y el registro de la venta.
> 4. **Sale** el ticket con el monto a pagar.
> Ese es un ciclo completo de datos, igual que en una computadora.

**✅ Lo que aprendiste**
- Una computadora recibe datos (entrada), los procesa, los guarda y muestra resultados (salida).
- Los 4 componentes clave son: entrada, procesamiento, almacenamiento y salida.
- La CPU es el "cerebro" que procesa; el disco duro y la RAM guardan; el teclado y el monitor son la entrada y salida.

**🤔 Autoevaluación**
*Si la CPU de la biblioteca deja de funcionar pero el monitor sigue prendido, ¿qué componente falló y cuál sigue funcionando?*

**💻 Ponelo a prueba**
En una hoja o en tu cuaderno, hacé una lista de **5 dispositivos** que uses en tu casa (teléfono, tablet, cajero automático, semáforo, microondas...) y anotá al lado qué **entra**, qué se **procesa** y qué **sale** en cada uno.`,
    hasCodeExample: false,
  },
  {
    id: '1.2',
    week: 1,
    title: 'Hardware vs Software',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender la diferencia entre la parte física y la parte lógica de una computadora: el **hardware** y el **software**. Es la distinción más importante para empezar a programar.

**Hardware** es todo lo que se puede **tocar** (físico). **Software** es todo lo que **no se puede tocar** (los programas).

| Concepto | Definición | Ejemplos |
|---|---|---|
| **Hardware** | Parte física, lo que se puede tocar | Monitor, teclado, mouse, CPU, cables, impresora |
| **Software** | Parte lógica, los programas | Windows, Word, Chrome, WhatsApp, juegos |

**El hardware se divide en:**
- **Entrada:** teclado, mouse, micrófono, cámara.
- **Salida:** monitor, parlantes, impresora.
- **Almacenamiento:** disco duro, memoria USB, tarjeta SD.
- **Procesamiento:** la CPU (el "cerebro").

**El software se divide en:**
- **Sistema operativo:** el programa que administra todo (Windows, Android, iOS, Linux). Es como el "dueño de la casa".
- **Aplicaciones:** programas para hacer tareas específicas (Word para escribir, Excel para cuentas, el navegador para internet).

**Analogía humana:**
> El cuerpo es el **hardware** y la mente es el **software**. Tu cuerpo (hardware) puede existir, pero sin la mente (software) no puede decidir qué hacer. Y la mente sola, sin cuerpo, tampoco funciona. Se necesitan mutuamente.

**🏪 Ejemplo de tu comunidad:**
> El teléfono de la biblioteca: el **teléfono** en sí es hardware, pero la **app** de WhatsApp que usás para comunicarte es software. Si borrás la app, el teléfono sigue siendo el mismo; si rompés el teléfono, la app no sirve sin él.

**✅ Lo que aprendiste**
- **Hardware** = lo físico (se toca). **Software** = los programas (no se toca).
- El sistema operativo es el software base que administra todo.
- Hardware y software se necesitan mutuamente: ninguno funciona solo.

**🤔 Autoevaluación**
*El teclado de la computadora de la biblioteca está roto. ¿Es un problema de hardware o de software? ¿Y si Windows no arranca?*

**💻 Ponelo a prueba**
Clasificá estos elementos en **hardware (H)** o **software (S)** en tu cuaderno:
1. Pantalla del monitor
2. Microsoft Word
3. Cable de corriente
4. El sistema Android del teléfono
5. Un juego instalado en el celular
6. El parlante de la computadora`,
    hasCodeExample: false,
  },
  {
    id: '1.3',
    week: 1,
    title: '¿Qué es un programa?',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a entender qué es un programa, cómo se le dan instrucciones a una computadora y por qué el orden de los pasos importa muchísimo.

Un **programa** es un conjunto de instrucciones que le decimos a la computadora para que realice una tarea específica.

**Ejemplo cotidiano:**  
Una receta de cocina tiene instrucciones paso a paso. Un programa de computadora funciona igual:

\`\`\`
RECETA PARA HACER UN CAFÉ CON LECHE:
1. Calentar agua
2. Agregar café al agua caliente
3. Agregar leche
4. Revolver
5. Servir
\`\`\`

Eso es un **algoritmo**: una secuencia ordenada de pasos para resolver un problema.

**¿Cómo "entiende" la computadora?**
- Los humanos entendemos lenguaje, imágenes y contexto.
- Las computadoras **solo** entienden instrucciones muy simples y exactas, en un orden preciso.
- Por eso los programas se escriben en **lenguajes de programación** (como Python): un idioma intermedio que traduce nuestras órdenes a algo que la máquina puede ejecutar.

**Regla de oro:**
> La computadora hace **EXACTAMENTE** lo que le decís, no lo que **querés decir**. Si el paso 2 de la receta dice "agregar café", la máquina no adivina que querías leche. Por eso hay que ser precisos.

**🏪 Ejemplo de tu comunidad:**
> Preparar una empanada:
> 1. Preparar la masa
> 2. Rellenar
> 3. Freír
> 4. Servir
> Si te saltás el paso 3 (freír), la empanada sale cruda. En programación es igual: un paso mal ordenado o faltante arruina todo el resultado.

**✅ Lo que aprendiste**
- Un programa es un conjunto de instrucciones ordenadas (un algoritmo).
- La computadora ejecuta instrucciones exactas, sin adivinar intenciones.
- Los lenguajes de programación (como Python) son el puente entre humanos y máquinas.

**🤔 Autoevaluación**
*¿Qué pasaría si en la receta del café invertís el paso "agregar café" y el paso "agregar leche"? ¿El resultado es el mismo? ¿Por qué?*

**💻 Ponelo a prueba**
Escribí en tu cuaderno el **algoritmo para ir de tu casa a la biblioteca** en al menos 5 pasos. Después intercambiá dos pasos y pensá: ¿el resultado cambia? Anotá tu conclusión.`,
    hasCodeExample: false,
  },
  {
    id: '1.4',
    week: 1,
    title: '¿Por qué Python?',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a conocer Python, el lenguaje que vamos a usar, y por qué es la mejor opción para empezar a programar desde cero.

Python es un lenguaje de programación creado por Guido van Rossum en 1991. Es ideal para principiantes porque:

| Característica | Explicación |
|---|---|
| **Sintaxis simple** | Se lee casi como inglés básico |
| **Código limpio** | Usa indentación (espacios) en vez de llaves o paréntesis |
| **Versátil** | Sirve para web, ciencia de datos, IA, juegos, automatización |
| **Comunidad enorme** | Cualquier duda ya tiene respuesta en internet |

**¿Quién usa Python?**
- **Google** (mucha de su infraestructura)
- **Netflix** (recomendaciones de contenido)
- **Spotify** (listas inteligentes)
- **NASA** (procesamiento de datos)
- **Instagram** (backend)

**¿Qué podés hacer vos con Python en este curso?**
- Calcular promedios de notas.
- Armar una calculadora de precios para el negocio de la familia.
- Crear juegos sencillos de adivinanza.
- Automatizar tareas repetitivas (renombrar archivos, armar listas).

**🏪 Ejemplo de tu comunidad:**
> Muchos sistemas que usás sin darte cuenta están hechos en Python. Por ejemplo, el sistema que recomienda videos o canciones, o el que ordena los resultados de una búsqueda. Aprender Python es aprender el idioma que hablan muchas de las herramientas digitales de hoy.

**✅ Lo que aprendiste**
- Python fue creado en 1991 por Guido van Rossum.
- Su sintaxis simple lo hace ideal para principiantes.
- Lo usan empresas gigantes (Google, Netflix, NASA) para cosas de todo tipo.

**🤔 Autoevaluación**
*¿Cuál de estas frases describe mejor por qué Python es bueno para empezar? (a) Porque es el más rápido, (b) Porque es fácil de leer y entender, (c) Porque solo sirve para juegos.*

**💻 Ponelo a prueba**
Buscá en internet o preguntá en tu comunidad: **3 trabajos** o tareas donde se use programación (por ejemplo: quien hace la página del negocio, quien maneja los sistemas del banco). Anotá si creés que se podría resolver con Python.`,
    hasCodeExample: false,
  },
  {
    id: '1.5',
    week: 1,
    title: 'Lógica de programación — Algoritmos',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a pensar como programador: a desarmar un problema en pasos ordenados y precisos. Eso se llama diseño de **algoritmos** y es la base de todo.

Un **algoritmo** es una secuencia de pasos ordenados para resolver un problema.

**Características de un algoritmo:**
1. **Ordenado:** los pasos van en secuencia
2. **Preciso:** no hay ambigüedad
3. **Finito:** tiene un final
4. **Definido:** siempre produce el mismo resultado con los mismos datos

#### Ejemplo 1: Algoritmo para sumar dos números

\`\`\`
INICIO
1. Pedir el primer número
2. Pedir el segundo número
3. Sumar los dos números
4. Mostrar el resultado
FIN
\`\`\`

#### Ejemplo 2: Algoritmo para determinar si un número es par

\`\`\`
INICIO
1. Pedir un número
2. Dividir el número entre 2
3. Si el residuo es 0 → mostrar "Es par"
4. Si el residuo NO es 0 → mostrar "Es impar"
FIN
\`\`\`

**¿Notaste que ya aparece una DECISIÓN?**
En el ejemplo 2, en el paso 3 y 4 el algoritmo "elige" según un resultado. Esas decisiones se llaman **condicionales** y las vamos a usar muchísimo (semana 3).

**🏪 Ejemplo de tu comunidad:**
> ¿Cómo comprás en la bodega?
> 1. Saludar
> 2. Pedir el producto
> 3. Preguntar el precio
> 4. Pagar
> 5. Si necesitás más cosas → volver al paso 2. Si no → retirarte con la compra.
> Eso es un algoritmo con una **repetición** (el paso 5) — ¡las mismas estructuras que usan los programas!

**✅ Lo que aprendiste**
- Un algoritmo es una secuencia ordenada, precisa, finita y definida de pasos.
- Los algoritmos pueden incluir **decisiones** (si pasa algo → hacé esto).
- Pensar en pasos es la habilidad más importante de la programación.

**🤔 Autoevaluación**
*¿Qué característica del algoritmo se rompe si escribo el paso "agregar un poco de sal" en una receta?*

**💻 Ponelo a prueba**
Escribí el **algoritmo para preparar una arepa** con al menos 6 pasos. Después escribí una versión que incluya una **decisión**: "si tiene queso → agregarle queso; si no → servir sola".`,
    hasCodeExample: false,
  },
  {
    id: '1.6',
    week: 1,
    title: 'Diagramas de flujo',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a **dibujar** algoritmos usando diagramas de flujo: la forma visual que usan los programadores para planear antes de escribir código.

Un diagrama de flujo es una representación gráfica de un algoritmo usando símbolos.

**Símbolos básicos:**

| Símbolo | Forma | Significado |
|---|---|---|
| ⭕ | Círculo/Óvalo | Inicio o fin |
| ➡️ | Flecha | Dirección del flujo |
| ▭ | Rectángulo | Proceso o acción |
| ◇ | Rombo | Decisión (sí/no) |
| ▱ | Paralelogramo | Entrada o salida de datos |

#### Ejemplo gráfico: Diagrama para calcular el promedio de 3 notas

\`\`\`
        ⭕ INICIO
           │
           ▼
    ┌───────────────┐
    │ Pedir nota 1  │
    │ Pedir nota 2  │
    │ Pedir nota 3  │
    └───────┬───────┘
           │
           ▼
    ┌───────────────┐
    │ promedio =    │
    │ (n1+n2+n3) / 3│
    └───────┬───────┘
           │
           ▼
    ┌───────────────┐
    │ Mostrar       │
    │ promedio       │
    └───────┬───────┘
           │
           ▼
        ⭕ FIN
\`\`\`

**El rombo de decisión:** cuando hay que elegir, se dibuja un rombo con una pregunta dentro y dos salidas (SÍ / NO):

\`\`\`
        ⭕ INICIO
           │
           ▼
      Pedir edad
           │
           ▼
      ┌──────────┐
      │ ¿Edad    │
      │ >= 18?   │
      └───┬──┬───┘
        SÍ│  │NO
          ▼  ▼
     "Mayor   "Menor
     de edad" de edad"
          │  │
          ▼  ▼
         ⭕ FIN
\`\`\`

**¿Por qué son útiles?**
Antes de escribir una sola línea de código, un diagrama de flujo te dice si tu lógica tiene huecos. Es más barato corregir un dibujo que corregir un programa.

**🏪 Ejemplo de tu comunidad:**
> El cruce de la calle:
> ⭕ INICIO → ¿Está el semáforo en verde? → SÍ: cruzar → FIN. NO: esperar y volver a preguntar. Ese rombo con repetición es exactamente lo que va a hacer un programa con un \`while\` (semana 4).

**✅ Lo que aprendiste**
- Los diagramas de flujo representan algoritmos con símbolos: óvalo (inicio/fin), rectángulo (acción), rombo (decisión), paralelogramo (entrada/salida).
- El rombo es la "bifurcación": SÍ o NO.
- Dibujar el flujo antes de codear ahorra errores.

**🤔 Autoevaluación**
*¿Qué símbolo usarías para representar "preguntar al usuario su nombre"? ¿Y para "si tiene dinero, pagar"?*

**💻 Ponelo a prueba**
Dibujá en tu cuaderno el diagrama de flujo de **sacar dinero de un cajero**: preguntar cuánto querés, si hay suficiente saldo → entregar dinero; si no → mostrar "saldo insuficiente".`,
    hasCodeExample: false,
  },

  // SEMANA 2: Instalación, Variables y Primeros Pasos
  {
    id: '2.1',
    week: 2,
    title: 'Instalación de Python',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a instalar Python en tu computadora y a verificar que funciona. También vas a descubrir que en este curso podés programar sin instalar nada.

**Paso a paso para Windows:**

1. Abrir el navegador y entrar a: https://www.python.org/downloads/
2. Descargar Python 3.x (el más reciente, el botón amarillo grande)
3. Ejecutar el instalador
4. **MUY IMPORTANTE:** Marcar la casilla "Add Python to PATH" (Agregar Python al PATH)
5. Hacer clic en "Install Now"
6. Esperar a que termine y cerrar

**Verificar instalación:**
- Abrir Símbolo del sistema (CMD) o PowerShell
- Escribir: \`python --version\`
- Debería mostrar algo como: \`Python 3.13.x\`

**¿Y si no puedo instalar nada?**
> No te preocupes: este curso tiene un **editor de Python en línea** dentro de la web. Cuando hagas un ejercicio, vas a poder escribir y ejecutar tu código directamente en el navegador, sin instalar nada. La instalación es para cuando quieras programar fuera del curso.

**🏪 Ejemplo de tu comunidad:**
> Instalar Python es como instalar el WhatsApp en el teléfono: lo descargás, lo instalás y lo verificás abriéndolo. Acá lo "abrimos" con el comando \`python --version\`, que nos confirma que quedó bien instalado.

**✅ Lo que aprendiste**
- Se descarga de python.org y se instala marcando "Add Python to PATH".
- Se verifica con \`python --version\` en la terminal.
- En la web del curso podés programar sin instalar nada (editor en línea).

**🤔 Autoevaluación**
*¿Cuál es la casilla que hay que marcar sí o sí durante la instalación para que Python funcione desde la terminal?*

**💻 Ponelo a prueba**
1. Instalá Python (o usá el editor en línea de la web).
2. Abrí la terminal y escribí \`python --version\`.
3. Escribí \`print("Hola mundo")\` en un archivo \`hola.py\` y ejecutalo con \`python hola.py\`.
4. Anotá en tu cuaderno qué viste en pantalla.`,
    hasCodeExample: false,
  },
  {
    id: '2.2',
    week: 2,
    title: 'Editores de código',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a conocer las herramientas donde se escribe el código: los editores. Vas a saber cuál usar para empezar y cuál te sirve cuando avances.

Un **editor de código** es el programa donde escribís tus programas (tus archivos \`.py\`). Es como un "Word para código", con herramientas especiales.

**Recomendado: Thonny**
- Es un editor diseñado para principiantes
- Muestra las variables en tiempo real (¡ves cómo cambian mientras el programa corre!)
- Descarga: https://thonny.org/

**Alternativa: VS Code (más profesional)**
- Descarga: https://code.visualstudio.com/
- Al abrir, instalar la extensión "Python" de Microsoft

**Otra opción: el editor de la web del curso**
- No tenés que instalar nada.
- Escribís Python directamente en el navegador y lo ejecutás al instante.
- Perfecto para practicar desde cualquier computadora (hasta la de la biblioteca).

**¿Qué tiene en común un buen editor?**
- **Colores:** las palabras clave se pintan (te ayuda a leer el código).
- **Autocompletado:** sugiere nombres de funciones mientras escribís.
- **Resaltado de errores:** te avisa antes de ejecutar si hay algo mal escrito.

**🏪 Ejemplo de tu comunidad:**
> Elegir editor es como elegir dónde cocinar: Thonny es la cocina sencilla del mercado (simple, todo a la vista), VS Code es la cocina profesional del restaurante (más herramientas, más poderosa), y el editor de la web es la cocina portátil que llevás a donde sea. Las tres sirven para lo mismo: preparar (escribir) tu comida (programa).

**✅ Lo que aprendiste**
- El editor es el programa donde se escribe el código.
- Thonny es ideal para empezar; VS Code para crecer.
- El editor de la web del curso permite practicar sin instalar nada.

**🤔 Autoevaluación**
*¿Cuál es la ventaja principal de Thonny para un principiante?*

**💻 Ponelo a prueba**
1. Abrí el editor de ejercicios de la web (o Thonny si lo instalaste).
2. Escribí \`print("Aprendiendo a usar el editor")\`.
3. Ejecutalo. Después cambiá el texto y ejecutá de nuevo.
4. Anotá: ¿qué colores ves en las palabras? ¿Qué te llamó la atención?`,
    hasCodeExample: false,
  },
  {
    id: '2.3',
    week: 2,
    title: 'Estructura básica: print()',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a escribir tus primeros programas de verdad: mostrar mensajes con \`print()\` y recibir datos con \`input()\`.

Todo programa en Python se ejecuta línea por línea, de arriba hacia abajo.

#### La función \`print()\` — Mostrar mensajes

\`\`\`python
# Así se escribe un comentario (no se ejecuta)
print("Hola, comunidad de Santa Lucía!")
print("Bienvenidos al curso de Python")
print(2026)  # También imprime números
\`\`\`

**Salida:**
\`\`\`
Hola, comunidad de Santa Lucía!
Bienvenidos al curso de Python
2026
\`\`\`

**Regla importante:** el texto va entre comillas \`" "\`. Si no usás comillas, Python piensa que es una variable o un comando y da error.

#### La función \`input()\` — Recibir datos del usuario

\`\`\`python
nombre = input("¿Cómo te llamas? ")
print("Mucho gusto,", nombre)
\`\`\`

**¿Qué pasa aquí?**
1. \`input()\` muestra la pregunta y espera que escribas algo
2. Lo que escribas se guarda en la variable \`nombre\`
3. \`print()\` muestra "Mucho gusto, " + lo que escribiste

**Tip importante:** \`input()\` siempre devuelve texto (string). Si necesitas un número, hay que convertirlo (lo vemos más adelante).

**🏪 Ejemplo de tu comunidad:**
> La biblioteca registra a los visitantes:
> \`\`\`python
> nombre = input("¿Cómo te llamás? ")
> print("Bienvenido a la Biblioteca María Calcaño,", nombre)
> \`\`\`

**✅ Lo que aprendiste**
- \`print()\` muestra mensajes en pantalla; el texto va entre comillas.
- \`input()\` muestra una pregunta y guarda lo que escribís en una variable.
- \`input()\` siempre devuelve texto (string).

**🤔 Autoevaluación**
*¿Qué imprime este código? \`print("Bienvenido", "al curso")\` — ¿Y si escribo \`print(Bienvenido)\` sin comillas?*

**💻 Ponelo a prueba**
Escribí un programa que:
1. Pregunte el nombre del usuario.
2. Pregunte de qué sector de Santa Lucía es.
3. Imprima: "Hola [nombre], de [sector], ¡bienvenido al curso!"`,
    hasCodeExample: true,
  },
  {
    id: '2.4',
    week: 2,
    title: 'Variables en Python',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a guardar datos con variables, la forma en que tu programa "recuerda" información.

Una **variable** es como una caja etiquetada donde guardamos datos.

\`\`\`python
# Creando variables (las cajas)
nombre = "María"
edad = 25
altura = 1.65
es_estudiante = True

# Mostrando el contenido
print(nombre)           # María
print(edad)             # 25
print(altura)           # 1.65
print(es_estudiante)    # True
\`\`\`

**Analogía de la caja:**
> \`nombre = "María"\` significa: "creo una caja llamada \`nombre\` y adentro le pongo \`"María"\`". Después, cada vez que diga \`nombre\`, Python va a mirar adentro de la caja.

**Las variables pueden cambiar de valor:**
\`\`\`python
saldo = 100
print(saldo)     # 100
saldo = saldo + 50   # la caja ahora guarda 150
print(saldo)     # 150
\`\`\`

**Reglas para nombrar variables:**
✅ **Sí se puede:**
- Usar letras: \`nombre\`, \`edad\`
- Usar números pero NO al inicio: \`nota1\`, \`materia2\`
- Usar guión bajo: \`mi_nombre\`, \`primer_apellido\`

❌ **No se puede:**
- Empezar con número: \`1nota\` ✗
- Usar espacios: \`mi nombre\` ✗
- Usar palabras reservadas: \`if\`, \`for\`, \`while\`, \`print\` ✗

✅ **Buena práctica:** usar nombres descriptivos en español o inglés:
- \`nombre_del_estudiante\` ✓
- \`promedio_final\` ✓
- \`total_pagar\` ✓

**🏪 Ejemplo de tu comunidad:**
> La biblioteca lleva el control de préstamos:
> \`\`\`python
> libro_prestado = "Cien años de soledad"
> dias_prestamo = 7
> estudiante = "Pedro"
> print(estudiante, "lleva", libro_prestado, "por", dias_prestamo, "días")
> \`\`\`

**✅ Lo que aprendiste**
- Una variable es una "caja etiquetada" que guarda un dato.
- Se asigna con \`=\` (un solo signo).
- Las variables pueden cambiar de valor durante el programa.
- Nombrarlas bien (descriptivas, sin espacios, sin empezar con número) evita errores.

**🤔 Autoevaluación**
*¿Cuál de estos nombres de variable es inválido y por qué? \`mi_edad\`, \`2notas\`, \`totalPagar\`, \`nombre completo\`.*

**💻 Ponelo a prueba**
Escribí un programa que guarde en variables: tu nombre, tu edad, y el nombre de tu libro favorito. Después mostralos con \`print()\`. Finalmente, cambiá el valor de la edad sumándole 1 y mostralo de nuevo.`,
    hasCodeExample: true,
  },
  {
    id: '2.5',
    week: 2,
    title: 'Tipos de datos',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a conocer los 4 tipos de datos básicos de Python y por qué importa saber diferenciarlos.

Python tiene 4 tipos básicos que debés conocer:

| Tipo | Nombre en Python | Ejemplo | ¿Qué guarda? |
|---|---|---|---|
| **String** | \`str\` | \`"Hola"\`, \`'Python'\`, \`"123"\` | Texto |
| **Integer** | \`int\` | \`25\`, \`0\`, \`-10\`, \`2026\` | Número entero |
| **Float** | \`float\` | \`3.14\`, \`-0.5\`, \`1.65\` | Número decimal |
| **Boolean** | \`bool\` | \`True\`, \`False\` | Verdadero o falso |

**Cómo saber el tipo de un dato:**

\`\`\`python
print(type("Hola"))     # <class 'str'>
print(type(25))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type(True))       # <class 'bool'>
\`\`\`

**¿Por qué importa el tipo?**
Porque no puedes sumar texto con números sin convertirlos:

\`\`\`python
# Esto funciona
print(10 + 5)           # 15

# Esto da error
print("10" + 5)         # TypeError: can only concatenate str (not "int") to str

# Esto sí funciona (concatena texto con texto)
print("10" + "5")       # 105 (concatena los textos)
\`\`\`

**Ojo con las comillas:** \`"123"\` es texto (str), no el número 123. Python los trata distinto: \`"123" + "1"\` da \`"1231"\`, pero \`123 + 1\` da \`124\`.

**🏪 Ejemplo de tu comunidad:**
> El precio del pasaje del bus:
> \`\`\`python
> precio = 12.50        # float (tiene decimales)
> cantidad = 2          # int
> total = precio * cantidad
> print(total)          # 25.0
> \`\`\`

**✅ Lo que aprendiste**
- Los 4 tipos básicos son: \`str\` (texto), \`int\` (entero), \`float\` (decimal), \`bool\` (verdadero/falso).
- \`type()\` te dice el tipo de un dato.
- No se mezclan texto y número en operaciones: da \`TypeError\`.

**🤔 Autoevaluación**
*¿Cuál es el tipo de \`"15"\`? ¿Y de \`15\`? ¿Por qué importa la diferencia?*

**💻 Ponelo a prueba**
1. Escribí: \`print(type("Python"))\`, \`print(type(2.5))\`, \`print(type(False))\`.
2. Ahora calculá: \`print(10 + 3)\` y \`print("10" + "3")\`. ¿Son iguales? ¿Por qué?
3. Anotá en tu cuaderno qué tipo usarías para: el precio de una empanada, la cantidad de estudiantes, si llueve o no, y el nombre de tu mascota.`,
    hasCodeExample: true,
  },
  {
    id: '2.6',
    week: 2,
    title: 'Conversión de tipos',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a convertir entre tipos de datos. Esto es imprescindible porque \`input()\` siempre devuelve texto.

A veces necesitamos convertir un tipo a otro:

\`\`\`python
# Convertir texto a número
edad_texto = input("¿Cuántos años tenés? ")  # "25" (texto)
edad_numero = int(edad_texto)                 # 25 (entero)
print(edad_numero + 5)                        # 30

# O directamente:
edad = int(input("¿Cuántos años tenés? "))
print(f"El año que viene tendrás {edad + 1} años")
\`\`\`

**Funciones de conversión:**

| Función | Convierte a | Ejemplo |
|---|---|---|
| \`int()\` | Entero | \`int("25")\` → \`25\` |
| \`float()\` | Decimal | \`float("3.14")\` → \`3.14\` |
| \`str()\` | Texto | \`str(25)\` → \`"25"\` |

**Truco del \`f\` string:**
El \`f\` antes de las comillas permite meter variables dentro del texto con \`{ }\`:
\`\`\`python
nombre = "María"
print(f"Hola {nombre}, bienvenida al curso!")
\`\`\`

**Errores comunes:**
- \`int("3.14")\` → da error porque "3.14" no es un entero válido. Usá \`float()\` para decimales.
- \`int("hola")\` → da error porque no se puede convertir cualquier texto a número.

**🏪 Ejemplo de tu comunidad:**
> La venta en la bodega:
> \`\`\`python
> precio = float(input("¿Cuánto cuesta el producto? "))
> cantidad = int(input("¿Cuántos lleva? "))
> total = precio * cantidad
> print(f"El total es: Bs. {total}")
> \`\`\`

**✅ Lo que aprendiste**
- \`input()\` devuelve texto: hay que convertirlo con \`int()\` o \`float()\` para operar.
- \`int()\`, \`float()\`, \`str()\` convierten entre tipos.
- El \`f\` string inserta variables en el texto con \`{}\`.

**🤔 Autoevaluación**
*¿Qué pasa si hago \`int("10.5")\`? ¿Y si hago \`float("10.5")\`?*

**💻 Ponelo a prueba**
Escribí un programa que pregunte el precio de un producto y el número de unidades, y muestre el total a pagar. Probá con decimales (ej: 12.50 y 3). Después modificá el mensaje para que diga "El total a pagar es: Bs. X" usando un f-string.`,
    hasCodeExample: true,
  },
  {
    id: '2.7',
    week: 2,
    title: 'Operadores en Python',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a dominar los operadores matemáticos y de texto: las herramientas para hacer cálculos y combinar datos en tus programas.

#### Operadores Matemáticos

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| \`+\` | Suma | \`10 + 3\` | \`13\` |
| \`-\` | Resta | \`10 - 3\` | \`7\` |
| \`*\` | Multiplicación | \`10 * 3\` | \`30\` |
| \`/\` | División (decimal) | \`10 / 3\` | \`3.3333...\` |
| \`//\` | División entera | \`10 // 3\` | \`3\` |
| \`%\` | Módulo (residuo) | \`10 % 3\` | \`1\` |
| \`**\` | Potencia | \`10 ** 3\` | \`1000\` |

**¿Para qué sirve el módulo (\`%\`)?**
Te da el residuo de una división. Se usa muchísimo para saber si un número es par (\`numero % 2 == 0\`) o para repartir cosas.

**Ejemplos prácticos:**
\`\`\`python
# Calcular el descuento de un producto
precio_original = 150
descuento = 20  # 20%
precio_final = precio_original - (precio_original * descuento / 100)
print(f"El precio final es: Bs. {precio_final}")  # Bs. 120.0

# Saber si un número es par (residuo 0)
numero = 7
print(numero % 2)  # 1 (es impar, porque el residuo no es 0)
\`\`\`

**Orden de las operaciones (igual que en la escuela):**
1. Paréntesis \`( )\`
2. Exponentes \`**\`
3. Multiplicación y división \`*\` \`/\` \`//\` \`%\`
4. Suma y resta \`+\` \`-\`

#### Operadores con Texto

\`\`\`python
# Concatenar (unir) textos
saludo = "Hola"
nombre = "María"
print(saludo + " " + nombre)  # "Hola María"

# Repetir texto
risa = "ja" * 5
print(risa)  # "jajajajaja"

# No se puede multiplicar texto por texto
# "hola" * "mundo"  → ERROR
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> Repartir naranjas entre niños:
> \`\`\`python
> naranjas = 25
> ninos = 4
> print(f"Cada niño recibe {naranjas // ninos}")   # 6
> print(f"Sobran {naranjas % ninos}")               # 1
> \`\`\`

**✅ Lo que aprendiste**
- Operadores matemáticos: \`+\`, \`-\`, \`*\`, \`/\`, \`//\`, \`%\`, \`**\`.
- \`%\` (módulo) da el residuo; \`//\` da la división entera.
- El orden de operaciones importa: primero paréntesis.
- Con texto, \`+\` une (concatena) y \`*\` repite.

**🤔 Autoevaluación**
*¿Cuál es el resultado de \`10 + 2 * 3\`? ¿Y de \`(10 + 2) * 3\`? ¿Por qué cambian?*

**💻 Ponelo a prueba**
1. Calculá: \`print(17 // 5)\` y \`print(17 % 5)\`. Explicá qué te da cada uno.
2. Hacé un programa que pregunte el precio de un producto y el porcentaje de descuento, y muestre el precio final.
3. Mostrá tu nombre repetido 3 veces con \`*\`.`,
    hasCodeExample: true,
  },

  // SEMANA 3: Estructuras Condicionales
  {
    id: '3.1',
    week: 3,
    title: '¿Qué son las condicionales?',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a entender qué son las condicionales y por qué son la herramienta que permite que un programa "piense" y decida.

Las condicionales nos permiten tomar decisiones en un programa. El programa evalúa una condición y ejecuta un bloque de código u otro según si la condición es verdadera (\`True\`) o falsa (\`False\`).

**Analogía:** Es como cuando decís "si me pagan, voy al cine; si no, me quedo en casa".

**Tu día está lleno de decisiones:**
- Si tengo dinero → voy a la bodega. Si no → me quedo.
- Si el semáforo está en verde → cruzo. Si no → espero.
- Si apruebo → paso de materia. Si no → repito.

**En programación es igual:**
Un programa necesita decidir según los datos que recibe. Por ejemplo:
- Si el usuario es mayor de edad → mostrar "podés votar".
- Si la nota es mayor o igual a 10 → "aprobado".
- Si el saldo alcanza → "compra exitosa".

**¿Cómo se ve en Python? (adelanto)**
\`\`\`python
if dinero >= precio:
    print("¡Compralo!")
else:
    print("No te alcanza, mejor ahorrá")
\`\`\`

**Términos clave:**
- **Condición:** la pregunta que se evalúa (algo que da \`True\` o \`False\`).
- **\`if\`:** "si se cumple...".
- **\`else\`:** "si no se cumple...".

**🏪 Ejemplo de tu comunidad:**
> En la biblioteca:
> "Si el libro está disponible → lo prestamos. Si no → lo anotamos en lista de espera."
> Eso que hacés todos los días con el sentido común, las condicionales lo hacen automáticamente en un programa.

**✅ Lo que aprendiste**
- Las condicionales permiten que el programa decida según condiciones (\`True\`/\`False\`).
- \`if\` = "si...", \`else\` = "si no...".
- Ya usás condicionales todos los días: programar es enseñárselas a la computadora.

**🤔 Autoevaluación**
*Escribí 3 decisiones que tomés en un día normal y convertí cada una en una frase "si... entonces...". Ej: "Si llueve, entonces llevo paraguas".*

**💻 Ponelo a prueba**
En tu cuaderno, escribí un "programa en español" (sin código) que decida si un estudiante va a la biblioteca: pregunta si tiene tarea pendiente; si sí → va; si no → queda en casa. Después convertilo a pseudocódigo con \`if\` y \`else\`.`,
    hasCodeExample: false,
  },
  {
    id: '3.2',
    week: 3,
    title: 'La estructura if',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a escribir tu primera condición en Python y a entender la regla más importante: la indentación.

\`\`\`python
# Sintaxis básica
if condicion:
    # código que se ejecuta si la condición es True
    print("La condición se cumplió")
\`\`\`

**Regla IMPORTANTE:** El código dentro del \`if\` debe tener **indentación** (4 espacios o un tab). Es obligatorio.

\`\`\`python
edad = 18

if edad >= 18:
    print("Sos mayor de edad")
    print("Podés entrar al evento")
\`\`\`

**Probar con diferentes valores:**
- Si \`edad = 18\` → Se ejecuta
- Si \`edad = 15\` → No se ejecuta, no muestra nada

**¿Qué es la indentación y por qué importa?**
> La indentación (los espacios al inicio de línea) le dice a Python QUÉ código pertenece al \`if\`. En otros lenguajes se usan llaves \`{ }\`; en Python los espacios son la regla. Si la indentación es incorrecta, el programa falla o se comporta mal.

\`\`\`python
# ✓ CORRECTO: las dos líneas pertenecen al if
if edad >= 18:
    print("Mayor de edad")
    print("Podés entrar")

# ✓ CORRECTO: esta línea NO pertenece al if (siempre se ejecuta)
if edad >= 18:
    print("Mayor de edad")
print("Fin del programa")
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> \`\`\`python
> saldo = float(input("¿Cuánto dinero tenés? "))
> precio_empanada = 5
> if saldo >= precio_empanada:
>     print("Te podés comprar la empanada 😋")
> \`\`\`

**✅ Lo que aprendiste**
- \`if condicion:\` ejecuta el bloque indentado si la condición es \`True\`.
- La indentación (4 espacios) es obligatoria y define qué pertenece al \`if\`.
- Si la condición es \`False\`, el bloque no se ejecuta y sigue el programa.

**🤔 Autoevaluación**
*¿Qué imprime este código si \`edad = 15\`? \`if edad >= 18: print("Mayor") \` — ¿Y si \`edad = 25\`?*

**💻 Ponelo a prueba**
Escribí un programa que pregunte la edad y, solo si es 18 o más, imprima "Sos mayor de edad". Probá con 15 y con 25. Después agregá una línea "Gracias por usar el programa" que se imprima SIEMPRE (fuera del if).`,
    hasCodeExample: true,
  },
  {
    id: '3.3',
    week: 3,
    title: 'Operadores de comparación',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a dominar los operadores de comparación, que son las "preguntas" que hace una condición.

| Operador | Significado | Ejemplo True | Ejemplo False |
|---|---|---|---|
| \`==\` | Igual a | \`5 == 5\` | \`5 == 3\` |
| \`!=\` | Diferente de | \`5 != 3\` | \`5 != 5\` |
| \`>\` | Mayor que | \`5 > 3\` | \`3 > 5\` |
| \`<\` | Menor que | \`3 < 5\` | \`5 < 3\` |
| \`>=\` | Mayor o igual | \`5 >= 5\` | \`3 >= 5\` |
| \`<=\` | Menor o igual | \`3 <= 5\` | \`5 <= 3\` |

**Atención:** \`=\` es para asignar, \`==\` es para comparar. Error clásico de principiantes:

\`\`\`python
# ✗ INCORRECTO
if edad = 18:  # TypeError o SyntaxError

# ✓ CORRECTO
if edad == 18:
\`\`\`

**Siempre dan \`True\` o \`False\`:**
\`\`\`python
print(10 > 5)     # True
print(10 == 5)    # False
print("maría" == "María")   # False (Python distingue mayúsculas)
\`\`\`

**Se pueden comparar también textos:**
\`\`\`python
clave = input("Ingresá la clave: ")
if clave == "biblioteca2026":
    print("Acceso concedido")
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> La librería de la biblioteca:
> \`\`\`python
> precio = 30
> presupuesto = float(input("¿Cuánto tenés para gastar? "))
> if presupuesto >= precio:
>     print("¡Te alcanza para el libro!")
> else:
>     print("Te faltan", precio - presupuesto, "bolívares")
> \`\`\`

**✅ Lo que aprendiste**
- Operadores de comparación: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`.
- \`==\` compara; \`=\` asigna. No confundirlos.
- Las comparaciones siempre devuelven \`True\` o \`False\`.
- Se comparan números Y textos (con mayúsculas/minúsculas exactas).

**🤔 Autoevaluación**
*¿Cuál es el resultado de \`"hola" == "Hola"\`? ¿Por qué?*

**💻 Ponelo a prueba**
1. Probá en el editor: \`print(15 >= 10)\`, \`print(15 <= 10)\`, \`print(15 != 10)\`.
2. Hacé un programa que pregunte una clave y diga "Acceso concedido" solo si la clave es \`python123\`.
3. Escribí tu propia comparación de texto y probala.`,
    hasCodeExample: true,
  },
  {
    id: '3.4',
    week: 3,
    title: 'if + else',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a ejecutar algo cuando la condición se cumple y otra cosa cuando NO se cumple.

Cuando queremos ejecutar algo si se cumple la condición, y otra cosa si NO se cumple:

\`\`\`python
edad = 15

if edad >= 18:
    print("Sos mayor de edad")
else:
    print("Sos menor de edad")
\`\`\`

**Flujo:** Solo uno de los dos bloques se ejecuta, nunca ambos.

**Es un "o" excluyente:**
> Si la condición es \`True\` → se ejecuta el bloque del \`if\`.
> Si la condición es \`False\` → se ejecuta el bloque del \`else\`.
> No hay tercera opción, y nunca se ejecutan los dos.

**El \`else\` no lleva condición:** es el "si no", el plan B.

**🏪 Ejemplo de tu comunidad:**
> El préstamo en la biblioteca:
> \`\`\`python
> tiene_carne = input("¿Tenés el carné de la biblioteca? (sí/no): ")
> if tiene_carne == "sí":
>     print("Podés llevarte hasta 3 libros")
> else:
>     print("Necesitás el carné para pedir libros prestados")
> \`\`\`

**✅ Lo que aprendiste**
- \`else\` se ejecuta cuando la condición del \`if\` es \`False\`.
- Solo UNO de los dos bloques se ejecuta, nunca ambos.
- El \`else\` no lleva condición.

**🤔 Autoevaluación**
*¿Cuántos bloques se ejecutan en total cuando un \`if...else\` corre? ¿Cuál es la regla del \`else\`?*

**💻 Ponelo a prueba**
Escribí un programa que pregunte si un libro está disponible (\`sí\`/\`no\`) y muestre: si está disponible → "Podés llevarlo"; si no → "Lo anotamos en lista de espera". Probá con las dos respuestas.`,
    hasCodeExample: true,
  },
  {
    id: '3.5',
    week: 3,
    title: 'if + elif + else',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a manejar más de dos casos con \`elif\` (que significa "si no, otra condición").

Cuando hay múltiples condiciones que evaluar (equivalente a "sino si"):

\`\`\`python
nota = 15

if nota >= 18:
    print("Excelente")
elif nota >= 14:
    print("Aprobado")
elif nota >= 10:
    print("Regular")
else:
    print("Reprobado")
\`\`\`

**¿Cómo funciona esto?**
Evalúa de arriba hacia abajo. Tan pronto como encuentra una condición que da \`True\`, ejecuta ese bloque y **sale** de toda la estructura.

- nota = 15 → \`nota >= 18\` es False → \`nota >= 14\` es True → imprime "Aprobado"

**El orden SÍ importa:**
> Si ordenás las condiciones de menor a mayor, el resultado cambia:
> \`\`\`python
> # ✗ MAL: siempre entra el primer if
> if nota >= 10:
>     print("Regular")
> elif nota >= 18:
>     print("Excelente")
> # Con nota 19 diría "Regular" (error)
> \`\`\`
> Las condiciones se evalúan en orden: la primera que sea \`True\` gana. Por eso van de la más exigente a la menos exigente.

**🏪 Ejemplo de tu comunidad:**
> Las fases de un préstamo en la biblioteca:
> \`\`\`python
> dias = int(input("¿Hace cuántos días devolviste el libro? "))
> if dias == 0:
>     print("¡Gracias por devolverlo a tiempo!")
> elif dias <= 3:
>     print("Aviso de demora menor")
> elif dias <= 7:
>     print("Multa leve")
> else:
>     print("Multa mayor, hablá con el encargado")
> \`\`\`

**✅ Lo que aprendiste**
- \`elif\` permite evaluar varias condiciones en cadena.
- Se evalúa de arriba hacia abajo; la primera \`True\` gana y sale.
- El orden va de la condición más exigente a la menos exigente.

**🤔 Autoevaluación**
*Con \`nota = 19\` y el ejemplo de arriba (Excelente/Aprobado/Regular/Reprobado), ¿qué imprime? ¿Y con \`nota = 9\`?*

**💻 Ponelo a prueba**
Escribí un programa que pregunte la nota (0 a 20) y muestre: 18+ "Excelente", 14+ "Aprobado", 10+ "Regular", menos "Reprobado". Probá con 20, 15, 11 y 5.`,
    hasCodeExample: true,
  },
  {
    id: '3.6',
    week: 3,
    title: 'Condicionales anidados',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a poner un \`if\` dentro de otro \`if\`. Son decisiones dentro de decisiones, como en la vida real.

Un \`if\` dentro de otro \`if\`:

\`\`\`python
edad = 22
tiene_permiso = True

if edad >= 18:
    print("Sos mayor de edad")
    if tiene_permiso:
        print("Podés ingresar")
    else:
        print("No tenés permiso, no podés ingresar")
else:
    print("Sos menor de edad, no podés ingresar")
\`\`\`

**¿Cómo leerlo?**
1. Primero se evalúa la condición externa (\`edad >= 18\`).
2. Si es \`True\`, se entra al bloque Y se evalúa la condición interna (\`tiene_permiso\`).
3. La condición interna solo se evalúa si la externa fue \`True\`.

**Indentación = jerarquía:**
> Cada nivel de indentación es un nivel de "profundidad". El \`if\` interno va más indentado que el externo.

**Alternativa con \`and\` (más limpia cuando la condición es simple):**
\`\`\`python
if edad >= 18 and tiene_permiso:
    print("Podés ingresar")
\`\`\`
Los anidados sirven cuando necesitás mensajes distintos en cada caso (como arriba), no solo "sí/no".

**🏪 Ejemplo de tu comunidad:**
> Entrar al salón de computación de la biblioteca:
> \`\`\`python
> tiene_cita = input("¿Tenés cita? (sí/no): ")
> if tiene_cita == "sí":
>     horario_ok = input("¿Es tu turno ahora? (sí/no): ")
>     if horario_ok == "sí":
>         print("Pasá, hay una computadora libre")
>     else:
>         print("Esperá tu turno en la sala de lectura")
> else:
>     print("Necesitás sacar una cita primero")
> \`\`\`

**✅ Lo que aprendiste**
- Los condicionales anidados son \`if\` dentro de \`if\`.
- El interno solo se evalúa si el externo es \`True\`.
- Para condiciones simples conviene \`and\`; para varios mensajes, anidar.

**🤔 Autoevaluación**
*En el ejemplo del salón: si el usuario dice "no" a "¿Tenés cita?", ¿se evalúa la segunda pregunta? ¿Qué se imprime?*

**💻 Ponelo a prueba**
Escribí un programa que pregunte la edad y si tiene carné de la biblioteca. Reglas: si es mayor de 12 → puede entrar; si además tiene carné → puede pedir prestado; si no tiene → solo lectura. Si es menor de 12 → debe ir con un adulto.`,
    hasCodeExample: true,
  },
  {
    id: '3.7',
    week: 3,
    title: 'Operadores lógicos: and, or, not',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a combinar condiciones con \`and\`, \`or\` y \`not\`. Con esto tus programas pueden evaluar situaciones más complejas.

#### \`and\` (Y) — Ambas condiciones deben ser True

\`\`\`python
edad = 25
tiene_ine = True

# AND: ambas deben cumplirse
if edad >= 18 and tiene_ine:
    print("Podés votar")
else:
    print("No podés votar")
\`\`\`

**Tabla de verdad de AND:**

| Condición 1 | Condición 2 | Resultado |
|---|---|---|
| True | True | ✅ True |
| True | False | ❌ False |
| False | True | ❌ False |
| False | False | ❌ False |

#### \`or\` (O) — Al menos una debe ser True

\`\`\`python
tiene_efectivo = False
tiene_tarjeta = True

# OR: al menos una se cumple
if tiene_efectivo or tiene_tarjeta:
    print("Podés pagar")
else:
    print("No podés pagar")
\`\`\`

**Tabla de verdad de OR:**

| Condición 1 | Condición 2 | Resultado |
|---|---|---|
| True | True | ✅ True |
| True | False | ✅ True |
| False | True | ✅ True |
| False | False | ❌ False |

#### \`not\` (NO) — Invierte el valor

\`\`\`python
tiene_clase = False

if not tiene_clase:
    print("Podés ir a la biblioteca")
else:
    print("Tenés clase, no podés ir")
\`\`\`

**Regla práctica:**
> - \`and\` es exigente: TODO tiene que ser \`True\`.
> - \`or\` es flexible: con UNO que sea \`True\`, alcanza.
> - \`not\` invierte: \`True\` → \`False\`, \`False\` → \`True\`.

**🏪 Ejemplo de tu comunidad:**
> Ir a la playa el fin de semana:
> \`\`\`python
> hace_sol = True
> no_trabajo = True
> tengo_pasaje = False
> 
> if hace_sol and no_trabajo and tengo_pasaje:
>     print("¡A la playa!")
> else:
>     print("La playa esperará")
> \`\`\`

**✅ Lo que aprendiste**
- \`and\`: todas deben ser \`True\`.
- \`or\`: basta una \`True\`.
- \`not\`: invierte el valor.
- Con las tablas de verdad podés predecir cualquier combinación.

**🤔 Autoevaluación**
*Completá: \`True and False\` = ? \`False or True\` = ? \`not False\` = ?*

**💻 Ponelo a prueba**
1. Probá en el editor: \`print(True and True)\`, \`print(True and False)\`, \`print(not True)\`.
2. Hacé un programa que pregunte si tenés pasaje y si tenés plata, y diga "Podés viajar" solo si ambas son \`sí\`.
3. Hacé una versión con \`or\`: "Podés entrar" si tenés carné O si venís con un lector.`,
    hasCodeExample: true,
  },
  {
    id: '3.8',
    week: 3,
    title: 'Ejemplos combinados',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aplicar todo lo aprendido en la semana (comparaciones, \`if\`, \`elif\`, \`else\`, \`and\`, \`or\`) en programas completos de la vida real.

#### Sistema de beca

\`\`\`python
promedio = 16.5
ingresos = 200  # Ingresos familiares en Bs.

if promedio >= 15 and ingresos < 300:
    print("Beca aprobada")
elif promedio >= 12 and ingresos < 200:
    print("Beca parcial")
else:
    print("No aplica para beca")
\`\`\`

#### Recomendación de vestimenta según clima

\`\`\`python
llueve = input("¿Está lloviendo? (sí/no): ").lower()
frio = input("¿Hace frío? (sí/no): ").lower()

if llueve == "sí" and frio == "sí":
    print("Llevá paraguas y abrigo")
elif llueve == "sí" and frio == "no":
    print("Llevá paraguas nomás")
elif llueve == "no" and frio == "sí":
    print("Llevá abrigo")
else:
    print("Ta lindo el día, salí tranquilo")
\`\`\`

#### Menú de la biblioteca

\`\`\`python
print("📚 Menú de servicios de la biblioteca")
print("1. Pedir libro prestado")
print("2. Usar computadora")
print("3. Consultar enciclopedia")
opcion = input("Elegí una opción: ")

if opcion == "1":
    print("Tenés 7 días para devolverlo")
elif opcion == "2":
    print("Tenés 45 minutos de uso")
elif opcion == "3":
    print("Te acompaño a la sala de consulta")
else:
    print("Opción no válida")
\`\`\`

**Consejo para armar estos programas:**
> 1. Primero pensá los **casos** (todas las situaciones posibles).
> 2. Después escribí la **condición** de cada caso.
> 3. Al final, ordená de la más exigente a la menos exigente.
> 4. Siempre dejá un \`else\` para el caso "no previsto".

**🏪 Ejemplo de tu comunidad:**
> ¿Hacés mercado? Pensá cuántas decisiones tomaste: si hay plata, si está el producto, si es más barato que en la otra bodega... Eso es un programa de \`if\` con \`and\`/\`or\` y varios \`elif\`.

**✅ Lo que aprendiste**
- Combinar \`if\`/\`elif\`/\`else\` con \`and\`/\`or\` resuelve problemas reales.
- Los menús con opciones son un caso clásico de \`elif\`.
- Pensar los casos primero, y dejar siempre un \`else\` de respaldo.

**🤔 Autoevaluación**
*En el menú de la biblioteca, ¿qué imprime si el usuario escribe "4"? ¿Y si escribe "computadora"? ¿Por qué?*

**💻 Ponelo a prueba**
Creá tu propio menú con 3 opciones: "1. Calcular nota final", "2. Calcular precio con descuento", "3. Decidir si aprobás". Implementá cada opción con lo aprendido en la semana. Probá todas las opciones.`,
    hasCodeExample: true,
  },

  // SEMANA 4: Estructuras de Repetición — Bucles
  {
    id: '4.1',
    week: 4,
    title: '¿Qué son los bucles?',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a entender qué son los bucles: la forma de repetir acciones sin escribir el mismo código mil veces.

Los bucles permiten repetir un bloque de código varias veces sin tener que escribirlo una y otra vez.

**Analogía:** Si tenés que escribir "Python" 100 veces, no lo escribís 100 veces. Usás un bucle.

**¿Para qué sirven en la vida real?**
- Mostrar una lista de 1000 estudiantes.
- Sumar todas las notas de una materia.
- Repetir un menú hasta que el usuario quiera salir.
- Recorrer los mensajes de WhatsApp (todos los días, millones de veces).

**Los dos bucles de Python:**

| Bucle | ¿Cuándo usarlo? | Ejemplo |
|---|---|---|
| \`for\` | Cuando sabés cuántas veces repetir | \`for i in range(5)\` |
| \`while\` | Cuando repetís hasta que algo cambie | \`while saldo > 0\` |

**¿Por qué se llaman "bucles" (loops)?**
> Porque el flujo del programa "da vueltas": ejecuta el bloque, vuelve arriba, vuelve a ejecutar, y así hasta que se cumpla la condición de salida. Como una ronda de un juego.

**Pregunta clave para decidir:**
> **¿Sabés de antemano cuántas veces repetir?**
> - Sí → \`for\`
> - No, repito "hasta que..." → \`while\`

**🏪 Ejemplo de tu comunidad:**
> La biblioteca tiene que pegarle el sello a 50 libros nuevos. ¿Los sellás uno por uno escribiendo "sellar libro 1, sellar libro 2..."? No: "repetir 50 veces: sellar el libro de la pila". Eso es un bucle.

**✅ Lo que aprendiste**
- Un bucle repite un bloque de código automáticamente.
- \`for\` = sabés cuántas veces; \`while\` = repetís hasta que pase algo.
- Los bucles ahorran escribir código repetitivo.

**🤔 Autoevaluación**
*¿Qué bucle usarías para: (a) imprimir del 1 al 1000, (b) pedir la clave hasta que sea correcta?*

**💻 Ponelo a prueba**
En tu cuaderno: describí 3 tareas repetitivas de tu vida (ej: regar las matas, repartir volantes) y para cada una escribí: "repetir N veces: ..." o "repetir mientras ...". Eso es el diseño de un bucle.`,
    hasCodeExample: false,
  },
  {
    id: '4.2',
    week: 4,
    title: 'El bucle for con range()',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a dominar el bucle \`for\` y la función \`range()\`, tu mejor herramienta para repetir un número exacto de veces.

El bucle \`for\` repite un bloque un número específico de veces.

\`\`\`python
# Sintaxis
for variable in range(cantidad):
    print("Esto se repite")
\`\`\`

\`\`\`python
# Repetir 5 veces
for i in range(5):
    print(f"Vuelta número {i}")
\`\`\`

**Salida:**
\`\`\`
Vuelta número 0
Vuelta número 1
Vuelta número 2
Vuelta número 3
Vuelta número 4
\`\`\`

**¿Por qué empieza en 0?** En programación, casi todo empieza a contar desde 0.

#### \`range()\` con inicio, fin y paso

\`\`\`python
# range(inicio, fin, paso)
#   inicio: desde dónde empieza (incluido)
#   fin: hasta dónde llega (NO incluido)
#   paso: de cuánto en cuánto avanza

# Del 1 al 10
for i in range(1, 11):
    print(i)  # 1,2,3,4,5,6,7,8,9,10

# Del 0 al 20, de 2 en 2 (números pares)
for i in range(0, 21, 2):
    print(i)  # 0,2,4,6,...,20

# Contar hacia atrás
for i in range(10, 0, -1):
    print(i)  # 10,9,8,...,1
\`\`\`

**Ojo con el "fin no incluido":**
> \`range(1, 11)\` incluye el 1 pero NO incluye el 11. Por eso para contar hasta 10 usás \`range(1, 11)\`. Es una regla confusa al principio, ¡pero se vuelve natural!

**Ejemplo práctico: tabla de multiplicar**

\`\`\`python
numero = int(input("¿De qué número querés la tabla? "))

print(f"Tabla de multiplicar del {numero}:")
for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} × {i} = {resultado}")
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> Imprimir la lista de libros de la biblioteca:
> \`\`\`python
> libros = ["Cien años de soledad", "La vorágine", "Don Quijote", "Rayuela"]
> for i in range(len(libros)):
>     print(f"{i + 1}. {libros[i]}")
> \`\`\`

**✅ Lo que aprendiste**
- \`for variable in range(n):\` repite n veces; empieza en 0.
- \`range(inicio, fin, paso)\`: el fin NO se incluye, el paso es opcional.
- Sirve para tablas de multiplicar, listas, contadores.

**🤔 Autoevaluación**
*¿Cuántas veces se imprime algo con \`range(3)\`? ¿Con \`range(2, 6)\`? ¿Con \`range(0, 10, 2)\`?*

**💻 Ponelo a prueba**
1. Hacé un programa que imprima "¡Curso de Python!" 10 veces con \`for\`.
2. Mostrá los números del 1 al 20 con \`range(1, 21)\`.
3. Hacé la tabla de multiplicar de un número que pida al usuario.`,
    hasCodeExample: true,
  },
  {
    id: '4.3',
    week: 4,
    title: 'El bucle while',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a usar el \`while\`, el bucle que repite "mientras" una condición sea verdadera. Y a evitar el error más temido: el bucle infinito.

El bucle \`while\` repite mientras una condición sea verdadera.

\`\`\`python
# Sintaxis
while condicion:
    # código que se repite mientras condicion sea True
\`\`\`

**Diferencia clave con \`for\`:**
- \`for\` → cuando sabés cuántas veces repetir
- \`while\` → cuando repetís HASTA que algo ocurra

\`\`\`python
# Contar del 1 al 5 con while
contador = 1
while contador <= 5:
    print(contador)
    contador = contador + 1  # ¡No olvidar el incremento!
\`\`\`

**¿Qué pasaría sin el incremento?**
La condición \`contador <= 5\` siempre sería \`True\` (contador siempre vale 1), así que el programa imprime "1" para siempre.

**⚠️ PELIGRO:** Si olvidás incrementar el contador, el bucle se ejecuta para siempre (bucle infinito).

\`\`\`python
# ✗ BUCLE INFINITO — NO HAGAS ESTO
contador = 1
while contador <= 5:
    print(contador)
    # FALTA: contador = contador + 1
    # Esto repite "1" por siempre
\`\`\`

**Uso real del \`while\`: validar entrada del usuario**

\`\`\`python
clave = input("Ingresá la clave: ")
while clave != "biblioteca":
    print("Clave incorrecta")
    clave = input("Intentá de nuevo: ")
print("Bienvenido! ✓")
\`\`\`

**Regla de oro para no quedarse colgado:**
> Dentro del \`while\` siempre tiene que haber algo que cambie la condición. Si nada cambia, el bucle nunca termina.

**🏪 Ejemplo de tu comunidad:**
> Pedir datos hasta que sean correctos (como el formulario de inscripción de la biblioteca):
> \`\`\`python
> carnet = input("¿Cuál es tu número de carné? ")
> while len(carnet) < 6:
>     print("El carné tiene al menos 6 dígitos")
>     carnet = input("Escribilo de nuevo: ")
> print("¡Datos guardados!")
> \`\`\`

**✅ Lo que aprendiste**
- \`while condicion:\` repite mientras la condición sea \`True\`.
- Usá \`while\` cuando no sabés cuántas veces vas a repetir.
- Siempre debe haber algo que cambie la condición (o es un bucle infinito).

**🤔 Autoevaluación**
*¿Cuántas veces se ejecuta el bloque si la condición ya es \`False\` desde el inicio?*

**💻 Ponelo a prueba**
1. Contá del 1 al 10 con \`while\`.
2. Hacé un programa que pida la clave hasta que el usuario escriba \`python\`.
3. Mostrá "¡Pila de libros vacía!" solo si el usuario escribe \`salir\`. Pista: mientras el usuario no escriba \`salir\`, seguí preguntando.`,
    hasCodeExample: true,
  },
  {
    id: '4.4',
    week: 4,
    title: 'break — Salir del bucle',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a salir de un bucle inmediatamente con \`break\`. A veces hay que cortar el "para siempre".

\`break\` termina el bucle inmediatamente, aunque la condición siga siendo verdadera.

\`\`\`python
# Adivinar un número
secreto = 7
print("Adiviná el número secreto (1-10)")

while True:
    intento = int(input("Tu intento: "))
    if intento == secreto:
        print("¡Adivinaste! 🎉")
        break  # Sale del bucle
    else:
        print("No, intentá de nuevo")
\`\`\`

**¿Notaste el \`while True\`?**
> Es un bucle que, literalmente, se repetiría para siempre. La única salida es el \`break\` cuando el usuario acierta. Es un patrón muy usado: "repetí hasta que..." sin saber cuándo va a pasar.

**¿Para qué sirve \`break\`?**
- Para validar entrada: repetir hasta que el dato sea válido.
- Para buscar algo y parar al encontrarlo.
- Para menús: repetir el menú hasta que el usuario elija "salir".

**Patrón de menú con break:**

\`\`\`python
while True:
    print("1. Saludar")
    print("2. Salir")
    opcion = input("Elegí: ")
    if opcion == "1":
        print("¡Hola!")
    elif opcion == "2":
        print("Chau 👋")
        break
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> El teléfono del zaguán: la llamada "repite" el tono hasta que alguien atiende (break). Igual que tu programa espera el dato correcto.

**✅ Lo que aprendiste**
- \`break\` sale del bucle inmediatamente.
- \`while True\` + \`break\` es el patrón para "repetí hasta que..." con una condición interna.
- \`break\` también funciona en \`for\`.

**🤔 Autoevaluación**
*En el juego de adivinar, ¿qué pasaría si quitamos el \`break\` y el usuario acierta?*

**💻 Ponelo a prueba**
1. Creá el juego de adivinanza: número secreto 7, \`while True\`, pide intentos, y con \`break\` cuando acierte.
2. Hacé un menú con 3 opciones y \`salir\` con \`break\`.
3. ¿Podés usarlo en un \`for\`? Probá: un \`for\` del 1 al 10 que corte en el 5 con \`break\`.`,
    hasCodeExample: true,
  },
  {
    id: '4.5',
    week: 4,
    title: 'continue — Saltar iteración',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a aprender a saltarte una vuelta del bucle con \`continue\`. Mientras \`break\` corta todo, \`continue\` solo salta una repetición.

\`continue\` salta el resto del bloque y va a la siguiente vuelta del bucle.

\`\`\`python
# Mostrar solo números pares del 1 al 10
for i in range(1, 11):
    if i % 2 != 0:
        continue  # Si es impar, salta el print
    print(i)  # 2, 4, 6, 8, 10
\`\`\`

**\`break\` vs \`continue\`:**
> - \`break\`: **termina** el bucle (sale de él).
> - \`continue\`: **salta** la vuelta actual y sigue con la siguiente.

**Comparación visual:**
\`\`\`python
# Con continue: imprime 1, 2, 4, 5 (salta el 3)
for i in range(1, 6):
    if i == 3:
        continue
    print(i)

# Con break: imprime 1, 2 (termina en el 3)
for i in range(1, 6):
    if i == 3:
        break
    print(i)
\`\`\`

**Ejemplo real: filtrar datos**
\`\`\`python
# Sumar solo notas aprobadas (mayores o iguales a 10)
notas = [12, 8, 15, 5, 19, 10]
suma = 0
for nota in notas:
    if nota < 10:
        continue  # se salta las reprobadas
    suma = suma + nota
print(f"Suma de aprobadas: {suma}")  # 12+15+19+10 = 56
\`\`\`

**🏪 Ejemplo de tu comunidad:**
> Pasar lista y solo marcar presentes:
> \`\`\`python
> estudiantes = ["Ana", "Luis", "María", "Pedro"]
> for nombre in estudiantes:
>     presente = input(f"¿Está {nombre}? (sí/no): ")
>     if presente != "sí":
>         continue  # no lo sumamos, siguiente
>     print(f"{nombre} ✓ presente")
> \`\`\`

**✅ Lo que aprendiste**
- \`continue\` salta el resto del bloque y pasa a la siguiente vuelta.
- \`break\` corta el bucle; \`continue\` solo se salta una vuelta.
- Ideal para filtrar (procesar solo lo que te interesa).

**🤔 Autoevaluación**
*¿Qué imprime este código? \`for i in range(1, 4): if i == 2: continue; print(i)\`*

**💻 Ponelo a prueba**
1. Mostrá solo los números impares del 1 al 20 usando \`continue\`.
2. Hacé un programa que sume solo las notas mayores o iguales a 10 de una lista.
3. Compará: escribí el mismo ejemplo con \`break\` y explicá la diferencia en el resultado.`,
    hasCodeExample: true,
  },
  {
    id: '4.6',
    week: 4,
    title: 'Comparación for vs while',
    content: `> **📌 ¿Qué vas a aprender?**
> En esta lección vas a saber cuándo usar \`for\` y cuándo \`while\`. Es la decisión que cierra la semana de bucles, y la base de tu proyecto final.

| Situación | Usá \`for\` | Usá \`while\` |
|---|---|---|
| Sabés cuántas veces repetir | ✅ \`for i in range(10)\` | ❌ |
| No sabés cuántas veces | ❌ | ✅ \`while respuesta != "salir"\` |
| Recorrer una secuencia | ✅ \`for letra in "hola"\` | ❌ |
| Condición compleja | ❌ | ✅ \`while contador < 100 and activo\` |

**Regla práctica para decidir:**
> - **¿Ya sé cuántas veces?** → \`for\`
> - **¿Repito hasta que pase algo?** → \`while\`

**Todo lo que viste en la semana:**
- \`for\` con \`range()\` → repetir N veces exactas.
- \`while\` → repetir hasta que la condición cambie.
- \`break\` → salir del bucle por dentro.
- \`continue\` → saltar una vuelta.

**Resumen visual de los 4 bucles en 4 líneas:**

\`\`\`python
for i in range(5):       # repite 5 veces
    print(i)

while n < 10:            # repite mientras n < 10
    n = n + 1

while True:              # repite hasta que pase algo
    if fin:
        break

for x in [1, 2, 3]:      # recorre cada elemento
    if x == 2:
        continue
    print(x)
\`\`\`

**El proyecto final está cerca:**
> Con condicionales (semana 3) y bucles (semana 4) ya podés hacer programas de verdad: calculadoras, juegos, sistemas de registro. Eso es lo que van a construir en las últimas semanas del curso.

**🏪 Ejemplo de tu comunidad:**
> Registrar las visitas de la biblioteca:
> - ¿Cuántas visitas contamos hoy? (sé cuántas) → \`for\`
> - ¿Sigo registrando hasta que cierre la biblioteca? (no sé cuántas) → \`while\`

**✅ Lo que aprendiste**
- \`for\`: sé cuántas veces. \`while\`: repito hasta que pase algo.
- \`break\` corta, \`continue\` salta una vuelta.
- Con condicionales + bucles ya podés construir programas reales.

**🤔 Autoevaluación**
*¿Qué usarías para pedirle al usuario que escriba su nombre hasta que no esté vacío? ¿Y para sumar las edades de 30 estudiantes que ya tenés en una lista?*

**💻 Ponelo a prueba**
Elegí UNA de estas mini-aplicaciones y construila:
1. **Promedio de notas:** pide notas hasta que el usuario escriba \`fin\`, y mostrá el promedio.
2. **Contador de ventas:** registra ventas del día (10 en total) y mostrá el total con \`for\`.
3. **Juego de adivinanza con límite:** adiviná el número secreto con máximo 3 intentos (usá \`for\` o \`while\` + \`break\`).`,
    hasCodeExample: true,
  },
]

export const weekInfo = [
  { week: 1, title: 'Fundamentos de Computación y Lógica Algorítmica', description: 'Aprende qué es una computadora, hardware vs software, algoritmos y diagramas de flujo' },
  { week: 2, title: 'Instalación, Variables y Primeros Pasos', description: 'Instalá Python, creá tu primer programa y aprende sobre variables y tipos de datos' },
  { week: 3, title: 'Estructuras Condicionales', description: 'Tomá decisiones con if, elif, else y operadores lógicos' },
  { week: 4, title: 'Estructuras de Repetición — Bucles', description: 'Repetí acciones con for y while, y controlá el flujo con break y continue' },
]
