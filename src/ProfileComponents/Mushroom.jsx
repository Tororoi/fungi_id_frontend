import React from 'react'

class Mushroom extends React.Component {

    state = {

    }

    handleClick = () => {
        this.props.chooseMush(this.props.mushroom)
    }

    render() {
      let {species, genus, family, order, classis, phylum} = this.props.mushroom
      let name
      switch (true) {
          case classis === null:
              name = `Phylum ${phylum}`
              break;
          case order === null:
              name = `Class ${classis}`
              break;
          case family === null:
              name = `Order ${order}`
              break;
          case genus === null:
              name = `Family ${family}`
              break;
          case species === null:
              name = `Genus ${genus}`
              break;
          default:
              name = `${genus} ${species}`
      }
      return (
        <>
          <div className="card" onClick={this.handleClick} style={this.props.chosen === this.props.mushroom ? {backgroundColor: 'rgb(243, 109, 69)'} : {}}>
            <div>
              <img src={this.props.mushroom.observations.length > 0 ? this.props.mushroom.observations[0].image_one : null} alt="oh no!" />
            </div>
            <div className="content">
            <div style={{fontStyle: 'italic',}}>{name}</div>
            </div>
            <div className="extra content">
              <span>

              </span>
            </div>
          </div>
        </>
      )
    }
  }
  
  export default Mushroom
  