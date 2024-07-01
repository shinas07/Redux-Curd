
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function EditUserModal(props) {
  const [username, setUsername] = useState(props.username);

  const [email, setEmail] = useState(props.email);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleUpdate = () => {
    e.prevetDefualt()
    console.log(username)
  }

  return (
    <>
          <button onClick={handleShow} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2">
                                            Edit
                                        </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id='editmodal' className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="role">
                    UserName
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="role" type="text" Value ={username} onClick={(e) => {
                    setUsername(e.target.value);
                }}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="role">
                    Email
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="role" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleClose} className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" form='editmodal'>Close</button>
          <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" form='editmodal'>Updata</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;