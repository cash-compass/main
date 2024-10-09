// Tests for functions.js
// Unit 1 Test: Trend testing
function Test_Trend(user_trans_data) {
    expect(Trend_Found(user_trans_data)).toBe(true); // Should pass if trend found
  }
  
  // Unit 2 Test: Test where income is going
  function Category_Test(user_trans_data) {
    expect(Trans_Category(user_trans_data)).toBe(true); // Should pass if all transactions belong to a category
  }