const handleImageChange = (e, setImage) => {
  const file = e.target.files[0];

  if (!file) {
    console.error("No file selected.");
    setImage(null);
    return;
  }
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validImageTypes.includes(file.type)) {
    console.error("Selected file is not a valid image.");
    setImage(null);
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(file);
};

export default handleImageChange;
