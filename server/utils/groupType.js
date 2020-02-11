exports.computeGroupType = function name(groupType) {
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