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

## Sample codes
- Hello World

```brainfuck
h{++++++++++++++++}
H{hhhh++++++++}
e{hhhhhh+++++}
l{hhhhhh++++++++++++}
o{hhhhhh+++++++++++++++}
C{hh++++++++++++}
S{hh}
W{hhhhh+++++++}
r{hhhhhhh++}
d{hhhhhh++++}
E{hh+}
N{++++++++++}
0{H.>e.>l.>l.>o.>C.>S.>W.>o.>r.>l.>d.>E.>N.}
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
1. Download source code from [latest release](https://github.com/shuzaei/brainfunc/releases/latest/).
2. Execute the command below on the directory of the source code.

```sh
chmod +x install.sh && ./install.sh
```

## Uninstalling BCC
1. Download source code from [latest release](https://github.com/shuzaei/brainfunc/releases/latest/).
2. Execute the command below on the directory of the source code.

```sh
chmod +x uninstall.sh && ./uninstall.sh
```

## Using BCC
```sh
bcc <filename> [execname]
```
