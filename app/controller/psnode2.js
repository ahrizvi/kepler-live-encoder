var ps = require('ps-node');
 
// A simple pid lookup
ps.lookup({
    command: 'ffmpeg',
    //psargs: '-l',
    ppid: 19890
    }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    } 

    resultList.forEach(function( process ){
        if( process ){
            console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
        }
    });
});
 
