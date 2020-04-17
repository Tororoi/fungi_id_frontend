import React, { Component } from 'react';
import Mushroom from '../ProfileComponents/Mushroom'

class MushroomContainer extends Component {
    state = {
        category: ''
 
    }



    render() {
        let mushroomComponents = this.props.mushrooms.map((mushPOJO) => {
          return <Mushroom
            key={mushPOJO.id}
            mushroom={mushPOJO}
            chooseMush={this.props.chooseMush}
            chosen={this.props.chosen}
          />
        })
    
        return (
        <>
        <div className="card_container">
        { mushroomComponents }
        </div>
        </>
        )
      }
}

export default MushroomContainer;