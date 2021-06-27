![Latest GitHub release](https://img.shields.io/github/release/shuzaei/brainfunc?style=for-the-badge)
![GitHub commits since latest release](https://img.shields.io/github/commits-since/shuzaei/brainfunc/latest?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/shuzaei/brainfunc?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/shuzaei/brainfunc?style=for-the-badge)

# Brainfunc
A programming language like brainf\*ck.

## Language specifications

- Recommended extension: `.bc`
- Environment: `char buf[1000000],*ptr=buf;int main(){f_0();}`
- Commands:

| Command         | C equivalent                       |
| :-------------- | :--------------------------------- |
| `[0-9A-Za-z]{}` | `void f_[1-9A-Za-z](void){}`       |
| `>` `<`         | `ptr++;` `ptr--;`                  |
| `+` `-`         | `(*ptr)++;` `(*ptr)--;`            |
| `,` `.`         | `*ptr=getchar();` `putchar(*ptr);` |
| `()`            | `if(*ptr){}`                       |
| `[0-9A-Za-z]`   | `f_[1-9A-Za-z]();`                 |
| `#`             | `//`                               |

- Notice: You receive `-1` as `EOF` in the input.
- Notice: Out of bounds array accesses have undefined behavior.

## Sample code
- Hello World

```brainfuck
I{++++++++++++++++}
H{IIII++++++++.>}
e{IIIIII+++++.>}
l{IIIIII++++++++++++.>}
o{IIIIII+++++++++++++++.>}
C{II++++++++++++.>}
S{II.>}
W{IIIII+++++++.>}
r{IIIIIII++.>}
d{IIIIII++++.>}
E{II+.>}
N{++++++++++.>}
0{HelloCSWorldEN}
```

- Echo

```brainfuck
0{,+(-.0)}
```

- Add

```brainfuck
# add
A{>(-<+A>)<}

# add/subtract 0x10
I{++++++++++++++++}
D{----------------}

# input/output 1 digit
G{,DDD(-(-(-(-(-(-(-(-(-(>+<+)+)+)+)+)+)+)+)+)+)>(-<G)}
P{III.>}

# print new line
N{++++++++++.>}

0{
GG<<
A
PN
}
```

# BCC
A compiler of Brainfunc.

## Installing BCC
Execute the command below.

```sh
brew install shuzaei/brainfunc/brainfunc
```

## Using BCC
```sh
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

```LICENSE

    Copyright 2021 shuzaei

    Contact: shuzaei@gmail.com
    URL: https://github.com/shuzaei/brainfunc/
    
    License: GNU GPL v3.0
    
```
