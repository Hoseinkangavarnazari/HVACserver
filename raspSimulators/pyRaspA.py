import requests
try:
    r = requests.post("http://localhost:3000/node/detaileds_sensors_data", data={"avg_temp": 23.56, "avg_hum": 46, "ID": 'node1'})
    print(r.status_code, r.reason,r.text)
except Exception as e:
    print (e)
