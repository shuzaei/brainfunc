function convertControlCharactor(num) {
    trueNum = parseInt(num);
    if (trueNum >= 0 && trueNum < 0x20) {
        return 0x2400 + trueNum;
    } else if (trueNum == 0x7F) {
        return 0x2421;
    } else if (trueNum >= 0){
        return trueNum;
    } else {
        return 0x0100 + trueNum;
    }
}

function intToChar(num) {
    return String.fromCodePoint(convertControlCharactor(num));
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
        numBox.setAttribute("id", "num-square-" + i);
        numBox.innerHTML = "0";
        numCol.appendChild(numBox);

        numRow.appendChild(numCol);
    }

    charRow.cells[0].childNodes[0].setAttribute("class", "char-square-on");
    numRow.cells[0].childNodes[0].setAttribute("class", "num-square-on");
}

function inc() {
    var charCell = document.getElementById("char-row").cells[cellPos].childNodes[0];
    var numCell = document.getElementById("num-row").cells[cellPos].childNodes[0];

    numCell.innerHTML = (parseInt(numCell.innerHTML) + 1);
    if (numCell.innerHTML === "128") numCell.innerHTML = "-128";

    charCell.innerHTML = intToChar(parseInt(numCell.innerHTML));
}

function dec() {
    var charCell = document.getElementById("char-row").cells[cellPos].childNodes[0];
    var numCell = document.getElementById("num-row").cells[cellPos].childNodes[0];

    numCell.innerHTML = (parseInt(numCell.innerHTML) - 1);
    if (numCell.innerHTML === "-129") numCell.innerHTML = "127";

    charCell.innerHTML = intToChar(parseInt(numCell.innerHTML));
}

function go() {
    var charRow = document.getElementById("char-row");
    var numRow = document.getElementById("num-row");

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square");

    cellPos++;
    if (cellPos == 100) cellPos = 0;

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square-on");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square-on");
}

function back() {
    var charRow = document.getElementById("char-row");
    var numRow = document.getElementById("num-row");

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square");

    cellPos--;
    if (cellPos == -1) cellPos = 99;

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square-on");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square-on");
}

function get() {
    var charCell = document.getElementById("char-row").cells[cellPos].childNodes[0];
    var numCell = document.getElementById("num-row").cells[cellPos].childNodes[0];

    if (inputPos >= codeEncoded.length) {
        numCell.innerHTML = "26";
    }
    numCell.innerHTML = codeEncoded[inputPos];
    inputPos++;

    charCell.innerHTML = intToChar(parseInt(numCell.innerHTML));
}

function put() {
    var charCell = document.getElementById("char-row").cells[cellPos].childNodes[0];
    outputArea.save();
    outputArea.getDoc().setValue(output.value + charCell.innerHTML);
}

function startStop() {
    if (!checkOk) return;
}

function prev() {
    if (!checkOk) return;
}

function next() {
    go();
    if (!checkOk) return;
}

function checkCode(code) {
    return "Error: ";
}

function reset() {
    var charRow = document.getElementById("char-row");
    var numRow = document.getElementById("num-row");

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square");

    checkOk = false;
    codePos = 0;
    inputPos = 0;
    cellPos = 0;

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square-on");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square-on");

    codeArea.save();
    codeEncoded = (new TextEncoder).encode(code.value);

    inputArea.save();
    inputEncoded = (new TextEncoder).encode(input.value);

    functionStack = [{
        "function" : "_",
        "returnPos" : -1
    }]

    functionPos = Array(128);

    var result = checkCode(codeEncoded);
    if (result === "OK") {
        checkOk = true;
    } else {
        outputArea.getDoc().setValue(result);
    }
}

var checkOk = false;
var codePos = 0;
var inputPos = 0;
var cellPos = 0;
var codeEncoded = [];
var inputEncoded = [];
var functionStack = [{
    "function" : "_",
    "returnPos" : -1
}];
var functionPos = Array(128);

window.onload = function() {
    initTable();
}