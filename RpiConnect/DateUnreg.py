import mysql.connector
import matplotlib.pyplot as plt

def dateUnreg():
  mydb = mysql.connector.connect(
    host="localhost",
    user="admin",
    password="password",
    database="RegistrationDatabase"
  )

  mycursor = mydb.cursor()

  sql = "SELECT Date, COUNT(Date) FROM `UNREGISTERED` GROUP BY Date ORDER BY Date ASC"
  mycursor.execute(sql)

  categories = []
  counts = []

  for row in mycursor:
      categories.append(row[0])
      counts.append(row[1])
  plt.bar(categories, counts)
      
  plt.title("Data Analytics")
  plt.xlabel("Date")
  plt.ylabel("Number of Unregistered")
  plt.show()

  mydb.close()

dateUnreg()
