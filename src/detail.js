import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { Nav, tabContent } from 'react-bootstrap';
import {addItem} from "../store/store.js";
import { useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';

function Detail(props) {

    let [count, setCount] = useState(0)
    let {id} = useParams();
    let item = props.products.find((x) => x.id == id); //find products 찾은상품
    let [alert, setAlert] = useState(true) //switch
    let [fade2, setFade2] = useState('')  // container fade
    let [tab, setTab] = useState(0)  //tab
    let dispatch = useDispatch() 

    //fade effect 
    useEffect(()=>{
        setTimeout(()=>{ setAlert(false) }, 2000)
    }, [])

    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    },[])

    //watched history 
    useEffect(()=>{
        let itemList = localStorage.getItem('watched')
        itemList = JSON.parse(itemList)
        itemList.push(item.id)

        //Set으로 바꿨다가 다시 array로 만들기 (중복방지)
        itemList = new Set(itemList)
        itemList = Array.from(itemList)
        localStorage.setItem('watched', JSON.stringify(itemList))
    }, [])

    return(
        

        <div className={'container start ' + fade2}>
            {
                alert == true
                ? <div className="alert alert-warning">
                    Welcome!
                </div>
                : null
            }

            {/* Add cart */}
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://raw.githubusercontent.com/ld5ehom/data/main/item' + id + '.webp'} width="80%" />
                </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{item.title}</h4>
                        <p>{item.content}</p>
                        <h5>${item.price}</h5>
                        <button className="btn btn-danger" onClick={()=>{
                            dispatch(addItem( {
                                id : item.id, name : item.title, count : 1, price :item.price
                            } ))
                        }}> Add cart </button>

                </div>
            </div>


            {/* details */}
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">FEATURED</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">ACCESSORIES</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">COLLECTIBLES</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent products = {props.products} tab = {tab}/>

        </div>
    )
}


function TabContent({tab, products}){

    let [fade, setFade] = useState('')

    // fade effect
    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 100)
        return ()=>{
            setFade('')
        }
    }, [tab])

    // fade effect(start) + contents array(end)
    return (
        <div className={'start ' + fade}>
            { [<div>{products[0].content}</div>, <div>blank</div>, <div>blank</div>][tab] }
        </div>
    )
}


export default Detail;