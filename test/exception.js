let obj={
    a:1
}
function exp1(params) {
    try {
        throw new Error("触发了异常");
    } catch (error) {
        throw `${error.message}`;
        //return;
    }
}

function exp2(){
    try {
        exp1();
    } catch (error) {
        console.log("log exception"+error);
    }
}

exp2()