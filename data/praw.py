import praw
import json

recordsPerVariable = 100

reddit=praw.Reddit(client_id="<client-id>",
                   client_secret="<client-secret>",
                   user_agent="scraping",
                   username="<username>",
                   password="<password>")

subred=reddit.subreddit("moviesuggestions")
hot=subred.top(limit=5000)

l = []
vars = 1
c = 1
d = {}
messageCounter = 1

for i in hot:
    try:
        s=[i.title,i.selftext]

        if i.comments:
            for j in i.comments:
                try:
                    s.append(j.body)
                except:
                    pass
        s='\n'.join(s)
        d[c]=s
        print("message",messageCounter,"of 5000")
        messageCounter+=1
        if c==recordsPerVariable:
            c=0
            l.append(d)
            print("variable stored", vars, "\n")
            vars+=1
            d = {}
        c+=1
    except:
        pass
if len(d.keys())!=0:
    l.append(d)

print('finished fetching posts')

tot = len(l)

for index, i in enumerate(l):
    with open(f"data{str(index)}.json","w") as f:
        json.dump(i, f)
    print("stored ",index+1,"of",tot)