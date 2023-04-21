from PIECHARTOverAll import pieChart
from AgencyLocRegGraph import locRegGraph
from AgencyLocUnRegGraph import locUnregGraph
from DateReg import dateReg
from DateUnreg import dateUnreg
from threading import Thread
 
pieChart()
locRegGraph()
locUnregGraph()
dateReg()
dateUnreg()

if __name__=='__main__':
	Thread(target = pieChart).start()
	Thread(target = locRegGraph).start()
	Thread(target = locUnregGraph).start()
	Thread(target = dateReg).start()
	Thread(target = dateUnreg).start()
	
