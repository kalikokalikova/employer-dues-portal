import pandas

filename = "SEIU - Mass Contact Spreadsheet - Nuance - 2024-06-24.xlsx"
sourcedata = pandas.read_excel(filename)

segments = sourcedata["Segment"].value_counts()
segments = segments.index.values

for segment in segments:
    segmentlist = sourcedata[sourcedata["Segment"] == segment]
    segmentlist = segmentlist.drop(["Segment"], axis=1)
    newfilename = filename[:-5] + " - " + segment + ".xlsx"
    segmentlist.to_excel(newfilename, index=False)