# Juego de Programacion

## Backend (Django)

### Requisitos
- Python (recomendado: usar el lanzador `py` en Windows)
- MySQL (crear una base de datos llamada `juego`)

### Configuración
1. (Opcional) Crear `juegoBackend/.env` a partir de `juegoBackend/.env.example` y ajustar credenciales.
2. Instalar dependencias:

```
cd juegoBackend
py -m pip install -r requirements.txt
```

### Ejecutar
1. Ejecutar migraciones:

```
py manage.py migrate
```

2. Cargar preguntas de ejemplo:

```
py manage.py seed_questions
```

3. Iniciar servidor:

```
py manage.py runserver
```

## Frontend (React)

### Requisitos
- Node.js (recomendado: 20.19+ o 22.12+)

### Ejecutar
1. Instalar dependencias:

```
cd juegoFrontend
npm install
```

2. Iniciar desarrollo:

```
npm run dev -- --host
```
