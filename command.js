var date = new Date();
var fs = require('fs');
var request = require('request');
var chalk = require('chalk');


module.exports = {
    pwd: function(done){
        done(process.cwd());
        // process.stdout.write(process.cwd());
        // process.stdout.write('\nprompt > ');
    },
    date: function(done){
        done(date.toString());
        // process.stdout.write(date.toString());
        // process.stdout.write('\nprompt > ');
    },
    ls: function(done){
        fs.readdir('.', function(err, files) {
            var output = '';
            if (err) throw err;
            files.forEach(function(file) {
                output += file.toString() + "\n"
                // process.stdout.write(file.toString() + "\n");
            });
            done(output);
            // process.stdout.write("prompt > ");
        });
    },
    echo: function(data, done, stdin){
        if(stdin) data = stdin;
        done(data);
        // process.stdout.write(cmd);
        // process.stdout.write('\nprompt > ');
    },
    cat: function(file, done, stdin){
        if(stdin){
            done(stdin);
            return;
        }
        fs.readFile(file, function(err, data){
            if(err) throw err;
            done(data);
            // process.stdout.write(data);
            // process.stdout.write("\nprompt > ");
        });

    },
    head: function(file, done, stdin){
        var output = '';
        // console.log(stdin);
        if(stdin){
            if(stdin) lines = stdin.split("\n");

            // console.log(lines.length);
            for(var i=0; i<5; i++) output += lines[i] + "\n";
            done(output);
        }
        else{
            fs.readFile(file, function(err, data){
                if(err) throw err;

                else lines = data.toString().split("\n");

                // console.log(lines.length);
                for(var i=0; i<5; i++) output += lines[i] + "\n";
                done(output);
            });
        }
    },
    tail: function(file, done, stdin){
        fs.readFile(file, function(err, data){
            if(err) throw err;
            lines = data.toString().split("\n");
            var output = '';
            // console.log(lines.length);
            for(var i=lines.length-5; i<lines.length; i++) output += lines[i] + "\n";
            done(output);
        });
    },
    curl: function(url, done, stdin){
        // process.stdout.write("curl called");
        // process.stdout.write("\nprompt > ");
        if(stdin){
            url = stdin;
        }
        request(url, function (error, response, body) {
          if(error) throw error;
          done(body);
          // process.stdout.write(body);
          // process.stdout.write("\nprompt > ");
        });
    },
    grep: function(matchString, done, stdin){
        console.log(matchString);
        matchString = matchString.replace(/(^"|"$)/g, '');
        console.log(matchString);
        if(stdin){
            var lines = stdin.split('\n');
            var output = '';
            for(var i=0; i < lines.length; i++){
                if(lines[i].indexOf(matchString) !== -1){
                    // console.log("lines[i]");
                    // console.log()
                    output += lines[i].split(matchString)[0] + chalk.red.bold.bgYellow(matchString) +
                                lines[i].split(matchString)[1] + "\n";
                }
            }
            done(output);
        }
    }

};
