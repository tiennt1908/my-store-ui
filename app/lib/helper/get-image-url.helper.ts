export const GET_IMAGE_URL_HELPER = (folder: string, url: string) => {
  return `http://localhost:3000/uploads/${folder}/${url}.jpg`;
};
