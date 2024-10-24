import matplotlib.pyplot as plt
import unittest

def create_pie_chart(budget, data, labels):
    # Ensure that the number of labels matches the data points
    if len(data) != len(labels):
        print("Error: The number of data points must match the number of labels.")
        return
    # Determine if there is leftover money
    total = 0
    for i in data:
        total = total + i

    if (total < budget):
        data.append(budget - total)
        labels.append('Free')

    # Define a function to format the values in the pie chart
    def format_autopct(pct, allvalues):
        absolute = round(pct / 100. * sum(allvalues), 2)
        return f"${absolute} ({pct:.1f}%)"

    # Plot pie chart
    plt.figure(figsize=(6, 6))  # Create a square figure for the pie chart
    plt.pie(data, labels=labels, autopct=lambda pct: format_autopct(pct, data), startangle=90, shadow=True)

    # Equal aspect ratio ensures that pie is drawn as a circle
    plt.axis('equal')

    # Display the chart
    plt.title("Pie Chart of Float Data")
    plt.show()

# Reading data from the terminal
def read_data_from_terminal():
    # Read budget value (float)
    budget_input = input("Enter the budget (float): ")
    budget = float(budget_input)
    # Read data values (space-separated floats)
    data_input = input("Enter the data values (space-separated floats): ")
    data = list(map(float, data_input.split()))

    # Read corresponding labels
    labels_input = input("Enter the labels (space-separated, corresponding to the data values): ")
    if labels_input == "":
        for i in range (1, len(data)):
            labels.append(i)
    else:
        labels = labels_input.split()

    return budget, data, labels

# Example Usage
if __name__ == '__main__':

    input_query = input("Run test with default values? (y/n): ")
    if (input_query == 'y'):
        budget = 50
        data = [10.34, 6, 14.89]
        labels = ['A', 'B', 'C']
    else: 
        budget, data, labels = read_data_from_terminal()
    
    create_pie_chart(budget, data, labels)

    




