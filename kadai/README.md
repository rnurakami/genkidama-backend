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
	"owner": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
	"description": "this is description.",
	"picture": "YWJjZGVmZw(base64 encode)",
	"targetPoint": 10000,
	"longitude": "35.6657799",
	"latitude": "139.8028378"
}
```

## list

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/ | GET |

**response json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/

[
	{
		"kadaiId": "721be270-47ba-11e9-ac9a-51b79e74e965",
		"title": "Rakugaki Problem",
		"owner": {
			"userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
			"userName": "kanzaki",
			"picture": "https://url/pic.jpg"
		},
		"description": "this is description.",
		"picture": "https://url/pic.jpg",
		"targetPoint": 10000,
		"currentPoint": 10000,
		"longitude": "35.6657799",
		"latitude": "139.8028378",
		"status": 0,
		"like": 0,
		"comments": [
			{
				"comment": "This is comment.",
				"createdAt": "1552720171120",
				"userId": "7ae27ae2-47ef-11e9-9e25-18181818181",
				"userName": "Gaga",
				"picture": "https://url/pic.jpg"
			},
			{
				same...
			}
		],
		"createdAt": 1552720171542,
		"updatedAt": 1552720171542
	},
	{
		same...
	}
]
```

**課題statusの値**

* 0: NotStart
* 1: WIP
* 2: InReview
* 3: Done


## get

| url | method |
| - | - |
| https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/{id} | GET |

**response json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/kadai/721be270-47ba-11e9-ac9a-51b79e74e965

[
	{
		"kadaiId": "721be270-47ba-11e9-ac9a-51b79e74e965",
		"title": "Rakugaki Problem",
		"owner": {
			"userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
			"userName": "kanzaki",
			"picture": "https://url/pic.jpg"
		},
		"description": "this is description.",
		"picture": "https://url/pic.jpg",
		"targetPoint": 10000,
		"currentPoint": 0,
		"longitude": "35.6657799",
		"latitude": "139.8028378",
		"status": 0,
		"like": 0,
		"comments": [
			{
				"comment": "This is comment.",
				"createdAt": "1552720171120",
				"userId": "7ae27ae2-47ef-11e9-9e25-18181818181",
				"userName": "Gaga",
				"picture": "https://url/pic.jpg"
			},
			{
				same...
			}
		],
		"createdAt": 1552720171542,
		"updatedAt": 1552720171542
	}
]
```

