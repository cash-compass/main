import unittest

from pie_chart_data_validator import validate_budget, validate_data_values_in_budget, validate_data_values_nonnegative, validate_pie_chart_data_datatype, validate_pie_chart_labels_datatype, validate_isSameSize_data_and_labels

class TestPieChartDataValidation(unittest.TestCase):
    # validate_budget
    def test_valid_budget(self):
        self.assertTrue(validate_budget(1000))
    
    def test_invalid_budget_isEmpty(self):
        self.assertFalse(validate_budget(None))

    def test_boundary_max_budget(self):
        large_budget = 2 ** 64
        self.assertTrue(validate_budget(large_budget))

    def test_boundary_min_budget(self):
        broke_budget = 1
        self.assertTrue(validate_budget(broke_budget))

    def test_edge_max_budget(self):
        larger_budget = 2 ** 64 + 1
        self.assertFalse(validate_budget(larger_budget))

    def test_edge_min_budget(self):
        impossible_budget = -1
        self.assertFalse(validate_budget(impossible_budget))
    
    # validate_data_values_in_budget
    def test_valid_data_values_in_budget(self):
        budget = 1000
        data = [100.45, 200.3, 300.23]
        self.assertTrue(validate_data_values_in_budget(budget, data))

    def test_invalid_data_values_in_budget_overspent(self):
        budget = 100
        data = [100.45, 200.3, 300.23]
        self.assertFalse(validate_data_values_in_budget(budget, data))

    # validate_data_values_nonnegative 
    def test_valid_data_values_nonnegative_positive(self):
        data = [100.45, 10, 300.23]
        self.assertTrue(validate_data_values_nonnegative(data))
    
    def test_invalid_data_values_nonnegative_negative(self):
        data = [100.45, -1.23, 300.23]
        self.assertFalse(validate_data_values_nonnegative(data))

    def test_invalid_data_values_nonnegative_null(self):
        data = [100.45, 300.23, None]
        self.assertFalse(validate_data_values_nonnegative(data))

    # validate_pie_chart_data_datatype
    def test_valid_pie_chart_data_datatype(self):
        data = [100.45, 6.3, 300.25]
        self.assertTrue(validate_pie_chart_data_datatype(data))

    def test_invalid_pie_chart_data_datatype_nonnumeric(self):
        data = [100.45, 'hello', 3]
        self.assertFalse(validate_pie_chart_data_datatype(data))

    def test_invalid_pie_chart_data_datatype_null(self):
        data = [100.45, None, ]
        self.assertFalse(validate_pie_chart_data_datatype(data))

    # validate_pie_chart_labels_datatype
    def test_valid_pie_chart_labels_datatype(self):
        labels = ['Alpha', 'Beta', 'Gamma']
        self.assertTrue(validate_pie_chart_labels_datatype(labels))

    def test_invalid_pie_chart_label_datatype_nonstring(self):
        labels = [10, 'Bad', 'Labels']
        self.assertFalse(validate_pie_chart_labels_datatype(labels))

    def test_invalid_pie_chart_label_datatype_null(self):
        labels = ['More', 'Bad', None, ]
        self.assertFalse(validate_pie_chart_labels_datatype(labels))

    # validate_isSameSize_data_and_labels
    def test_valid_isSameSize_data_and_labels(self):
        data = [1.23, 4.56, 7.89]
        labels = ['A', 'B', 'C']
        self.assertTrue(validate_isSameSize_data_and_labels(data, labels))
    
    def test_invalid_isSameSize_data_and_labels_extradata(self):
        data = [1.23, 4.56, 7.89, 0]
        labels = ['A', 'B', 'C']
        self.assertFalse(validate_isSameSize_data_and_labels(data, labels))

    def test_invalid_isSameSize_data_and_labels_extralabels(self):
        data = [1.23, 4.56, 7.89]
        labels = ['A', 'B', 'C', 'D']
        self.assertFalse(validate_isSameSize_data_and_labels(data, labels))

if __name__ == '__main__':
    unittest.main()