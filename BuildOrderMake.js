/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BuildOrderMake');
 * mod.thing == 'a thing'; // true
 */

global.MakeBuildOrders = function(room)
{
    
}

//строи дороги между зданиями
global.RoadsOrder = function(room)
{
    
}

global.OneRoadSites = function(pos1, pos2, room)
{
    var ret = PathFinder.search(pos1,pos2);
    for(var point in ret.path)
    {
        room.createConstructionSite(point,STRUCTURE_ROAD);
    }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}