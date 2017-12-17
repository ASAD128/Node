console.log("Start Node App");

setTimeout(()=>{
console.log("After 2 sec");
},2000);

setTimeout(()=>{
console.log("After 0 sec");
},0);


console.log("End Node App");
//------------------function-------------------
sum(2,3);
function sum(a,b){

var c=a+b;
console.log("Sum of a and b = "+c);
}
//-----------------Callback------------------


function getUser(id,callback){
var user={
id:id,
name:"Asad"
}
 callback(user);
}

console.log("Calling call back function");
getUser(5,(user)=>{
console.log(user.name);
});

