from graphviz import Digraph;
from main import NodoArbolito, getArbolito;

def dibujarArbolito(nodo):
    dibujo = Digraph();
    pila = [(nodo, 'raiz')];

    while pila:
        nodoActual, nombre = pila.pop();
        
        if nodoActual.letra:
            etiqueta = f"{nodoActual.letra} ({nodoActual.peso})"
        
        else:
            etiqueta = f"{nodoActual.peso}"

        dibujo.node(name=nombre, label=etiqueta, shape='circle', style='filled', fillcolor='lightblue');

        if nodoActual.LadoIzq:
            nombreIzquierdo = nombre + "0";
            dibujo.edge(nombre, nombreIzquierdo, label='0');
            pila.append( (nodoActual.LadoIzq, nombreIzquierdo) );

        if nodoActual.LadoDer:
            nombreDerecho = nombre + "1";
            dibujo.edge(nombre, nombreDerecho, label='1');
            pila.append( (nodoActual.LadoDer, nombreDerecho) );

    dibujo.render("arbol", view=True, format='png', cleanup=True);
    print("El árbol ha sido dibujado y guardado como 'arbol.png'.");

if __name__ == "__main__":

    palabra = input("Ingresa la palabra: ")
    raiz = getArbolito(palabra)
    dibujarArbolito(raiz)