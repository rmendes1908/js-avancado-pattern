if(!Array.prototype.$flatMap){
    Array.prototype.$flatMap = function(callBack){
        return this.map(callBack).reduce((arrayD, itemArray) => arrayD.concat(itemArray), []);
    }
}