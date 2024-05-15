import { useState } from 'react';
import Modal from '../../../utils/modal';
import { useForm } from 'react-hook-form';

export default function AddUrl(){
    const [showModal, setShowModal] = useState(false);
    const [shortCode, setShortCode] = useState('');
    const {register, handleSubmit, formState: { errors, isValid },  } = useForm({mode: "all"});

    const onSubmit = (data) => {
        console.log(data);
        setShortCode(data.full_url);
    }

    const urlRegex = new RegExp(
        /(?:(?:(https?|ftp):)?\/\/)/.source       // protocol
        + /(?:([^:\n\r]+):([^@\n\r]+)@)?/.source  // user:pass
        + /(?:(?:www.)?([^/\n\r]+))/.source       // domain
        + /(\/[^?\n\r]+)?/.source                 // request
        + /(\?[^#\n\r]*)?/.source                 // query
        + /(#?[^\n\r]*)?/.source                  // anchor
    );

    return (
        <>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title={'Generate your short code!'}
                content={
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-group text-start mb-3'>
                                <label htmlFor='full_url' className='me-auto'><strong>Full Url:</strong></label>
                                <input type='url' className='form-control' id='full_url' name='full_url' 
                                placeholder='https://www.example.com' {...register('full_url', {
                                    required: {value: true, message: 'The full url is required'},
                                    pattern: {
                                        value: urlRegex,
                                        message: "The Url must have a valid format"
                                    },
                                })}/>
                            </div>
                            {errors.full_url && <small className='text-start text-danger d-block'>{errors.full_url.message}</small>}

                            <div className='text-end'>
                                <button type='submit' disabled={!isValid} className='btn btn-primary ms-auto'>Generate</button>
                            </div>

                            <section className={`mt-1 ${shortCode ? '' : 'd-none'}`}>
                                <p>Here is your short code. Make sure you save it!</p>
                                <div className='shortcode-box'>
                                    <p><strong>{shortCode}</strong></p>
                                </div>
                            </section>
                        </form>
                    </>
                }
            />
            <span className="nav-link link-item" onClick={() => setShowModal(!showModal)}>Add Url</span>
        </>
    )
}