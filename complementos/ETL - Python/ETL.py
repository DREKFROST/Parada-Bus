import pytz
import serial
import mysql.connector
from datetime import datetime, timedelta


# Conecta a la base de datos MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Llumigusin98*",
    database="cooperativa"
)

# id del dispositivo para guardar en la base de datos
dispositivo = 1
bus = 1

# Definir la zona horaria de Londres
london_tz = pytz.timezone('Europe/London')

# Definir la zona horaria de Ecuador
ecuador_tz = pytz.timezone('America/Guayaquil')

# Crea un cursor para ejecutar consultas SQL
mycursor = mydb.cursor()

# Conecta con el puerto serie
ser = serial.Serial('COM8', 115200)  # Cambia 'COM8' por el puerto serie correcto

while True:
    # Lee una línea de datos desde el puerto serie
    dato = ser.readline().decode().strip()
    print("Dato recibido:", dato)  # Imprime el dato en la consola

    # Separa los valores de longitud, latitud y tiempo
    try:
        # Remueve los prefijos "Longitud: ", "Latitud: " y "Tiempo: "
        dato = dato.replace("Longitud: ", "").replace("Latitud: ", "").replace("Tiempo: ", "")
        longitud, latitud, tiempo_str = dato.split(',')
        tiempo_str = tiempo_str.strip()  # Elimina espacios en blanco al inicio y final
        tiempo = datetime.strptime(tiempo_str, "%d/%m/%Y %H:%M:%S")
        # Asignar la zona horaria de Londres a la variable tiempo
        tiempo = london_tz.localize(tiempo)
        # Convertir la hora de Londres a la zona horaria de Ecuador
        tiempo = tiempo.astimezone(ecuador_tz)
        tiempo = tiempo + timedelta(hours = 1)
        print("Dato Tratado:",latitud,",", longitud,  tiempo)
        # Busca la ubicación en la base de datos
        sql = "SELECT ID_UBICACION FROM ubicacion WHERE LATITUD = %s AND LONGITUD = %s"
        val = (latitud, longitud)
        mycursor.execute(sql, val)
        result = mycursor.fetchone()

        if result:
            print("Dato existente")
        else:
            print("Dato guardado")
            # Inserta la nueva ubicación en la base de datos
            sql = "INSERT INTO ubicacion (ID_DISPOSITIVO, LATITUD, LONGITUD) VALUES (%s, %s, %s)"
            val = (dispositivo, latitud, longitud)
            mycursor.execute(sql, val)
            mydb.commit()

            # Obtiene el ID_UBICACION de la ubicación actual
            id_ubicacion = mycursor.lastrowid

            # Inserta el registro de ubicación en la tabla registro_ubicacion
            sql = "INSERT INTO registro_ubicacion (ID_BUS, ID_DISPOSITIVO, FECHA_UBICACION) VALUES (%s, %s, %s)"
            val = (bus, dispositivo, tiempo)
            mycursor.execute(sql, val)
            mydb.commit()
            print("Registro de ubicación guardado")

    except ValueError as e:
        print("Error al procesar los datos:", e)

# Cierra la conexión con el puerto serie y la base de datos (esto no se ejecutará ya que el bucle es infinito)
ser.close()
mydb.close()
