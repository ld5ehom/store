import './App.css'; 
import Detail from './pages/detail.js';
import Cart from './pages/Cart.js';
import { useState, useEffect } from 'react';
import {  HashRouter as Router, Routes, Route, useNavigate, } from 'react-router-dom'
import { Container, Nav, Navbar} from 'react-bootstrap';  // Bootstrap(BS)
import Badge from 'react-bootstrap/Badge';  //Bootstrap Badge 
import axios from 'axios' //Ajax
import { useQuery } from 'react-query'

//Main
function App() {

  // product.js data list (server)
  const [products, setProducts] = useState([]);

  // hide button 
  const [show, setShow] = useState(true);
  const changeState = () => {
    setShow(!show);
  };

  //watched history array (이미 watched가 있으면 setItem 금지)
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))
  },[]) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // server URL
        const apiUrl = 'https://raw.githubusercontent.com/ld5ehom/data/main/data.json';

        // get item list using axios
        const response = await axios.get(apiUrl);

        // add data
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect 사용
    fetchData();
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 마운트될 때만 useEffect가 실행되도록 설정

  return (
    <div className="App">

      {/*Site Navbar*/}
      <MainMenu></MainMenu>

      {/*Router*/}
      <Routes>
        <Route path="/shop" element={
          <>
          <div>
            <div className="main-bg" style={{ backgroundImage : 'url("https://raw.githubusercontent.com/ld5ehom/data/main/bg.webp")' }}></div>
          </div>

          {/* Pruduct Card Grid */}
          <div className="container">
            <div className="row"> 
              {/* Function Card */}
              {
                products.map(function(a, i){
                  return (
                    <Card products={products[i]} i={i} key={i}></Card> 
                  )
                })
              }
            </div>
          </div>

          {/* Ajax _ add more item list + hide after click  */}
          {show && <button onClick={()=>{
            axios.get('https://raw.githubusercontent.com/ld5ehom/data/main/data2.json').then((result)=>{
              let copy = [...products, ...result.data]
              setProducts(copy)
              changeState()
              })
              .catch(()=>{
                console.log('Fail')
              })
            }}> Add item </button>}
            </>
          } />

        {/* <Route path="/shop" element={ <div>SHOP</div>} /> */}
        <Route path="/detail/:id" element={ <Detail products={products}/> } />
        <Route path="/cart" element={ <Cart/> } />
        <Route path="*" element={ <div>404-PAGE NOT FOUND</div> } />
      </Routes>
    </div>
  );
}

//Navbar
function MainMenu(){
  let navigate = useNavigate();
  
  //AJAX Loading check (user data from server)
  let result = useQuery('name', ()=>
    //get user data
    axios.get('https://raw.githubusercontent.com/ld5ehom/data/main/userdata.json')
      .then((a)=>{ return a.data }),
      //refetch time adjust 
      {staleTime : 2000 }
  )

  return (
    <Navbar sticky="top" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/shop')}}>SHOP</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/Cart')}}>CART</Nav.Link>
        </Nav>
          
          <h4>
            {/* User name */}
            <Badge bg="secondary">
              { result.isLoading && 'Loading...' }
              { result.error && 'ERROR!!' }
              { result.data && result.data.name }
            </Badge>
          </h4>
      </Container>
    </Navbar>
  );
}

//Mall Products card 
function Card(props){
  let navigate = useNavigate();
  let id = props.products.id;

  //console.log(props.products.id)
  const handleClick =()=>{
    navigate('/detail/'+ id);
  }

  return (
    <div className="col-md-4" onClick={()=>{
      handleClick();
    }}>  
      <img src={'https://raw.githubusercontent.com/ld5ehom/data/main/item' + id + '.webp'}  width="80%" />
      <h5>{props.products.title}</h5>
      <h6>$ {props.products.price}</h6>
    </div>
  );
}

export default App;