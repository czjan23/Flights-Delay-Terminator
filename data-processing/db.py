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