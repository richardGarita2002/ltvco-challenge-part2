import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/modal.css';

/**
 * Modal component to display content in a modal dialog.
 * @param {boolean} showModal - Whether the modal should be shown or not.
 * @param {function} setShowModal - Function to toggle the modal visibility.
 * @param {string} title - Title of the modal.
 * @param {string|JSX.Element} content - Content to be displayed inside the modal body.
 * @param {string} size - Size of the modal dialog ('sm', 'md', 'lg', 'xl').
 * @returns {JSX.Element} Modal component.
 */
export default function Modal({showModal, setShowModal, title, content, size}) {

    return (
        <>
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-${size}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                {title && <h1 className="modal-title fs-5">{title}</h1>}
                                <FontAwesomeIcon aria-label="Close" onClick={() => setShowModal(false)} className='ms-auto close-modal' icon={faCircleXmark} />
                            </div>
                            <div className="modal-body">{content}</div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
}
