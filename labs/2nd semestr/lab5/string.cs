using System;

public abstract class Figure
{
    public abstract double Area();
    public abstract double Perimeter();
}

public class Trapezoid : Figure
{
    private (double x, double y) A, B, C, D;

    public Trapezoid((double, double) a, (double, double) b,
                     (double, double) c, (double, double) d)
    {
        A = a; B = b; C = c; D = d;
    }

    private double Distance((double, double) p1, (double, double) p2)
    {
        return Math.Sqrt(Math.Pow(p2.Item1 - p1.Item1, 2) + Math.Pow(p2.Item2 - p1.Item2, 2));
    }

    public override double Area()
    {
        double h = Math.Abs(A.Item2 - C.Item2);
        double a = Distance(A, B);
        double b = Distance(C, D);
        return 0.5 * (a + b) * h;
    }

    public override double Perimeter()
    {
        return Distance(A, B) + Distance(B, C) + Distance(C, D) + Distance(D, A);
    }
}

public class Circle : Figure
{
    private double radius;

    public Circle(double r)
    {
        radius = r;
    }

    public override double Area()
    {
        return Math.PI * radius * radius;
    }

    public override double Perimeter()
    {
        return 2 * Math.PI * radius;
    }
}
