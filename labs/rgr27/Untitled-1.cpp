#include<iostream>
#include<vector>
using namespace std;

int main() {
    string word = "[+345]"; // Test example, modify as needed
    bool result = true;

    // Check if the string is not empty and starts with '[' and ends with ']'
    if (!word.empty() && word[0] == '[' && word[word.size() - 1] == ']') {
        // Check if the second character is '+' or '-'
        if (word[1] == '+' || word[1] == '-') {
            int i = 2;
            bool has_digit = false;
            bool has_letter = false;

            // Check for a sequence of digits or letters between '[' and ']'
            while (i < word.size() - 1) {
                if (word[i] >= '0' && word[i] <= '9') {
                    has_digit = true;
                } else if (word[i] >= 'A' && word[i] <= 'Z') {
                    has_letter = true;
                } else {
                    result = false; // Invalid character found
                    break;
                }
                i++;
            }

            // Ensure there is either a valid sequence of digits or letters
            if (!(has_digit || has_letter)) {
                result = false;
            }
        } else {
            result = false; // Invalid symbol after '['
        }
    } else {
        result = false; // Invalid start or end symbol
    }

    cout << result << endl; // Outputs 1 (true) or 0 (false)
    return 0;
}
