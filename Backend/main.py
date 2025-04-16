class NodoArbolito:
    def __init__(self, caracter, contador):
        self.caracter = caracter
        self.contador = contador
        self.LadoIzq = None
        self.LadoDer = None

def hacerElArbolito(frecuencias): 
    listaNodos = []
    
    for caracter, cuenta    in frecuencias:

        listaNodos.append(NodoArbolito(caracter, cuenta))
    
    while len(listaNodos) != 1:

        # Se va a ordenar con método burbuja
        for vuelta in range(len(listaNodos)):
            for indice in range(len(listaNodos)-1):
                if listaNodos[indice].contador > listaNodos[indice+1].contador:
                    temp = listaNodos[indice]
                    listaNodos[indice] = listaNodos[indice+1]
                    listaNodos[indice+1] = temp
        
        nodoPequeño1 = listaNodos.pop(0)
        nodoPequeño2 = listaNodos.pop(0)
        
        nuevoContador = nodoPequeño1.contador + nodoPequeño2.contador
        nodoNuevo = NodoArbolito(None, nuevoContador)
        nodoNuevo.LadoIzq = nodoPequeño1
        nodoNuevo.LadoDer = nodoPequeño2
        
        listaNodos.append(nodoNuevo)
    
    return listaNodos[0]

def obtenerLosCodigos(raizArbol):
    diccionarioCodigos = {}
    
    def explorarNodos(nodoActual, codigoTemporal):
        if nodoActual is None:
            return None
        
        if nodoActual.caracter != None:
            diccionarioCodigos[nodoActual.caracter] = codigoTemporal
            return True
        
        explorarNodos(nodoActual.LadoIzq, codigoTemporal + "0")
        explorarNodos(nodoActual.LadoDer, codigoTemporal + "1")
    
    explorarNodos(raizArbol, "")
    return diccionarioCodigos

def contarLetras(frase):
    listaLetras = []
    listaCuentas = []
    
    for letra in frase:
        encontrado = False
        for i in range(len(listaLetras)):
            if listaLetras[i] == letra:
                listaCuentas[i] += 1
                encontrado = True
                break
        if not encontrado:
            listaLetras.append(letra)
            listaCuentas.append(1)
    
    resultadoFinal = []
    for j in range(len(listaLetras)):
        resultadoFinal.append( (listaLetras[j], listaCuentas[j]) )
    
    return resultadoFinal


def quicksort(lista, inicio, final):
    if inicio >= final:
        return
    
    piv = lista[inicio][1]
    menores = []
    mayores = []
    
    for elemento in lista[inicio+1:final+1]:
        if elemento[1] <= piv:
            menores.append(elemento)
        else:
            mayores.append(elemento)
    
    nuevaLista = menores + [lista[inicio]] + mayores
    for k in range(len(nuevaLista)):
        lista[inicio + k] = nuevaLista[k]
    
    posicionPivote = inicio + len(menores)
    quicksort(lista, inicio, posicionPivote-1)
    quicksort(lista, posicionPivote+1, final)

def ordenarListaPorQuicksort(lista):
    tamanoDeLista = len(lista)
    if tamanoDeLista > 0:
        quicksort(lista, 0, tamanoDeLista - 1)

    return quicksort(lista, 0, len(lista)-1)

def main():
    textoUsuario = str(input("Ingresar una palabra: "))
    
    pesosYLetras = contarLetras(textoUsuario)
    
    copiaFrecuencias = pesosYLetras.copy()
    ordenarListaPorQuicksort(copiaFrecuencias)
    
    arbolito = hacerElArbolito(copiaFrecuencias)
    
    codigosHuffman = obtenerLosCodigos(arbolito)
    
    print("\nResultados:")
    for caracter in codigosHuffman:
        print(f"Carácter:", caracter, "Código: ",codigosHuffman[caracter])

if __name__ == "__main__":
    main()
