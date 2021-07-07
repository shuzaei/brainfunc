![Latest GitHub release](https://img.shields.io/github/release/shuzaei/brainfunc?style=for-the-badge)
![GitHub commits since latest release](https://img.shields.io/github/commits-since/shuzaei/brainfunc/latest?style=for-the-badge)

# Brainfunc
A programming language like brainf\*ck.

[An introduction slide](https://shuzaei.github.io/brainfunc/docs/brainfunc.html)

## Language specifications

- Recommended extension: `.bc`
- Environment: `char buf[1000000],*ptr=buf;int main(){f__();}`
- Commands:

| Command          | C equivalent                       |
| :--------------- | :--------------------------------- |
| `[_0-9A-Za-z]{}` | `void f_[_0-9A-Za-z](void){}`      |
| `>` `<`          | `ptr++;` `ptr--;`                  |
| `+` `-`          | `(*ptr)++;` `(*ptr)--;`            |
| `,` `.`          | `*ptr=getchar();` `putchar(*ptr);` |
| `()`             | `if(*ptr){}`                       |
| `[_0-9A-Za-z]`   | `f_[_0-9A-Za-z]();`                |
| `#`              | `//`                               |

- Note: you receive `-1` as `EOF` in the input.
- Note: out of bounds array accesses have undefined behavior.

# Brainfunc visualizer

A visualizer of Brainfunc.
You can find it [here](https://shuzaei.github.io/brainfunc/visualizer/).

- **Note: it is a beta version now.**
- Note: ad-blocks may disable indicating the cursor.

## Special specifications

- `if (ptr == 100) ptr = 0;`
- `if (ptr == -1) ptr = 99;`

# BCC
A compiler of Brainfunc.
[Here](https://www.github.com/shuzaei/homebrew-brainfunc/) is a repository for homebrew.

## Installing BCC
Execute the command below.

```
brew install shuzaei/brainfunc/brainfunc
```

## Using BCC
```
bcc <filename> [output filename]
```

# VSCode extension
Brainfunc language support.

## Installing extension
Install from [here](https://marketplace.visualstudio.com/items?itemName=shuzaei.vscode-brainfunc).

# Additional support
- [Code runner setting.json addition](./utils/code-runner.append.json)
- [Program file icon](./utils/brainfunc.icon.svg)

# Copyright and license (summary)

```

    Copyright 2021 shuzaei

    Contact: shuzaei@gmail.com
    URL: https://github.com/shuzaei/brainfunc/
    
    License: GNU GPL v3.0
    
```
