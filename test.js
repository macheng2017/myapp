//

// var add = require("./lib");

// var inc =add(2);

// var cc = inc(4);
//var tt = R.add(3,4);
// console.log(tt);


// var scope = 45;
// function f(){
//     console.log(scope);
//     var scope = 54;
//     console.log(scope);
// }
// f();

// var truevar = 1;
// fakevar = 2;
// this.fakevar2 = 3;
// console.log(delete truevar);
// console.log(delete fakevar);
// console.log(delete fakevar2);
/* 
var n =0;
function counter(){
    var n=0;
    return {
        count: function(){n++;
            console.log(n)
        },
        reset:function(){n=0}
    }
}
var c = counter(), b = counter();

setInterval(() => {
    c.count();
}, 1000);
setInterval(() => {
    b.count();
}, 500); */


//  function one(x){
//      return x +1;
//  }
//  function two (x){
//      return x +2;
//  }

//  function add (f,g){
//     return function(x){
//         "123";
//         //return f(g(x));
//         return g(f(x));
//     }
//  }

//  var bb = add( two,one)(2)
//  console.log(bb);


class Container {
    constructor (val){
        this.val = val;
    }
  map (fun){
    return new Container(fun(this.val));
    }
}
//init 
var obj = new Container(1);

function addOne(val){
    return val + 1;
}

var obj2 = obj.map(addOne);
var obj3 = obj2.map(addOne);

console.log(obj2.val);
console.log(obj3.val);


// class Container{
//     constructor(val){
//         this.val = val;
//     }
//     map(fun){
//         return new Container(fun(this.val));
//     }
// }

// var obj = new Container(1);
// var obj2 = obj.map(function(val){
//     return val +1;
// });
// console.log(obj2.val);