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

function convertIntToChar(num) {
    trueNum = parseInt(num);
    if (trueNum >= 0){
        return trueNum;
    } else {
        return 0x0100 + trueNum;
    }
}

function intToCharPrint(num) {
    return String.fromCodePoint(convertIntToChar(num));
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

    if (inputPos >= inputEncoded.length) {
        numCell.innerHTML = "26";
    } else {
        numCell.innerHTML = inputEncoded[inputPos];
    }
    inputPos++;

    charCell.innerHTML = intToChar(parseInt(numCell.innerHTML));
}

function put() {
    var intCell = document.getElementById("num-row").cells[cellPos].childNodes[0];
    outputArea.save();
    outputArea.getDoc().setValue(output.value + intToCharPrint(intCell.innerHTML));
}

function startStop() {
    if (!checkOk) return;
    if (isRunning) {
        clearTimeout(timer);
        isRunning = false;
        var button = document.getElementById("start-stop");
        button.setAttribute("class", "btn btn-primary btn-block");
        button.innerHTML = "Start";
    } else {
        timer = setInterval(next, delay.value * 1000);
        isRunning = true;
        var button = document.getElementById("start-stop");
        button.setAttribute("class", "btn btn-success btn-block");
        button.innerHTML = "Stop";
    }
}

function resetInterval() {
    if (!checkOk || !isRunning) return;
    clearTimeout(timer);
    timer = setInterval(next, delay.value * 1000);
}

function pushPrev() {
    if (!checkOk || isRunning) return;
    prev();
}

function prev() {
    if (!checkOk || isRunning) return;
}

function setCodePos(num) {
    codePos = num;
}

function pushNext() {
    if (!checkOk || isRunning) return;
    next();
}

function removeCursor() {
    if (marker) {
        marker.clear();
    }
}

function showCursor() {
    var pos = cmPos[codePos];
    removeCursor();
    cursorCoords = codeArea.cursorCoords(pos);
    cursorElement = document.createElement('span');
    cursorElement.style.borderLeftStyle = 'solid';
    cursorElement.style.borderLeftWidth = '2px';
    cursorElement.style.borderLeftColor = '#24292e';
    cursorElement.style.height = `${(cursorCoords.bottom - cursorCoords.top)}px`;
    cursorElement.style.padding = 0;
    cursorElement.style.zIndex = 1000;
    cursorElement.style.position = 'absolute';
    marker = codeArea.setBookmark(pos, { widget: cursorElement });
}

function next() {
    if (!checkOk || codePos == codeEncoded.length) {
        clearTimeout(timer);
        var button = document.getElementById("start-stop");
        button.setAttribute("class", "btn btn-primary btn-block");
        button.innerHTML = "Start";
        isRunning = false;
        return;
    }

    if (!isStarted) {
        showCursor();

        isStarted = true;
        return;
    }

    var numRow = document.getElementById("num-row");

    if ((0x30 <= codeEncoded[codePos] && codeEncoded[codePos] <= 0x39) ||
        (0x41 <= codeEncoded[codePos] && codeEncoded[codePos] <= 0x5A) ||
        (0x61 <= codeEncoded[codePos] && codeEncoded[codePos] <= 0x7A) ||
        codeEncoded[codePos] === 0x5F) {
        returnPos.push(codePos);
        setCodePos(functionPos[codeEncoded[codePos]] - 1);
    }

    else if (codeEncoded[codePos] === 0x7D) {
        if (returnPos.length) {
            setCodePos(returnPos.pop());
        } else {
            setCodePos(codeEncoded.length - 1);
            removeCursor();
        }
    }

    else if (codeEncoded[codePos] === 0x3E) {
        go();
    } 
    else if (codeEncoded[codePos] === 0x3C) {
        back();
    }

    else if (codeEncoded[codePos] === 0x2B) {
        inc();
    }
    else if (codeEncoded[codePos] === 0x2D) {
        dec();
    }

    else if (codeEncoded[codePos] === 0x2C) {
        get();
    }
    else if (codeEncoded[codePos] === 0x2E) {
        put();
    }

    else if (codeEncoded[codePos] === 0x28) {
        if (numRow.cells[cellPos].childNodes[0].innerHTML == "0") {
            var jump = codePos + 1;
            depth++;
            while(jump < codeEncoded.length && depth > 0) {
                if (codeEncoded[jump] === 0x28) {
                    depth++;
                } else if (codeEncoded[jump] === 0x29) {
                    depth--;
                }
                jump++;
            }
            setCodePos(jump - 1);
        }
    }

    else if (codeEncoded[codePos] == 0x23) {
        var jump = codePos;
        while (jump < codeEncoded.length && codeEncoded[jump] != 0x0A) {
            jump++;
        }
        setCodePos(jump);
    }

    setCodePos(codePos + 1);

    if (codePos == codeEncoded.length) return;

    var jump = codePos;
    while (jump < codeEncoded.length && (codeEncoded[jump] === 0x20 || codeEncoded[jump] === 0x0D ||
        codeEncoded[jump] === 0x0A || codeEncoded[jump] === 0x09 || codeEncoded[jump] === 0x0C || codeEncoded[jump] == 0x23)) {
        if (codeEncoded[jump] == 0x23) {
            while (jump < codeEncoded.length && codeEncoded[jump] != 0x0A) {
                jump++;
            }
        }
        jump++;
    }
    setCodePos(jump);

    if (codePos == codeEncoded.length) return;

    showCursor();
}

function where(line, col) {
    return line.toString() + ": " + col.toString() + ": ";
}

function checkCode(codeEncoded) {
    var functionName;
    var inFunc = false, defined = false, depth = 0, line = 1, col = 1, flags = {}, use = {};

    for (i = 0; i < codeEncoded.length; i++) {
        if ((0x30 <= codeEncoded[i] && codeEncoded[i] <= 0x39) ||
            (0x41 <= codeEncoded[i] && codeEncoded[i] <= 0x5A) ||
            (0x61 <= codeEncoded[i] && codeEncoded[i] <= 0x7A) ||
            codeEncoded[i] === 0x5F) {
            if (!inFunc) {
                if (defined) {
                    return where(line, col) + "Error: Invalid function name\n";
                }
                if (flags[codeEncoded[i]]) {
                    return where(line, col) + "Error: Invalid redeclaration of function \'" + codeEncoded[i] + "\'\n";
                }
                flags[codeEncoded[i]] = true;
                functionName = codeEncoded[i];
                defined = true;
            } else {
                use[codeEncoded[i]] = true;
            }
        }

        else if (codeEncoded[i] === 0x7B) {
            if (inFunc) {
                return where(line, col) + "Error: Invalid function declaration inside of a function\n";
            }
            if (!defined) {
                return where(line, col) + "Error: Missing function name\n";
            }
            inFunc = true;
            functionPos[functionName] = i;
        } else if (codeEncoded[i] === 0x7D) {
            if (!inFunc) {
                return where(line, col) + "Error: Unbalanced brace }\n";
            }
            if (depth != 0) {
                return where(line, col) + "Error: Unbalanced parentheses (\n";
            }
            depth = 0;
            inFunc = false;
            defined = false;
        }

        else if (codeEncoded[i] === 0x3E || codeEncoded[i] === 0x3C ||
            codeEncoded[i] === 0x2B || codeEncoded[i] === 0x2D ||
            codeEncoded[i] === 0x2C || codeEncoded[i] === 0x2E ||
            codeEncoded[i] === 0x28 || codeEncoded[i] === 0x29) {
            if (inFunc) {
                if (codeEncoded[i] === 0x28) {
                    ++depth;
                } else if (codeEncoded[i] === 0x29) {
                    if (--depth < 0) {
                        return where(line, col) + "Error: Unbalanced parenthesis )\n";
                    }
                }
            } else {
                return where(line, col) + "Error: Invalid expression outside of a function\n";
            }
        }

        else if (codeEncoded[i] == 0x23) {
            while (i < codeEncoded.length && codeEncoded[i] != 0x0A) {
                col++;
                i++;
            }
        }

        else if (!(codeEncoded[i] === 0x20 || codeEncoded[i] === 0x0D ||
            codeEncoded[i] === 0x0A || codeEncoded[i] === 0x09 || codeEncoded[i] === 0x0C)) {
            return where(line, col) + "Error: Invalid charactor 0x" + codeEncoded[i].toString(16) + "\n";
        }

        if (codeEncoded[i] == 0x0A) {
            col = 0;
            line++;
        } else {
            col++;
        }
    }

    if (!flags[0x5F]) {
        return where(line, col) + "Error: Missing function _\n";
    }

    if (inFunc || defined) {
        return where(line, col) + "Error: Extra expression\n";
    }

    for (i = 0; i < 0x100; i++) {
        if (use[i] && !flags[i]) {
            return where(line, col) + "Error: Missing function " + String.fromCodePoint(i) + "\n";
        }
    }

    return "Ok";
}

function generateCMPos() {
    var nowLine = 0, nowCh = 0;
    for (i = 0; i < codeEncoded.length; i++) {
        cmPos.push({line: nowLine, ch: nowCh});
        if (codeEncoded[i] == 0x0A) {
            nowLine++;
            nowCh = 0;
        } else {
            nowCh++;
        }
    }
}

function reset() {
    if (timer) {
        clearTimeout(timer);
        var button = document.getElementById("start-stop");
        button.setAttribute("class", "btn btn-primary btn-block");
        button.innerHTML = "Start";
    }
    
    var charRow = document.getElementById("char-row");
    var numRow = document.getElementById("num-row");

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square");

    checkOk = false;
    isRunning = false;
    codePos = 0;
    inputPos = 0;
    cellPos = 0;

    charRow.cells[cellPos].childNodes[0].setAttribute("class", "char-square-on");
    numRow.cells[cellPos].childNodes[0].setAttribute("class", "num-square-on");

    codeArea.save();
    codeEncoded = (new TextEncoder).encode(code.value);

    inputArea.save();
    inputEncoded = (new TextEncoder).encode(input.value);

    returnPos = [];

    functionPos = {};

    isStarted = false;

    cmPos = [];

    depth = [0];

    removeCursor();
    
    for (let i = 0; i < 100; i++) {
        charRow.cells[i].childNodes[0].innerHTML = intToChar("0");
        numRow.cells[i].childNodes[0].innerHTML = "0";
    }

    var result = checkCode(codeEncoded);
    if (result === "Ok") {
        checkOk = true;
        codePos = functionPos[0x5F];
        outputArea.getDoc().setValue("");
        generateCMPos();
    } else {
        outputArea.getDoc().setValue(result);
    }
}

var checkOk = false;
var isRunning = false;
var codePos = 0;
var inputPos = 0;
var cellPos = 0;
var codeEncoded = [];
var inputEncoded = [];
var returnPos = [];
var functionPos = {};
var timer;
var cursorCoords;
var cursorElement;
var marker;
var isStarted = false;
var cmPos = [];
var depth = [0];

window.onload = function() {
    initTable();
    reset();
}
