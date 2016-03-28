
var actions = require('./lib/actions');

 var myArgs  = require("yargs")
 .command(
     'backup',
     'generate backup from bridallive',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'Bridallive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'Bridallive apip key from bridallive',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'Bridallive retailer id',
             type: 'string',
             requiresArg:true
         },
         destination :{
             alias:'d',
             demand:true,
             describe : 'Destination to save de backup',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
  .command(
     'purge',
     'generate backup from bridallive',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'Bridallive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'Bridallive apip key from bridallive',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'Bridallive retailer id',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
  .command(
     'restore',
     'restore backup to bridallive',
     {
         host :{
             alias:'h',
             demand:true,
             describe : 'Bridallive host',
             type: 'string',
             requiresArg:true
         },
         key :{
             alias:'k',
             demand:true,
             describe : 'Bridallive apip key from bridallive',
             type: 'string',
             requiresArg:true
         },
         retailerId :{
             alias:'r',
             demand:true,
             describe : 'Bridallive retailer id',
             type: 'string',
             requiresArg:true
         },
         source :{
             alias:'s',
             demand:true,
             describe : 'source folder',
             type: 'string',
             requiresArg:true
         }
     }
     
  )
 .usage('describe funtions')
 .help()
 .demand(1)
 .strict()
 .argv;
 
 
 
 switch (myArgs._[0]) {
   case 'backup':
       actions.backup(myArgs.key,myArgs.retailerId);
     console.log('create a backup');
     break;
   case 'purge':
    actions.purge(myArgs.key,myArgs.retailerId);
     console.log('purge database');
     break;
   case 'restore':
    actions.restore(myArgs.key,myArgs.retailerId);
     console.log('restore database');
     break;
   default:
     console.log('no command to execute');
     break;
     
 }
 
