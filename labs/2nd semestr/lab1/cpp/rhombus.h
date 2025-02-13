#ifndef RHOMBUS_H
#define RHOMBUS_H

class Rhombus
{
private:
    double x1, y1, x2, y2, x3, y3, x4, y4;

public:
    Rhombus();
    Rhombus(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4);

    void setCoordinates(double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4);

    double getX1() const;
    double getY1() const;
    double getX2() const;
    double getY2() const;
    double getX3() const;
    double getY3() const;
    double getX4() const;
    double getY4() const;

    double getPerimeter() const;
    double getArea() const;
};

#endif

