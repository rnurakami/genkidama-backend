# 課題API

API's

* create
* list
* get

## create

| url | method |
| - | - |
| https://c5xm7iqqv1.execute-api.us-east-1.amazonaws.com/dev/user/ | POST |

**input json(sample)**
```
{
	"userName": "kanzaki",
	"picture": "https://url/pic.jpg",
	"userCategory": 1,
	"budget": 123456
}
```


## list

| url | method |
| - | - |
| https://c5xm7iqqv1.execute-api.us-east-1.amazonaws.com/dev/user/ | GET |

**response json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/user/

[
	{
		"userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
		"userName": "kanzaki",
		"picture": "https://url/pic.jpg",
		"userCategory": 1,
		"budget": 123456,
		"createdAt": 1552742949596,
		"updatedAt": 1552742949596
	},
	{
		same...
	}
]
```


**ユーザcategoryの値**

* 1: customer
* 2: client



## get

| url | method |
| - | - |
| https://c5xm7iqqv1.execute-api.us-east-1.amazonaws.com/dev/user/{id} | GET |

**response json(sample)**
```
$ curl https://ahk6fpzxv2.execute-api.us-east-1.amazonaws.com/dev/user/7ae2f1c0-47ef-11e9-9e25-93d516b13bb8

[
	{
		"userId": "7ae2f1c0-47ef-11e9-9e25-93d516b13bb8",
		"userName": "kanzaki",
		"picture": "https://url/pic.jpg",
		"userCategory": 1,
		"budget": 123456,
		"createdAt": 1552742949596,
		"updatedAt": 1552742949596,
	}
]
```

