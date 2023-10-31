import pandas as pd
import re

def clean_ingredients(ingredients_str):
    # Remove all \n and \t characters
    cleaned_str = ingredients_str.replace("\n", "").replace("\t", "")
    
    # Split the string on each occurrence of more than one space to get individual ingredients
    ingredients_list = re.split(r' {2,}', cleaned_str.strip())
    
    # Remove empty strings from the list
    ingredients_list = [ingredient for ingredient in ingredients_list if ingredient]
    
    return ingredients_list

# Load the CSV into a pandas DataFrame
csv_file_path = "cuisine_updated.csv"
df = pd.read_csv(csv_file_path)

# Add 'id' column with unique integers starting from 1
df['id'] = df.index + 1

# Rearrange columns to make 'id' the first column
df = df[['id'] + [col for col in df if col != 'id']]

# Convert 'prep_time' from string format to integer
# Extract the number from the string and convert to integer
df['prep_time'] = df['prep_time'].str.extract(r'(\d+)')[0].fillna(0).astype(int)

# Add empty 'ratings' column
# df['ratings'] = [list() for _ in range(len(df))]

# Clean up the ingredients for each row
df['ingredients'] = df['ingredients'].apply(clean_ingredients)

# Add empty 'reviews' column
# df['reviews'] = [list() for _ in range(len(df))] Don't need it

# Convert the DataFrame to JSON format
json_str = df.to_json(orient='records')

# Save to JSON file
with open("output.json", "w") as f:
    f.write(json_str)