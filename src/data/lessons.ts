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
    content: `Una computadora es una máquina electrónica que recibe datos, los procesa y produce información útil.

**Componentes básicos:**

| Componente | Función | Ejemplo |
|---|---|---|
| **Entrada (Input)** | Ingresar datos al sistema | Teclado, mouse, micrófono |
| **Procesamiento** | Realizar cálculos y operaciones | CPU (procesador) |
| **Almacenamiento** | Guardar datos e información | Disco duro, memoria RAM |
| **Salida (Output)** | Mostrar resultados | Monitor, parlantes, impresora |

**Analogía para explicar a la comunidad:**
> Una computadora es como una cocina: los ingredientes (datos) entran, el cocinero (CPU) los procesa siguiendo una receta (programa), y obtenemos un plato preparado (resultado).`,
    hasCodeExample: false,
  },
  {
    id: '1.2',
    week: 1,
    title: 'Hardware vs Software',
    content: `**Diferencia entre Hardware y Software:**

| Concepto | Definición | Ejemplos |
|---|---|---|
| **Hardware** | Parte física, lo que se puede tocar | Monitor, teclado, mouse, CPU, cables |
| **Software** | Parte lógica, los programas | Windows, Word, navegador, juegos |

**Pregunta para la clase:** ¿El WhatsApp es hardware o software?  
**Respuesta:** Software. El teléfono es hardware, la app es software.`,
    hasCodeExample: false,
  },
  {
    id: '1.3',
    week: 1,
    title: '¿Qué es un programa?',
    content: `Un programa es un conjunto de instrucciones que le decimos a la computadora para que realice una tarea específica.

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

Eso es un **algoritmo**: una secuencia ordenada de pasos para resolver un problema.`,
    hasCodeExample: false,
  },
  {
    id: '1.4',
    week: 1,
    title: '¿Por qué Python?',
    content: `Python es un lenguaje de programación creado por Guido van Rossum en 1991. Es ideal para principiantes porque:

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
- **Instagram** (backend)`,
    hasCodeExample: false,
  },
  {
    id: '1.5',
    week: 1,
    title: 'Lógica de programación — Algoritmos',
    content: `Un **algoritmo** es una secuencia de pasos ordenados para resolver un problema.

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
\`\`\``,
    hasCodeExample: false,
  },
  {
    id: '1.6',
    week: 1,
    title: 'Diagramas de flujo',
    content: `Un diagrama de flujo es una representación gráfica de un algoritmo usando símbolos.

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
\`\`\``,
    hasCodeExample: false,
  },

  // SEMANA 2: Instalación, Variables y Primeros Pasos
  {
    id: '2.1',
    week: 2,
    title: 'Instalación de Python',
    content: `**Paso a paso para Windows:**

1. Abrir el navegador y entrar a: https://www.python.org/downloads/
2. Descargar Python 3.x (el más reciente, el botón amarillo grande)
3. Ejecutar el instalador
4. **MUY IMPORTANTE:** Marcar la casilla "Add Python to PATH" (Agregar Python al PATH)
5. Hacer clic en "Install Now"
6. Esperar a que termine y cerrar

**Verificar instalación:**
- Abrir Símbolo del sistema (CMD) o PowerShell
- Escribir: \`python --version\`
- Debería mostrar algo como: \`Python 3.13.x\``,
    hasCodeExample: false,
  },
  {
    id: '2.2',
    week: 2,
    title: 'Editores de código',
    content: `**Recomendado: Thonny**
- Es un editor diseñado para principiantes
- Muestra las variables en tiempo real
- Descarga: https://thonny.org/

**Alternativa: VS Code (más profesional)**
- Descarga: https://code.visualstudio.com/
- Al abrir, instalar la extensión "Python" de Microsoft`,
    hasCodeExample: false,
  },
  {
    id: '2.3',
    week: 2,
    title: 'Estructura básica: print()',
    content: `Todo programa en Python se ejecuta línea por línea, de arriba hacia abajo.

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

#### La función \`input()\` — Recibir datos del usuario

\`\`\`python
nombre = input("¿Cómo te llamas? ")
print("Mucho gusto,", nombre)
\`\`\`

**¿Qué pasa aquí?**
1. \`input()\` muestra la pregunta y espera que escribas algo
2. Lo que escribas se guarda en la variable \`nombre\`
3. \`print()\` muestra "Mucho gusto, " + lo que escribiste

**Tip importante:** \`input()\` siempre devuelve texto (string). Si necesitas un número, hay que convertirlo (lo vemos más adelante).`,
    hasCodeExample: true,
  },
  {
    id: '2.4',
    week: 2,
    title: 'Variables en Python',
    content: `Una **variable** es como una caja etiquetada donde guardamos datos.

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
- \`total_pagar\` ✓`,
    hasCodeExample: true,
  },
  {
    id: '2.5',
    week: 2,
    title: 'Tipos de datos',
    content: `Python tiene 4 tipos básicos que debés conocer:

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
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '2.6',
    week: 2,
    title: 'Conversión de tipos',
    content: `A veces necesitamos convertir un tipo a otro:

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
| \`str()\` | Texto | \`str(25)\` → \`"25"\` |`,
    hasCodeExample: true,
  },
  {
    id: '2.7',
    week: 2,
    title: 'Operadores en Python',
    content: `#### Operadores Matemáticos

| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| \`+\` | Suma | \`10 + 3\` | \`13\` |
| \`-\` | Resta | \`10 - 3\` | \`7\` |
| \`*\` | Multiplicación | \`10 * 3\` | \`30\` |
| \`/\` | División (decimal) | \`10 / 3\` | \`3.3333...\` |
| \`//\` | División entera | \`10 // 3\` | \`3\` |
| \`%\` | Módulo (residuo) | \`10 % 3\` | \`1\` |
| \`**\` | Potencia | \`10 ** 3\` | \`1000\` |

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
\`\`\``,
    hasCodeExample: true,
  },

  // SEMANA 3: Estructuras Condicionales
  {
    id: '3.1',
    week: 3,
    title: '¿Qué son las condicionales?',
    content: `Las condicionales nos permiten tomar decisiones en un programa. El programa evalúa una condición y ejecuta un bloque de código u otro según si la condición es verdadera (\`True\`) o falsa (\`False\`).

**Analogía:** Es como cuando decís "si me pagan, voy al cine; si no, me quedo en casa".`,
    hasCodeExample: false,
  },
  {
    id: '3.2',
    week: 3,
    title: 'La estructura if',
    content: `\`\`\`python
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
- Si \`edad = 15\` → No se ejecuta, no muestra nada`,
    hasCodeExample: true,
  },
  {
    id: '3.3',
    week: 3,
    title: 'Operadores de comparación',
    content: `| Operador | Significado | Ejemplo True | Ejemplo False |
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
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '3.4',
    week: 3,
    title: 'if + else',
    content: `Cuando queremos ejecutar algo si se cumple la condición, y otra cosa si NO se cumple:

\`\`\`python
edad = 15

if edad >= 18:
    print("Sos mayor de edad")
else:
    print("Sos menor de edad")
\`\`\`

**Flujo:** Solo uno de los dos bloques se ejecuta, nunca ambos.`,
    hasCodeExample: true,
  },
  {
    id: '3.5',
    week: 3,
    title: 'if + elif + else',
    content: `Cuando hay múltiples condiciones que evaluar (equivalente a "sino si"):

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

- nota = 15 → \`nota >= 18\` es False → \`nota >= 14\` es True → imprime "Aprobado"`,
    hasCodeExample: true,
  },
  {
    id: '3.6',
    week: 3,
    title: 'Condicionales anidados',
    content: `Un \`if\` dentro de otro \`if\`:

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
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '3.7',
    week: 3,
    title: 'Operadores lógicos: and, or, not',
    content: `#### \`and\` (Y) — Ambas condiciones deben ser True

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
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '3.8',
    week: 3,
    title: 'Ejemplos combinados',
    content: `\`\`\`python
# Sistema de beca
promedio = 16.5
ingresos = 200  # Ingresos familiares en Bs.

if promedio >= 15 and ingresos < 300:
    print("Beca aprobada")
elif promedio >= 12 and ingresos < 200:
    print("Beca parcial")
else:
    print("No aplica para beca")
\`\`\`

\`\`\`python
# Recomendación de vestimenta según clima
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
\`\`\``,
    hasCodeExample: true,
  },

  // SEMANA 4: Estructuras de Repetición — Bucles
  {
    id: '4.1',
    week: 4,
    title: '¿Qué son los bucles?',
    content: `Los bucles permiten repetir un bloque de código varias veces sin tener que escribirlo una y otra vez.

**Analogía:** Si tenés que escribir "Python" 100 veces, no lo escribís 100 veces. Usás un bucle.`,
    hasCodeExample: false,
  },
  {
    id: '4.2',
    week: 4,
    title: 'El bucle for con range()',
    content: `El bucle \`for\` repite un bloque un número específico de veces.

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

**Ejemplo práctico: tabla de multiplicar**

\`\`\`python
numero = int(input("¿De qué número querés la tabla? "))

print(f"Tabla de multiplicar del {numero}:")
for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} × {i} = {resultado}")
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '4.3',
    week: 4,
    title: 'El bucle while',
    content: `El bucle \`while\` repite mientras una condición sea verdadera.

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

**⚠️ PELIGRO:** Si olvidás incrementar el contador, el bucle se ejecuta para siempre (bucle infinito).

\`\`\`python
# ✗ BUCLE INFINITO — NO HAGAS ESTO
contador = 1
while contador <= 5:
    print(contador)
    # FALTA: contador = contador + 1
    # Esto repite "1" por siempre
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '4.4',
    week: 4,
    title: 'break — Salir del bucle',
    content: `\`break\` termina el bucle inmediatamente, aunque la condición siga siendo verdadera.

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
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '4.5',
    week: 4,
    title: 'continue — Saltar iteración',
    content: `\`continue\` salta el resto del bloque y va a la siguiente vuelta del bucle.

\`\`\`python
# Mostrar solo números pares del 1 al 10
for i in range(1, 11):
    if i % 2 != 0:
        continue  # Si es impar, salta el print
    print(i)  # 2, 4, 6, 8, 10
\`\`\``,
    hasCodeExample: true,
  },
  {
    id: '4.6',
    week: 4,
    title: 'Comparación for vs while',
    content: `| Situación | Usá \`for\` | Usá \`while\` |
|---|---|---|
| Sabés cuántas veces repetir | ✅ \`for i in range(10)\` | ❌ |
| No sabés cuántas veces | ❌ | ✅ \`while respuesta != "salir"\` |
| Recorrer una secuencia | ✅ \`for letra in "hola"\` | ❌ |
| Condición compleja | ❌ | ✅ \`while contador < 100 and activo\` |`,
    hasCodeExample: false,
  },
]

export const weekInfo = [
  { week: 1, title: 'Fundamentos de Computación y Lógica Algorítmica', description: 'Aprende qué es una computadora, hardware vs software, algoritmos y diagramas de flujo' },
  { week: 2, title: 'Instalación, Variables y Primeros Pasos', description: 'Instalá Python, creá tu primer programa y aprende sobre variables y tipos de datos' },
  { week: 3, title: 'Estructuras Condicionales', description: 'Tomá decisiones con if, elif, else y operadores lógicos' },
  { week: 4, title: 'Estructuras de Repetición — Bucles', description: 'Repetí acciones con for y while, y controlá el flujo con break y continue' },
]
