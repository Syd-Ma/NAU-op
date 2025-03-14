using System;

public class CustomString
{
    private string value;

    public CustomString()
    {
        value = "";
    }

    public CustomString(string str)
    {
        value = str;
    }

    public CustomString(CustomString other)
    {
        value = other.value;
    }

    public int Length()
    {
        return value.Length;
    }

    public string GetValue()
    {
        return value;
    }

    public static CustomString operator +(CustomString s1, CustomString s2)
    {
        return new CustomString(s1.value + s2.value);
    }

    public static CustomString operator +(CustomString s1, string s2)
    {
        return new CustomString(s1.value + s2);
    }

    public static CustomString operator -(CustomString s, char c)
    {
        return new CustomString(s.value.Replace(c.ToString(), ""));
    }

    public override string ToString()
    {
        return value;
    }
}