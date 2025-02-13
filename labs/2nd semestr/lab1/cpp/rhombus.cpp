#include "Rhombus.h"
#include <cmath>

Rhombus::Rhombus()
    : x1(0), y1(0), x2(0), y2(0), x3(0), y3(0), x4(0), y4(0)
{
}

Rhombus::Rhombus(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4)
    : x1(x1), y1(y1), x2(x2), y2(y2), x3(x3), y3(y3), x4(x4), y4(y4)
{
}

void Rhombus::setCoordinates(double X1, double Y1, double X2, double Y2, double X3, double Y3, double X4, double Y4)
{
    x1 = X1;
    y1 = Y1;
    x2 = X2;
    y2 = Y2;
    x3 = X3;
    y3 = Y3;
    x4 = X4;
    y4 = Y4;
}

double Rhombus::getX1() const { return x1; }
double Rhombus::getY1() const { return y1; }
double Rhombus::getX2() const { return x2; }
double Rhombus::getY2() const { return y2; }
double Rhombus::getX3() const { return x3; }
double Rhombus::getY3() const { return y3; }
double Rhombus::getX4() const { return x4; }
double Rhombus::getY4() const { return y4; }

double Rhombus::getPerimeter() const
{
    double side = std::sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    return 4 * side;
}

double Rhombus::getArea() const
{
    double d1 = std::sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1));
    double d2 = std::sqrt((x4 - x2) * (x4 - x2) + (y4 - y2) * (y4 - y2));
    return (d1 * d2) / 2.0;
}
