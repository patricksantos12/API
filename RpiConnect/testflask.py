import subprocess

url = "http://192.168.100.212:3000/api/v1/platonix/vehicle/search/all"
response = subprocess.check_output(["curl","-X","GET",url])
print(response)
