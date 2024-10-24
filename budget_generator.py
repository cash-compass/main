import pandas as pds
import numpy as math
    
class Budget:
    def __init__(self, data = [1.23, 4.56, 7.89], labels = ['A', 'B', 'C'], total_money = 100):
        self.data = data
        self.labels = labels
        self.total_money = total_money

    def get_data(self):
        return self.data
    
    def get_labels(self):
        return self.labels
    
    def get_total_money(self):
        return self.total_money

    def display(self):
        return f"{self.data}, {self.labels}, {self.total_money}"


def default_budget_generator(budget):
    return Budget(budget)

def zero_budget_generator(budget):
    
    
if __name__ == '__main__':

    budget = Budget()
    budget.display()

    budget = default_budget_generator(budget)
    budget.display()


