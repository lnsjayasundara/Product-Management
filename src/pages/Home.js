import React, { Component } from 'react';
import  CartItem  from "../components/CartItem";
import { Table } from 'react-bootstrap';

class Home extends Component {
    state = {
        products: [],total:0.0,productPrice : []

      }
    
      constructor(props) {
        super(props);
        this.updateCounter = this.updateCounter.bind(this);
        
      }

      componentDidMount() {
        this.getProductList();
      }

      updateCounter(id,value){
        this.state.productPrice[id] = value;
        const sum = this.state.productPrice.reduce(function(a, b){
          return a + b;
      }, 0);
        this.setState({total: sum});
      }

      async getProductList() {
        
        const response = await fetch("http://localhost:8080/product/list");
        const list = await response.json();
        console.log(list.productList);
        this.setState({ products: list.productList })
      }

      
    render() { 
      const {products,total} = this.state;
        return ( 
          <div><Table>
            <tbody>
            {products.map(product=>
           
            <CartItem 
            id={product.id}
            productName={product.name} 
            unitItemCount={product.totalUnit} 
            total={product.price}
            cartonCount={product.noOfCarton}
            parentFunc={this.updateCounter}/>
            )
        }
        </tbody>
        </Table>
      <div><b>Total : {total}</b></div>
        </div>
            
         )
    }
}
 
export default Home;