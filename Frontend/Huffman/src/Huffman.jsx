import React, { useState } from 'react';
import './EstiloHuffman.css';
//import imagen from './6443cd47-1a56-4a49-be69-e42136e9fbf9.jpg'; //

export default function HuffmanPage() {
  const [mensaje, setMensaje] = useState('');
  const [codificacion, setCodificacion] = useState('');
  const [arbolImagen, setArbolImagen] = useState('');
  const [codigos, setCodigos] = useState({});
  const [error, setError] = useState('');

  const codificarMensaje = async () => {
      try {
          // Limpiar estados anteriores
          setError('');
          
          // Hacer petición a la API
          const respuesta = await fetch('http://localhost:5000/encode', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ palabra: mensaje }),
          });

          const datos = await respuesta.json();

          if (!respuesta.ok) {
              throw new Error(datos.error || 'Error al procesar el mensaje');
          }

          // Actualizar estados con la respuesta
          setCodigos(datos.codigos);
          setArbolImagen(datos.imagen);
          
          // Generar mensaje codificado
          const mensajeCodificado = mensaje.split('').map(caracter => {
              return datos.codigos[caracter] || '';
          }).join('');

          setCodificacion(mensajeCodificado);

      } catch (error) {
          setError(error.message);
      }
  };

  const exportarPDF = () => {
      if (!arbolImagen) {
          alert('Primero codifica un mensaje');
          return;
      }
      
      // Descargar la imagen
      const link = document.createElement('a');
      link.href = arbolImagen;
      link.download = 'arbol-huffman.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };



    return (
        <div className="page">
          <header className="header" />
          <div className="card">
            <h1 className="title">Árbol de Huffman</h1>
    
            <div className="input-label">
              <label htmlFor="mensaje">Ingresar un mensaje:</label>
            </div>
    
            <div className="divider"></div>
    
            <textarea id="mensaje" className="textarea" value={mensaje} onChange={(e) => setMensaje(e.target.value)}/>

            <div className='divButtons'>
              <button type="button" className='button' onClick={codificarMensaje}>Codificar</button>
              <button type="button" className='button' onClick={exportarPDF}>Exportar PDF del Árbol</button>
            </div>

            {error && <div className="error-message">{error}</div>}
    
            <div className="divider"></div>
    
            <div className="flex-row">
              <div className="flex-col">
                {Object.keys(codigos).length > 0 && (
                    <>
                        <h3>Códigos Huffman:</h3>
                        <ul className="lista-codigos">
                            {Object.entries(codigos).map(([caracter, codigo]) => (
                                <li key={caracter}>
                                    {caracter === ' ' ? '[Espacio]' : caracter}: {codigo}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
              </div>
            </div>
    
            <div className="divider"></div>
    
            <img className="imagen" src={arbolImagen} alt="Árbol de Huffman" />
    
            <div className="divider"></div>
    
            <div className="output">
              <div className="output-text">Frase encriptada: {codificacion || '---'}</div>

            </div>
          </div>
          <footer className="footer" />
        </div>
      );
}
