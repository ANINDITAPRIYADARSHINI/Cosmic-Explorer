import React from 'react';
import Modal from '../components/Modal';

const minOffset = 0;
const maxOffset = 103;

export default function Space() {
  const [space, setSpace] = React.useState({
    gallery: [],
    searchText: '',
    selectedImage: null,
  });

  const [showModal, setShowModal] = React.useState(false);
  const thisYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState(thisYear);

  function spaceImage() {
    const yearStart = `${selectedYear}`;
    const yearEnd = `${selectedYear}`;
    fetch(
      `https://images-api.nasa.gov/search?media_type=image&q=${space.searchText}&year_start=${yearStart}&year_end=${yearEnd}`
    )
      .then((res) => res.json())
      .then((data) => {
        const collection = data.collection;
        if (collection && collection.items && collection.items.length > 0) {
          const shuffledImages = shuffleArray(collection.items);
          setSpace((prevSpace) => ({
            ...prevSpace,
            gallery: shuffledImages,
          }));
        } else {
          setSpace((prevSpace) => ({
            ...prevSpace,
            gallery: [],
          }));
        }
      })
      .catch((error) => console.log(error));
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  React.useEffect(() => {
    spaceImage();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSpace((prevSpace) => ({
      ...prevSpace,
      [name]: value,
    }));
  }

  function handleImgClick(selectedImage) {
    setSpace((prevSpace) => ({
      ...prevSpace,
      selectedImage: selectedImage,
    }));
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const { gallery, selectedImage } = space;

  function onHandleChange(event) {
    setSelectedYear(event.target.value);
  }

  const options = [];
  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <div>
      <main>
        <div className="form">
          <input
            type="text"
            placeholder="What would you like to explore..."
            className="form--input"
            name="searchText"
            value={space.searchText}
            onChange={handleChange}
          />
          <select
            value={selectedYear}
            onChange={onHandleChange}
            className="form--select"
          >
            {options}
          </select>
          <button className="form--button" onClick={spaceImage}>
            Explore
          </button>
        </div>

        <div className="content">
          <section className="grid">
            {gallery.map((image) => (
              <div key={image.data[0].nasa_id}>
                <img
                  src={image.links[0].href}
                  alt={image.data[0].title}
                  onClick={() => handleImgClick(image)}
                  className="space--image"
                />
              </div>
            ))}
          </section>
        </div>
      </main>
      {selectedImage && showModal && (
        <Modal selectedSpace={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
