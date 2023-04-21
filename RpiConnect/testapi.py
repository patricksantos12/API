import mysql.connector

db = mysql.connector.connect(host = "localhost", user = "admin", password = "password", database = "RegistrationDatabase")

cursor = db.cursor()

query = "SELECT * FROM `Dummy Database` WHERE `PlateN` LIKE 'NBC 1234'"
cursor.execute(query)

rows = cursor.fetchall()

for row in rows:
    print(row)

db.close()
