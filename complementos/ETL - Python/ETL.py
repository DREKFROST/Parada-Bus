import serial
import mysql.connector

# Conecta a la base de datos MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Llumigusin98*",
    database="arduino"
)

# Crea un cursor para ejecutar consultas SQL
mycursor = mydb.cursor()


# Crea una tabla si no existe
mycursor.execute("CREATE TABLE IF NOT EXISTS datos (altitud VARCHAR(255), longitud VARCHAR(255), tiempo VARCHAR(255))")


# Conecta con el puerto serie
ser = serial.Serial('COM3', 9600)  # Cambia 'COM3' por el puerto serie correcto

while True:
    # Lee una línea de datos desde el puerto serie
    dato = ser.readline().decode().strip()
    print("Dato recibido:", dato)  # Imprime el dato en la consola

    # Separa los valores de altitud, longitud y tiempo
    altitud, longitud, tiempo = dato.split(',')
    
    # Inserta los valores en la tabla
    sql = "INSERT INTO datos (altitud, longitud, tiempo) VALUES (%s, %s, %s)"
    val = (altitud, longitud, tiempo)
    mycursor.execute(sql, val)
    mydb.commit()

# Cierra la conexión con el puerto serie y la base de datos (esto no se ejecutará ya que el bucle es infinito)
ser.close()
mydb.close()
