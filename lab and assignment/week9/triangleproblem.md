**Triangle problem**

**1. Problem Description**

Given three integers $a,b,c$, the program:

1.  Outputs an error if any value is non-positive (≤ 0)

2.  Determines whether the three values can form a triangle

3.  If yes, classifies the triangle as:

    - Equilateral (three equal sides)

    - Isosceles (two equal sides)

    - Scalene (all sides different)

**2. Method Overview**

This problem is solved using **Equivalence Partitioning
(EP)** in **Black Box Testing**:

1.  Analyze the program interface (inputs: $a,b,c$)

2.  Identify input characteristics and constraints

3.  Divide the input space into equivalence classes

4.  Select representative test cases for each class

**3. Input Analysis**

**3.1 Input Parameters**

- Input is a triple: $\left( a,b,c \right)$

- The three inputs are **not independent** (must be treated together)

**3.2 Constraints**

- All inputs must be integers

- $a,b,c > 0$

- Triangle inequality must hold:

> $$a + b > c,a + c > b,b + c > a
> $$

**4. Equivalence Class Partitioning**

**(1) Invalid Input Classes**

  -------------------------------------------
  **Class   **Description**     **Example**
  ID**                          
  --------- ------------------- -------------
  EC1       Contains negative   (-1, 2, 3)
            value(s)            

  EC2       Contains zero       (0, 2, 3)
  -------------------------------------------

**(2) Non-Triangle (Valid Inputs but Invalid Triangle)**

  -------------------------------------------------------
  **Class   **Description**                 **Example**
  ID**                                      
  --------- ------------------------------- -------------
  EC3       Sum of two sides \< third side  (1, 2, 4)

  EC4       Sum of two sides = third side   (1, 2, 3)
            (degenerate)                    
  -------------------------------------------------------

**(3) Valid Triangle Classes**

  -----------------------------------------
  **Class   **Description**   **Example**
  ID**                        
  --------- ----------------- -------------
  EC5       Equilateral       (3, 3, 3)
            triangle          

  EC6       Isosceles         (3, 3, 2)
            triangle          

  EC7       Scalene triangle  (3, 4, 5)
  -----------------------------------------

**5. Constraint Analysis**

1.  Invalid inputs (≤ 0) must be handled first

2.  Triangle validity must be checked before classification

3.  Classification applies only to valid triangles

4.  Equilateral is a special case (must not be misclassified as
    isosceles)

5.  Isosceles must still satisfy triangle inequality (e.g., (1,1,2) is
    NOT a triangle)

**6. Test Case Specification**

**6.1 Basic Test Set (Minimum Coverage)**

  ----------------------------------------------
  **Test   **Input     **Covered   **Expected
  Case**   (a,b,c)**   Class**     Output**
  -------- ----------- ----------- -------------
  TC1      (-1,2,3)    EC1         Error

  TC2      (0,2,3)     EC2         Error

  TC3      (1,2,4)     EC3         Not a
                                   triangle

  TC4      (1,2,3)     EC4         Not a
                                   triangle

  TC5      (3,3,3)     EC5         Equilateral

  TC6      (3,3,2)     EC6         Isosceles

  TC7      (3,4,5)     EC7         Scalene
  ----------------------------------------------

**6.2 Additional Test Cases (Enhanced Coverage)**

**(1) Permutation Coverage**

  ------------------------------------------------------
  **Test   **Input**   **Description**    **Expected**
  Case**                                  
  -------- ----------- ------------------ --------------
  TC8      (4,1,2)     Largest side in    Not a triangle
                       position 1         

  TC9      (1,4,2)     Largest side in    Not a triangle
                       position 2         
  ------------------------------------------------------

**(2) Isosceles Variations**

  -----------------------------------------------------
  **Test   **Input**   **Description**   **Expected**
  Case**                                 
  -------- ----------- ----------------- --------------
  TC10     (3,2,3)     a = c             Isosceles

  TC11     (2,3,3)     b = c             Isosceles
  -----------------------------------------------------

**(3) Edge Cases**

  --------------------------------------------------------
  **Test   **Input**   **Description**      **Expected**
  Case**                                    
  -------- ----------- -------------------- --------------
  TC12     (1,1,2)     Degenerate triangle  Not a triangle

  TC13     (2,2,5)     Violates triangle    Not a triangle
                       inequality           
  --------------------------------------------------------

**7. Conclusion**

Using equivalence partitioning, the input space is divided into:

- 2 invalid input classes

- 2 non-triangle classes

- 3 valid triangle classes

Total: **7 equivalence classes**

A minimum of **7 test cases** is sufficient for basic coverage, while
additional cases improve robustness.

**8. Summary**

Key points:

- Inputs must be treated as a **triple (not independent variables)**

- Testing follows the order:

  1.  Input validation

  2.  Triangle validity

  3.  Triangle classification

- Equivalence Partitioning reduces test cases while maintaining
  effective coverage
