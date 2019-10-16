var ps = require('ps-node');
 
// A simple pid lookup
ps.lookup({ pid: 19890 }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }
 
    var process = resultList[ 0 ];
 
    if( process ){
 
        console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
	 sys_proc_cmd  = process.command
         sys_proc_args = process.arguments
	 
	 db_input_loc = "udp://239.195.4.3:5000/"
         db_proc_cmd = "ffmpeg"

                var chk1 = sys_proc_args.includes(db_input_loc)
                var chk2 = sys_proc_cmd.includes(db_proc_cmd)
                console.log(chk1,chk2);

    }
    else {
        console.log( 'No such process found!' );
    }
});
