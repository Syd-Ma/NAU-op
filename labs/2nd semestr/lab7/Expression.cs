using System;
using System.Collections.Generic;
using System.Linq;

namespace TextLib
{
    public class Text
    {
        private readonly List<MyString> lines = new();

        public void AddLine(MyString line) => lines.Add(line);

        public void RemoveLine(int index)
        {
            if (index >= 0 && index < lines.Count)
                lines.RemoveAt(index);
        }

        public void ClearText() => lines.Clear();

        public MyString? GetLongestLine()
        {
            return lines.OrderByDescending(l => l.GetContent().Length).FirstOrDefault();
        }

        public double GetDigitsPercentage()
        {
            int totalChars = lines.Sum(l => l.GetContent().Length);
            int totalDigits = lines.Sum(l => l.CountDigits());
            if (totalChars == 0) return 0;
            return (double)totalDigits / totalChars * 100;
        }

        public int GetTotalCharactersCount()
        {
            return lines.Sum(l => l.GetContent().Length);
        }
    }
}