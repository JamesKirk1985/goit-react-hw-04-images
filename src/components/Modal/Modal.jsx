import {  useEffect } from 'react'

import css from './Modal.module.css'

export const Modal = ({closeModal}) => {

    useEffect(() => {
        document.addEventListener('keydown', closeModal)
    }, [])
    
    useEffect(() => {
        return () => {
            document.removeEventListener('keydown',  closeModal)            
            }}
        , [closeModal]);
   
    return (
        <>
            <div className={css.Overlay}
                onClick={this.props.close}>
            <div className={ css.Modal}>
            <img src={this.props.src } alt="" />
            </div>
            </div>
        </>
        )
        
}