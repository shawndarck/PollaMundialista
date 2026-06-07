# Publicacion gratuita

## Opcion recomendada

- Host: Render Web Service gratis.
- Base de datos: Neon Postgres gratis.

## Variables necesarias

En Render configura:

```txt
DATABASE_URL=postgresql://...
```

El servidor crea automaticamente la tabla `app_state` la primera vez que arranca.

## Comandos

```bash
npm install
npm start
```

## Notas

- Si `DATABASE_URL` no existe, el servidor usa `.polla-state.json` localmente.
- En produccion usa siempre `DATABASE_URL` para que los datos sobrevivan reinicios.
- No subas `.env`, `.polla-state.json` ni `node_modules`.
