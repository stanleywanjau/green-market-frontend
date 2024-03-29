import React, { useState ,useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProductForm() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const [product,setProduct]=useState([])
    const { productId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity_available: '',
        category: '',
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            await axios.put(`https://green-market-backend-2es1.onrender.com/updateproduct/${productId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            setMessage(`Product updated successfully`);
            toast.success('Product updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // Refresh the page or update the product state if needed
            // window.location.reload();
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            // Handle error here
        }
    };


    useEffect(()=>{
        fetch(`https://green-market-backend-2es1.onrender.com/updateproduct/${productId}`,{ 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            } 
        }
        
        )
        .then(r=>r.json()
        .then(data=>{
            setProduct(data)
            
        }))
    },[productId])

    function navigateBackToProduct(productId) {
        navigate(`/farmerproduct`); 
      }

    return (
        <div>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={product.name}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={product.description}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={product.price}
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="quantity_available">
                        <Form.Label>Quantity </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={product.quantity_available}
                            name="quantity_available"
                            value={formData.quantity_available}
                            onChange={handleChange}
                            
                        />
                    </Form.Group>
                </Row>
               
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                update Product
                </Button>
                <Button variant="primary" onClick={navigateBackToProduct}> 
                back to products
                </Button>
                {message && <p>{message}</p>}
            </Form>
        </div>
    );
}

export default UpdateProductForm;
