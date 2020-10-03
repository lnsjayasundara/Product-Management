import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Product extends Component {
    constructor (props){
        super(props)
       this.state = {priceList :[],productName:""}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        this.getProductList();
    }

    async getProductList() {
        
        const response = await fetch("http://localhost:8080/product/price/"+this.props.match.params.id);
        const list = await response.json();
        
        this.setState({ priceList: list.productList,productName: list.productList[0].name})
      }

    render() { 
        const {priceList,productName} = this.state;
       
        return ( 
            
            <Table>
               
                <thead>
                    <tr>
                        <th colSpan="4"><h4>{productName}</h4></th>
                    </tr>
                    <tr>
                        <th>Total No Of Units</th>
                        <th>No Of Unit</th>
                        <th>No Of Carton</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {priceList.map(product=>
                    <tr>
                        <td>{product.totalUnit}</td>
                        <td>{product.noOfUnit}</td>
                        <td>{product.noOfCarton}</td>
                        <td>{product.price}</td>
                        
                    </tr>
                    )
                    
                    }
                </tbody>
            </Table>
         )
    }
}
 
export default Product;