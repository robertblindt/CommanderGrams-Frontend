import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { getDeckById, editDeckById, deleteDeckById } from '../lib/apiWrapper'
import CategoryType from '../types/category';
import UserType from '../types/auth';
import DeckType from '../types/deck';

type EditEditDeckInfoProps = {
    flashMessage: (message:string, category:CategoryType) => void ,
    currentUser: Partial<UserType>|null,
}

export default function EditDeckInfo({flashMessage, currentUser }: EditEditDeckInfoProps) {
    const { deckId } = useParams();

    const navigate = useNavigate();

    const [deckToEdit, setDeckToEdit] = useState<DeckType>({
        deck_name:'',
        description:'',
        id:0,
        user_id:0
    })

    useEffect(() => {
        async function getDeck(){
            let response = await getDeckById(localStorage.getItem('token')!,Number(deckId!));
            // console.log(deckId)
            if (response.error){
                flashMessage(response.error, 'danger')
                navigate('/')
            } else {
                setDeckToEdit(response.data!)
            }
        }
        getDeck()
    },[])

    useEffect(() => {
        if (deckToEdit){
            // console.log(deckToEdit, currentUser)
            if (deckToEdit.user_id !== currentUser?.id && deckToEdit.id != 0){
                flashMessage('You do not have permission to edit this post. Who do you think you are?!', 'danger');
                navigate('/')
            }
        }
    },[deckToEdit])
    // Square brackets means Immediately, no square brackets means on every rerender

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDeckToEdit({...deckToEdit, [e.target.name]:e.target.value} as DeckType)
    }

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editDeckById(token, deckId!, deckToEdit!)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.deck_name} has been edited`,'success')
            navigate('/')
        }
    }

    const deleteDeck = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteDeckById(token, Number(deckId!))
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            // flashMessage(`${response.} has been edited`,'success')
            navigate('/createdeck')
            window.location.reload()
        }
    }


    return (
        <>
        <Card className='my-3 border border-dark border-2 rounded-3 grad high-card-shadow'>
        <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <div className='text-center fs-1 ws-font'>Edit Deck Info!</div>
                    <Form.Label className='ws-font'>Deck Name</Form.Label>
                    <Form.Control className="custom-form-input" name='deck_name' value={deckToEdit?.deck_name} onChange={handleInputChange}/>
                    <Form.Label className='ws-font'>Description</Form.Label>
                    <Form.Control as="textarea" className="custom-form-input" name='description' value={deckToEdit?.description} onChange={handleInputChange}/>
                    <div className="row">
                        <div className="col-6 px-3">
                            <Button variant='success' className='mt-3 w-100 btn-shadow btn-border' type='submit'>Submit Edits</Button>
                        </div>
                        <div className="col-6 px-3">
                            <Button variant='danger' className='mt-3 w-100 btn-shadow btn-border' onClick={openModal}>Delete Deck</Button>
                        </div>
                    </div>
                    
                    
                    
                </Form>
            </Card.Body>
        </Card>
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {deckToEdit?.deck_name!}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to do {deckToEdit?.deck_name!}?
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="danger" onClick={() => deleteDeck()} >Delete Deck</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}