import {  useEffect } from 'react'

import css from './Modal.module.css'

export const Modal = ({closeModal, src}) => {

    useEffect(() => {
        document.addEventListener('keydown', closeModal)
    }, [ closeModal])
    
    useEffect(() => {
        return () => {
            document.removeEventListener('keydown',  closeModal)            
            }}
        , [closeModal]);
   
    return (
        <>
            <div className={css.Overlay}
                onClick={closeModal}>
            <div className={ css.Modal}>
            <img src={src } alt="" />
            </div>
            </div>
        </>
        )
        
}