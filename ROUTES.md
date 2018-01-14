# Routes

## Authorization

### Sign Up

```http
POST /signup
```

![Signup](./readme_fig/signup.png)

*Request*

```json
{
  "username" : "Ivan",
  "email"    : "name@domain.com",
  "password" : "123456Seven"
}
```

*Successful Response*

```json
{
  "token" : "Esf24#rsaf..."
}
```

### Sign In

```http
POST /signin
```

*Request*

```json
{
  "username" : "UserName",
  "email"    : "name@domain.com",
  "password" : "123456Seven"
}
```

*Successful Response*

```json
{
  "token" : "Esf24#rsaf..."
}
```

## Topics management

### Add topic (for admins)

```http
POST /add-topic
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "New Topic"
}
```

*Successful Response*

```json
{
  "name" : "New Topic",
  "order" : 1
}
```

### Update topic (for admins)

```http
POST /up-topic
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "old_name" : "New Topic",
  "new_name" : "Update Topic"
}
```

*Successful Response*

```
{
  "name" : "Update Topic",
  "order" : 1
}
```

### Remove topic (for admins)

```http
POST /del-topic
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name"
}
```

*Successful Response*

```json
{
  "status" : true
}
```


### Get allowed topics

```http
POST /get-topic
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
}
```

*Successful Response*

```json
[{
  "name" : "Topic Name",
  "allowed" : true
},
{
 "name" : "Another Topic",
 "allowed" : false
}]
```

## Rules management

### Add rule (for admins)

```http
POST /add-rule
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "name" : "New Rule",
  "content" : "md",
  "example" : ["md1", "md2"],
  "topic" : "Topic Name"
}
```

*Successful Response*

```json
{
  "name" : "New Rule",
  "content" : "md",
  "example" : ["md1", "md2"],
  "order" : 1,
  "topic" : "Topic Name"
}
```

### Update rule (for admins)

```http
POST /up-rule
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",           // REQUIRED!
  "name" : "New Rule",                 // REQUIRED!
  "topic" : "Topic Name",              // REQUIRED!
  "order" : 3,
  "content" : "md",
  "example" : ["md1", "md2"]
}
```

*Successful Response*

```json
{
  "name" : "New Rule",
  "content" : "md",
  "example" : ["md1", "md2"],
  "order" : 1,
  "topic" : "Topic Name"
}
```

### Remove rule (for admins)

```http
POST /del-rule
```

*Request*

```json
{
  "token" : "Esf24#rsaf...", 
  "topic" : "Topic Name",
  "name"  : "Rule Name"
}
```

*Successful Response*

```json
{
  "status" : true
}
```

### Get allowed rules

```http
POST /get-rule
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name"
}
```

*Successful Response*

```json
{
  "stage" : 1,
  "mistake" : 5,
  "list" : [
    {
      "name" : "First Rule",
      "content" : "md",
      "example" : ["md1", "md2"],
      "order" : 1,
      "topic" : "Topic Name"
    },
    {
      "name" : "Second Rule",
      "content" : "md",
      "example" : ["md1", "md2"],
      "order" : 2,
      "topic" : "Topic Name"
    }
  ]
}
```

### Send statistic

```http
POST /stat-rule
```

![Static](./readme_fig/static.png)

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name",
  "name"  : "Rule Name",
  "mistakes" : 2
}
```

*Successful Response*

```json
{
  "status": true
}
```


## Tests management

### Add test (for admins)

```http
POST /add-test
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name",
  "rule" : "Rule Name",
  "question" : "String",
  "example" : "String",
  "correct" : "String",
  "wrong" : ["String", "String", "String"]
}
```

*Successful Response*

```json
{
  "question" : "String",
  "example" : "String",
  "correct" : "String",
  "wrong" : ["String", "String", "String"],
  "topic" : "Topic Name",
  "rule" : {
    "name" : "String",
    "content" : "String",
    "example" : ["String", "String", "String"]
  }
}
```

### Update test (for admins)

```http
POST /up-test
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",           // REQUIRED!
  "topic" : "Topic Name",              // REQUIRED!
  "question" : "Test Name",            // REQUIRED!
  "rule" : "Rule Name",
  "example" : "String",
  "correct" : "String",
  "wrong" : ["String", "String", "String"]
}
```

*Successful Response*

```json
{
  "question" : "String",
  "example" : "String",
  "correct" : "String",
  "wrong" : ["String", "String", "String"],
  "topic" : "Topic Name",
  "rule" : {
    "name" : "String",
    "content" : "String",
    "example" : ["String", "String", "String"]
  }
}
```

### Remove test (for admins)

```http
POST /del-test
```

*Request*

```json
{
  "token" : "Esf24#rsaf...", 
  "topic" : "Topic Name",
  "name"  : "Test Name"
}
```

*Successful Response*

```json
{
  "status" : true
}
```

### Get allowed tests

```http
POST /get-test
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name"
}
```

*Successful Response*

```json
{
  "stage" : 1,
  "mistake" : 5,
  "list" : [
    {
      "question" : "String",
      "example" : "String",
      "correct" : "String",
      "wrong" : ["String", "String", "String"],
      "topic" : "Topic Name",
      "rule" : {
        "name" : "String",
        "content" : "String",
        "example" : ["String", "String", "String"]
      }
    },
    {
      "question" : "String",
      "example" : "String",
      "correct" : "String",
      "wrong" : ["String", "String", "String"],
      "topic" : "Topic Name",
      "rule" : {
        "name" : "String",
        "content" : "String",
        "example" : ["String", "String", "String"]
      }
    }
  ]
}
```

### Check Test

```http
POST /check-test
```

*Request*

```json
{
  "token" : "Esf24#rsaf...",
  "topic" : "Topic Name",
  "test" : [{
    "question" : "String",
    "answer" : "String"
  }]
}
```

*Successful Response*

```json
{
  "topic" : "Topic Name",
  "stage" : 2,
  "waiter" : "Date"
}
```

```json
[{
  "topic" : "Old Topic",
  "stage" : 0,
  "exam" : 112312414
},{
  "topic" : "New Topic",
  "stage" : 1
}]
```
