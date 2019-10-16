const { spawn } = require('child_process');
const { exec } = require('child_process');
const child = exec("ls");

    child.stdout.on('data', (data) => {
        var resultsArr = data.split('\n')
        var obj_list = [];

        for (var i = 0; i < resultsArr.length; i++) {
            obj_list.push('Object ' + i);
        }

        var obj = {};
        for (var i = 0; i < obj_list.length; i++)

        {
            obj[obj_list[i]] = resultsArr[i];
        }
        console.log(obj);
        });




const p1 = spawn('ps', ['-ef']);
const p2 = exec("awk {print $2, $11, $16 }" , {stdio: [p1.stdout, 'pipe', process.error]})

p2.stdout.on('data', (d) => {
             console.log(d.toString())
                        })

p1.on('exit', (code, signal) => console.log('p1 done', code, signal))
p2.on('exit', (code, signal) => console.log('p2 done', code, signal))
