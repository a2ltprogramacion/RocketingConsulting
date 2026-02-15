# MANUAL DE OPERACIONES: Rocketing Consulting (A2LT Authority)

**Versión:** 1.0
**Fecha:** 15 de Febrero, 2026
**Autor:** A2LT Soluciones (AI Assisted)

---

## 1. Visión General del Sistema

**Rocketing Consulting** es una plataforma web diseñada para ofrecer servicios de consultoría de élite y acceso a una base de conocimiento exclusiva. El sistema combina una interfaz pública moderna con un área restringida para usuarios registrados.

### Stack Tecnológico

- **Frontend**: Astro (Static Site Generator con islas dinámicas).
- **Estilos**: Tailwind CSS.
- **Infraestructura**: Netlify (Edge/Serverless Functions).
- **Base de Datos**: Netlify Blobs (Almacenamiento Key-Value persistente para usuarios).
- **Gestor de Contenido**: Markdown / Content Collections (Sistema de archivos).

---

## 2. Flujos de Usuario (User Journeys)

### A. Visitante Público

Los visitantes pueden navegar libremente por:

- **Home**: Visión general, clientes y testimonios.
- **Servicios**: Catálogo de ofertas de consultoría.
- **Pasarela de Pago Simulada**: Punto de entrada para convertirse en usuario.

### B. Proceso de Compra y Registro

Este es el flujo crítico desarrollado para la simulación académica/demo:

1.  **Inicio**: El usuario va a `/pago`.
2.  **Simulación de Pago**:
    - Llena el formulario (Banco, Comprobante, Monto).
    - Al enviar, el sistema valida visualmente y muestra "Pago Confirmado".
3.  **Registro de Cuenta**:
    - Aparece inmediatamente el formulario de "Crear Usuario".
    - El usuario ingresa `Usuario` y `Contraseña`.
    - **Backend**: El sistema guarda las credenciales en **Netlify Blobs** (persistencia en la nube).
4.  **Finalización**: El usuario es redirigido al Login.

### C. Acceso a Contenido Exclusivo (Knowledge)

El área `/knowledge` está protegida.

1.  **Intento de Acceso**: Si un usuario anónimo intenta entrar, es rebotado a `/login`.
2.  **Login**:
    - Ingresa credenciales en `/login`.
    - **Backend**: Valida contra la base de datos en Netlify Blobs.
    - **Sesión**: Se crea una cookie segura (`auth_token`) válida por 7 días.
3.  **Consumo**: Una vez logueado, tiene acceso completo a los artículos y proyectos en `/knowledge`.

---

## 3. Administración y Gestión de Contenidos

El sitio utiliza **Astro Content Collections**. Todo el contenido vive en la carpeta `src/content`.

### Agregar un Nuevo Servicio

Ubicación: `src/content/services/`
Crear un archivo `.md` con el siguiente esquema:

```markdown
---
title: "Título del Servicio"
main_image: "../path/to/image.jpg"
main_image_alt: "Descripción accesible"
description: "Resumen corto"
price: "Consultar"
category: "Consultoría"
---

Contenido detallado...
```

### Agregar un Proyecto (Knowledge)

Ubicación: `src/content/knowledge/`
Sigue el mismo esquema que servicios. Estos ítems serán **invisibles** para usuarios no registrados.

---

## 4. Manual Técnico y Mantenimiento

### Persistencia de Datos (Usuarios)

A diferencia de un sitio estático tradicional, este proyecto tiene "estado" (usuarios).

- **Tecnología**: `@netlify/blobs`
- **Store Name**: `users`
- **Ubicación**: Nube de Netlify (No visible en el repo de GitHub).
- **Nota**: Los usuarios creados en `dev` (local) **NO** existen en producción, y viceversa, a menos que se vinculen los entornos.

### Despliegue (Deployment)

El sitio está configurado para **Continuous Deployment** en Netlify.

1.  Hacer cambios en el código.
2.  Ejecutar:
    ```bash
    git add .
    git commit -m "Descripción del cambio"
    git push origin main
    ```
3.  Netlify detectará el commit, construirá el sitio (`npm run build`) y lo publicará automáticamente.

### Solución de Problemas Comunes

**Error: "Types mismatch ArrayBuffer to string" en Login**
_Causa_: La librería de Blobs puede devolver binarios.
_Solución_: Siempre pedir texto explícitamente: `store.get(key, { type: 'text' })`. (Ya implementado en el código actual).

**Error: Datos de usuario perdidos**
_Causa_: Si se usaba el sistema de archivos local (`fs`), los datos se borraban al reiniciar el servidor.
_Solución_: Se migró a Netlify Blobs. Ahora los datos son seguros y persistentes.

---

## 5. Comandos Utiles

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run build`: Compila el sitio para producción (genera carpeta `dist/` y funciones serverless).
- `netlify link`: Vincula tu entorno local con el sitio en la nube (necesario para probar Blobs localmente con datos reales).
