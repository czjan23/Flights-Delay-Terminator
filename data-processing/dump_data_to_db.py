from pymongo import MongoClient

client = MongoClient('mongodb://czjan23:12345678a@ds133086.mlab.com:33086/flight-delay-craker')
db = client['flight-delay-craker']

flights = db['flightmodels']
with open('output.txt', 'r') as f:
    line = f.readline()
    while line:
        flight, rate_time = line.split()
        flight = flight[1:-1]
        rate_time = rate_time[1:-1]
        rate, time = rate_time.split('_')
        flight = {
            "code": flight,
            "delay_rate": float(rate),
            "avg_delay_time": float(time)
        }
        flights.insert_one(flight)
        line = f.readline()

carriers = db['carriermodels']
with open('carrier_output.txt', 'r') as f:
    line = f.readline()
    while line:
        code, rate_time = line.split()
        code = code[1:-1]
        rate_time = rate_time[1:-1]
        rate, time = rate_time.split('_')
        carrier = {
            "code": code,
            "delay_rate": float(rate),
            "avg_delay_time": float(time)
        }
        carriers.insert_one(carrier)
        line = f.readline()

fromtos = db['fromtomodels']
with open('from_to_output.txt', 'r') as f:
    line = f.readline()
    while line:
        from_to, rate_time = line.split()
        from_to = from_to[1:-1]
        rate_time = rate_time[1:-1]
        rate, time = rate_time.split('_')
        fromto = {
            "from_to": from_to,
            "delay_rate": float(rate),
            "avg_delay_time": float(time)
        }
        fromtos.insert_one(fromto)
        line = f.readline()