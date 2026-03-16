//compress image
// export const compressImageAPI = async (files, level) => {
//   const formData = new FormData();

//   for (let file of files) {
//     formData.append("file", file);
//   }

//   formData.append("level", level);

//   const response = await fetch("http://localhost:5000/api/image/compress", {
//     method: "POST",
//     body: formData
//   });

//   if (!response.ok) throw new Error("Image compression failed");

//   return await response.blob();
// };
export const compressImageAPI = async (files, quality) => {

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("level", quality);   // IMPORTANT

  const response = await fetch(
    "http://localhost:5000/api/image/compress",
    {
      method: "POST",
      body: formData,
    }
  );

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

  const response = await fetch("http://localhost:5000/api/image/resize", {
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

  const response = await fetch("http://localhost:5000/api/image/crop", {
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

  const response = await fetch("http://localhost:5000/api/image/convert", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Image conversion failed");

  return await response.blob();
};