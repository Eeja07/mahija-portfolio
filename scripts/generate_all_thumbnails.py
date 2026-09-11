import os
import subprocess
import glob
from pathlib import Path
from PIL import Image

def generate_thumbnails():
    base_dir = Path("public")
    pdf_files = list(base_dir.rglob("*.pdf"))
    
    # Filter out resume
    pdf_files = [p for p in pdf_files if "resume" not in str(p)]
    
    print(f"Found {len(pdf_files)} PDF files to process.")
    
    for pdf_path in sorted(pdf_files):
        rel_path = pdf_path.relative_to(base_dir)
        dest_thumb = base_dir / "thumbnails" / rel_path.with_suffix(".webp")
        dest_thumb.parent.mkdir(parents=True, exist_ok=True)
        
        # Skip if already generated and valid
        if dest_thumb.exists() and dest_thumb.stat().st_size > 1000:
            print(f"Already exists: {dest_thumb} ({dest_thumb.stat().st_size // 1024} KB)")
            continue
            
        safe_hash = abs(hash(str(pdf_path)))
        temp_prefix = f"/tmp/thumb_{safe_hash}"
        
        # Use -scale-to 1200 to scale within a 1200x1200 box directly during rendering
        cmd = [
            "pdftoppm",
            "-png",
            "-scale-to", "1200",
            "-f", "1",
            "-l", "1",
            str(pdf_path),
            temp_prefix
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Error rendering {pdf_path}: {res.stderr}")
            continue
            
        matches = glob.glob(f"{temp_prefix}*.png")
        if not matches:
            print(f"No rendered PNG found for {pdf_path}")
            continue
            
        temp_png = sorted(matches)[0]
        # Convert with PIL to WebP
        with Image.open(temp_png) as im:
            im.save(str(dest_thumb), "WEBP", quality=88)
            
        # Clean up all matches
        for m in matches:
            if os.path.exists(m):
                os.remove(m)
                
        print(f"Created: {dest_thumb} ({dest_thumb.stat().st_size // 1024} KB)")

    print("Finished generating all thumbnails.")

if __name__ == "__main__":
    generate_thumbnails()
