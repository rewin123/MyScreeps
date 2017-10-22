/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('UpControllerOrderMake');
 * mod.thing == 'a thing'; // true
 */

global.MakeUpgradeOrder = function(room,speed)
{
    var controller = room.controller;
    
    var request = RequstEnergy('upgrade',controller.room.name,CARRY_CAPACITY);
    console.log(request/CARRY_CAPACITY);
    if(request < (controller.progressTotal - controller.progress) && request/CARRY_CAPACITY < speed)
    {
        OrderUpgrade(room);
    }
    else if(request - (controller.progressTotal - controller.progress) > CARRY_CAPACITY)
    {
        RemoveInactive('upgrade',controller.room.name);
    }
}

global.OrderUpgrade = function(room)
{
    var controller = room.controller;
    Memory.indexer += 1;
        //make order to harvest
        var order = {
            roomName : controller.room.name,
            time : Game.time,
            name : 'upgrade',
            owner : controller.room.name,
            target : controller.id,
            active : false,
            index : Memory.indexer,
            worker : '',
        
            actions : new Array()
        }
        
        var act = 
        {
            a : 'harvest',
            pos : GetUnbusySpawn(controller.room,controller.pos).pos
        }
        
        order.actions.push(act);
        
        act = 
        {
            a : 'upgradeController',
            pos : controller.pos
        }
        
        order.actions.push(act);
        
        Memory.orders.push(order);
        
        if(Memory.orders[0] == null)
        {
            console.log('shift');
            Memory.orders.shift();
        }
}