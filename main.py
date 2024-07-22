import csv

filename = "SEIU - Mass Contact Spreadsheet - J4J Toronto - 2024-03-01.csv"

data = {}

with open(filename, newline="") as filehandler:
    reader = csv.DictReader(filehandler, dialect="excel")
    for row in reader:
        businessagent = row["Segment"]
        del row["Segment"]
        if not (businessagent in data):
            data[businessagent] = []
        data[businessagent].append(row)

print(data.keys())

for key in data.keys():
    newfilename = filename[:-4] + " - " + key + ".csv"
    with open(newfilename, "w", newline="") as filehandler:
        writer = csv.DictWriter(filehandler, data[key][0].keys(), dialect="excel")
        writer.writeheader()
        writer.writerows(data[key])