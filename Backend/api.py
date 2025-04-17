from flask import Flask, jsonify, request, send_from_directory
from main import getArbolito, obtenerLosCodigos
from graficarArbol import dibujarArbolito
import os
import uuid

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'

# Crear carpeta para guardar imágenes
os.makedirs(app.config['STATIC_FOLDER'], exist_ok=True)

@app.route('/encode', methods=['POST'])
def procesarPalabra():
    try:
        # Obtener palabra del cuerpo de la solicitud
        datos = request.get_json()
        palabra = datos.get('palabra', '')
        
        if not palabra:
            return jsonify({"error": "Debes enviar una palabra"}), 400
        
        # Generar códigos Huffman
        arbol = getArbolito(palabra)
        codigos = obtenerLosCodigos(arbol)
        
        # Generar nombre único para la imagen
        nombreArchivo = f"arbol_{uuid.uuid4().hex}"
        rutaImagen = os.path.join(app.config['STATIC_FOLDER'], nombreArchivo)
        
        # Dibujar y guardar el árbol
        dibujarArbolito(arbol).render(rutaImagen, format='png', cleanup=True)
        
        return jsonify({
            "palabra": palabra,
            "codigos": codigos,
            "imagen": f"http://localhost:5000/imagen/{nombreArchivo}.png"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/imagen/<nombre>')
def obtener_imagen(nombre):
    return send_from_directory(app.config['STATIC_FOLDER'], f"{nombre}")

if __name__ == '__main__':
    app.run(debug=True)