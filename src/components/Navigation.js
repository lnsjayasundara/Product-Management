import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown } from "react-bootstrap";


class Navigation extends Component {
    state = {
        products: []
      }
    
      componentDidMount() {
        this.getProductList();
      }


      async getProductList() {
        
        const response = await fetch("http://localhost:8080/product/list");
        const list = await response.json();
        console.log(list.productList);
        this.setState({ products: list.productList })
      }


    render() { 
        const {products} = this.state;
        return ( 
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Cart</Nav.Link>
                    <NavDropdown title="Product Price" id="basic-nav-dropdown">
                    {products.map(product=>
                        <NavDropdown.Item key={product.id} href={"/product/"+product.id}>{product.name}</NavDropdown.Item>
                        )
                    }
                        
                    </NavDropdown>
                </Nav>
        
                </Navbar.Collapse>
            </Navbar>
         );
    }
}
 
export default Navigation;