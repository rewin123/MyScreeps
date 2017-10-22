/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('MinerMove');
 * mod.thing == 'a thing'; // true
 */



module.exports = {
    run(creep)
    {
        if(creep.memory.order === null)
        {
            for(var i in Memory.orders)
            {
                var order = Memory.orders[i];
                if(order.roomName === creep.room.name)
                {
                    if(order.active == false)
                    {
                        creep.memory.order = order;
                        Memory.orders[i].active = true;
                        Memory.orders[i].worker = creep.name;
                        break;
                    }
                }
            }
        }
        
        if(creep.memory.order != null)
        {
            
            if(creep.memory.order.actions.length != 0)
            {
                var action = creep.memory.order.actions[0];
                var pos = new RoomPosition(action.pos.x,action.pos.y,action.pos.roomName);
                
                if(pos.roomName === creep.room.name)
                {
                    ActionExec(creep, action);
                   
                }
                else
                {
                    creep.moveTo(pos);
                }
                
            }
            else
            {
                for(var j in Memory.orders)
                {
                    if(Memory.orders[j].index === creep.memory.order.index)
                    {
                        Memory.orders.splice(j,1);
                    }
                }
                creep.memory.order = null;
            }
        }
    }
};