import { useEffect, useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { SearchBar } from "../SearchBar/SearchBar";
import { Modal } from '../Modal/Modal'
import { Loader } from "../Loader/Loader";
import { Button } from '../Button/Button'

import { imgGetFunction } from 'Api/Api.js'

import css from "./App.module.css"


export const App = () => {
  
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [bigImage, setBigImage] = useState('')

  useEffect(() => {
    if (!(searchKey==='')) {
      getImages(searchKey, page)}      
    }, [page, searchKey])
      
  
  async function getImages (key, page) {    
    try {
      setIsLoading(true)        
      const data = await imgGetFunction(key, page)   
        setImages((prev) => ([...prev, ...data.hits]))    
        setLoadMore(page < Math.ceil(data.totalHits / 12 ))        
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function onSubmit (event) {    
    event.preventDefault();
    if (event.target.inputKey.value === searchKey) 
    { return }
    setImages([]);
    setPage(1);
    setSearchKey(event.target.inputKey.value)    
  }

  function loadMoreFunc () {
    setPage((prev)=>(prev+1))
  }

  function showModalFunc (evt) {   
    setShowModal(true);
    setBigImage(evt.target.alt)     
  }
  
  function closeModal (event) {
      if (event.key === 'Escape' || !event.target.closest('IMG')) {
        setShowModal(false)
      }
    }

  return (
        <div className={css.App}>
          <SearchBar onSubmit={onSubmit} />
          <ImageGallery images={images} showModal={showModalFunc}>
          </ImageGallery >
          {images.length>0 && loadMore && <Button loadMoreFunc={loadMoreFunc} />}          
          {showModal && <Modal src={bigImage} closeModal={closeModal} />}
          {isLoading && <Loader />}
        </div>
      )  
}
  
