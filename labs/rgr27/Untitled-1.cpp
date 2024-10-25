#include <iostream>
#include <string>
using namespace std;

bool isValidL(const string& input) {
    int state = 0;
    bool hasContent = false;
    bool isDigitSequence = false;
    bool isLetterSequence = false;
    
    for (size_t i = 0; i < input.length(); ++i) {
        char c = input[i];
        
        if (state == 0) {
            if (c == '[') {
                state = 1;
            } else {
                return false;
            }
        }
        else if (state == 1) {
            if (c == '+' || c == '-' || c == ' ') {
                state = 2;
            } else {
                return false;
            }
        }
        else if (state == 2) {
            if (isdigit(c)) {
                if (!isLetterSequence) {
                    hasContent = true;
                    isDigitSequence = true;
                } else {
                    return false;
                }
            } else if (isalpha(c)) {
                if (isupper(c) && !isDigitSequence) {
                    hasContent = true;
                    isLetterSequence = true;
                } else {
                    return false;
                }
            } else if (c == ']') {
                if (hasContent) {
                    state = 3;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        else if (state == 3) {
            return true;
        } else {
            return false;
        }
    }
    return state == 3;
}

int main() {
    string input;
    cout << "input: ";
    cin >> input;
    
    if (isValidL(input)) {
        cout << "true" << endl;
    } else {
        cout << "false" << endl;
    }
    
    return 0;
}
