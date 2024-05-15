import { useState } from 'react';
import Modal from '../../../utils/modal';

export default function AddUrl(){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title={'Generate your short code!'}
                content={
                    <>
                        <h3>Working</h3>
                    </>
                }
            />
            <span className="nav-link link-item" onClick={() => setShowModal(!showModal)}>Add Url</span>
        </>
    )
}