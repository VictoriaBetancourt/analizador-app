module.exports = async function (context, req) {
    context.log('Procesando texto en la API Serverless...');

    // Obtenemos el texto enviado desde el frontend (SPA)
    const texto = req.body && req.body.texto;

    if (!texto) {
        context.res = {
            status: 400,
            body: { error: "Por favor, envía un texto en el cuerpo de la petición (JSON con la propiedad 'texto')." }
        };
        return;
    }

    // 1. Cálculo de caracteres totales
    const caracteresTotales = texto.length;

    // 2. Cálculo de caracteres sin contar los espacios en blanco
    const caracteresSinEspacios = texto.replace(/\s/g, "").length;
    
    // 3. Cálculo de palabras (separadas por espacios)
    const palabrasArray = texto.trim() === "" ? [] : texto.trim().split(/\s+/);
    const totalPalabras = palabrasArray.length;

    // 4. Tiempo estimado de lectura (calculado con un promedio estándar de 200 palabras por minuto)
    const tiempoLecturaMinutos = Math.ceil(totalPalabras / 200);

    // 5. Cálculo de oraciones (separadas por puntos, signos de interrogación o exclamación)
    const oracionesArray = texto.split(/[.!?]+/).filter(Boolean);
    const totalOraciones = oracionesArray.length;

    // Preparamos la respuesta HTTP en formato JSON
    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            palabras: totalPalabras,
            caracteres: caracteresTotales,
            caracteresSinEspacios: caracteresSinEspacios,
            oraciones: totalOraciones,
            tiempoLectura: `${tiempoLecturaMinutos} min(s)`
        }
    };
};