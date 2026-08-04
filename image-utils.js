export const IMAGE_PRESETS = {
  photo: { maxWidth:1080, maxHeight:1440, quality:0.82 },
  thumb: { maxWidth:420, maxHeight:560, quality:0.76 },
  selfie: { maxWidth:1080, maxHeight:1440, quality:0.82 }
};

export async function compressImage(file, preset=IMAGE_PRESETS.photo){
  if(!file || !file.type?.startsWith('image/')) return file;

  let bitmap = null;
  let objectUrl = '';
  if('createImageBitmap' in window){
    try{
      bitmap = await createImageBitmap(file);
    } catch(e){
      bitmap = null;
    }
  }
  if(!bitmap){
    objectUrl = URL.createObjectURL(file);
    try{
      bitmap = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = objectUrl;
      });
    } catch(e){
      if(objectUrl) URL.revokeObjectURL(objectUrl);
      return file;
    }
  }
  const ratio = Math.min(
    1,
    preset.maxWidth / bitmap.width,
    preset.maxHeight / bitmap.height
  );
  const width = Math.max(1, Math.round(bitmap.width * ratio));
  const height = Math.max(1, Math.round(bitmap.height * ratio));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha:false });
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise(resolve => {
    canvas.toBlob(resolve, 'image/jpeg', preset.quality);
  });

  if(bitmap.close) bitmap.close();
  if(objectUrl) URL.revokeObjectURL(objectUrl);
  if(!blob) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
    type:'image/jpeg',
    lastModified:Date.now()
  });
}

export function imageUploadMeta(originalFile, optimizedFile){
  return {
    contentType:optimizedFile?.type || originalFile?.type || 'image/jpeg',
    customMetadata:{
      originalName: originalFile?.name || '',
      originalSize: String(originalFile?.size || 0),
      optimizedSize: String(optimizedFile?.size || 0),
      optimized: 'true'
    }
  };
}
