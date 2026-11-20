# Grepolis → ChatGPT (prototipo de solo lectura)

**Estado:** prototipo sin probar en una sesión real de Grepolis. No es un plugin de ChatGPT ni una conexión en tiempo real.

## Opción sencilla: Tampermonkey
1. En Brave para Windows, abrí Tampermonkey → Crear nuevo script.
2. Pegá el contenido completo de [grepolis-chatgpt.user.js](./grepolis-chatgpt.user.js) y guardá.
3. Recargá Grepolis. Aparecerá abajo a la derecha **Exportar para ChatGPT**.
4. Hacé clic: se descargará un archivo `grepolis-snapshot-AAAA-MM-DD.json`.
5. Adjuntá ese JSON a ChatGPT y pedí un plan de edificios, tropas o recursos.

El botón no instala ni modifica ModernBot. Podés desactivar el script en Tampermonkey cuando quieras.

## Alternativa técnica
El archivo [snapshot.js](./snapshot.js) puede ejecutarse manualmente desde la consola del navegador.

## Datos exportados
Nombre e ID de ciudad, madera, piedra, plata, almacén, población libre, niveles de edificios, tropas y cantidad de órdenes de construcción (cuando la API del cliente expone el dato).

## Seguridad y limitaciones
- El script **no** envía datos a un servidor, ni hace solicitudes de red, ni ejecuta construcciones, reclutamientos o comercio.
- Los datos se leen desde el cliente del juego; si Grepolis cambia su API, podrían faltar campos o fallar.
- No exporta contraseñas, cookies ni tokens de sesión. Revisá el JSON antes de compartirlo.
- La información es una foto del momento de exportación, no seguimiento continuo.
- Grepolis puede restringir scripts de terceros; verificá sus reglas antes de utilizarlo.
