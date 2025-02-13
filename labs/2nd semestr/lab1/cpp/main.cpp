#include <iostream>
#include "Rhombus.h"

int main()
{
    double x1, y1, x2, y2, x3, y3, x4, y4;

    std::cout << "Введіть координати вершин ромба (x1, y1, x2, y2, x3, y3, x4, y4):\n";
    std::cout << "x1 = "; std::cin >> x1;
    std::cout << "y1 = "; std::cin >> y1;
    std::cout << "x2 = "; std::cin >> x2;
    std::cout << "y2 = "; std::cin >> y2;
    std::cout << "x3 = "; std::cin >> x3;
    std::cout << "y3 = "; std::cin >> y3;
    std::cout << "x4 = "; std::cin >> x4;
    std::cout << "y4 = "; std::cin >> y4;

    Rhombus rhombus(x1, y1, x2, y2, x3, y3, x4, y4);

    std::cout << "\nРомб має координати:\n";
    std::cout << "  A(" << rhombus.getX1() << ", " << rhombus.getY1() << ")\n";
    std::cout << "  B(" << rhombus.getX2() << ", " << rhombus.getY2() << ")\n";
    std::cout << "  C(" << rhombus.getX3() << ", " << rhombus.getY3() << ")\n";
    std::cout << "  D(" << rhombus.getX4() << ", " << rhombus.getY4() << ")\n";

    std::cout << "\nПериметр ромба: " << rhombus.getPerimeter() << "\n";
    std::cout << "Площа ромба: " << rhombus.getArea() << "\n";

    return 0;
}
