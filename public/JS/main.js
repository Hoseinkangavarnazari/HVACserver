function sendRequestRasp(param) {

    let rasp = "http://localhost:" + param;

    console.log("Request from browser to the main server");
    $.ajax(
      {
        url: "http://192.168.40.101:3000/webapi",
        dataType : 'text',
        data: {
          "connect": rasp
        },
        type: "POST", // if you want to send data via the "data" property change this to "POST". This can be omitted otherwise
        success: function (responseData) {
          var output = responseData
          console.log(output);
        },
        error: console.error
      }
    );
  }


  function updateSetPoint(param) {

    let rasp = "http://localhost:" + param;

    console.log("Request from browser to the main server");
    $.ajax(
      {
        url: "http://localhost:5000/webapi",
        dataType : 'text',
        data: {
          "connect": rasp
        },
        type: "POST", // if you want to send data via the "data" property change this to "POST". This can be omitted otherwise
        success: function (responseData) {
          var output = responseData
          console.log(output);
        },
        error: console.error
      }

    );
  }