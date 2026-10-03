import os

# Directories to skip
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', 'build'}
# File extensions to include
INCLUDE_EXTS = {'.js', '.jsx', '.css', '.sql', '.html', '.json', '.md'}

output_filename = "combined_code.txt"

with open(output_filename, "w", encoding="utf-8") as outfile:
    for root, dirs, files in os.walk("."):
        # Skip excluded folders
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if any(file.endswith(ext) for ext in INCLUDE_EXTS) and file != output_filename:
                file_path = os.path.join(root, file)
                outfile.write(f"\n\n{'='*80}\n")
                outfile.write(f" FILE: {file_path}\n")
                outfile.write(f"{'='*80}\n\n")
                
                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"// Error reading file: {e}\n")

print(f"Done! All code saved to {output_filename}")