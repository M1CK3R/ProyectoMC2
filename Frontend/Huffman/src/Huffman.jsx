import React from 'react';
import './EstiloHuffman.css';
//import imagen from './6443cd47-1a56-4a49-be69-e42136e9fbf9.jpg'; //

export default function HuffmanPage() {
    return (
        <div className="page">
          <header className="header" />
          <div className="card">
            <h1 className="title">Árbol de Huffman</h1>
    
            <div className="input-label">
              <label htmlFor="mensaje">Ingresar un mensaje:</label>
            </div>
    
            <div className="divider"></div>
    
            <textarea id="mensaje" className="textarea" />

            <button type="button" className='button'>Codificar</button>
    
            <div className="divider"></div>
    
            <div className="flex-row">
              <div className="flex-col"> {/* Aquí podrías poner resultados dinámicos luego */} </div>
            </div>
    
            <div className="flex-row">
              <div className="flex-col"> {/* Aquí podrías poner resultados dinámicos luego */} </div>
            </div>
    
            <div className="divider"></div>
    
            <img className="imagen" src={"https://us.123rf.com/450wm/ahasoft2000/ahasoft20001909/ahasoft2000190901449/129974593-icono-plano-de-%C3%A1rbol-binario-de-trama-v5-el-estilo-del-pictograma-de-trama-es-un-icono-de-%C3%A1rbol.jpg?ver=6"} alt="Árbol de Huffman" />
    
            <div className="divider"></div>
    
            <div className="output">
              <div className="output-text">Frase encriptada: </div>
            </div>
          </div>
          <footer className="footer" />
        </div>
      );
}



/*export default function HuffmanPage() {
    return (
      <div className="gjs-t-body">
        <header className="head"></header>
        <div className="card">
          <h1 className="gjs-t-h1">Árbol de Huffman</h1>
  
          <div id="ihici">
            <div id="ibmbi">Ingresar un mensaje:</div>
          </div>
  
          <div className="gjs-divider"></div>
  
          <textarea id="inf9d" />
  
          <div className="gjs-divider"></div>
  
          <div className="gjs-plg-flex-row" id="i5qhk">
            <div className="gjs-plg-flex-column" id="ilj55">Column</div>
          </div>
  
          <div className="gjs-plg-flex-row" id="i5mgg">
            <div className="gjs-plg-flex-column" id="iyq8d">Column</div>
          </div>
  
          <div className="gjs-divider"></div>
  
          <img id="ihz4f" src={imagen} alt="imagen del árbol de Huffman" />
  
          <div className="gjs-divider"></div>
  
          <div id="i2b2e">
            <div id="ixaeg">Aqui va el texto encriptado</div>
          </div>
        </div>
        <footer id="i70iz"></footer>
      </div>
    );
  }
*/