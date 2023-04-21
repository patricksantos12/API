import mysql.connector
import matplotlib.pyplot as plt
from threading import Thread
 
def locRegGraph():
  mydb = mysql.connector.connect(
    host="localhost",
    user="admin",
    password="password",
    database="RegistrationDatabase"
  )

  mycursor = mydb.cursor()

  sql = "SELECT AgencyLoc, COUNT(*) FROM `REGISTERED` GROUP BY AgencyLoc"
  mycursor.execute(sql)

  categories = []
  counts = []

  for row in mycursor:
      categories.append(row[0])
      counts.append(row[1])
  plt.bar(categories, counts)
      
  plt.title("Verified Plates as Registered of 2023")
  plt.xlabel("Locale")
  plt.ylabel("Number of Plates Registered")
  plt.show()

  mydb.close()

locRegGraph()
