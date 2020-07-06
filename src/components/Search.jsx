import React from 'react'

class Search extends React.Component {

    state = {
        tags: []
    }

    handleClick = (e) => {
        let newTag = e.target.innerText.toLowerCase()
        this.props.searchTags.includes(newTag) ? this.props.removeSearchTags(newTag) : this.props.addSearchTags(newTag)
        // (e.target).toggleClass("clicked");
        
    }

    handleRemove = (e) => {
        let newTag = e.target.innerText.toLowerCase()
        this.props.removeSearchTags(newTag)
    } 
    
    render() {
        return (
            <>
            <div className="search">
                <input className="prompt" onChange={this.props.onChange} />
            </div>
            <ul className="tagList" onClick={this.handleRemove}> {this.props.searchTags.map(t => {
                return <li key={this.props.searchTags.indexOf(t)} className="currentTag">{t}</li>
            })}
            </ul>
            <div className="tags" onClick={this.handleClick}>
                <div className="title">
                    <p>Habit</p>
                    <ul className="habit">
                        <li value='crust'>Crust</li>
                        <li value='rosette'>Rosette</li>
                        <li value='clustered'>Clustered</li>
                        <li value='grouped'>Grouped</li>
                        <li value='solitary'>Solitary</li>
                    </ul>
                </div>
                <div className="title">
                    <p>Size</p>
                    <ul className="size">
                        <li value='small'>Small</li>
                        <li value='medium'>Medium</li>
                        <li value='large'>Large</li>
                    </ul>
                </div>
                <div className="title">
                    <p>Tree</p>
                    <ul className="tree">
                        <li value='tree-base'>Base</li>
                        <li value='tree-trunk'>Trunk</li>
                        <li value='tree-branch'>Branch</li>
                    </ul>
                </div>
                <div className="title">
                    <p>Color</p>
                    <ul className="color">
                        <li value='multicolor'>Multicolor</li>
                        <li value='white'>White</li>
                        <li value='cream'>Cream</li>
                        <li value='beige'>Beige</li>
                        <li value='yellow'>Yellow</li>
                        <li value='gray'>Gray</li>
                        <li value='brown'>Brown</li>
                        <li value='green'>Green</li>
                        <li value='red'>Red</li>
                        <li value='orange'>Orange</li>
                        <li value='purple'>Purple</li>
                        <li value='blue'>Blue</li>
                    </ul>
                </div>
                <div className="title">
                    <p>Pore Surface Color</p>
                    <ul className="poreSurface">
                        <li value='white'>White</li>
                        <li value='brown'>Brown</li>
                        <li value='cream'>Cream</li>
                        <li value='pink'>Pink</li>
                    </ul>
                </div>
                <div className="title">
                    <p>Pore Surface Texture</p>
                    <ul className="poreTexture">
                        <li value='smooth'>Smooth</li>
                        <li value='toothed'>Toothed</li>
                        <li value='other'>Other</li>
                    </ul>
                </div>
            </div>
            </>
        )
    }
}

export default Search