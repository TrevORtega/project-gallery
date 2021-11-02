import requests
import json

#user name on github
user = "trevortega"
#formatting the string
query_url = "https://api.github.com/users/{owner}/repos".format(owner = user)

#sending the request
r_val = requests.get(query_url)

#these are just for debugging
print("\nQuery: ", query_url)
print("Status Code 5 is: " , r_val.status_code)

#loading into a dict
dict_view = json.loads(r_val.text)


for item in dict_view:
    print("______________________________")
    print("\tFull Name \t",item['full_name'])
    print("\tHTML URL \t",item['html_url'])
    print("\tURL \t\t",item['url'])
    #print("\tGit Tags \t",item['git_tags_url'])
    #print("\tStatuses \t",item['statuses_url'])
    print("\tLanguages \t",item['languages_url'])
    languages_dit = json.loads( requests.get(item['languages_url']).text )
    for lan in languages_dit:
        print("\t\t", lan)
    #print("\tCommits URL \t",item['commits_url'])
    #print("\tCommits \t",item['git_commits_url'])
    print("\tNumber Pulls \t", len(item['pulls_url']))
    print("\tCreated \t",item['created_at'])
    print("\tLast Update \t",item['updated_at'])
    print("\tLast Push \t",item['pushed_at'])
    print("\tStars \t\t",item['stargazers_count'])
    print("\tWatcher Count \t",item['watchers_count'])
    print("\tForks Count \t",item['forks_count'])