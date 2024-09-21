import json

with open("besh.json", "r") as f:
    data = json.load(f)
with open("besh.json", "w") as f:
    json.dump({
        'movies':data
    }, f)