# 課題API

API's

* create
* list
* get

## create

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/ | POST |

**input json(sample)**
```
{
	"title": "Rakugaki Problem",
	"add_user": "kanzaki",
	"iine_count": "70",
	"target_nagesen_point": 10000,
	"now_nagesen_point": 5500,
	"comment": "This is comment.",
	"longitude": "35.6657799",
	"latitude": "139.8028378",
	"picture_base64": "YWJjZGVmZw"
}
```

## list

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/ | GET |

**input json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/

[
  {
    "kadaiId": "721be270-47ba-11e9-ac9a-51b79e74e965",
    "latitud": "139.8028378",
    "target_nagesen_point": 10000,
    "updatedAt": 1552720171542,
    "longitude": "35.6657799",
    "like": "70",
    "comments": [
      {
        "comment": "This is comment."
      },
      {
        "comment": "nice!"
      }
    ],
    "createdAt": 1552720171542,
    "picture_base64": "YWJjZGVmZw",
    "createdBy": "kanzaki",
    "title": "Rakugaki Problem"
  },
  {
	  same...
  }
]
```

## get

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/{id} | GET |

**input json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/721be270-47ba-11e9-ac9a-51b79e74e965

[
  {
    "kadaiId": "721be270-47ba-11e9-ac9a-51b79e74e965",
    "latitud": "139.8028378",
    "target_nagesen_point": 10000,
    "updatedAt": 1552720171542,
    "longitude": "35.6657799",
    "like": "70",
    "comments": [
      {
        "comment": "This is comment."
      },
      {
        "comment": "nice!"
      }
    ],
    "createdAt": 1552720171542,
    "picture_base64": "YWJjZGVmZw",
    "createdBy": "kanzaki",
    "title": "Rakugaki Problem"
  }
]
```

