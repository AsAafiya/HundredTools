export const compressImageAPI = async (files) => {
  const formData = new FormData();
  for (let file of files) {
  formData.append("file", file); // matches upload.array("file") on backend
}

  const response = await fetch("https://hundredtools.onrender.com/api/image/compress", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Image compression failed");

  const blob = await response.blob();
  return blob;
};

//resize tool

export const resizeImageAPI = async (files, width, height) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("width", width);
  formData.append("height", height);

  const response = await fetch("https://hundredtools.onrender.com/api/image/resize", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Resize failed");

  return await response.blob();
};


//crop tool
export const cropImageAPI = async (files, cropData) => {

  const formData = new FormData();

  for (let file of files) {
    formData.append("file", file);
  }

  formData.append("x", cropData.x);
  formData.append("y", cropData.y);
  formData.append("width", cropData.width);
  formData.append("height", cropData.height);

  const response = await fetch("https://hundredtools.onrender.com/api/image/crop", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Crop failed");

  return await response.blob();
};

//convert tool
export const convertImageAPI = async (files, format) => {

  const formData = new FormData();

  for (let file of files) {
    formData.append("file", file);
  }

  formData.append("format", format);

  const response = await fetch("https://hundredtools.onrender.com/api/image/convert", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Image conversion failed");

  return await response.blob();
};