import os
import re
import glob

def convert_image_tags(directory):
    """
    Scan all .md files in directory and subdirectories, replacing image tags and renaming image files.
    """
    # Find all markdown files
    md_files = []
    for root, _, _ in os.walk(directory):
        md_files.extend(glob.glob(os.path.join(root, "*.md")))
    
    print(f"Found {len(md_files)} markdown files to process.")
    
    # Process each markdown file
    for md_file in md_files:
        md_dir = os.path.dirname(md_file)
        assets_dir = os.path.join(md_dir, "_assets")
        
        # Create _assets directory if it doesn't exist
        if not os.path.exists(assets_dir):
            os.makedirs(assets_dir)
            print(f"Created assets directory: {assets_dir}")
        
        # Read the markdown file
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all image tags matching the pattern ![[Image Name.png]]
        image_pattern = r'!\[\[(.*?\.(?:png|jpg|jpeg|gif|svg|webp))\]\]'
        matches = re.findall(image_pattern, content, re.IGNORECASE)
        
        if not matches:
            continue
        
        print(f"Processing {md_file} - found {len(matches)} image references")
        
        # Process each image match
        for original_image_name in matches:
            # Create new image filename (lowercase with underscores)
            new_image_name = original_image_name.lower().replace(' ', '_')
            
            # Create new image path
            new_image_path = os.path.join(assets_dir, new_image_name)
            
            # Create new markdown tag
            image_title = os.path.splitext(original_image_name)[0]  # Remove extension for alt text
            new_tag = f"![{image_title}](./_assets/{new_image_name})"
            
            # Replace in content
            content = content.replace(f"![[{original_image_name}]]", new_tag)
            
            # Try to find and rename the actual image file if it exists
            # Check in the same directory as the md file
            orig_image_path = os.path.join(md_dir, original_image_name)
            if os.path.exists(orig_image_path):
                # Rename and move the file
                os.rename(orig_image_path, new_image_path)
                print(f"  Renamed {orig_image_path} -> {new_image_path}")
            else:
                # Check if the file already exists in the _assets directory
                orig_in_assets = os.path.join(assets_dir, original_image_name)
                if os.path.exists(orig_in_assets):
                    os.rename(orig_in_assets, new_image_path)
                    print(f"  Renamed {orig_in_assets} -> {new_image_path}")
                else:
                    print(f"  Warning: Image file not found: {original_image_name}")
        
        # Write the updated content back to the file
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated {md_file}")

if __name__ == "__main__":
    import sys
    
    # Get directory from command line arguments or use current directory
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    
    print(f"Starting to process markdown files in {os.path.abspath(target_dir)}")
    convert_image_tags(target_dir)
    print("Processing complete!")