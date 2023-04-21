import mysql.connector
import matplotlib.pyplot as plt

mydb = mysql.connector.connect(
  host="localhost",
  user="admin",
  password="password",
  database="RegistrationDatabase"
)

mycursor = mydb.cursor()

sql = "SELECT Date, COUNT(*) FROM `UNREGISTERED` GROUP BY Date"
mycursor.execute(sql)

categories = []
counts = []

for row in mycursor:
    categories.append(row[0])
    counts.append(row[1])
plt.bar(categories, counts)
    
plt.title("Verified Plates as Registered of 2023")
plt.xlabel("Locale")
plt.ylabel("Number of Plates Unregistered")
plt.show()

mydb.close()
