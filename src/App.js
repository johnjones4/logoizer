import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 360,
      height: 240,
      inset: 30
    }
  }

  imageUploaded (event) {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image()
      img.onload = () => {
        this.img = img
        this.renderImage()
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(event.target.files[0])
  }

  componentDidMount () {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = this.state.width
    this.canvas.height = this.state.height
    this.renderImage()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    this.renderImage()
  }

  renderImage () {
    this.canvas.width = this.state.width
    this.canvas.height = this.state.height
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, this.state.width, this.state.height)
    // this.ctx.fillStyle = '#000000'
    // this.ctx.fillRect(0, 0, this.state.width, this.state.height)
    // this.ctx.fillStyle = '#ffffff'
    // this.ctx.fillRect(this.state.inset, this.state.inset, this.state.width - (this.state.inset * 2), this.state.height - (this.state.inset * 2))

    if (this.img) {
      let targetWidth = null
      let targetHeight = null
      if (this.canvas.width > this.canvas.height || this.img.height > this.img.width) {
        targetHeight = this.state.height - (this.state.inset * 2)
        targetWidth = (targetHeight / this.img.height) * this.img.width
      } else {
        targetWidth = this.state.width - (this.state.inset * 2)
        targetHeight = (targetWidth / this.img.width) * this.img.height
      }
      const xInset = (this.state.width - targetWidth) / 2
      const yInset = (this.state.height - targetHeight) / 2

      this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, xInset, yInset, targetWidth, targetHeight)
    }
  }

  download () {
    const a = document.createElement('a')
    a.href = this.canvas.toDataURL('image/png').replace("image/png", "image/octet-stream")
    a.setAttribute('download', 'logo.png')
    document.body.appendChild(a)
    a.click()
  }

  render () {
    return (
      <div className='App container'>
        <h1 className='text-center'>Logoizer</h1>
        <canvas ref='canvas' id='canvas'></canvas>
        <div className='form'>
          <div className='form-group'>
            <label htmlFor='image'>Image</label>
            <input type='file' className='form-control' id='image' onChange={(event) => this.imageUploaded(event)} /> 
          </div>
          <div className='form-group'>
            <label htmlFor='width'>Target Width</label>
            <input value={this.state.width} type='number' className='form-control' id='width' onChange={(event) => this.setState({width: event.target.value})} /> 
          </div>
          <div className='form-group'>
            <label htmlFor='height'>Target Height</label>
            <input value={this.state.height} type='number' className='form-control' id='height' onChange={(event) => this.setState({height: event.target.value})} /> 
          </div>
          <div className='form-group'>
            <label htmlFor='inset'>Image Inset</label>
            <input value={this.state.inset} type='number' className='form-control' id='inset' onChange={(event) => this.setState({inset: event.target.value})} /> 
          </div>
          <button className='btn btn-primary' onClick={() => this.download()}>Download</button>
        </div>
      </div>
    )
  }
}

export default App;
