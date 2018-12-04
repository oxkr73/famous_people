let timeStyle = "";
let out = "";

timeStyle = `
        #main_time_bar{
            background: #ddd;
            display:inline-block;
            width:100%;
            min-height:300px;
            position:relative;
        }
        .famous{
          position:absolute;
          text-align:center;
        }
        .pointer {
          display: block;
          max-width:40px;
          margin:0 auto;
        }
        .famous:hover{
          cursor:pointer;
        }
        .famous:hover .pointer {
          font-size: 100px;
          line-height: 18px;
        }
        .f-data{
          display:none;
        }
        .famous:hover  .f-data{
          display:block;
        }
    `;
out = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Famous People</title>
                    <style>${timeStyle}</style>
                </head>
                <body>
                <h1>Famous People</h1>
                <p>From ${start} to ${today}</p>
                ${timeResult}
                <div id="main_time_bar">${famous}</div>
                </body>
            </html>`;
