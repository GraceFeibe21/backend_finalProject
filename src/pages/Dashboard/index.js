import React, {useState, useEffect} from 'react'
import firebase from '../../config/Firebase'
import NavBar from '../../components/molecules/NavBar'
import Footer from '../../components/molecules/Footer';

const Dashboard = () => {

    const [bookName, setbookName] = useState ('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState ([]);
    const [button, setButton] = useState ("Save");
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() => {
        firebase.database().ref('products').on('value', (res) => {
            if(res.val()){
                //Ubah menjadi array object
                const rawData = res.val();
                const productArr = [];
                Object.keys(rawData).map(item => {
                    productArr.push({
                        id: item,
                        ...rawData[item],
                    })
                });
                setProduct(productArr);
            }
        })
    }, [])

    const resetForm = () => {
        setbookName('');
        setGenre('');
        setPrice('');
        setButton('Save');
        setSelectedProduct({});
    }

    const onSubmit = () => {
        const data = {
            bookName: bookName,
            genre: genre,
            price: price,
        }
        if(button === 'Save'){
            //Insert
            firebase.database().ref('products').push(data);
        }else {
            //Update
            firebase.database().ref(`products/${selectedProduct.id}`).set(data);
        }
        resetForm();
    }

    const onUpdateData = (item) =>{
        setbookName(item.bookName);
        setGenre(item.genre);
        setPrice(item.price);
        setButton("Update");
        setSelectedProduct(item);
    }

    const onDeleteData = (item) =>{
        //delete
        firebase.database().ref(`products/${item.id}`).remove();
    }

    return (
        <div className="container">
            <NavBar />
            <div className="container mt-5">
            <h3>Dashboard</h3>
            <div className="col-6">
            <p>Book Name</p>
            <input className="form-control" placeholder="Type the Book Name" value={bookName} onChange={(e)=>setbookName(e.target.value)} />
            <br />
            <p>Genre</p>
            <input className="form-control" placeholder="Type the Genre" value={genre} onChange={(e)=>setGenre(e.target.value)} />
            <br />
            <p>Price</p>
            <input className="form-control" placeholder="Type the Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br />
            <button className="btn btn-primary" onClick={onSubmit} >{button}</button>
            {
                button === 'Update' && (<button className={"btn btn-secondary"} onClick={resetForm} >Cancel Update</button>)
            }
            </div>
            <hr />
            <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Genre</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map(item => (
                        <tr key={item.id}>
                            <td>{item.bookName}</td>
                            <td>{item.genre}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => onUpdateData(item)} >Update</button>
                                <button className="btn btn-danger" onClick={() => onDeleteData(item)} >Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </div>
        <Footer />
        </div>
    )
}

export default Dashboard
