#include <iostream>
#include <string>
#include <regex>
using namespace std;

bool isValidL(const string& input) {
    // Регулярное выражение:
    // ^ - начало строки
    // \[ - открывающая квадратная скобка
    // [+\- ] - символ `+`, `-` или пробел
    // ([0-9]+|[a-zA-Z]+) - последовательность цифр или букв
    // \] - закрывающая квадратная скобка
    // $ - конец строки
    regex pattern(R"(^\[[+\- ]([0-9]+|[a-zA-Z]+)\]$)");

    // Проверка, соответствует ли input регулярному выражению
    return regex_match(input, pattern);
}

int main() {
    string input;
    cout << "Введіть рядок: ";
    cin >> input;

    if (isValidL(input)) {
        cout << "Рядок правильний для мови L(V)." << endl;
    } else {
        cout << "Помилка: Рядок не відповідає мові L(V)." << endl;
    }

    return 0;
}
6