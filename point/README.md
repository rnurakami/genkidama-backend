# ポイントAPI

API's

* donate

## donate

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/point | POST |

**request json(sample)**

```
{
  "kadaiId": "5cd365c0-4812-11e9-8d25-e9a3d4632b4b",
  "donatePoint": 500
}
```

**response json(sample)** 
```
{
  "currentPoint": 2000
}
```