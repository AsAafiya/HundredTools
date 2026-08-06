import sys
import json
from pathlib import Path
import torch
import numpy as np
import cv2
from PIL import Image
from transformers import AutoModelForImageSegmentation
from torchvision import transforms

def main():
    try:
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        dtype = torch.float32
        
        # Load the advanced model ONCE at startup
        model = AutoModelForImageSegmentation.from_pretrained(
            "ZhengPeng7/BiRefNet-matting", 
            trust_remote_code=True,
            dtype=dtype,
        )
        model.to(device)
        model.eval()
        
        transform = transforms.Compose([
            transforms.Resize((1024, 1024)), 
            transforms.ToTensor(),
        ])
        
        # Signal that the daemon is ready
        print(json.dumps({"status": "ready"}), flush=True)
        
        # Wait for commands via stdin
        for line in sys.stdin:
            line = line.strip()
            if not line:
                continue
                
            req = json.loads(line)
            input_path = Path(req['input']).resolve()
            output_path = Path(req['output']).resolve()
            
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            if not input_path.exists():
                print(json.dumps({"status": "error", "message": f"Input image not found: {input_path}"}), flush=True)
                continue
            
            # Process the image
            image = Image.open(input_path).convert("RGB")
            original_size = image.size 
            
            input_tensor = transform(image).unsqueeze(0).to(device=device, dtype=dtype)
            
            with torch.no_grad():
                raw_output = model(input_tensor)
                
            logits = raw_output[-1] if isinstance(raw_output, list) else raw_output
            mask = logits.sigmoid().cpu()
            
            mask_np = mask.numpy()[0, 0]
            mask_uint8 = (mask_np * 255).astype(np.uint8)
            
            mask_pil = Image.fromarray(mask_uint8, mode='L')
            mask_resized = mask_pil.resize(original_size, Image.Resampling.LANCZOS)
            alpha_array = np.array(mask_resized).astype(np.float32) / 255.0
            
            alpha_tuned = np.clip((alpha_array - 0.05) / 0.90, 0.0, 1.0)
            alpha_final = (alpha_tuned * 255).astype(np.uint8)
            alpha_smooth = cv2.GaussianBlur(alpha_final, (3, 3), 0)
            
            img_orig_np = np.array(image).astype(np.uint8)
            rgba_image = cv2.cvtColor(img_orig_np, cv2.COLOR_RGB2RGBA)
            rgba_image[:, :, 3] = alpha_smooth
            
            output_img = Image.fromarray(rgba_image)
            output_img.save(output_path, "PNG")
            
            # Respond back that this job is complete
            print(json.dumps({"status": "ok", "output": str(output_path)}), flush=True)

    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}), flush=True)

if __name__ == "__main__":
    main()
