const fs = require('fs');

const template = {
    style : function(){
        return `
        <style>
        * {
            margin : 0;
            padding : 0;
            box-sizing: border-box;
        }

        body {
            width: 100%;
            height: 100%;
        }

        #header {
            position: absolute;
            width: 100%;
            background-color:darkolivegreen;
            text-align: center;
            padding : 10px;
        }
        #header #title {
            color : white;
        }

        #container {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
        }
        #container #content {
            width : 60%;
            margin-top: 150px;
            text-align: center;
        }
        #container #content #todo-form {
            margin-bottom: 100px;
        }
        #container #content #todo-list {
            list-style: none;
        }
        #container #content #todo-list li{
            font-weight: bold;
            font-size: 15px ;
            margin-bottom: 5px;
        }
        </style>`
    },

    getToDoList: function(model){
        let script = ``;
        for(let item of model.thingsToDo){
            script += `<li>${item.what}</li>`;
        }
        return script;
    },

    index : function(model){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>toDoList</title>
            ${this.style()}
        </head>
        <body>
            <div id="header">
                <h1 id="title">toDoList with Node.js</h1>
            </div>
            <div id="container">
                <div id="content">
                    <form action="/submit" id="todo-form" method="post">
                        <label for="todo-item">할 일</label>
                        <input type="text" id="todo-item" name="todo-item">
                        <button type="submit">SUBMIT</button>
                    </form>
                    
                    <ul id="todo-list">
                        ${this.getToDoList(model)}
                    </ul>
                </div>

            </div>
        </body>
        </html>
        `
    }
};

module.exports = template;