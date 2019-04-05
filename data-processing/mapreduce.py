from mrjob.job import MRJob

class DelayProcess(MRJob):
    def mapper(self, key, line):
        (flight, delay) = line.split()
        yield flight, delay

    def reducer(self, flight, delays):
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
            
        result = "%s - %s" % (delay_rate, avg_delay_time)
        yield flight, result

if __name__ == '__main__':
    DelayProcess.run()
