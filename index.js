
var actions = require('./lib/actions');

 var myArgs  = require("yargs")
 .command(
     'backup',
     'generate backup from a BridalLive account',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'BridalLive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'BridalLive api key',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'BridalLive retailer id',
             type: 'string',
             requiresArg:true
         },
         destination :{
             alias:'d',
             demand:true,
             describe : 'Destination folder to save the backup files',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
  .command(
     'purge',
     'delete all data from a BridalLive account',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'BridalLive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'BridalLive api key',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'BridalLive retailer id',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
  .command(
     'restore',
     'restore backup to a BridalLive account',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'BridalLive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'BridalLive api key',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'BridalLive retailer id',
             type: 'string',
             requiresArg:true
         },
         source :{
             alias:'s',
             demand:true,
             describe : 'Source folder with the files to restore',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
 .usage('describe functions')
 .help()
 .demand(1)
 .strict()
 .argv;
 
 
 
 switch (myArgs._[0]) {
   case 'backup':
       actions.backup(myArgs.host, myArgs.key, myArgs.retailerId, formatPath(myArgs.destination));
     console.log('create a backup');
     break;
   case 'purge':
    actions.purge(myArgs.host, myArgs.key, myArgs.retailerId);
     console.log('purge database');
     break;
   case 'restore':
    actions.restore(myArgs.host, myArgs.key, myArgs.retailerId, formatPath(myArgs.source));
     console.log('restore database');
     break;
   default:
     console.log('no command to execute');
     break;
     
 }
 
function formatPath(path) {
    if (!/\/\\/.test(path.slice(-1)))
        path += '/';
    return path;
} 