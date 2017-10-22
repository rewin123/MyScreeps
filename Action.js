/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Action');
 * mod.thing == 'a thing'; // true
 */

global.ActionExec = function(creep, action)
    {
        if(action.a == 'harvest')
        {
            HarvestAction(creep, action); 
        }
        else if(action.a == 'transfer')
        {
            TransferAction(creep, action);
        }
        else if(action.a == 'upgradeController')
        {
            UpgradeControllerAction(creep, action);
        }
        else if(action.a == 'build')
        {
            BuildAction(creep, action);
        }
        
    }
    
    global.HarvestAction = function(creep, action)
    {
        
        var pos = new RoomPosition(action.pos.x,action.pos.y,action.pos.roomName);
        if(creep.memory.shifted == true)
        {
            console.log('shifted');
            pos = GetUnbusySpawn(creep.room,creep.pos).pos;
            creep.memory.order.actions[0].pos = pos;
                            
            var objs = creep.room.lookAt(pos);
            for(var k in objs)
            {
                if(objs[k].type === 'source')
                {
                    console.log('Harvest busy add ' + creep.carryCapacity);
                    creep.memory.busyAdd = creep.carryCapacity/PathFinder.search(creep.pos,pos).path.length;
                    Memory.sources[objs[k].source.id].busy += creep.memory.busyAdd;
                    break;
                }
            }
        }
        creep.memory.shifted = false;
        if(pos.getRangeTo(creep.pos) < 2)
        {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            creep.harvest(source);
            if(_.sum(creep.carry) == creep.carryCapacity)
            {
                creep.memory.order.actions.shift();
                creep.memory.shifted = true;
                var objs = creep.room.lookAt(pos);
                for(var k in objs)
                {
                    if(objs[k].type === 'source')
                    {
                        Memory.sources[objs[k].source.id].busy -= creep.memory.busyAdd;
                        break;
                    }
                }
            }
        }
        else
        {
            creep.moveTo(pos);
          
        }
    }
    
    global.TransferAction = function(creep, action)
    {
                var pos = new RoomPosition(action.pos.x,action.pos.y,action.pos.roomName);
        creep.memory.shifted = false;
        if(pos.getRangeTo(creep.pos) < 2)
        {
            var source = creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
            var err = creep.transfer(source,RESOURCE_ENERGY);
            if(_.sum(creep.carry) == 0 || err == ERR_FULL)
            {
                creep.memory.order.actions.shift();
                creep.memory.shifted = true;
            }
        }
        else
        {
            creep.moveTo(pos);
        }
    }
    
    global.UpgradeControllerAction = function(creep, action)
    {
                var pos = new RoomPosition(action.pos.x,action.pos.y,action.pos.roomName);
        creep.memory.shifted = false;
        if(pos.getRangeTo(creep.pos) < 4)
        {
            var source = creep.room.controller;
            creep.upgradeController(source);
            if(_.sum(creep.carry) == 0)
            {
                creep.memory.order.actions.shift();
                creep.memory.shifted = true;
            }
        }
        else
        {
            creep.moveTo(pos);
        }
    }
    
    global.BuildAction = function(creep, action)
    {
                var pos = new RoomPosition(action.pos.x,action.pos.y,action.pos.roomName);
        if(pos.getRangeTo(creep.pos) < 3)
        {
            var source = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            var res = creep.build(source);
            if(res == OK || res == ERR_RCL_NOT_ENOUGH || res == ERR_INVALID_TARGET || res == ERR_NOT_IN_RANGE)
            {
                creep.memory.order.actions.shift();
                creep.memory.shifted = true;
            }
        }
        else
        {
            creep.moveTo(pos);
        }
    }
    
    
