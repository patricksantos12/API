import os
from matplotlib.pyplot import pie, show
from numpy import array
import numpy as np
import matplotlib.pyplot as plt

#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
def pieChart():
	registered = len(os.listdir(r"../RpiConnect/plates/processed/Registered"))
	unregistered = len(os.listdir(r"../RpiConnect/plates/processed/Unregistered"))
	unrecognized = len(os.listdir(r"../RpiConnect/plates/processed/Unrecognized"))

	titles = ['Registered','Unregistered', 'Unrecognized']
	
	
	data = [registered, unregistered, unrecognized]
	
	explode = (0.1, 0.1, 0.1)
	
	colors = ("green","red","yellow")
	
	wp = { 'linewidth' : 1, 'edgecolor' : "black" }
		
	def func(pct,allvalues):
		absolute = int(pct / 100.*np.sum(allvalues))
		return "{:.1f}%\n({:d})".format(pct,absolute)
	
	fig,ax = plt.subplots(figsize =(10,7))
	wedges, texts, autotexts = ax.pie(data,autopct = lambda pct: func(pct, data), explode = explode, labels = titles, shadow = True, colors = colors, startangle = 90, wedgeprops = wp, textprops = dict(color = "black"))
	
	ax.legend(wedges, titles, loc ="upper left", bbox_to_anchor=(1,0,0.5,1))
	
	plt.setp(autotexts, size = 8, weight = "bold")
	ax.set_title("2023 Data Analytics of Verified Plates in the Philippines")
	

	plt.show()

pieChart()
