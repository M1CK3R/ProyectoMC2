def main():
    pesosYLetras = [5, 34, 123, 31233, 444, 9, 10, 12]
    ordenar(pesosYLetras)

    for nombre in pesosYLetras:
        print(nombre)

if __name__ == "__main__":
    main()

def ordenar(lista):
    tamanoDeLista = len(lista)
    if tamanoDeLista > 0:
        quick_sort(lista, 0, tamanoDeLista - 1)

def quick_sort(lista, inicio, fin):
    if inicio > fin:
        return
    anterior = inicio
    posterior = fin
    pivote = lista[inicio]

    while anterior < posterior:
        while anterior < posterior and lista[posterior] > pivote:
            posterior = posterior - 1

        if anterior < posterior:
            lista[anterior] = lista[posterior]
            anterior = anterior + 1

        while anterior < posterior and lista[anterior] <= pivote:
            anterior = anterior + 1

        if anterior < posterior:
            lista[posterior] = lista[anterior]
            posterior = posterior - 1

        lista[anterior] = pivote

    quick_sort(lista, inicio, anterior - 1)
    quick_sort(lista, anterior + 1, fin)

