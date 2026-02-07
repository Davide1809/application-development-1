# Reflection

**What was the original bug, and why did Node throw an error?**
The original bug was the use of the variable `discount` in the `applyDiscount` function without defining it. Node threw a ReferenceError because JavaScript can't use variables that haven't been declared or assigned a value.

**How did logging help explain program behavior?**
Logging provided clear, structured information about each step of the program, including startup, input values, calculation results, discount application, and errors. This made it easy to trace the flow and understand where and why certain actions occurred.

**Why is testing better than manually re-running the script?**
Testing automates the validation of program behavior, ensuring that all cases are checked consistently and quickly. It reduces human error, saves time, and makes it easier to catch regressions or edge cases that might be missed when manually re-running the script.

**Which test would you keep if you could only keep one, and why?**
If I could only keep one test, I would keep the test for invalid input (negative price or quantity). This test ensures that the program handles unexpected or erroneous input safely, which is critical for reliability and user trust.
