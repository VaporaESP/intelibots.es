# CONTEXTO DE NEGOCIO — InteliBots.es
# Lee esto antes de tocar cualquier archivo

---

## QUÉ ES INTELIBOTS

InteliBots es un negocio unipersonal que ofrece DOS servicios únicamente:

1. **Implementación de Agentes de IA** en webs de pequeños negocios
2. **Creación de páginas web profesionales** en WordPress (con opción de incluir el agente)

No somos una agencia grande. No hacemos apps móviles. No hacemos SaaS. No hacemos consultoría. Solo estas dos cosas.

---

## CLIENTE OBJETIVO (micronicho actual)

**Directores y propietarios de academias de oposiciones en Cataluña.**

- Edad: 35–55 años
- Negocio físico establecido, poca presencia digital
- No son técnicos — necesitan ver el resultado, no entender la tecnología
- Entienden el valor del dinero — necesitan ver ROI claro antes de comprar
- Decisión de compra rápida si confían en el resultado

**Oposiciones más relevantes en Cataluña:** Mossos d'Esquadra, Policía Local, Auxiliar Administrativo Generalitat, Correus, Bomberos.

---

## PROPUESTA DE VALOR CENTRAL

> "Tu academia capta alumnos automáticamente mientras duermes.
> Un agente de IA responde, cualifica y agenda clases de prueba 24/7
> — sin que tú estés pendiente."

**Lo que vendemos NO es tecnología.** Vendemos el resultado: más alumnos captados, menos tiempo perdido respondiendo preguntas, leads calientes por WhatsApp a cualquier hora.

---

## CÓMO FUNCIONA EL PRODUCTO

El agente de IA se instala en la web del cliente (Typebot + OpenAI GPT-4o-mini):

1. Visitante llega a la web de la academia
2. El agente lo saluda y hace preguntas de cualificación
3. Recoge: nombre, email, teléfono, oposición que le interesa
4. Agenda clase de prueba gratuita (integración con Calendly)
5. Director recibe notificación por WhatsApp y email en segundos

Stack técnico: Typebot → OpenAI API → n8n (automatizaciones) → WhatsApp Business API / Gmail

---

## ESTRUCTURA DE LA WEB (intelibots.es)

```
/                           → Homepage general (qué hacemos, demo en vivo)
/servicios/agentes-ia       → Servicio 1: Agentes IA (página más importante)
/servicios/paginas-web      → Servicio 2: Creación de webs
/demo                       → Demo interactiva del agente (academia ficticia)
/como-funciona              → Proceso en 3 pasos
/contacto                   → Precios + Calendly (sin formulario)
```

**Páginas en borrador (NO tocar, NO mostrar en menú):**
- /ecommerce
- /turismo
- /salud
- /real-estate

---

## PRECIOS
"Aun hay que definirlos

---

## MENÚ DE NAVEGACIÓN (exacto)
"falta data aun"

---

## LO QUE NO DEBE APARECER EN LA WEB

- Sectores descartados: eCommerce, turismo, salud, real estate (están en borrador)
- Logos de clientes ficticios o genéricos
- Lenguaje demasiado técnico: no hablar de "omnicanal", "ecosistema digital", "chatbots de atención al cliente"
- Formularios de contacto como único CTA — siempre ofrecer Calendly directo
- Precios sin orientación — siempre mostrar "desde X€"

---

## EL ELEMENTO DIFERENCIADOR (el más importante)

En la página /servicios/agentes-ia hay una sección llamada **"Caso práctico: Academia de oposiciones"**. (demo)

Aquí aparece un **mockup realista de una web de academia ficticia** ("Academia Preparat") con su propio chatbot de Typebot funcionando DENTRO del mockup. El visitante puede hablar con el agente directamente desde esta sección, como si estuviera en la web de la academia.

Debajo del mockup aparece una imagen de notificación de WhatsApp mostrando el lead que habría llegado al director.

Este elemento tiene que ser el más cuidado visualmente de toda la web.

---

## REGLAS PARA CLAUDE CODE

1. **Cada decisión de diseño tiene que servir a UN objetivo**: que un director de academia en Cataluña confíe en InteliBots y agende una llamada.

2. **El CTA principal siempre es "Ver demo en vivo →"** que lleva a /demo. El secundario es "Agendar llamada" que lleva a Calendly.

3. **No añadir secciones, páginas ni servicios** que no estén en este documento sin confirmación explícita.

4. **El lenguaje es siempre en español neutro** (no catalán, no inglés) excepto términos técnicos como "WhatsApp", "Calendly", "IA".

5. **Mobile-first** — el 70% de directores de academia verán la web desde el móvil.

6. **Velocidad** — cada imagen optimizada, scripts cargados en diferido, score de PageSpeed > 85.

7. **La demo (/demo) es la página más importante después de la home** — tiene que cargar rápido y el chat tiene que ser lo primero visible sin scroll.

---

## FRASE DE VALIDACIÓN

Antes de implementar cualquier sección nueva, pregúntate:
**"¿Esto ayuda a que un director de academia de oposiciones confíe en InteliBots y agende una llamada?"**

Si la respuesta no es un sí claro, no lo hagas.
