import os
import numpy as np
import matplotlib.pyplot as plt
import mysql.connector
import re
 
mydb = mysql.connector.connect(
  host="localhost",
  user="admin",
  password="password",
  database="RegistrationDatabase"
)
mycursor = mydb.cursor()

reg = "SELECT `Date`, COUNT(*) FROM `REGISTERED` GROUP BY `Date` ORDER BY `Date` ASC;"
mycursor.execute(reg)
myresult1 = mycursor.fetchall()
print("Processed Plate Numbers as Registered for 2023")
for x in myresult1:
    print(x)

unreg = "SELECT `Date`, COUNT(*) FROM `REGISTERED` GROUP BY `Date` ORDER BY `Date` ASC;"
mycursor.execute(unreg)
myresult2 = mycursor.fetchall()
print("\nProcessed Plate Numbers as Unregistered for 2023")
for y in myresult2:
    print(y)
#unrecognized = [myresult3]
