import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../../utils/axiosConfig'; // Importing Axios instance configured with baseURL
import Modal from '../../../utils/modal';

export default function AddUrl(){
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility
    const [shortUrl, setShortUrl] = useState(''); // State to store generated short url
    const {register, handleSubmit, formState: { errors, isValid },  } = useForm({mode: "all"}); // Form handling using react-hook-form

    // Function to handle form submission
    const onSubmit = (data) => {
        axios.post('/', data).then((response) => {
            setShortUrl(`${axios.defaults.baseURL}/${response.data.short_code}`);
        }).catch((error) => {
            setShortUrl('');
            console.error(error);
            if (error.response && error.response.status === 422) {
                alert('The URL is not valid. Try again please');
            } else {
                alert('An error was produced. Try again please');
            }
        })
    }

    // Regular expression for URL validation
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
                title={'Generate your short URL!'}
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

                            <section className={`mt-1 ${shortUrl ? '' : 'd-none'}`}>
                                <p>Here is your shorten URL. Make sure you save it!</p>
                                <div className='shortcode-box'>
                                    <p><strong>{shortUrl}</strong></p>
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