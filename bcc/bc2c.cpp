#include <fstream>
#include <iostream>
#include <set>
#include <string>

void error(bool condition, std::string where, std::string msg, std::ostream &out = std::cerr) {
    if (!condition) return;
    std::string s = "\e[91mError:\e[0m " + where + ": " + msg;
    out << s << std::endl;
    exit(1);
}

class Interpreter {
    public:
    Interpreter(std::string code, std::string filename) : code(code), filename(filename) {
        func_name = '0';
        in_func = false, in_comment = false, func_name_defined = false;
        depth = 0, line = 1, col = 1;
    }

    std::string where() {
        return filename + ":" + std::to_string(line) + ":" + std::to_string(col);
    }

    void run(std::ostream &out = std::cout) {
        out << header;
        for (char c : code) {
            if (!in_comment) {
                if (std::isalnum(c) || c == '_') {
                    if (!in_func) {
                        error(func_name_defined, where(), "Invalid function name");
                        error(used_func.count(c), where(),
                              "Invalid redeclaration of function \"" + std::string(1, c) + "\"");

                        used_func.insert(c);
                        func_name = c;
                        func_name_defined = true;
                    } else {
                        out << "f_" << c << "();";
                    }
                } else {
                    if (!in_func && std::string("><+-,.()").find(c) != std::string::npos) {
                        error(true, where(), "Invalid expression outside of a function");
                    }
                    switch (c) {
                        case '{':
                            error(in_func, where(),
                                  "Invalid function declaration inside of a function");
                            error(!func_name_defined, where(), "Missing function name");
                            in_func = true;
                            out << "void f_" << func_name << "(){";
                            break;
                        case '}':
                            error(!in_func, where(), "Unbalanced brace }");
                            error(depth != 0, where(), "Unbalanced parentheses (");
                            in_func = false, func_name_defined = false;
                            out << "}";
                            break;
                        case '>': out << "ptr++;"; break;
                        case '<': out << "ptr--;"; break;
                        case '+': out << "(*ptr)++;"; break;
                        case '-': out << "(*ptr)--;"; break;
                        case ',': out << "*ptr=getchar();"; break;
                        case '.': out << "putchar(*ptr);"; break;
                        case '(':
                            ++depth;
                            out << "if(*ptr){";
                            break;
                        case ')':
                            error(--depth < 0, where(), "Unbalanced parenthesis )");
                            out << "}";
                            break;
                        case '#': in_comment = true; break;
                        case ' ':
                        case '\n':
                        case '\t': break;
                        default:
                            error(true, where(), "Invalid character '" + std::string(1, c) + "'");
                    }
                }
            }

            if (c == '\n') {
                ++line;
                col = 1;
                in_comment = false;
            } else {
                ++col;
            }
        }
    }

    private:
    std::string code, filename;
    char func_name;
    bool in_func, in_comment, func_name_defined;
    int depth, line, col;
    std::set<char> used_func;

    const std::string
        header = "#include <stdio.h>\nchar buf[1000000],*ptr=buf;"
                 "void f_0(void);void f_1(void);void f_2(void);void f_3(void);void f_4(void);"
                 "void f_5(void);void f_6(void);void f_7(void);void f_8(void);void f_9(void);"
                 "void f_A(void);void f_B(void);void f_C(void);void f_D(void);void f_E(void);"
                 "void f_F(void);void f_G(void);void f_H(void);void f_I(void);void f_J(void);"
                 "void f_K(void);void f_L(void);void f_M(void);void f_N(void);void f_O(void);"
                 "void f_P(void);void f_Q(void);void f_R(void);void f_S(void);void f_T(void);"
                 "void f_U(void);void f_V(void);void f_W(void);void f_X(void);void f_Y(void);"
                 "void f_Z(void);"
                 "void f_a(void);void f_b(void);void f_c(void);void f_d(void);void f_e(void);"
                 "void f_f(void);void f_g(void);void f_h(void);void f_i(void);void f_j(void);"
                 "void f_k(void);void f_l(void);void f_m(void);void f_n(void);void f_o(void);"
                 "void f_p(void);void f_q(void);void f_r(void);void f_s(void);void f_t(void);"
                 "void f_u(void);void f_v(void);void f_w(void);void f_x(void);void f_y(void);"
                 "void f_z(void);"
                 "void f__(void);",
        footer = "int main(void){f__();return 0;}\n";
};

int main(int argc, char **argv) {
    error(argc == 1, "bc2c", "Usage: " + std::string(argv[0]) + " <file>");
    error(argc > 2, "bc2c", "Too many arguments");

    std::ifstream src(argv[1]);
    error(!src, "bc2c", "Could not open file \"" + std::string(argv[1]) + "\"");

    std::string code((std::istreambuf_iterator<char>(src)), (std::istreambuf_iterator<char>()));
    Interpreter interpreter(code, argv[1]);
    interpreter.run();
}