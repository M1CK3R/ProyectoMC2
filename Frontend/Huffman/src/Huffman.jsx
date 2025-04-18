import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import './EstiloHuffman.css';

export default function HuffmanPage() {
  const [mensaje, setMensaje] = useState('');
  const [codificacion, setCodificacion] = useState('');
  const [arbolImagen, setArbolImagen] = useState('https://us.123rf.com/450wm/ahasoft2000/ahasoft20001909/ahasoft2000190901449/129974593-icono-plano-de-%C3%A1rbol-binario-de-trama-v5-el-estilo-del-pictograma-de-trama-es-un-icono-de-%C3%A1rbol.jpg?ver=6');
  const [codigos, setCodigos] = useState({});
  const [error, setError] = useState('');

  const codificarMensaje = async () => {
      if (!mensaje) {
          alert('Por favor, ingresa un mensaje para codificar.');
          return;
      }



      try {
          setError('');
          
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

          setCodigos(datos.codigos);
          setArbolImagen(datos.imagen);
          
          const mensajeCodificado = mensaje.split('').map(caracter => {
              return datos.codigos[caracter] || '';
          }).join('');

          setCodificacion(mensajeCodificado);

      } catch (error) {
          setError(error.message);
      }
  };

  const exportarPDF = async () => {
      if (arbolImagen === 'https://us.123rf.com/450wm/ahasoft2000/ahasoft20001909/ahasoft2000190901449/129974593-icono-plano-de-%C3%A1rbol-binario-de-trama-v5-el-estilo-del-pictograma-de-trama-es-un-icono-de-%C3%A1rbol.jpg?ver=6') {
          alert('Primero codifica un mensaje');
          return;
      }
      
      try {
        const doc = new jsPDF();
        let yPosition = 10;
    
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Árbol de Huffman", 10, yPosition);
        yPosition += 15;
    
        const img = new Image();
        img.src = arbolImagen;
        
        await new Promise((resolve) => (img.onload = resolve));
    
        const pageWidth = doc.internal.pageSize.getWidth() - 20;
        const scaleFactor = pageWidth / img.width;
        const imgHeight = img.height * scaleFactor;
    
        doc.addImage(img, 'PNG', 10, yPosition, pageWidth, imgHeight);
        yPosition += imgHeight + 15;


    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Tabla de Códigos:", 10, yPosition);
    yPosition += 8;

    doc.setFont("helvetica", "normal");
    Object.entries(codigos).forEach(([caracter, codigo], index) => {
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 10;
      }
      
      const texto = `${caracter === ' ' ? '[Espacio]' : caracter}: ${codigo}`;
      doc.text(texto, 10 + (index % 2 === 0 ? 0 : 90), yPosition);
      
      if (index % 2 === 1) yPosition += 8;
    });

    yPosition += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Texto Codificado:", 10, yPosition);
    yPosition += 8;
    
    doc.setFont("helvetica", "normal");
    const textoCodificado = codificacion.match(/.{1,50}/g) || [codificacion];
    textoCodificado.forEach(linea => {
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 10;
      }
      
      doc.text(linea, 10, yPosition);
      yPosition += 8;
    });
    
        doc.save(`ArbolHuffman-${Date.now()}.pdf`);
    
      } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('Error al generar el PDF');
      }
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
    
            <img className="imagen" src={arbolImagen}  alt="Árbol de Huffman" />
    
            <div className="divider"></div>
    
            <div className="output">
              <div className="output-text">Frase encriptada: {codificacion || '---'}</div>

            </div>
          </div>
          <footer className="footer" />
        </div>
      );
}
