import serial
import mysql.connector

# Conecta a la base de datos MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Llumigusin98*",
    database="cooperativa"
)
#id del dispositivo para guardar en la base de datos
dispositivo = 1
# Crea un cursor para ejecutar consultas SQL
mycursor = mydb.cursor()

# Conecta con el puerto serie
ser = serial.Serial('COM3', 9600)  # Cambia 'COM3' por el puerto serie correcto

while True:
    # Lee una línea de datos desde el puerto serie
    dato = ser.readline().decode().strip()
    print("Dato recibido:", dato)  # Imprime el dato en la consola

    # Separa los valores de altitud, longitud y tiempo
    altitud, longitud, tiempo = dato.split(',')
    
    # Verifica si la ubicación ya existe en la base de datos
    sql = "SELECT * FROM ubicacion WHERE altitud = %s AND longitud = %s"
    val = (altitud, longitud)
    mycursor.execute(sql, val)
    result = mycursor.fetchone()
    
    if result:
        print("Dato existente")
    else:
        print("Dato guardado")
        sql = "INSERT INTO ubicacion (ID_DISPOSITIVO, LATITUD, LONGITUD) VALUES (%s, %s, %s)"
        val = (dispositivo, altitud, longitud)
        mycursor.execute(sql, val)
    
    mydb.commit()
    
    # Obtiene el ID_UBICACION de la ubicación actual
    sql = "SELECT ID_UBICACION FROM ubicacion WHERE altitud = %s AND longitud = %s"
    val = (altitud, longitud)
    mycursor.execute(sql, val)
    result = mycursor.fetchone()
    
    if result:
        id_ubicacion = result[0]
        sql = "INSERT INTO registro_ubicacion (ID_BUS, ID_UBICACION, FECHA_UBICACION) VALUES (%s, %s, %s)"
        val = (1, id_ubicacion, tiempo)
        mycursor.execute(sql, val)
        mydb.commit()
        print("Registro de ubicación guardado")
    else:
        print("Error al obtener ID_UBICACION")

# Cierra la conexión con el puerto serie y la base de datos (esto no se ejecutará ya que el bucle es infinito)
ser.close()
mydb.close()
