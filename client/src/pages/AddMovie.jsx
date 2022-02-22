import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { API } from '../config/api';
import { useNavigate } from 'react-router';

function AddMovie() {
  const [login, setLogin] = useState(false);
  const animatedComponents = makeAnimated();
  const titleRef = useRef(null);
  const thumbRef = useRef(null);
  const priceRef = useRef(null);
  const urlRef = useRef(null);
  const descRef = useRef(null);
  const [img, setImg] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.id) : []);
  }
  function onChange() {
    var file = URL.createObjectURL(thumbRef.current.files[0]);
    setImg(file);
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set('title', titleRef.current.value);
      formData.set('price', priceRef.current.value);
      formData.set('url', urlRef.current.value);
      formData.set('media', thumbRef.current.files[0]);
      formData.set('description', descRef.current.value);

      const addMovie = await API.post('/movie', formData);
      await API.post(
        '/movie-categories',
        selectedValue.map((id) => {
          return {
            movies_id: addMovie.data.response.id,
            categories_id: id,
          };
        }),
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCategories() {
    try {
      const response = await API.get('/categories');
      setOptions(
        response.data.response.map((item) => {
          return {
            value: item.category,
            label: item.category,
            id: item.id,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="lg:px-40 md:px-20 sm:px-4 py-2 mb-10">
        <h1 className="text-white text-sm md:text-[28px] font-bold mb-10">
          Add Film
        </h1>
        <form onSubmit={handleSubmit} className="w-full ">
          <input
            ref={titleRef}
            required
            type="text"
            placeholder="Title"
            className="w-4/5 mr-4 text-[#B1B1B1] bg-[#D2D2D240] px-2 py-3 border-2 border-[#D2D2D2] rounded-md mb-5 placeholder:text-[#B1B1B1]"
          />
          <input
            required
            ref={thumbRef}
            onChange={onChange}
            type="file"
            hidden
            id="media"
          />
          <label
            htmlFor="media"
            className="w-full text-[#B1B1B1] bg-[#D2D2D240] px-8 py-4 cursor-pointer border-2 border-[#D2D2D2] rounded-md"
          >
            Attach Thumbnail{' '}
            <img className="inline" src="/assets/thumbnail.png" alt="" />
          </label>
          <div className="inline w-48 h-[12.25rem] bg-[#D2D2D240] float-right border-dashed border-2 border-white mr-6">
            <img className="w-48 h-48" src={img} alt="" />
          </div>
          <Select
            isMulti
            components={animatedComponents}
            placeholder={'Category'}
            onChange={handleChange}
            options={options}
            styles={{
              input: (base) => ({
                ...base,
                'input:focus': {
                  boxShadow: 'none',
                },
              }),
              control: (base) => ({
                ...base,
                backgroundColor: '#D2D2D240',
                border: '2px solid #D2D2D2',
                paddingTop: '7px',
                paddingBottom: '7px',
                borderRadius: '6px',
                width: '80%',
                marginBottom: '1.25rem',
              }),
              placeholder: (base) => ({
                ...base,
                color: '#B1B1B1',
              }),
            }}
          />

          <input
            required
            min="1"
            ref={priceRef}
            type="number"
            placeholder="Price"
            className="w-4/5 mr-4 text-[#B1B1B1] bg-[#D2D2D240] px-2 py-3 border-2 border-[#D2D2D2] rounded-md mb-5 placeholder:text-[#B1B1B1"
          />
          <input
            required
            ref={urlRef}
            type="text"
            placeholder="Link Film"
            className="w-4/5 mr-4 text-[#B1B1B1] bg-[#D2D2D240] px-2 py-3 border-2 border-[#D2D2D2] rounded-md mb-5 placeholder:text-[#B1B1B1"
          />
          <textarea
            required
            ref={descRef}
            placeholder="Description"
            className="w-full mr-4 text-[#B1B1B1] bg-[#D2D2D240] px-2 py-3 border-2 border-[#D2D2D2] rounded-md mb-5 placeholder:text-[#B1B1B1"
            cols="30"
            rows="10"
          ></textarea>
          <button
            type="submit"
            className="float-right bg-[#CD2E71] text-white font-bold lg:text-sm md:text-xs lg:px-4 md:px-3 sm:px-2 lg:py-2 md:py-2 sm:py-1 rounded-lg mt-4"
          >
            Add Film
          </button>
          <div className="clear-right"></div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
