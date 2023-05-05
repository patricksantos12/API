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

print("PLATONIX COUNTER DATA ANALYTICS")

reg = "SELECT `Date`, COUNT(*) FROM `REGISTERED` GROUP BY `Date` ORDER BY `Date` ASC;"
mycursor.execute(reg)
myresult1 = mycursor.fetchall()
print("Verified Plate Numbers as Registered (As of: April 13, 2023)")
for x in myresult1:
    print(x)

unreg = "SELECT `Date`, COUNT(*) FROM `UNREGISTERED` GROUP BY `Date` ORDER BY `Date` ASC;"
mycursor.execute(unreg)
myresult2 = mycursor.fetchall()
print("\nVerified Plate Numbers as Unregistered (As of: April 13, 2023)")
for y in myresult2:
    print(y)
unrec = "SELECT `Date`, COUNT(*) FROM `UNRECOGNIZED` GROUP BY `Date` ORDER BY `Date` ASC;"
mycursor.execute(unrec)
myresult3 = mycursor.fetchall()
print("\nVerified Images as Unrecognized (As of: April 30, 2023)")
for z in myresult3:
    print(z)

registered = len(os.listdir("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Registered"))
unregistered = len(os.listdir("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unregistered"))
unrecognized = len(os.listdir("/home/cisco/Desktop/API/RpiConnect/plates/imageProcessed/Unrecognized"))
 
title = ['REGISTERED', 'UNREGISTERED', 'UNRECOGNIZED']
 
data = [registered, unregistered, unrecognized]
 
explode = (0.02, 0.015, 0.015)

colors = ( "#9bd0b7", "#e05656", "#007ed6")
 
wp = { 'linewidth' : 1, 'edgecolor' : "black" }
 
def func(pct, allvalues):
    absolute = int(pct / 100.*np.sum(allvalues))
    return "{:.1f}%\n({:d})".format(pct, absolute)
 
fig, ax = plt.subplots(figsize =(10, 7))
wedges, texts, autotexts = ax.pie(data,
                                  autopct = lambda pct: func(pct, data),
                                  explode = explode,
                                  labels = title,
                                  shadow = True,
                                  colors = colors,
                                  startangle = 45,
                                  wedgeprops = wp,
                                  textprops = dict(color ="black"))
 
ax.legend(wedges, title,
          title ="Legends",
          loc ="upper left",
          bbox_to_anchor =(1, 0, 0.5, 1))
 
plt.setp(autotexts, size = 12, weight ="bold")
ax.set_title("Platonix Image Processing Data Analytics")
 
plt.show()
