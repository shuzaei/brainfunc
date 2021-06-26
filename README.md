# Brainfunc
A programming language like brainf\*ck.

## Language specifications

- Recommended extensions: `.b`, `.bc`, `.bf`
- Environment implementation: `static char buf[1000000],*ptr=buf;int main(){f_0();}`
- Code implementation:

| Code            | C implementation                   |
| :-------------- | :--------------------------------- |
| `[0-9A-Za-z]{}` | `void f_[1-9A-Za-z](void){}`       |
| `>` `<`         | `ptr++;` `ptr--;`                  |
| `+` `-`         | `(*ptr)++;` `(*ptr)--;`            |
| `,` `.`         | `*ptr=getchar();` `putchar(*ptr);` |
| `()`            | `if(*ptr){}`                       |
| `[0-9A-Za-z]`   | `f_[1-9A-Za-z]();`                 |
| `#`             | `//`                               |

- Notice: `EOF` is given as `-1` in the input.

## Sample code
- Hello World

```brainfuck
h{++++++++++++++++}
H{hhhh++++++++.>}
e{hhhhhh+++++.>}
l{hhhhhh++++++++++++.>}
o{hhhhhh+++++++++++++++.>}
C{hh++++++++++++.>}
S{hh.>}
W{hhhhh+++++++.>}
r{hhhhhhh++.>}
d{hhhhhh++++.>}
E{hh+.>}
N{++++++++++.>}
0{HelloCSWorldEN}
```

- Echo

```brainfuck
0{,+(-.0)}
```

- Add

```brainfuck
a{>(-<+a>)<}

h{++++++++++++++++}
d{----------------}

n{h------}

i{,ddd(-(-(-(-(-(-(-(-(-(>+<+)+)+)+)+)+)+)+)+)+)>(-<i)}

0{
ii<<
a
hhh.>n.
}
```

# BCC
A compiler of Brainfunc.

## Installing BCC
1. Clone source code from [latest release](https://github.com/shuzaei/brainfunc/releases/latest/).
2. Execute the command below on the directory `bcc/`.

```sh
chmod +x install.sh && ./install.sh
```

## Uninstalling BCC
1. Clone source code from [latest release](https://github.com/shuzaei/brainfunc/releases/latest/).
2. Execute the command below on the directory `bcc/`.

```sh
chmod +x uninstall.sh && ./uninstall.sh
```

## Using BCC
```sh
bcc <filename> [execname]
```

# VSCode Extension
Brainfunc language support.

## Installing extension
Install from [here](https://marketplace.visualstudio.com/items?itemName=shuzaei.vscode-brainfunc).

# Additional support
- [Code runner setting.json addition](./utils/code-runner.append.json)
- [Progran file icon](./utils/brainfunc.icon.svg)

# Copyright and license (summery)

```LICENSE

    Copyright 2021 shuzaei

    Contact: shuzaei@gmail.com
    URL: https://github.com/shuzaei/brainfunc/
    
    License: GNU GPL v3.0
    
```
