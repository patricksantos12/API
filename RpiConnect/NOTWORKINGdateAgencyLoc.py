import sqlite3
import pandas as pd
import mysql.connector
import matplotlib.pyplot as plt

mydb = mysql.connector.connect(
  host="localhost",
  user="admin",
  password="password",
  database="RegistrationDatabase"
)

mycursor = mydb.cursor()

sql = "SELECT Date, AgencyLoc, COUNT(AgencyLoc) FROM `REGISTERED` GROUP BY AgencyLoc ORDER BY Date ASC"
mycursor.execute(sql)
result = mycursor.fetchall()

AgencyLoc = []
Date = []
counts = []

for r in result:
    Date.append(r[1])
    AgencyLoc.append(r[2])
    

fig, ax = plt.subplots()

for tick in ax.get_xticklabels():
    tick.set_rotation(45)


ax.plot(AgencyLoc, Date, color = 'b')


plt.show()



mydb.close()
