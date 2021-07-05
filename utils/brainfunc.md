---
marp: true
---

# Brainfunc
A programming language like brainf\*ck

2021/07/06

<div style="text-align: right; font-size: 35px;">
<img src="./shuzaei.png" width=150></img> Shuz*
(<a href="https://www.twitter.com/shuzaei">@shuzaei</a>)
</div>

---

## Language background

- :thinking: C++ template is Turing complete.
- :thinking: Brainf\*ck is also Turing complete.
- :thinking: How about introducing functions into brainf\*ck?
- :smile: While-statements are substitutable with recursive functions and if-statements!

---

## What is Brainfunc?

- It is a derivative of brainf*ck.
- There is a void <span style="color: red;">function</span> declaration in the language.
- There is an operation <span style="color: red;">()</span> in the language, which means an if-statement.
- There is no operation [] which means a while loop in brainf*ck in the language.

---

## Sample code (an echo program)

```py
# function main
_ {
    # input
    ,
    # if (input + 1 != 0) (<=> input != EOF)
    + ( -
        # print input
        .
        # continue echoing
        _
    )
}
```

Try it on [Brainfunc visualizer](https://shuzaei.github.io/brainfunc/visualizer/) now!

---

## Commands

| Command | Description                                                     |
| :------ | :-------------------------------------------------------------- |
| `x{y}`  | Declare a function that executes `y` with the name `x`.         |
| `>` `<` | Increment and decrement the index of the current cell.          |
| `+` `-` | Increment and decrement the value of the current cell.          |
| `,` `.` | Input to and output from the value of the current cell.         |
| `(x)`   | Execute `x` if the value of the current cell is not equal to 0. |
| `x`     | Call a function with the name `x`.                              |

See also: [README.md](https://github.com/shuzaei/brainfunc/blob/main/README.md)

---

## How can we enjoy Brainfunc?

- Try to code Brainfunc from [Brainfunc visualizer](https://shuzaei.github.io/brainfunc/visualizer/).
- Install a Brainfunc compiler with a command below. <br> `brew install shuzaei/brainfunc/brainfunc`
  - Usage: `bcc <filename> [output filename]`
- Install a Visual Studio Code extension from [here](https://marketplace.visualstudio.com/items?itemName=shuzaei.vscode-brainfunc).
---

## What are the merits and the demerits of Brainfunc?

- :heavy_check_mark: You can use functions and write brainfunc-like code more with ease.
- :heavy_check_mark: You can use if-statement without affecting surrounding cells.
- :heavy_check_mark: You can leave comments more formally and efficiently.
- :x: You can use only 63 functions in the current status.

---

# Good luck with your life on Brainfunc!
Thank you for watching,

<div style="text-align: right; font-size: 35px;">
<img src="./shuzaei.png" width=150></img> Shuz*
</div>

---

## The history and release notes

- 2021/06/25 Invented Brainfunc on the evening
- 2021/06/25 Created the first transpiler
- 2021/06/26 Created the first compiler
- 2021/06/25 Released an alpha version of the package
- 2021/06/26 Created the first visual studio code extension
- 2021/06/27 Created the first homebrew package
- 2021/06/27 Released a beta version of the package
- 2021/07/02 Started to create a visualizer
- 2021/07/03 Released an alpha version of the visualizer
- 2021/07/05 Released a beta version of the visualizer

---

## Links

- [GitHub repository](https://github.com/shuzaei/brainfunc/)
- [GitHub repository of the homebrew package](https://github.com/shuzaei/homebrew-brainfunc/)
- [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=shuzaei.vscode-brainfunc)
- [Brainfunc visualizer](https://shuzaei.github.io/brainfunc/visualizer/)