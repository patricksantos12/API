import os
import cv2
import imutils
import numpy as np
import pytesseract
import mysql.connector

db = mysql.connector.connect(host = "localhost", user = "admin", password = "password", database = "RegistrationDatabase")

cursor = db.cursor(buffered=True)

res = str(input("Enter the Plate Number: "))

if res == "":
    print("No plate number was entered.")
    exit()

query = "SELECT PlateN FROM `Dummy Database` WHERE `PlateN` LIKE '"+ res +"'"

cursor.execute(query)
    
rows = cursor.fetchone()

if rows is None:
    print("Unregistered!")
    
    sql = "INSERT INTO `UNREGISTERED` (PlateN, Date) VALUES ('" + res + "', CURDATE());"

    cursor.execute(sql)
    
    sql2 = "SELECT PlateN, Date FROM UNREGISTERED WHERE PlateN = '" + res + "';"
    
    cursor.execute(sql2)
    
    result2 = cursor.fetchone()
    
    print("Plate saved in the Unregistered Database")
    
    print(result2)
    
else:
    print("Registered!")
    
    sql3 = "SELECT * FROM `Dummy Database` WHERE PlateN = '" + res + "';"
    
    cursor.execute(sql3)
    
    result2 = cursor.fetchone()
    
    print(result2)
    
    
    print("Plate saved in the Registered Database.")

    sql1 = "SELECT AgencyLoc FROM `Dummy Database` WHERE PlateN = '" + res + "'"

    cursor.execute(sql1)

    result1 = cursor.fetchone()

    name = str(result1)
    
    name = name.replace("')","")
    
    name = name.replace("('","")
    
    name = name.replace(",)","")
    
    name = name.replace("(,","")
    
    name = name.replace("'","")
    
    
    sql = "INSERT INTO `REGISTERED` (PlateN, AgencyLoc, Date) VALUES ('" + res + "', '" + name + "', CURDATE());"

    cursor.execute(sql)

db.commit()

db.close()


