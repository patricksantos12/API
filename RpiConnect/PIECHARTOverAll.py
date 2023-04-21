import os
import plotly
import pandas as pd
import pyexcel_ods as pe
import plotly.express as px
from pyexcel_ods3 import get_data
from odf.opendocument import load
from pyexcel_ods3 import save_data
from collections import OrderedDict
from pandas_ods_reader import read_ods

data1 = OrderedDict()

registered = len(os.listdir(r"../PLATONIXSYSTEM/plates/processed/Registered"))
unregistered = len(os.listdir(r"../PLATONIXSYSTEM/plates/processed/Unregistered"))
unrecognized = len(os.listdir(r"../PLATONIXSYSTEM/plates/processed/Unrecognized"))

data1.update({"Sheet1": [["Categories","Numbers"],["Registered",registered],["Unregistered",unregistered],["Unrecognized",unrecognized]]})

save_data("dataAnalytics.ods",data1)

base_path = r"/home/cisco/Desktop/PLATONIXSYSTEM/dataAnalytics.ods"

df = read_ods(base_path,1,columns=["Categories","Numbers"])


values = df['Numbers']

names = df['Categories']

fig = px.pie(df, values = values, names = names, title = '2023 Data Analytics Pie Chart')

fig.update_traces(textposition = 'inside', textinfo = 'percent+label')

plotly.offline.plot(fig,filename='overallpiechart.html')
