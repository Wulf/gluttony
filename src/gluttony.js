/*
  The gluttony module was created to easily consume
  a REST service using AJAX.

  Doesn't support IE5/6 or older browsers.

  Example usage:
    var data = {email: 'abc@def.ghi', password: '123'}

    gluttony.post('/api/register', data, function(error, response) {
      console.log('Server response: ' + response)
    })

    gluttony.get('/api/stats', function(error, response)) {
      console.log('Server stats: ' + response)
    })

  @author keybase.io/wulf
*/
var gluttony = (function() {
  var instance

  var CORS = true

  function createInstance() {
    if (!window.XMLHttpRequest) {
      throw "This library doesn't support older browsers. (Are you using IE5/6?)"
    }

    return new XMLHttpRequest()
  }

  /*
    @param callback
      Accepts a function with the following signature: function(error, response)
  */
  function getInstance(callback) {
    if(!instance) instance = createInstance()

    instance.onreadystatechange = function() {
      if (instance.readyState == XMLHttpRequest.DONE) {
        if(instance.status == 200) {
          callback(null, instance.responseText)
        } else {
          // error, send HTTP status code
          callback(instance.status)
        }
      }
    }

    return instance
  }

  /*
    Encodes objects to query strings for use in HTTP requests.
  */
  function encodeAsQueryString(object) {
    if(!object) return ''

    var queryString = ''
    for(var property in object) {
      if(object.hasOwnProperty(property)) {
        queryString += property + '=' + object[property] + '&'
      }
    }
    return queryString
  }

  return {
    /*
      Sends a POST request.

      @param url
        The API url or file location.
      @param data (optional)
        Data that should be sent alongside the request.
      @param callback
        A function with the following signature: function(error, response)

    */
    post: function(url, data, callback) {
      var connection = getInstance(callback)
      var queryString = encodeAsQueryString(data)

      connection.open("POST", url, true)
      connection.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      connection.send(queryString)
    },

    /*
      Sends a GET request.

      @param url
        The API url or file location.
      @param data (optional)
        Data that should be sent alongside the request.
      @param callback
        A function with the following signature: function(error, response)

    */
    get: function(url, data, callback) {
      var connection = getInstance(callback)
      var queryString = encodeAsQueryString(data)

      if(queryString) queryString = '?' + queryString

      connection.open("GET", url + queryString, true)
      connection.send()
    }
  }
})()
