# Team Configuraion
Backend:
Earnest 
dao yong
Kenisvery

Frontend:
Janessa (login)
Melody (individual post)
Win Soon (home page)

## Backend APIs
http://localhost:5000/
All the APIs are on this port number except Login
Do remember to include 'x-access-token' with the JWT as each API header key value pair

### LOGIN (DONE)
http://localhost:3001/api/v1/Login/
## Sample Json
####### pass
{
    "Name": "Brose McCreery",
    "password": "123"
}
# Fail testcase
{
    "Name": "Test",
    "password": "123"
}


## Result
//Pass
res.status(200).send({ Msg: "Login successfully", Token: token });
{
    "Msg": "Login successfully",
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiQnJvc2UgTWNDcmVlcnkiLCJpYXQiOjE2NDI2NjE5OTcsImV4cCI6MTY1NDY2MTk5N30.THiAZaLK2Ipfg-bvegzZN25MlSihnLeC0eJGOs1MAwA"
}
//Fail
res.status(401).send("Login Fail");


## Return all post http://localhost:5000/post
GET REQUEST

    output sample:
    {
      "posts": [
                {
                  "post_description": "Walking up and down the aisles for what seems like hours.", 
                  "post_id": 1, 
                  "post_image": "https://preview.redd.it/jjvqtw9iapb81.gif?format=mp4&s=e333e78478df813b5b18ecd0905efc8b00ae210c", 
                  "post_title": "Relatable"
                }]
    }

## Insert Post http://localhost:5000/insert_post
    Method = POST
    json needed input
    {
        "post_title":"hello",
        "post_description": "hello",
        "post_image":"https:"
    }
    Output:
    status 201 -> 
    {
        "post_description": "hellwwo DBS",
        "post_id": 21,
        "post_image": "https:",
        "post_title": "hello"
    }
    status 501 -> Failed

## Get all Loggedin post 
###### User own post

http://localhost:5000/post/<name>
    Pass name through ^address 
    Example /post/Brose McCreery
    Method = GET
    status 201 -> Success
    status 500 -> Failed
    sample output:
    [
        {
            "post_description": "Is this what its supposed to feel like?", 
            "post_id": 7, 
            "post_image": "https://i.redd.it/600fjw70hqb81.jpg", 
            "post_title": "Studying"
        }
    ]

## Update Post
http://localhost:5000/update_post
    Method = POST
    json needed input
    {
        "post_title":"hello",
        "post_description": "hello",
        "post_image":"https:"
    }
    status 201 -> {
        "post_id": 21,
        "post_title":"hello",
        "post_description": "hello",
        "post_image":"https:"
    }
    status 500 -> Failed
    
## Delete Post
http://localhost:5000/delete_post/<name>
    Method = POST
    json needed input
    {
        "post_title":"hello",
        "post_description": "hello",
        "post_image":"https:"
    }
    status 201 -> {"message": "The post is deleted"}
    status 500 -> Failed

## API CALL SAMPLE
```
const data = {
"Name": name,
"password": password
 }
const response = fetch("http://localhost:3001/api/v1/Login", {
            method: "POST",
            mode:'cors',
            credentials:'same-origin',
            headers: {
                'Content-Type': 'application/json'
              },
              referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
```
##   Database
    Backend credentials for localhost database username and password
    - Change ormconfig.json
    - Change line 12 of app.py with your own URI
    