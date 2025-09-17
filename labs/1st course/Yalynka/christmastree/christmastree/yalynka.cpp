#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>
#include <thread>
#include <chrono>
#include <sstream>  // Потрібен для ostringstream

#define RESET   "\033[0m"
#define RED     "\033[31m"

// Очищення екрану для різних ОС
void clearConsole() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

void drawTriangle(int level, int max_width, std::ofstream &file, std::ostringstream &consoleOutput) {
    const char decorations[] = { '@', '#', '$', '%', '&', '*' };

    for (int i = 1; i <= level; ++i) {
        // Рахуємо кількість пробілів для вирівнювання трикутника
        int spaces = max_width - i;
        
        for (int j = 0; j < spaces; ++j) {
            file << " ";
            consoleOutput << " ";
        }

        // Виводимо символи ялинки
        for (int j = 0; j < 2 * i - 1; ++j) {
            char symbol = (rand() % 5 == 0) ? decorations[rand() % 6] : '*';
            file << symbol;
            consoleOutput << symbol;
        }
        
        file << std::endl;
        consoleOutput << std::endl;
    }
}

void drawTree(int levels, std::ofstream &file, std::ostringstream &consoleOutput) {
    int max_width = levels + 2;

    for (int i = 1; i <= levels; ++i) {
        drawTriangle(i + 1, max_width, file, consoleOutput);
    }
}

void animateTree(int levels, int delay, int repetitions) {
    std::ofstream file("trees.txt", std::ios::trunc); 
    for (int r = 0; r < repetitions; ++r) {
        clearConsole();

        std::ostringstream consoleOutput;

        drawTree(levels, file, consoleOutput);
        file << "\n\n";
        file.flush();

        std::cout << consoleOutput.str();
        std::this_thread::sleep_for(std::chrono::milliseconds(delay));
    }
}

int main() {
    srand(static_cast<unsigned int>(time(0)));

    int levels;
    std::cout << "Enter the number of tree levels: ";
    std::cin >> levels;

    int delay;
    std::cout << "Enter the delay between frames (in milliseconds): ";
    std::cin >> delay;

    int repetitions;
    std::cout << "Enter the number of repetitions: ";
    std::cin >> repetitions;

    animateTree(levels, delay, repetitions);

    return 0;
}