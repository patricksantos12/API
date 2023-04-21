import pyexcel_ods as pe
from pyexcel_ods import save_data
from pyexcel_ods import get_data
from pyexcel_ods3 import save_data
from pyexcel_ods3 import get_data
import os
import plotly.express as px
import pandas as pd
import plotly
from odf.opendocument import load
from pandas_ods_reader import read_ods
from collections import OrderedDict
import json

data = pe.get_data(r"/home/cisco/Desktop/PLATONIXSYSTEM/testchart.ods")

print(json.dumps(data))


if([] in data['Sheet1']):
    data['Sheet1'].remove([])
    

registered = len(os.listdir(r"/home/cisco/Desktop/PLATONIXSYSTEM/plates/processed/Registered"))
unregistered = len(os.listdir(r"/home/cisco/Desktop/PLATONIXSYSTEM/plates/processed/Unregistered"))
unrecognized = len(os.listdir(r"/home/cisco/Desktop/PLATONIXSYSTEM/plates/processed/Unrecognized"))

data['Sheet1'].append(["Registered",registered])
data['Sheet1'].append(["Unregistered",unregistered])
data['Sheet1'].append(["Unrecognized",unrecognized])

pe.save_data("testchart.ods", data)

base_path = r"/home/cisco/Desktop/PLATONIXSYSTEM/testchart.ods"

df = read_ods(base_path,1,columns=["Categories","Numbers"])

df.drop_duplicates(subset="Categories",keep='first')


df=read_ods(base_path,sheet,columns=["Categories","Numbers"])

values = df['Numbers']

names = df['Categories']

fig = px.pie(df, values = values, names = names, title = 'Data Analytics')

fig.update_traces(textposition = 'inside', textinfo = 'percent+label')

plotly.offline.plot(fig,filename='piechart.html')


