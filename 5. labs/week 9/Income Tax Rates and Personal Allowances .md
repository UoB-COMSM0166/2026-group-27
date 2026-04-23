**Using Equivalence Partitioning for the Income Tax Rates and Personal
Allowances Example**

**1. Functional unit**

The functional unit to be tested is:

Given a person's annual pay/income, determine which income tax band
applies according to the 2024--2025 rules shown in the specification.

From the given page, only the following information is considered:

- Standard Personal Allowance: **£12,570**

- Basic rate: **20%**

- Higher rate: **40%**

- Additional rate: **45%**

The information on the right-hand side is explicitly **not considered**.

**2. Inputs / parameters**

The main input parameter is:

- **Annual pay / taxable income**

Possible additional condition mentioned in the specification:

- Personal Allowance may vary if:

  - income is over **£100,000**

  - the person gets **Marriage Allowance**

  - the person gets **Blind Person's Allowance**

However, since the example answer in Figure 2 starts from income
partitions, the main EP analysis is based on the **pay value**.

**3. Limits and characteristics of the input**

From the specification, the important limits are:

- **£0**

- **£12,570** --- Personal Allowance limit

- **£50,270** --- upper bound of basic rate threshold

- **£125,140** --- upper bound of higher rate threshold

- **above £125,140** --- additional rate

Important characteristic:

- Pay is numeric and should not be negative

- Different tax behaviour happens in different pay intervals

**4. Define partitions (value categories)**

Following the style of Figure 2, we can start with the following
categories:

  ------------------------------------------------------------------------------
  **Category**   **Description**       **Values**
  -------------- --------------------- -----------------------------------------
  A              Invalid negative      pay \< 0
                 income                

  B              Zero income           pay = 0

  C              In Personal Allowance 0 \< pay ≤ 12,570

  D              In Basic Rate band    12,570 \< pay ≤ 50,270

  E              In Higher Rate band   50,270 \< pay ≤ 125,140

  F              In Additional Rate    pay \> 125,140
                 band                  

  G              Personal Allowance    pay \> 100,000
                 may vary              

  H              Increased allowance   user has Marriage Allowance or Blind
                 case                  Person's Allowance
  ------------------------------------------------------------------------------

**5. Constraints between categories**

There are several constraints between these categories:

1.  **A and B are special cases**

    - Negative income is invalid

    - Zero income means no taxable pay

2.  **C, D, E, F are based on pay range**

    - A pay value can belong to only one of these tax-band categories

3.  **G overlaps with E/F**

    - If pay \> 100,000, Personal Allowance may be smaller

    - So this affects the correctness of the final tax treatment

    - Therefore G is not an independent tax band, but an additional
      condition

4.  **H modifies allowance**

    - Marriage Allowance / Blind Person's Allowance may increase
      allowance

    - So H is also an additional condition, not a separate tax band

So in testing, the main partitions are **A--F**,
while **G** and **H** are important conditional cases.

**6. Test case specification**

**6.1 Basic test cases for main equivalence classes**

  ------------------------------------------------------
  **Test   **Input   **Covered      **Expected result**
  Case**   pay**     category**     
  -------- --------- -------------- --------------------
  TC1      -100      A              Invalid input /
                                    error

  TC2      0         B              No tax payable

  TC3      10,000    C              Within Personal
                                    Allowance

  TC4      20,000    D              Basic rate applies

  TC5      80,000    E              Higher rate applies

  TC6      130,000   F              Additional rate
                                    applies
  ------------------------------------------------------

**6.2 Boundary-oriented representative test cases**

Because EP should pay attention to limits, the following values are
especially important:

  ---------------------------------------------------------------------
  **Test   **Input   **Reason**                    **Expected result**
  Case**   pay**                                   
  -------- --------- ----------------------------- --------------------
  TC7      12,570    Upper boundary of Personal    Within Personal
                     Allowance                     Allowance

  TC8      12,571    Just above Personal Allowance Basic rate applies

  TC9      50,270    Upper boundary of Basic Rate  Basic rate applies

  TC10     50,271    Just above Basic Rate         Higher rate applies

  TC11     125,140   Upper boundary of Higher Rate Higher rate applies

  TC12     125,141   Just above Higher Rate        Additional rate
                                                   applies
  ---------------------------------------------------------------------

**6.3 Additional conditional test cases**

These come from the note that Personal Allowance may vary:

  --------------------------------------------------------------------------
  **Test   **Input / condition**        **Covered    **Expected result**
  Case**                                category**   
  -------- ---------------------------- ------------ -----------------------
  TC13     pay = 110,000                G            Personal Allowance may
                                                     be reduced

  TC14     pay = 30,000, Marriage       H            Personal Allowance may
           Allowance = true                          be increased

  TC15     pay = 30,000, Blind Person's H            Personal Allowance may
           Allowance = true                          be increased
  --------------------------------------------------------------------------

**7. Final set of partitions**

A concise set of useful partitions is:

- **A**: pay \< 0

- **B**: pay = 0

- **C**: 0 \< pay ≤ 12,570

- **D**: 12,570 \< pay ≤ 50,270

- **E**: 50,270 \< pay ≤ 125,140

- **F**: pay \> 125,140

- **G**: pay \> 100,000 and allowance may reduce

- **H**: Marriage Allowance / Blind Person's Allowance present

**8. Conclusion**

Using the **Equivalence Partitioning** approach, the income tax problem
can first be divided into pay-based categories according to the
specification:

- invalid income

- zero income

- Personal Allowance range

- Basic Rate range

- Higher Rate range

- Additional Rate range

Then we consider extra constraints such as:

- allowance reduction when income is above **£100,000**

- allowance increase due to **Marriage Allowance** or **Blind Person's
  Allowance**

This gives a systematic basis for defining black-box test cases.
