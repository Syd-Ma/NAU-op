#include <iostream>
#include <stack>
#include <string>
#include <cctype>
#include <stdexcept>

using namespace std;

int precedence(char c) {
    if (c == '+' || c == '-')
        return 1;
    if (c == '*' || c == '/')
        return 2;
    return 0;
}

int performOperation(char operation, int operand1, int operand2) {
    switch (operation) {
    case '+': return operand1 + operand2;
    case '-': return operand1 - operand2;
    case '*': return operand1 * operand2;
    case '/':
        if (operand2 == 0)
            throw runtime_error("Error: Division by zero");
        return operand1 / operand2;
    default:
        throw runtime_error("Error: Invalid operation");
    }
}

string infixToPostfix(const string& expression) {
    stack<char> operators;
    string postfix = "";

    for (size_t i = 0; i < expression.length(); ++i) {
        char current = expression[i];

        if (isspace(current)) continue;

        if (isdigit(current)) {
            while (i < expression.length() && isdigit(expression[i])) {
                postfix += expression[i++];
            }
            postfix += ' ';
            i--;
        }
        else if (current == '+' || current == '-' || current == '*' || current == '/') {
            while (!operators.empty() && precedence(operators.top()) >= precedence(current)) {
                postfix += operators.top();
                postfix += ' ';
                operators.pop();
            }
            operators.push(current);
        }
        else {
            throw runtime_error("Error: Invalid character in expression");
        }
    }

    while (!operators.empty()) {
        postfix += operators.top();
        postfix += ' ';
        operators.pop();
    }

    return postfix;
}

int evaluatePostfix(const string& expression) {
    stack<int> operands;

    for (size_t i = 0; i < expression.length(); ++i) {
        char current = expression[i];

        if (isspace(current)) continue;

        if (isdigit(current)) {
            int number = 0;
            while (i < expression.length() && isdigit(expression[i])) {
                number = number * 10 + (expression[i++] - '0');
            }
            operands.push(number);
            i--;
        }
        else if (current == '+' || current == '-' || current == '*' || current == '/') {
            if (operands.size() < 2) {
                throw runtime_error("Error: Invalid postfix expression");
            }

            int operand2 = operands.top(); operands.pop();
            int operand1 = operands.top(); operands.pop();

            int result = performOperation(current, operand1, operand2);
            operands.push(result);
        }
    }

    if (operands.size() != 1) {
        throw runtime_error("Error: Invalid postfix expression");
    }

    return operands.top();
}

int main() {
    try {
        string infixExpression;
        cout << "Enter an infix expression: ";
        getline(cin, infixExpression);

        string postfixExpression = infixToPostfix(infixExpression);
        cout << "Postfix expression: " << postfixExpression << endl;

        int result = evaluatePostfix(postfixExpression);
        cout << "Result: " << result << endl;
    }
    catch (const exception& e) {
        cerr << e.what() << endl;
    }

    return 0;
}
