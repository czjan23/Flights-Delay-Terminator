from mrjob.job import MRJob

class CarrierDelayProcess(MRJob):
    def mapper(self, key, line):
        (flight, delay) = line.split()
        (carrier, num) = flight.split('_')
        yield carrier, delay

    def reducer(self, carrier, delays):
        total_delay = 0
        num_delay = 0
        length = 0

        for delay in delays:
            length += 1
            if int(delay) > 0:
                num_delay += 1
                total_delay += int(delay)

        delay_rate = 0
        if length != 0:
            delay_rate = num_delay / length

        avg_delay_time = 0
        if num_delay != 0:
            avg_delay_time = total_delay / num_delay
            
        result = "%s_%s" % (delay_rate, avg_delay_time)
        yield carrier, result

if __name__ == '__main__':
    CarrierDelayProcess.run()
