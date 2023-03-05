import { useState, useEffect } from 'react';
import { fetchImages } from 'Api/Api';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { Searchbar } from './SearchBar/SearchBar';
import { Section } from './Section/Section';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader.jsx';

export const App = () => {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
  });
  const [noResults, setNoResults] = useState(false);

 const handleChange = event => {
    setInput(event.target.value);
  };

  useEffect(() => {
     if (page === 0) return;

    const fetchImagesByQuery = async searchQuery => {
      setIsLoading(true);
      setError(null);
      setNoResults(false);
      try {
        const response = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));

        if (response.totalHits === 0) {
          setNoResults(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImagesByQuery(query);
    }, [page, query]);

  const handleSubmit = event => {
    event.preventDefault();
    if (input === '') {
      Report.warning(
              'Warning',
              'Please enter your query',
              'Okay',
            )         
      return;
    }
    setImages([]);
    setPage(1);
    setQuery(input);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setModal(prevState => ({ ...prevState, showModal: !prevState.showModal }));
  };

  const onImageClick = largeImageURL => {
    setModal(prevState => ({ ...prevState, largeImageURL }));
    toggleModal();
  };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar
          onSubmit={handleSubmit}
          onChange={handleChange}
          input={input}
        />
        <Section>
          {isLoading && <Loader />}
          {noResults && (
            Report.warning(
              'Warning',
              'No images found. Please try another query.',
              'Okay',
            )         
          )}
        <ImageGallery images={images} onImageClick={onImageClick} />
          {error && (
             Report.warning(
              'Warning',
              'Something went wrong',
              'Okay',
            )          
          )}
        </Section>
        {page < lastPage && !isLoading && !error ? (
          <Button
            label={'Load more'}
            handleLoadMore={handleLoadMore}
          />
        ) : (
          <div style={{ height: 40 }}></div>
        )}
        {modal.showModal && (
          <Modal onClose={toggleModal} largeImageURL={modal.largeImageURL} />
        )}
      </div>
    );
  }