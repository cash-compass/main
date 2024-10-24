import sys
import matplotlib as plt

from pie_chart import create_pie_chart

MAX_BUDGET_VALUE = 2 ** 64
MIN_BUDGET_VALUE = 1

# TODO validate budget is in range
def validate_budget(budget):
    if not budget:
        return False
    return MIN_BUDGET_VALUE <= budget <= MAX_BUDGET_VALUE

def validate_pie_chart_data_datatype(data):
    for i in data:
        if (type(i).__name__ != 'int') and (type(i).__name__ != 'float'):
            return False
    return True

def validate_pie_chart_labels_datatype(labels):
    for i in labels:
        if type(i).__name__ != 'str':
            return False
    return True

# TODO validate that the data doesn't exceed 100% of budget
def validate_data_values_in_budget(budget, data):
    tot = 0
    for i in data:
        tot = tot + i
    return (tot <= budget)
       
# TODO validate the data isn't negative
def validate_data_values_nonnegative(data):
    for i in data:
        if not i:
            return False 
        if i < 0:
            return False   
    return True

# TODO validate length of labels is the same as data
def validate_isSameSize_data_and_labels(data, labels):
    return len(data) == len(labels)