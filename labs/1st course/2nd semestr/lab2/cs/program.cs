using System;
using RhombusLibrary;

class Program
{
    static void Main()
    {
        Rhombus r1 = new Rhombus();
        Rhombus r2 = new Rhombus(0, 0, 2, 0, 1, 2, -1, 2);
        Rhombus r3 = new Rhombus(r2);

        Console.WriteLine(r1);
        Console.WriteLine($"Area: {r1.GetArea()}, Perimeter: {r1.GetPerimeter()}");

        Console.WriteLine(r2);
        Console.WriteLine($"Area: {r2.GetArea()}, Perimeter: {r2.GetPerimeter()}");

        Console.WriteLine(r3);
        Console.WriteLine($"Area: {r3.GetArea()}, Perimeter: {r3.GetPerimeter()}");
    }
}
