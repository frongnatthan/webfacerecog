
    //Camera Authentication
    var ip_address1 = "158.108.122.6"
    var ip_address2 = "158.108.122.7"

    //camera username and password
    var username = "admin";
    var password="kusrc12345";

    //A channel of camera stream
    Stream = require('node-rtsp-stream');
  
    stream1 = new Stream({
        streamUrl: 'rtsp://' + username + ':' + password + '@' + ip_address1 +':554/stream',
  //       width: 720,
  //       height: 405,
		// fps: '10',
		// kbs: '720k',
        wsPort: 8888    
    });
    stream2 = new Stream({
        streamUrl: 'rtsp://' + username + ':' + password + '@' + ip_address2 +':554/stream',
  //       width: 720,
  //       height: 405,
		// fps: '10',
		// kbs: '720k',
        wsPort: 8889    
    });

    
