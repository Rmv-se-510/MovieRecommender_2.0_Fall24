import csv
import re

def clean_title(title):
    # Attempt to extract the year
    year_match = re.search(r'\(\d{4}\)', title)
    if year_match:
        year = year_match.group()
    else:
        year = ''
    
    # Rearrange the title if it contains ', The'
    if ', The' in title:
        parts = title.split(', The')
        title = f'The {parts[0].strip()} {year}'
    else:
        title = f'{title.split(" (")[0]} {year}'
    
    return title.strip()

input_file = 'Code/recommenderapp/movierecommender/data/movies.csv'
output_file = 'Code/recommenderapp/movierecommender/data/cleaned_movies.csv'

with open(input_file, mode='r', newline='', encoding='utf-8') as infile, open(output_file, mode='w', newline='', encoding='utf-8') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)
    for row in reader:
        movie_id = row[0]
        title = row[1].strip('"')
        genres = row[2]

        cleaned_title = clean_title(title)
        # print(title, cleaned_title)

        writer.writerow([movie_id, f'{cleaned_title}', genres])

print(f"Processed movie titles saved to {output_file}")
