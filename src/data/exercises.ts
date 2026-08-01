export interface Exercise {
  id: string
  week: 1 | 2 | 3 | 4
  lessonId: string
  title: string
  description: string
  starterCode: string
  solution: string
  tests: { input: string; expected: string }[]
  hints: string[]
}

export const exercises: Exercise[] = [
  // SEMANA 1: Ejercicios de algoritmos (sin código, solo lógica)
  {
    id: 'ej-1-1',
    week: 1,
    lessonId: '1.5',
    title: 'Área de un rectángulo',
    description: 'Diseñá un algoritmo para calcular el área de un rectángulo. Pedí la base y la altura, y mostrá el resultado.',
    starterCode: `# Escribí tu algoritmo aquí
# Paso 1: Pedir la base del rectángulo
# Paso 2: Pedir la altura del rectángulo
# Paso 3: Calcular el área
# Paso 4: Mostrar el resultado

base = float(input("Ingresá la base: "))
altura = float(input("Ingresá la altura: "))

# Completá el código...`,
    solution: `base = float(input("Ingresá la base: "))
altura = float(input("Ingresá la altura: "))
area = base * altura
print(f"El área es: {area}")`,
    tests: [
      { input: '5\n3', expected: '15' },
      { input: '10\n7', expected: '70' },
    ],
    hints: [
      'El área de un rectángulo se calcula: base × altura',
      'Usá una variable para guardar el resultado',
      'Usá print() para mostrar el resultado',
    ],
  },
  {
    id: 'ej-1-2',
    week: 1,
    lessonId: '1.5',
    title: 'Mayor entre dos números',
    description: 'Diseñá un algoritmo para determinar qué número es mayor entre dos.',
    starterCode: `# Escribí tu algoritmo aquí
# Paso 1: Pedir número A
# Paso 2: Pedir número B
# Paso 3: Comparar y mostrar cuál es mayor

a = int(input("Ingresá el primer número: "))
b = int(input("Ingresá el segundo número: "))

# Completá el código...`,
    solution: `a = int(input("Ingresá el primer número: "))
b = int(input("Ingresá el segundo número: "))

if a > b:
    print(f"{a} es mayor")
elif b > a:
    print(f"{b} es mayor")
else:
    print("Son iguales")`,
    tests: [
      { input: '10\n5', expected: '10 es mayor' },
      { input: '3\n7', expected: '7 es mayor' },
      { input: '4\n4', expected: 'Son iguales' },
    ],
    hints: [
      'Usá un if para comparar',
      'No olvidés el caso en que son iguales',
      'Podés usar elif para el segundo caso',
    ],
  },

  // SEMANA 2: Ejercicios con variables y operadores
  {
    id: 'ej-2-1',
    week: 2,
    lessonId: '2.3',
    title: 'Saludo personalizado',
    description: 'Pedí el nombre del usuario y mostrá un saludo personalizado.',
    starterCode: `# Programa: Saludo personalizado
# Pedí el nombre y mostrá "Hola, [nombre]"

nombre = input("¿Cómo te llamas? ")

# Completá el código...`,
    solution: `nombre = input("¿Cómo te llamas? ")
print(f"Hola, {nombre}!")`,
    tests: [
      { input: 'María', expected: 'Hola, María!' },
      { input: 'Carlos', expected: 'Hola, Carlos!' },
    ],
    hints: [
      'Usá input() para pedir el nombre',
      'Usá f-string para insertar el nombre en el saludo',
      'Ejemplo: f"Hola, {nombre}!"',
    ],
  },
  {
    id: 'ej-2-2',
    week: 2,
    lessonId: '2.7',
    title: 'Calculadora básica',
    description: 'Pedí dos números y mostrá la suma, resta, multiplicación y división.',
    starterCode: `# Programa: Calculadora básica
# Pedí dos números y mostrá las 4 operaciones

num1 = float(input("Ingresá el primer número: "))
num2 = float(input("Ingresá el segundo número: "))

# Completá el código...`,
    solution: `num1 = float(input("Ingresá el primer número: "))
num2 = float(input("Ingresá el segundo número: "))

suma = num1 + num2
resta = num1 - num2
multi = num1 * num2
div = num1 / num2

print(f"Suma: {suma}")
print(f"Resta: {resta}")
print(f"Multiplicación: {multi}")
print(f"División: {div}")`,
    tests: [
      { input: '10\n5', expected: 'Suma: 15.0\nResta: 5.0\nMultiplicación: 50.0\nDivisión: 2.0' },
    ],
    hints: [
      'Usá float() para convertir el input a número decimal',
      'Las operaciones son: +, -, *, /',
      'Guardá cada resultado en una variable distinta',
    ],
  },
  {
    id: 'ej-2-3',
    week: 2,
    lessonId: '2.7',
    title: 'Convertidor de temperatura',
    description: 'Convertí de Celsius a Fahrenheit. Fórmula: °F = (°C × 9/5) + 32',
    starterCode: `# Programa: Convertidor de temperatura
# Pedí grados Celsius y convertí a Fahrenheit

celsius = float(input("Ingresá la temperatura en Celsius: "))

# Completá el código...`,
    solution: `celsius = float(input("Ingresá la temperatura en Celsius: "))
fahrenheit = (celsius * 9/5) + 32
print(f"{celsius}°C equivale a {fahrenheit}°F")`,
    tests: [
      { input: '0', expected: '0.0°C equivale a 32.0°F' },
      { input: '100', expected: '100.0°C equivale a 212.0°F' },
    ],
    hints: [
      'La fórmula es: (Celsius × 9/5) + 32',
      'Usá paréntesis para respetar el orden de operaciones',
      'Podés redondear con round() si querés',
    ],
  },
  {
    id: 'ej-2-4',
    week: 2,
    lessonId: '2.6',
    title: 'Promedio de 3 notas',
    description: 'Pedí 3 notas y calculá el promedio.',
    starterCode: `# Programa: Promedio de 3 notas
# Pedí 3 notas y calculá el promedio

nota1 = float(input("Ingresá la primera nota: "))
nota2 = float(input("Ingresá la segunda nota: "))
nota3 = float(input("Ingresá la tercera nota: "))

# Completá el código...`,
    solution: `nota1 = float(input("Ingresá la primera nota: "))
nota2 = float(input("Ingresá la segunda nota: "))
nota3 = float(input("Ingresá la tercera nota: "))

promedio = (nota1 + nota2 + nota3) / 3
print(f"El promedio es: {promedio:.2f}")`,
    tests: [
      { input: '15\n18\n20', expected: 'El promedio es: 17.67' },
    ],
    hints: [
      'Sumá las 3 notas y dividí entre 3',
      'Usá :.2f para mostrar solo 2 decimales',
      'Ejemplo: f"Promedio: {promedio:.2f}"',
    ],
  },
  {
    id: 'ej-2-5',
    week: 2,
    lessonId: '2.4',
    title: 'Edad en 2030',
    description: 'Pedí el nombre y la edad actual, y calculá cuántos años tendrá en 2030.',
    starterCode: `# Programa: Edad en 2030
# Pedí nombre y edad, calculá edad en 2030

nombre = input("¿Cómo te llamás? ")
edad = int(input("¿Cuántos años tenés ahora? "))

# Completá el código...`,
    solution: `nombre = input("¿Cómo te llamás? ")
edad = int(input("¿Cuántos años tenés ahora? "))

edad_2030 = edad + (2030 - 2026)
print(f"{nombre}, en el año 2030 tendrás {edad_2030} años.")`,
    tests: [
      { input: 'María\n20', expected: 'María, en el año 2030 tendrás 24 años.' },
    ],
    hints: [
      '2030 - 2026 = 4 años',
      'Sumá 4 a la edad actual',
      'Usá f-string para incluir el nombre',
    ],
  },

  // SEMANA 3: Ejercicios con condicionales
  {
    id: 'ej-3-1',
    week: 3,
    lessonId: '3.8',
    title: 'Positivo, negativo o cero',
    description: 'Determiná si un número es positivo, negativo o cero.',
    starterCode: `# Programa: Positivo, negativo o cero
# Pedí un número y determiná si es positivo, negativo o cero

numero = float(input("Ingresá un número: "))

# Completá el código...`,
    solution: `numero = float(input("Ingresá un número: "))

if numero > 0:
    print("El número es POSITIVO")
elif numero < 0:
    print("El número es NEGATIVO")
else:
    print("El número es CERO")`,
    tests: [
      { input: '5', expected: 'El número es POSITIVO' },
      { input: '-3', expected: 'El número es NEGATIVO' },
      { input: '0', expected: 'El número es CERO' },
    ],
    hints: [
      'Si es mayor que 0 → positivo',
      'Si es menor que 0 → negativo',
      'Si no es ni mayor ni menor → es cero',
    ],
  },
  {
    id: 'ej-3-2',
    week: 3,
    lessonId: '3.5',
    title: 'Clasificar nota (0-20)',
    description: 'Clasificá una nota del 0 al 20 según la escala venezolana.',
    starterCode: `# Programa: Clasificar nota
# Pedí una nota del 0 al 20 y clasificala

nota = float(input("Ingresá la nota (0-20): "))

# Completá el código...`,
    solution: `nota = float(input("Ingresá la nota (0-20): "))

if nota >= 18:
    print("Excelente 🏆")
elif nota >= 15:
    print("Bien 👍")
elif nota >= 12:
    print("Regular 🤔")
elif nota >= 10:
    print("Aprobado con lo justo 😐")
else:
    print("Reprobado 😞")`,
    tests: [
      { input: '19', expected: 'Excelente 🏆' },
      { input: '16', expected: 'Bien 👍' },
      { input: '13', expected: 'Regular 🤔' },
      { input: '10', expected: 'Aprobado con lo justo 😐' },
      { input: '8', expected: 'Reprobado 😞' },
    ],
    hints: [
      'La escala es: 18+ Excelente, 15+ Bien, 12+ Regular, 10+ Aprobado',
      'Usá elif para cada rango',
      'El último else es para los reprobados',
    ],
  },
  {
    id: 'ej-3-3',
    week: 3,
    lessonId: '3.8',
    title: 'Calculadora de descuento',
    description: 'Calculá el descuento según el total de la compra.',
    starterCode: `# Programa: Calculadora de descuento
# Pedí el total de la compra y calculá el descuento

total_compra = float(input("Ingresá el total de la compra (Bs.): "))

# Completá el código...`,
    solution: `total_compra = float(input("Ingresá el total de la compra (Bs.): "))

if total_compra >= 500:
    descuento = 30
elif total_compra >= 200:
    descuento = 20
elif total_compra >= 100:
    descuento = 10
else:
    descuento = 0

total_pagar = total_compra - (total_compra * descuento / 100)
print(f"Descuento aplicado: {descuento}%")
print(f"Total a pagar: Bs. {total_pagar:.2f}")`,
    tests: [
      { input: '600', expected: 'Descuento aplicado: 30%\nTotal a pagar: Bs. 420.00' },
      { input: '250', expected: 'Descuento aplicado: 20%\nTotal a pagar: Bs. 200.00' },
      { input: '150', expected: 'Descuento aplicado: 10%\nTotal a pagar: Bs. 135.00' },
      { input: '50', expected: 'Descuento aplicado: 0%\nTotal a pagar: Bs. 50.00' },
    ],
    hints: [
      '500+ → 30% descuento',
      '200+ → 20% descuento',
      '100+ → 10% descuento',
      'Menos de 100 → sin descuento',
    ],
  },
  {
    id: 'ej-3-4',
    week: 3,
    lessonId: '3.3',
    title: 'Par o impar',
    description: 'Determiná si un número es par o impar.',
    starterCode: `# Programa: Par o impar
# Pedí un número y determiná si es par o impar

numero = int(input("Ingresá un número entero: "))

# Completá el código...`,
    solution: `numero = int(input("Ingresá un número entero: "))

if numero % 2 == 0:
    print(f"{numero} es PAR")
else:
    print(f"{numero} es IMPAR")`,
    tests: [
      { input: '4', expected: '4 es PAR' },
      { input: '7', expected: '7 es IMPAR' },
      { input: '0', expected: '0 es PAR' },
    ],
    hints: [
      'Un número es par si el residuo de dividir entre 2 es 0',
      'Usá el operador módulo: %',
      'numero % 2 == 0 significa que es par',
    ],
  },
  {
    id: 'ej-3-5',
    week: 3,
    lessonId: '3.8',
    title: 'Simulador cajero automático',
    description: 'Simulá un cajero automático que valide el retiro.',
    starterCode: `# Programa: Simulador cajero automático
# Pedí el monto a retirar y validá

saldo = 5000
print(f"Bienvenido al cajero. Su saldo es Bs. {saldo}")

retiro = float(input("¿Cuánto desea retirar? Bs. "))

# Completá el código...`,
    solution: `saldo = 5000
print(f"Bienvenido al cajero. Su saldo es Bs. {saldo}")

retiro = float(input("¿Cuánto desea retirar? Bs. "))

if retiro > saldo:
    print("Saldo insuficiente ❌")
elif retiro <= 0:
    print("Monto inválido ❌")
elif retiro % 10 != 0:
    print("Solo se pueden retirar múltiplos de 10 Bs.")
else:
    saldo = saldo - retiro
    print(f"Retiro exitoso ✅. Su nuevo saldo es Bs. {saldo}")`,
    tests: [
      { input: '3000', expected: 'Retiro exitoso ✅. Su nuevo saldo es Bs. 2000' },
      { input: '6000', expected: 'Saldo insuficiente ❌' },
      { input: '15', expected: 'Solo se pueden retirar múltiplos de 10 Bs.' },
    ],
    hints: [
      'Verificá que el retiro no sea mayor al saldo',
      'Verificá que sea múltiplo de 10',
      'Verificá que no sea 0 o negativo',
    ],
  },

  // SEMANA 4: Ejercicios con bucles
  {
    id: 'ej-4-1',
    week: 4,
    lessonId: '4.2',
    title: 'Sumar del 1 al N',
    description: 'Sumá todos los números del 1 hasta N.',
    starterCode: `# Programa: Sumar del 1 al N
# Pedí un número N y sumá todos los del 1 al N

n = int(input("Ingresá un número: "))

# Completá el código...`,
    solution: `n = int(input("Ingresá un número: "))
suma = 0

for i in range(1, n + 1):
    suma = suma + i

print(f"La suma del 1 al {n} es: {suma}")`,
    tests: [
      { input: '5', expected: 'La suma del 1 al 5 es: 15' },
      { input: '10', expected: 'La suma del 1 al 10 es: 55' },
    ],
    hints: [
      'Inicializá suma en 0',
      'Usá for con range(1, n+1)',
      'En cada vuelta, sumá i a suma',
    ],
  },
  {
    id: 'ej-4-2',
    week: 4,
    lessonId: '4.2',
    title: 'Tablas de multiplicar',
    description: 'Mostrá la tabla de multiplicar de un número del 1 al 10.',
    starterCode: `# Programa: Tabla de multiplicar
# Pedí un número y mostrá su tabla

numero = int(input("¿De qué número querés la tabla? "))

# Completá el código...`,
    solution: `numero = int(input("¿De qué número querés la tabla? "))

print(f"Tabla de multiplicar del {numero}:")
for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} × {i} = {resultado}")`,
    tests: [
      { input: '7', expected: 'Tabla de multiplicar del 7:\n7 × 1 = 7\n7 × 2 = 14\n7 × 3 = 21\n7 × 4 = 28\n7 × 5 = 35\n7 × 6 = 42\n7 × 7 = 49\n7 × 8 = 56\n7 × 9 = 63\n7 × 10 = 70' },
    ],
    hints: [
      'Usá range(1, 11) para ir del 1 al 10',
      'En cada vuelta, multiplicá numero × i',
      'Usá f-string para formatear la salida',
    ],
  },
  {
    id: 'ej-4-3',
    week: 4,
    lessonId: '4.3',
    title: 'Sumar hasta "salir"',
    description: 'Sumá números hasta que el usuario escriba "salir".',
    starterCode: `# Programa: Sumar hasta "salir"
# Pedí números y sumalos hasta que escriba "salir"

suma = 0

# Completá el código...`,
    solution: `suma = 0

while True:
    entrada = input("Ingresá un número (o 'salir' para terminar): ")
    if entrada.lower() == "salir":
        break
    suma = suma + float(entrada)
    print(f"Suma parcial: {suma}")

print(f"Suma total: {suma}")`,
    tests: [
      { input: '5\n3\n2\nsalir', expected: 'Suma parcial: 5.0\nSuma parcial: 8.0\nSuma parcial: 10.0\nSuma total: 10.0' },
    ],
    hints: [
      'Usá while True para un bucle infinito',
      'Verificá si el input es "salir" con .lower()',
      'Usá break para salir del bucle',
    ],
  },
  {
    id: 'ej-4-4',
    week: 4,
    lessonId: '4.4',
    title: 'Juego de adivinanza',
    description: 'Adiviná el número secreto entre 1 y 10 con 3 intentos.',
    starterCode: `# Programa: Juego de adivinanza
# La computadora elige un número y vos lo adivinás

import random

secreto = random.randint(1, 10)
intentos_maximos = 3
intentos = 0

print("🎯 Juego de Adivinanza")
print("Adiviná el número entre 1 y 10")
print(f"Tenés {intentos_maximos} intentos")

# Completá el código...`,
    solution: `import random

secreto = random.randint(1, 10)
intentos_maximos = 3
intentos = 0

print("🎯 Juego de Adivinanza")
print("Adiviná el número entre 1 y 10")
print(f"Tenés {intentos_maximos} intentos")

while intentos < intentos_maximos:
    intentos = intentos + 1
    guess = int(input(f"Intento #{intentos}: "))

    if guess == secreto:
        print(f"🎉 ¡Adivinaste! El número era {secreto}")
        break
    elif guess < secreto:
        print("🔼 Más arriba...")
    else:
        print("🔽 Más abajo...")

if intentos == intentos_maximos and guess != secreto:
    print(f"😞 Se te acabaron los intentos. El número era {secreto}")`,
    tests: [
      { input: '7', expected: '🎉 ¡Adivinaste! El número era 7' },
    ],
    hints: [
      'Usá random.randint(1, 10) para generar el número',
      'Contá los intentos con una variable',
      'Si el número es mayor, decí "Más arriba"',
      'Si es menor, decí "Más abajo"',
    ],
  },
  {
    id: 'ej-4-5',
    week: 4,
    lessonId: '4.3',
    title: 'Menú interactivo',
    description: 'Creá un menú que se repita hasta que el usuario elija salir.',
    starterCode: `# Programa: Menú interactivo
# Mostrá un menú y repetí hasta que elija salir

print("=== SISTEMA DE NOTAS ===")

# Completá el código...`,
    solution: `print("=== SISTEMA DE NOTAS ===")

while True:
    print("\\n--- MENÚ ---")
    print("1. Ingresar notas")
    print("2. Ver promedio")
    print("3. Salir")

    opcion = input("Elegí una opción: ")

    if opcion == "1":
        n1 = float(input("Nota 1: "))
        n2 = float(input("Nota 2: "))
        n3 = float(input("Nota 3: "))
        print("✅ Notas guardadas")
    elif opcion == "2":
        try:
            promedio = (n1 + n2 + n3) / 3
            print(f"📊 El promedio es: {promedio:.2f}")
        except NameError:
            print("⚠️ Primero ingresá las notas (opción 1)")
    elif opcion == "3":
        print("👋 Hasta luego!")
        break
    else:
        print("❌ Opción inválida")`,
    tests: [
      { input: '1\n15\n18\n20\n2\n3', expected: '✅ Notas guardadas\n📊 El promedio es: 17.67\n👋 Hasta luego!' },
    ],
    hints: [
      'Usá while True para el bucle del menú',
      'Mostrá las opciones con print()',
      'Leé la opción con input()',
      'Usá if/elif para cada opción',
      'Usá break para salir',
    ],
  },
]

export const weekExercises = [
  { week: 1, exerciseIds: ['ej-1-1', 'ej-1-2'] },
  { week: 2, exerciseIds: ['ej-2-1', 'ej-2-2', 'ej-2-3', 'ej-2-4', 'ej-2-5'] },
  { week: 3, exerciseIds: ['ej-3-1', 'ej-3-2', 'ej-3-3', 'ej-3-4', 'ej-3-5'] },
  { week: 4, exerciseIds: ['ej-4-1', 'ej-4-2', 'ej-4-3', 'ej-4-4', 'ej-4-5'] },
]
