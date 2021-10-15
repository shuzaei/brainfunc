code = """

"""

import sys

function_pointers = {}
ptr = 0
buf = [0] * 1000000

line = ""


def input1():
    global line
    if line == "":
        line = sys.stdin.readline()
    if line == "":
        return -1
    c = line[0]
    line = line[1:]
    return ord(c)


def index(program):
    in_function = False
    for i in range(len(program)):
        for j in range(len(program[i])):
            if program[i][j] == "#":
                break
            if program[i][j] == "{":
                in_function = True
            elif program[i][j] == "}":
                in_function = False
            elif program[i][j].isalnum() or program[i][j] == "_":
                if not in_function:
                    function_pointers[program[i][j]] = (i, j)


def execute(program, name):
    global ptr
    pci, pcj = function_pointers[name]

    while program[pci][pcj] != "{":
        if program[pci][pcj] == "#" or pcj + 1 == len(program[pci]):
            pci += 1
            pcj = 0
        else:
            pcj += 1

    while program[pci][pcj] != "}":
        if program[pci][pcj] == "#":
            pci += 1
            pcj = 0
            continue
        elif program[pci][pcj].isalnum() or program[pci][pcj] == "_":
            execute(program, program[pci][pcj])
        elif program[pci][pcj] == ">":
            ptr += 1
        elif program[pci][pcj] == "<":
            ptr -= 1
        elif program[pci][pcj] == "+":
            buf[ptr] += 1
            if buf[ptr] == 256:
                buf[ptr] = 0
        elif program[pci][pcj] == "-":
            if buf[ptr] == 0:
                buf[ptr] = 256
            buf[ptr] -= 1
        elif program[pci][pcj] == ".":
            print(chr(buf[ptr]), end="")
        elif program[pci][pcj] == ",":
            buf[ptr] = input1()
        elif program[pci][pcj] == "(":
            if buf[ptr] == 0:
                depth = 1
                while depth != 0:
                    if program[pci][pcj] == "#" or pcj + 1 == len(program[pci]):
                        pci += 1
                        pcj = 0
                    else:
                        pcj += 1
                    if program[pci][pcj] == "(":
                        depth += 1
                    elif program[pci][pcj] == ")":
                        depth -= 1

        if pcj + 1 == len(program[pci]):
            pci += 1
            pcj = 0
        else:
            pcj += 1


def interpret(code):
    program = code.split("\n")
    index(program)
    execute(program, "_")


interpret(code)
