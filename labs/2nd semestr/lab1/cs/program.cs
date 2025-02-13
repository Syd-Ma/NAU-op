using System;

namespace RhombusApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Введіть координати ромба (x1, y1, x2, y2, x3, y3, x4, y4):");

            Console.Write("x1 = "); double x1 = double.Parse(Console.ReadLine() ?? "0");
            Console.Write("y1 = "); double y1 = double.Parse(Console.ReadLine() ?? "0");

            Console.Write("x2 = "); double x2 = double.Parse(Console.ReadLine() ?? "0");
            Console.Write("y2 = "); double y2 = double.Parse(Console.ReadLine() ?? "0");

            Console.Write("x3 = "); double x3 = double.Parse(Console.ReadLine() ?? "0");
            Console.Write("y3 = "); double y3 = double.Parse(Console.ReadLine() ?? "0");

            Console.Write("x4 = "); double x4 = double.Parse(Console.ReadLine() ?? "0");
            Console.Write("y4 = "); double y4 = double.Parse(Console.ReadLine() ?? "0");


            Rhombus rhombus = new Rhombus(x1, y1, x2, y2, x3, y3, x4, y4);


            Console.WriteLine("\nРомб:");
            rhombus.PrintCoordinates();


            Console.WriteLine($"\nПериметр: {rhombus.GetPerimeter()}");
            Console.WriteLine($"Площа: {rhombus.GetArea()}");

            Console.WriteLine("\nНатисніть будь-яку клавішу для завершення...");
            Console.ReadKey();
        }
    }
}
