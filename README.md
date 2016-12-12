# /gluttony/ API CONSUMPTION
---

The gluttony module was created to easily consume a REST service using AJAX. It is a minimalist library; it doesn't rely on other dependencies and is simple in nature.

### Install

**bower**

```
bower install gluttony --save
```

**npm**

```
npm install gluttony --save
```

### Known Issues

* Doesn't support IE5/6 or older browsers.

### Usage

Include gluttony; `<script src='path/to/gluttony.js'></script>`

```javascript
var data = {email: 'abc@def.ghi', password: '123'}

gluttony.post('/api/register', data, function(error, response) {
  console.log('Server response: ' + response)
})

gluttony.get('/api/stats', function(error, response)) {
  console.log('Server stats: ' + response)
})
```
