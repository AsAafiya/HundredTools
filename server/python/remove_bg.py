import sys
from pathlib import Path
import torch
import numpy as np
import cv2
from PIL import Image
from transformers import AutoModelForImageSegmentation
from torchvision import transforms

# Get absolute input and output paths from arguments
input_path = Path(sys.argv[1]).resolve()
output_path = Path(sys.argv[2]).resolve()

# Ensure the output directory exists
output_path.parent.mkdir(parents=True, exist_ok=True)

if not input_path.exists():
    raise FileNotFoundError(f"Input image not found at: {input_path}")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
dtype = torch.float32
print(f"Using device: {device}")

# LOADING THE ADVANCED HIGH-RESOLUTION INTEGRATED HAIR-MATTING MODEL
# This model is specialized for isolating single hair strands
model = AutoModelForImageSegmentation.from_pretrained(
    "ZhengPeng7/BiRefNet-matting", 
    trust_remote_code=True,
    dtype=dtype,
)
model.to(device)
model.eval()

image = Image.open(input_path).convert("RGB")
original_size = image.size 

# We keep the transform size at 1024 to capture fine details
transform = transforms.Compose([
    transforms.Resize((1024, 1024)), 
    transforms.ToTensor(),
])
input_tensor = transform(image).unsqueeze(0).to(device=device, dtype=dtype)

with torch.no_grad():
    raw_output = model(input_tensor)

logits = raw_output[-1] if isinstance(raw_output, list) else raw_output
mask = logits.sigmoid().cpu()

# Fixed matrix squeeze layout for matting layers
mask_np = mask.numpy()[0, 0]
mask_uint8 = (mask_np * 255).astype(np.uint8)

# --- ADVANCED PRODUCTION GRAPH-MATTING ENGINE ---

# 1. Use LANCZOS resampling so hair points don't pixelate
mask_pil = Image.fromarray(mask_uint8, mode='L')
mask_resized = mask_pil.resize(original_size, Image.Resampling.LANCZOS)
alpha_array = np.array(mask_resized).astype(np.float32) / 255.0

# 2. Advanced Soft Trimap Tuning for Individual Hair Strands
# This filter locks out soft hair borders from background without harsh cuts
alpha_tuned = np.clip((alpha_array - 0.05) / 0.90, 0.0, 1.0)
alpha_final = (alpha_tuned * 255).astype(np.uint8)

# 3. Micro anti-aliasing edge structural filter
alpha_smooth = cv2.GaussianBlur(alpha_final, (3, 3), 0)

# --- GENERATE TRANSPARENT FILE WITH EXACT HAIR ---
img_orig_np = np.array(image).astype(np.uint8)
rgba_image = cv2.cvtColor(img_orig_np, cv2.COLOR_RGB2RGBA)

rgba_image[:, :, 3] = alpha_smooth

output_img = Image.fromarray(rgba_image)
output_img.save(output_path, "PNG")
print(f"Ultra Professional Hair-Matting cutout saved safely at: {output_path}")
