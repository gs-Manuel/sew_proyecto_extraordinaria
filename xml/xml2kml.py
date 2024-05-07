import xml.etree.ElementTree as ET

def obtenerCoordenadas(archivoXML):
    try:
        arbol = ET.parse(archivoXML) 
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
    raiz = arbol.getroot()
    coordenadas = []
    for hijo in raiz.findall('.//'): # Expresión Path
        if hijo.tag == "coordenada":
            coordenadas.append(hijo.attrib)
    return coordenadas
def escribir_prologo():
    prologo = """
    <kml xmlns="http://www.opengis.net/kml/2.2">
        <Document>
            <name>Ruta Turística</name>
            <description>Archivo KML generado desde XML</description>
            <Placemark>
                <LineString>
                    <coordinates>
    """
    return prologo
def escribir_coordenadas(coordenadas):
    coordenadas_kml = ""
    for coord in coordenadas:
        coordenadas_kml += f"{coord['longitud']},{coord['latitud']},{coord['altitud']}\n"
    return coordenadas_kml
def escribir_epilogo():
    epilogo = """
                    </coordinates>
                </LineString>
            </Placemark>
        </Document>
    </kml>
    """
    return epilogo
def main():
    
    miArchivoXML = input('Introduzca un archivo XML = ')
    coordenadas_list = obtenerCoordenadas(miArchivoXML)

    archivo_kml = open('ruta_turistica.kml', 'w')
    archivo_kml.write(escribir_prologo())
    archivo_kml.write(escribir_coordenadas(coordenadas_list))
    archivo_kml.write(escribir_epilogo())
    archivo_kml.close()


if __name__ == "__main__":
    main()    
