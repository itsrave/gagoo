import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import '../Css/Loading.css'


class Loading extends Component {
  renderLoading() {
    if (this.props.full) {
      return <div className='loading-full'>
        <div className='loading-image-container'>
          <ReactLoading className='loading-image' type='spin' color='#000000' />
        </div>
      </div>
    } else {
      return <div className='loading'>
        <div className='loading-image-container'>
          <ReactLoading className='loading-image' type='spin' color='#000000' />
        </div>
      </div>
    }

  }
  render() {
    return this.renderLoading()
  }
}

export default Loading;
