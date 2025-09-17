using System;
using System.Collections.Generic;
using System.Linq;

class Student
{
    public string FirstName { get; set; } 
    public string LastName { get; set; }
    public string Patronymic { get; set; }

    public Student(string firstName, string lastName, string patronymic)
    {
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
    }
}

class Class
{
    private List<Student> students = new List<Student>();

    public void AddStudent(Student student)
    {
        students.Add(student);
    }

    public List<string> this[string columnName]
    {
        get
        {
            switch (columnName.ToLower())
            {
                case "ім’я":
                case "ім'я":
                case "firstname":
                    return students.Select(s => s.FirstName).ToList();
                case "прізвище":
                case "lastname":
                    return students.Select(s => s.LastName).ToList();
                case "по батькові":
                case "patronymic":
                    return students.Select(s => s.Patronymic).ToList();
                default:
                    throw new ArgumentException("Невірна назва стовпця");
            }
        }
    }

    public int CountNechai
    {
        get
        {
            return students.Count(s => s.LastName.Equals("Нечай", StringComparison.OrdinalIgnoreCase));
        }
    }
}

class Program
{
    static void Main()
    {
        Class studentClass = new Class();

        studentClass.AddStudent(new Student("Іван", "Нечай", "Олексійович"));
        studentClass.AddStudent(new Student("Марія", "Петренко", "Іванівна"));
        studentClass.AddStudent(new Student("Олег", "Нечай", "Сергійович"));

        Console.WriteLine("Список імен:");
        foreach (var name in studentClass["ім’я"])
        {
            Console.WriteLine(name);
        }

        Console.WriteLine("\nСписок прізвищ:");
        foreach (var surname in studentClass["прізвище"])
        {
            Console.WriteLine(surname);
        }

        Console.WriteLine($"\nКількість студентів з прізвищем 'Нечай': {studentClass.CountNechai}");
    }
}
