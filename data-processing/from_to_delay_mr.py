from mrjob.job import MRJob

class FromToDelayProcess(MRJob):
    def mapper(self, key, line):
        (from_to, delay) = line.split()
        yield from_to, delay

    def reducer(self, from_to, delays):
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
        yield from_to, result

if __name__ == '__main__':
    FromToDelayProcess.run()
