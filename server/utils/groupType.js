exports.computeGroupType = function(groupType) {
    var groupStr = "";
    switch (parseInt(groupType)) {
        case 0:
            groupStr = "bs"
            break;
        case 1:
            groupStr = "os"
            break;
        case 2:
            groupStr = "screen"
            break;
        case 3:
            groupStr = "isPC"
            break;
        default:
            break;
    }
    return groupStr;
}


exports.computeResType=function(type){
    var resType="";
    switch(parseInt(type)){
        case 0:
            resType="all";
            break;
        case 1:
            resType="script";
            break;
        case 2:
            resType="xmlhttprequest";
            break;
        case 3:
            resType="css";
            break;
        case 4:
            resType="img";
            break;
        case 5:
            resType="link";
            break;
        default:
            break;                        
    }
    return resType;
}