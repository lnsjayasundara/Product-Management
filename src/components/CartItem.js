import React, { Component } from 'react';
import { CartPlusFill,CartDashFill } from 'react-bootstrap-icons';


class CartItem extends Component {
    state = {
        productName:this.props.productName,
        unitItemCount:this.props.unitItemCount,
        cartonCount:this.props.cartonCount,
        total:this.props.total,
        id:this.props.id
    }

    componentDidMount(){
        this.props.parentFunc(this.state.id,this.state.total);
    }

    incrementUnitCount = async() => {
        
        await this.setState({ unitItemCount: this.state.unitItemCount + 1 });
       this.getItemPrice();
       
    }

    reductUnitCount = async () => {
        if(this.state.unitItemCount !== 0){
            await this.setState({unitItemCount : this.state.unitItemCount - 1});
        }
        this.getItemPrice();
     }

     incrementCartonCount = async () => {
        
        await this.setState({cartonCount : this.state.cartonCount +1});
        this.getItemPrice();
     }
 
     reductCartonCount = async () => {
         if(this.state.cartonCount !== 0){
            await this.setState({cartonCount : this.state.cartonCount - 1});
         }
         this.getItemPrice();
      }

      getItemPrice = async () => {
         const data = {
             "id":this.state.id,
             "unitCount":this.state.unitItemCount,
             "cartonCount":this.state.cartonCount
         };
         try{
            const response = await fetch("http://localhost:8080/cart/getPrice",
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            const price = await response.json();
            this.setState({total : price});
            this.props.parentFunc(this.state.id,price);
        }catch(e){
            this.setState({total : 0.0});
            this.props.parentFunc(this.state.id,0.0);
        }
     }

    
    render() { 
        const {productName,unitItemCount,cartonCount,total} = this.state;
       
        return (
             <tr>
            <td>{productName}</td>
            
            <td>No Of Units : {unitItemCount}{'  '}<CartPlusFill id="plus" onClick={this.incrementUnitCount}/>{' '}
        <CartDashFill onClick={this.reductUnitCount}/></td>
        <td>No Of Carton : {cartonCount}{'  '}<CartPlusFill id="plus" onClick={this.incrementCartonCount}/>{' '}
        <CartDashFill onClick={this.reductCartonCount}/></td>
        <td>{total}</td>
        </tr>
      
        )
    }

}

export default CartItem;