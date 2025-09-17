using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<Figure> figures = new List<Figure>
        {
            new Trapezoid((0, 0), (4, 0), (3, 3), (1, 3)),
            new Circle(5)
        };

        for (int i = 0; i < figures.Count; i++)
        {
            Console.WriteLine($"Figure {i + 1}:");
            Console.WriteLine($"  Area: {figures[i].Area():F2}");
            Console.WriteLine($"  Perimeter: {figures[i].Perimeter():F2}\n");
        }
    }
}
