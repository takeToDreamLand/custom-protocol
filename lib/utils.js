function genTimestamp() {
    let miliscecond = new Date().getTime();
    return miliscecond.toString();
}
exports.genTimestamp = genTimestamp;