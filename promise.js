var asyncAdd = (a,b)=>{
return new Promise((resolve,reject)=>{
if(typeof a ==='number' && typeof b==='number')
{
resolve(a+b);
}
else{
reject('Argument should be number');
}
})
}

asyncAdd('5',7).then((res)=>{
console.log(res);
},(error)=>{
console.log(error);
});
