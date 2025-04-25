from flask import Flask, jsonify, request, send_from_directory
from main import getArbolito, obtenerLosCodigos
from flask_cors import CORS
from graficarArbol import dibujarArbolito
import os
import uuid

app = Flask(__name__)
CORS(app)
app.config['STATIC_FOLDER'] = 'static'

os.makedirs(app.config['STATIC_FOLDER'], exist_ok=True)

@app.route('/codificar', methods=['POST'])
def procesarPalabra():
    try:
        # Verificar si se recibió JSON
        if not request.is_json:
            return jsonify({"error": "Se esperaba JSON"}), 400

        datos = request.get_json()
        
        if 'palabra' not in datos:
            return jsonify({"error": "Falta el campo 'palabra'"}), 400
            
        palabra = datos['palabra']
        
        if not palabra:
            return jsonify({"error": "Debes enviar una palabra"}), 400
        
        arbol = getArbolito(palabra)
        codigos = obtenerLosCodigos(arbol)
        
        nombreArchivo = f"arbol_{uuid.uuid4().hex}"
        
        grafico = dibujarArbolito(arbol)

        if grafico is None:
            return jsonify({"error": "No se pudo generar el gráfico del árbol"}), 500
        
        rutaImagen = os.path.join(app.config['STATIC_FOLDER'], nombreArchivo)

        grafico.render(rutaImagen, format='png', cleanup=True)  # Render aquí

        
        return jsonify({
            "palabra": palabra,
            "codigos": codigos,
            "imagen": f"http://localhost:5000/imagen/{nombreArchivo}.png"
        })
    
    except Exception as e:
        return jsonify({"error": f"Error interno: {str(e)}"}), 500

@app.route('/imagen/<nombre>')
def obtener_imagen(nombre):
    return send_from_directory(app.config['STATIC_FOLDER'], f"{nombre}")

if __name__ == '__main__':
    app.run(debug=True)