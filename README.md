# Brainfunc
A programming language like brainf\*ck.

## Language specifications

- Recommended extension: `.b`, `.bc`, `.bf`
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

- Notice: input `EOF` is `-1`.

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
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the command below on the cloned directory.

```sh
chmod +x install.sh && ./install.sh
```

3. (Optional) Delete the cloned files.

## Uninstalling BCC
1. Clone [this](https://github.com/shuzaei/brainfunc/) repository.
2. Execute the command below on the cloned directory.

```sh
chmod +x uninstall.sh && ./uninstall.sh
```

3. (Optional) Delete the cloned files.

## Using BCC
```sh
bcc <filename> [execname]
```
