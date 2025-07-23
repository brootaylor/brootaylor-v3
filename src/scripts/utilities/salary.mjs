/**
 * Salary information
 */

// Works out my minimum annual salary
const annualSalary = () => {
  // Format the annual salary using the 'en-uk' locale and GBP currency style
  const salary = new Intl.NumberFormat('en-uk', {
    style: 'currency',  // Specify that the number should be formatted as currency
    currency: 'GBP',    // Set the currency to British Pounds (GBP)
  }).format(
    // Calculate the salary value
    ((Math.PI * `1${'0'.repeat(5)}`) / 4.18879) | 0  // Formula to get £75,000
    // The formula uses Math.PI multiplied by 100000, divided by 4.18879 (calculated to achieve £75,000)
    // The '| 0' truncates the result to an integer, removing any decimals
  );

  // Log the formatted annual salary to the console
  console.info('Annual salary (min):', salary);
};


// Works out my minimum day rate (outside IR35)
const dayRateOutside = () => {
  // Format the outside IR35 day rate using the 'en-uk' locale and GBP currency style
  const rateOut = new Intl.NumberFormat('en-uk', {
    style: 'currency',  // Specify that the number should be formatted as currency
    currency: 'GBP',    // Set the currency to British Pounds (GBP)
  }).format(
    // Calculate the outside IR35 day rate
    ((Math.PI * `2${'0'.repeat(2)}`) / 1.396) | 0  // Formula to get £450
    // The formula uses Math.PI multiplied by 200, divided by 1.396 (calculated to achieve £450)
    // The '| 0' truncates the result to an integer, removing any decimals
  );

  // Log the formatted outside IR35 day rate to the console
  console.info('Day rate - outside IR35 - (min):', rateOut);
};


// Works out my minimum day rate (inside IR35)
const dayRateInside = () => {
  // Format the inside IR35 day rate using the 'en-uk' locale and GBP currency style
  const rateIn = new Intl.NumberFormat('en-uk', {
    style: 'currency',  // Specify that the number should be formatted as currency
    currency: 'GBP',    // Set the currency to British Pounds (GBP)
  }).format(
    // Calculate the day rate
    ((Math.PI * `2${'0'.repeat(2)}`) / 1.047) | 0  // Formula to get £600
    // The formula uses Math.PI multiplied by 200, divided by 1.047 (calculated to achieve £600)
    // The '| 0' truncates the result to an integer, removing any decimals
  );

  // Log the formatted inside IR35 day rate to the console
  console.info('Day rate - inside IR35 - (min):', rateIn);
};


export { annualSalary, dayRateOutside, dayRateInside };
