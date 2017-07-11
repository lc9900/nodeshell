// This is how nodeJs import a library

// console.log(process);
// console.log(process.argv);
// console.log(Array.isArray(process.argv));


var command = require('./command');

// console.log(command);
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g) // any amount of whitespace, pipe, any amount of whitespace
  var cmd = cmdList[0].split(' '); // cmd is just the first command.

  var done = function (output){
    cmdList = cmdList.slice(1); // slicing out index 0, since it's already processed
    if(cmdList.length === 0){
        process.stdout.write(output);
        process.stdout.write('\nprompt > ');
    }
    else {
        var cmd = cmdList[0].split(' ');
        var stdin = output.toString();
        switch(cmd[0]){
        case 'pwd':
            command.pwd(done, stdin);
            break;
        case 'date':
            command.date(done, stdin);
            break;
        case 'ls':
            command.ls(done, stdin);
            break;
        case 'echo':
            command.echo(cmd.slice(1).join(' '), done, stdin);
            break;
        case 'cat':
            command.cat(cmd[1], done, stdin);
            break;
        case 'head':
            command.head(cmd[1], done, stdin);
            break;
        case 'tail':
            command.tail(cmd[1], done, stdin);
            break;
        case 'curl':
            command.curl(cmd[1], done, stdin);
            break;
        case 'grep':
            command.grep(cmd.slice(1).join(' '), done, stdin);
            break;

      } // End of switch

    }
  };
  // Any additional command will be handled within done()

  switch(cmd[0]){
    case 'pwd':
        command.pwd(done);
        break;
    case 'date':
        command.date(done);
        break;
    case 'ls':
        command.ls(done);
        break;
    case 'echo':
        command.echo(cmd.slice(1).join(' '), done);
        break;
    case 'cat':
        command.cat(cmd[1], done);
        break;
    case 'head':
        command.head(cmd[1], done);
        break;
    case 'tail':
        command.tail(cmd[1], done);
        break;
    case 'curl':
        command.curl(cmd[1], done);
        break;
    case 'grep':
        command.grep(cmd.slice(1).join(' '), done, stdin);
        break;

  }
  // process.stdout.write('\nprompt > ');

});

