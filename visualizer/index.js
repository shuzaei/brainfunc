function convertControlCharactor(num) {
    if (num < 0x20) {
        return 0x2400 + parseInt(num);
    } else if (num == 0x7F) {
        return 0x2421;
    } else if (num < 0x80) {
        return num;
    }
}

function intToChar(num) {
    return String.fromCodePoint(convertControlCharactor(num));
}

function test() {
    box.innerHTML = intToChar(num.value);
}

function initTable() {
    var charRow = document.getElementById("char-row");
    var numRow = document.getElementById("num-row");

    for (let i = 0; i < 100; i++) {
        var charCol = document.createElement("th");
        charCol.setAttribute("style", "padding: 0px 0px;");

        var charBox = document.createElement("div");
        charBox.setAttribute("class", "char-square");
        charBox.innerHTML = intToChar("0");
        charCol.appendChild(charBox);

        charRow.appendChild(charCol);

        var numCol = document.createElement("th");
        numCol.setAttribute("style", "padding: 0px 0px;");

        var numBox = document.createElement("div");
        numBox.setAttribute("class", "num-square");
        numBox.innerHTML = "0";
        numCol.appendChild(numBox);

        numRow.appendChild(numCol);
    }
}