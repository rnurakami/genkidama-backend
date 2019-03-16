# コメントAPI

API's

* get
* add


## get

| url | method |
| - | - |
| https://c5xm7iqqv1.execute-api.us-east-1.amazonaws.com/dev/comment/{kadaiId} | GET |


**response json(sample)** 
```
[
    {
        "userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
        "userName": "kanzaki",
        "comment": "I'm happy!",
        "createdAt": 1552720171542,
        "picture": "https://s3.amazonaws.com/genkidama-backend-api-dev-s3-photo/user-thumbnail/5ca778f0-4800-11e9-bf42-2f95abcbd5ec.jpg"
    },
    {
        same...
    },
    {
        same...
    }
]
```

## add

| url | method |
| - | - |
| https://c5xm7iqqv1.execute-api.us-east-1.amazonaws.com/dev/comment/{kadaiId} | PUT |


**request json(sample)**

```
{
    "userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
    "comment": "I'm happy!"
}

```
**response json(sample)** 
```
{
    "userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
    "userName": "kanzaki",
    "comment": "I'm happy!",
    "createdAt": 1552720171542,
    "picture": "https://s3.amazonaws.com/genkidama-backend-api-dev-s3-photo/user-thumbnail/5ca778f0-4800-11e9-bf42-2f95abcbd5ec.jpg"
}
```