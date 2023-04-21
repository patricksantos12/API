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

sql = "SELECT AgencyLoc, COUNT(AgencyLoc) FROM `REGISTERED` WHERE "
mycursor.execute(sql)
result = cursor.fetchall()


with sqlite3.connect(mydb) as con:
    sql = "SELECT AgencyLoc, Date, COUNT(AgencyLoc) FROM `REGISTERED` WHERE REGISTERED.stations_id = 591441"
    to_plot = mycursor.execute(sql).fetchall()
    to_plot = pd.DataFrame(to_plot, columns = ['AgencyLoc', 'Date']).set_index('Date')


to_plot.index

DatetimeIndex(['Date'],
    dtype='datetime64[ns, UTC]', name='reading_timestamp', freq=None)

fig, ax = plt.subplots()
plt.plot(to_plot)
for tick in ax.get_xticklabels():
    tick.set_rotation(45)
    
fig, ax = plt.subplots()
ax.plot(to_plot['AgencyLoc'], 'orange')
ax.plot(to_plot[''], 'red')
ax.plot(to_plot['humidity'], 'blue')
for tick in ax.get_xticklabels():
    tick.set_rotation(45)
ax.legend()

mydb.close()
